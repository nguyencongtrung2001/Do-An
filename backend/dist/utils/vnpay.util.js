import crypto from 'crypto';
export class VNPayUtil {
    static VNP_VERSION = '2.1.0';
    static VNP_COMMAND = 'pay';
    static VNP_CURRENCY = 'VND';
    static VNP_LOCALE = 'vn';
    static get vnp_TmnCode() {
        const v = process.env.VNP_TMNCODE;
        if (!v)
            throw new Error('Thiếu VNP_TMNCODE trong .env');
        return v;
    }
    static get vnp_HashSecret() {
        const v = process.env.VNP_HASHSECRET;
        if (!v)
            throw new Error('Thiếu VNP_HASHSECRET trong .env');
        return v;
    }
    static get vnp_Url() {
        return process.env.VNP_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    }
    static get vnp_ReturnUrl() {
        const v = process.env.VNP_RETURNURL;
        if (!v)
            throw new Error('Thiếu VNP_RETURNURL trong .env');
        return v;
    }
    static sortObject(obj) {
        const sorted = {};
        const str = [];
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (let i = 0; i < str.length; i++) {
            const k = str[i];
            if (k === undefined)
                continue;
            sorted[k] = encodeURIComponent(String(obj[k])).replace(/%20/g, '+');
        }
        return sorted;
    }
    static hmac(data) {
        return crypto
            .createHmac('sha512', this.vnp_HashSecret)
            .update(Buffer.from(data, 'utf-8'))
            .digest('hex');
    }
    static getCreateDate() {
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
    static normalizeIp(ip) {
        if (!ip || ip === '::1')
            return '127.0.0.1';
        if (ip.startsWith('::ffff:'))
            return ip.slice(7);
        return ip;
    }
    static buildSignData(params) {
        return Object.keys(params)
            .map(k => `${k}=${params[k]}`)
            .join('&');
    }
    static createPaymentUrl(orderId, amount, orderInfo, ipAddr) {
        const createDate = this.getCreateDate();
        console.log('[VNPay] createDate:', createDate);
        console.log('[VNPay] amount (x100):', Math.round(amount * 100));
        console.log('[VNPay] returnUrl:', this.vnp_ReturnUrl);
        const rawParams = {
            vnp_Version: this.VNP_VERSION,
            vnp_Command: this.VNP_COMMAND,
            vnp_TmnCode: this.vnp_TmnCode,
            vnp_Locale: this.VNP_LOCALE,
            vnp_CurrCode: this.VNP_CURRENCY,
            vnp_TxnRef: orderId,
            vnp_OrderInfo: orderInfo,
            vnp_OrderType: 'billpayment',
            vnp_Amount: Math.round(amount * 100),
            vnp_ReturnUrl: this.vnp_ReturnUrl,
            vnp_IpAddr: this.normalizeIp(ipAddr),
            vnp_CreateDate: createDate,
        };
        const sorted = this.sortObject(rawParams);
        const signData = this.buildSignData(sorted);
        const secureHash = this.hmac(signData);
        console.log('[VNPay] signData:', signData);
        console.log('[VNPay] secureHash:', secureHash);
        const queryString = signData + '&vnp_SecureHash=' + secureHash;
        return `${this.vnp_Url}?${queryString}`;
    }
    static verifyChecksum(vnp_Params) {
        const secureHash = vnp_Params['vnp_SecureHash'];
        if (!secureHash)
            return false;
        const params = { ...vnp_Params };
        delete params['vnp_SecureHash'];
        delete params['vnp_SecureHashType'];
        const sorted = this.sortObject(params);
        const signData = this.buildSignData(sorted);
        const computed = this.hmac(signData);
        console.log('[VNPay verify] computed:', computed);
        console.log('[VNPay verify] received:', secureHash);
        console.log('[VNPay verify] match   :', computed === secureHash);
        return computed === secureHash;
    }
}
//# sourceMappingURL=vnpay.util.js.map