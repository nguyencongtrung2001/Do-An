import crypto from 'crypto';

export class VNPayUtil {
  private static readonly VNP_VERSION = '2.1.0';
  private static readonly VNP_COMMAND = 'pay';
  private static readonly VNP_CURRENCY = 'VND';
  private static readonly VNP_LOCALE = 'vn';

  static get vnp_TmnCode(): string {
    const tmnCode = process.env.VNP_TMNCODE;
    if (!tmnCode) throw new Error('Thiếu cấu hình VNPAY trong .env (VNP_TMNCODE)');
    return tmnCode;
  }

  static get vnp_HashSecret(): string {
    const hashSecret = process.env.VNP_HASHSECRET;
    if (!hashSecret) throw new Error('Thiếu cấu hình VNPAY trong .env (VNP_HASHSECRET)');
    return hashSecret;
  }

  static get vnp_Url(): string {
    return process.env.VNP_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  }

  static get vnp_ReturnUrl(): string {
    const returnUrl = process.env.VNP_RETURNURL;
    if (!returnUrl) throw new Error('Thiếu cấu hình VNPAY trong .env (VNP_RETURNURL)');
    return returnUrl;
  }

  private static sortObject(obj: Record<string, unknown>): Record<string, unknown> {
    const sorted: Record<string, unknown> = {};
    const keys = Object.keys(obj).sort();
    for (const key of keys) {
      sorted[key] = obj[key];
    }
    return sorted;
  }

  private static createHash(data: string): string {
    return crypto
      .createHmac('sha512', this.vnp_HashSecret)
      .update(Buffer.from(data, 'utf-8'))
      .digest('hex');
  }

  /**
   * Tạo chuỗi ngày giờ theo format VNPay yêu cầu: yyyyMMddHHmmss (GMT+7)
   * Lưu ý: Intl.DateTimeFormat với locale en-US trả về MM/DD/YYYY → SAI thứ tự.
   * Phải tự ghép theo đúng thứ tự: year → month → day → hour → minute → second.
   */
  private static getCreateDate(): string {
    // Lấy thời gian hiện tại theo múi giờ Việt Nam
    const now = new Date();
    const vnTimeStr = now.toLocaleString('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    // en-CA trả về YYYY-MM-DD, HH:MM:SS → xóa ký tự đặc biệt → yyyyMMddHHmmss
    return vnTimeStr.replace(/[^0-9]/g, '');
  }

  /**
   * Chuẩn hóa IP address: chuyển IPv6 loopback về IPv4
   * VNPay không chấp nhận địa chỉ IPv6 như ::1 hoặc ::ffff:127.0.0.1
   */
  static normalizeIpAddr(ipAddr: string): string {
    if (!ipAddr || ipAddr === '::1') return '127.0.0.1';
    if (ipAddr.startsWith('::ffff:')) return ipAddr.replace('::ffff:', '');
    return ipAddr;
  }

  static createPaymentUrl(
    orderId: string,
    amount: number,
    orderInfo: string,
    ipAddr: string
  ): string {
    const normalizedIp = this.normalizeIpAddr(ipAddr);
    const createDate = this.getCreateDate();

    console.log('--- VNPAY createDate debug ---');
    console.log('createDate:', createDate); // Phải là dạng 20260515180251
    console.log('normalizedIp:', normalizedIp);

    let vnp_Params: Record<string, unknown> = {
      vnp_Version: this.VNP_VERSION,
      vnp_Command: this.VNP_COMMAND,
      vnp_TmnCode: this.vnp_TmnCode,
      vnp_Locale: this.VNP_LOCALE,
      vnp_CurrCode: this.VNP_CURRENCY,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: 'billpayment',
      vnp_Amount: Math.round(amount * 100), // VNPay yêu cầu nhân 100
      vnp_ReturnUrl: this.vnp_ReturnUrl,
      vnp_IpAddr: normalizedIp,
      vnp_CreateDate: createDate,
    };

    vnp_Params = this.sortObject(vnp_Params);

    const signData = Object.keys(vnp_Params)
      .map((key) => `${key}=${encodeURIComponent(String(vnp_Params[key])).replace(/%20/g, '+')}`)
      .join('&');

    const secureHash = this.createHash(signData);

    // Build query string (không encode lại để giữ nguyên ký tự)
    const queryString =
      Object.keys(vnp_Params)
        .map((key) => `${key}=${encodeURIComponent(String(vnp_Params[key])).replace(/%20/g, '+')}`)
        .join('&') +
      `&vnp_SecureHash=${secureHash}`;

    return `${this.vnp_Url}?${queryString}`;
  }

  static verifyChecksum(vnp_Params: Record<string, string>): boolean {
    const secureHash = vnp_Params['vnp_SecureHash'];
    const params = { ...vnp_Params };
    delete params['vnp_SecureHash'];
    delete params['vnp_SecureHashType'];

    const sortedParams = this.sortObject(params) as Record<string, string>;
    const signData = Object.keys(sortedParams)
      .map((key) => `${key}=${encodeURIComponent(String(sortedParams[key])).replace(/%20/g, '+')}`)
      .join('&');

    const checksum = this.createHash(signData);
    return checksum === secureHash;
  }
}