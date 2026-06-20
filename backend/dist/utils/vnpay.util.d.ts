export declare class VNPayUtil {
    private static readonly VNP_VERSION;
    private static readonly VNP_COMMAND;
    private static readonly VNP_CURRENCY;
    private static readonly VNP_LOCALE;
    static get vnp_TmnCode(): string;
    static get vnp_HashSecret(): string;
    static get vnp_Url(): string;
    static get vnp_ReturnUrl(): string;
    private static sortObject;
    private static hmac;
    private static getCreateDate;
    static normalizeIp(ip: string): string;
    private static buildSignData;
    static createPaymentUrl(orderId: string, amount: number, orderInfo: string, ipAddr: string): string;
    static verifyChecksum(vnp_Params: Record<string, string>): boolean;
}
//# sourceMappingURL=vnpay.util.d.ts.map