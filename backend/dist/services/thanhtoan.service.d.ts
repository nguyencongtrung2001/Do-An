export declare class ThanhToanService {
    TaoUrlThanhToanVNPay(ma_dat_san: string, amount: number, orderInfo: string, ipAddr: string): string;
    XuLyCallbackVNPay(vnp_Params: Record<string, string>): Promise<{
        success: boolean;
        message: string;
        status: string;
    } | {
        success: boolean;
        status: string;
        message?: undefined;
    }>;
    XuLyThongBaoVNPay(vnp_Params: Record<string, string>): Promise<{
        RspCode: string;
        Message: string;
    }>;
}
export declare const thanhToanService: ThanhToanService;
//# sourceMappingURL=thanhtoan.service.d.ts.map