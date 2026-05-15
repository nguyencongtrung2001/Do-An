import crypto from 'crypto';

export class VNPayUtil {
  private static readonly VNP_VERSION = '2.1.0';
  private static readonly VNP_COMMAND = 'pay';
  private static readonly VNP_CURRENCY = 'VND';
  private static readonly VNP_LOCALE = 'vn';

  static get vnp_TmnCode(): string {
    const v = process.env.VNP_TMNCODE;
    if (!v) throw new Error('Thiếu VNP_TMNCODE trong .env');
    return v;
  }

  static get vnp_HashSecret(): string {
    const v = process.env.VNP_HASHSECRET;
    if (!v) throw new Error('Thiếu VNP_HASHSECRET trong .env');
    return v;
  }

  static get vnp_Url(): string {
    return process.env.VNP_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  }

  static get vnp_ReturnUrl(): string {
    const v = process.env.VNP_RETURNURL;
    if (!v) throw new Error('Thiếu VNP_RETURNURL trong .env');
    return v;
  }

  /** Sort object by key and encode according to VNPay standards */
  private static sortObject(obj: Record<string, unknown>): Record<string, string> {
    const sorted: Record<string, string> = {};
    const str = [];
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (let i = 0; i < str.length; i++) {
      // VNPay requires spaces to be encoded as '+' in some versions, or %20. Standard is '+'
      sorted[str[i]] = encodeURIComponent(String(obj[str[i]])).replace(/%20/g, "+");
    }
    return sorted;
  }

  /** HMAC-SHA512 */
  private static hmac(data: string): string {
    return crypto
      .createHmac('sha512', this.vnp_HashSecret)
      .update(Buffer.from(data, 'utf-8'))
      .digest('hex');
  }

  /**
   * Tạo chuỗi yyyyMMddHHmmss theo GMT+7.
   * Dùng locale en-CA vì nó cho YYYY-MM-DD,HH:mm:ss.
   * KHÔNG dùng en-US (cho MM/DD/YYYY → sai thứ tự!).
   */
  private static getCreateDate(): string {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
      .format(new Date())
      .replace(/[^0-9]/g, '');
  }

  /** Chuẩn hoá IP: ::1 / ::ffff:x.x.x.x → IPv4 */
  static normalizeIp(ip: string): string {
    if (!ip || ip === '::1') return '127.0.0.1';
    if (ip.startsWith('::ffff:')) return ip.slice(7);
    return ip;
  }

  /**
   * Build chuỗi dùng để ký: key=value&key2=value2 (KHÔNG encode URL).
   * Chuẩn VNPay: hash raw string, không encode.
   */
  private static buildSignData(params: Record<string, unknown>): string {
    return Object.keys(params)
      .map(k => `${k}=${params[k]}`)
      .join('&');
  }

  // ─── PUBLIC API ──────────────────────────────────────────────────────────────

  static createPaymentUrl(
    orderId: string,
    amount: number,
    orderInfo: string,
    ipAddr: string,
  ): string {
    const createDate = this.getCreateDate();

    console.log('[VNPay] createDate:', createDate);
    console.log('[VNPay] amount (x100):', Math.round(amount * 100));
    console.log('[VNPay] returnUrl:', this.vnp_ReturnUrl);

    const rawParams: Record<string, unknown> = {
      vnp_Version:    this.VNP_VERSION,
      vnp_Command:    this.VNP_COMMAND,
      vnp_TmnCode:    this.vnp_TmnCode,
      vnp_Locale:     this.VNP_LOCALE,
      vnp_CurrCode:   this.VNP_CURRENCY,
      vnp_TxnRef:     orderId,
      vnp_OrderInfo:  orderInfo,
      vnp_OrderType:  'billpayment',
      vnp_Amount:     Math.round(amount * 100),
      vnp_ReturnUrl:  this.vnp_ReturnUrl,
      vnp_IpAddr:     this.normalizeIp(ipAddr),
      vnp_CreateDate: createDate,
    };

    const sorted = this.sortObject(rawParams);

    // 1. Hash từ chuỗi đã được encode theo chuẩn VNPay
    const signData   = this.buildSignData(sorted);
    const secureHash = this.hmac(signData);

    console.log('[VNPay] signData:', signData);
    console.log('[VNPay] secureHash:', secureHash);

    // 2. Build URL — dùng chuỗi signData đã encode và nối thêm secureHash
    const queryString = signData + '&vnp_SecureHash=' + secureHash;
    return `${this.vnp_Url}?${queryString}`;
  }

  /**
   * Verify checksum của params trả về từ VNPay (vnp-return hoặc IPN).
   * req.query đã được Express decode → dùng raw value khớp cách VNPay tính.
   */
  static verifyChecksum(vnp_Params: Record<string, string>): boolean {
    const secureHash = vnp_Params['vnp_SecureHash'];
    if (!secureHash) return false;

    // Copy để không mutate req.query gốc
    const params = { ...vnp_Params };
    delete params['vnp_SecureHash'];
    delete params['vnp_SecureHashType'];

    const sorted   = this.sortObject(params) as Record<string, string>;
    const signData = this.buildSignData(sorted);
    const computed = this.hmac(signData);

    console.log('[VNPay verify] computed:', computed);
    console.log('[VNPay verify] received:', secureHash);
    console.log('[VNPay verify] match   :', computed === secureHash);

    return computed === secureHash;
  }
}