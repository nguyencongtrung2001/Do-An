import crypto from 'crypto';

export class VNPayUtil {
  private static readonly VNP_VERSION = '2.1.0';
  private static readonly VNP_COMMAND = 'pay';
  private static readonly VNP_CURRENCY = 'VND';
  private static readonly VNP_LOCALE = 'vn';

  static get vnp_TmnCode(): string {
    const tmnCode = process.env.VNP_TMNCODE;
    if (!tmnCode) {
      throw new Error('Thiếu cấu hình VNPAY trong .env (VNP_TMNCODE)');
    }
    return tmnCode;
  }

  static get vnp_HashSecret(): string {
    const hashSecret = process.env.VNP_HASHSECRET;
    if (!hashSecret) {
      throw new Error('Thiếu cấu hình VNPAY trong .env (VNP_HASHSECRET)');
    }
    return hashSecret;
  }

  static get vnp_Url(): string {
    return process.env.VNP_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  }

  static get vnp_ReturnUrl(): string {
    const returnUrl = process.env.VNP_RETURNURL;
    if (!returnUrl) {
      throw new Error('Thiếu cấu hình VNPAY trong .env (VNP_RETURNURL)');
    }
    return returnUrl;
  }

  private static sortObject(obj: any): any {
    const sorted: any = {};
    const keys = Object.keys(obj).sort();
    for (const key of keys) {
      sorted[key] = obj[key];
    }
    return sorted;
  }

  private static createHash(data: string): string {
    return crypto
      .createHmac('sha512', this.vnp_HashSecret)
      .update(data)
      .digest('hex');
  }

  static createPaymentUrl(
    orderId: string,
    amount: number,
    orderInfo: string,
    ipAddr: string
  ): string {
    const date = new Date();
    // GMT+7
    const createDate = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
      .format(date)
      .replace(/[^0-9]/g, '');

    let vnp_Params: any = {
      vnp_Version: this.VNP_VERSION,
      vnp_Command: this.VNP_COMMAND,
      vnp_TmnCode: this.vnp_TmnCode,
      vnp_Locale: this.VNP_LOCALE,
      vnp_CurrCode: this.VNP_CURRENCY,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: 'billpayment',
      vnp_Amount: Math.round(amount * 100), // Nhân 100
      vnp_ReturnUrl: this.vnp_ReturnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    vnp_Params = this.sortObject(vnp_Params);

    const signData = Object.keys(vnp_Params)
      .map((key) => `${key}=${vnp_Params[key]}`)
      .join('&');

    const secureHash = this.createHash(signData);

    vnp_Params['vnp_SecureHash'] = secureHash;

    const queryString = new URLSearchParams(vnp_Params).toString();

    return `${this.vnp_Url}?${queryString}`;
  }

  static verifyChecksum(vnp_Params: any): boolean {
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const sortedParams = this.sortObject(vnp_Params);
    const signData = Object.keys(sortedParams)
      .map((key) => `${key}=${sortedParams[key]}`)
      .join('&');

    const checksum = this.createHash(signData);

    // Bỏ qua chữ hoa/thường khi so sánh checksum nếu cần
    return checksum === secureHash;
  }
}
