export declare class ThanhToanRepository {
    TimGiaoDichThanhCongTheoDatSan(ma_dat_san: string): Promise<{
        ma_nguoi_dung: string | null;
        ngay_tao: Date | null;
        ma_dat_san: string | null;
        ma_giao_dich: string;
        duong_dan_thanh_toan: string | null;
        so_tien_tt: import("@prisma/client-runtime-utils").Decimal;
        ma_tham_chieu: string | null;
        ma_gd_vnpay: string | null;
        ma_phan_hoi: string | null;
        ma_ngan_hang: string | null;
        thoi_gian_tt_vnpay: string | null;
        trang_thai_giao_dich: string;
        noi_dung_thanh_toan: string | null;
    } | null>;
    TaoGiaoDichThanhCong(data: {
        ma_dat_san: string;
        ma_nguoi_dung: string;
        ma_gd_vnpay: string;
        so_tien_tt: number;
        noi_dung_thanh_toan: string;
        ma_ngan_hang: string;
        ma_phan_hoi: string;
        thoi_gian_tt_vnpay: string;
    }): Promise<{
        ma_nguoi_dung: string | null;
        ngay_tao: Date | null;
        ma_dat_san: string | null;
        ma_giao_dich: string;
        duong_dan_thanh_toan: string | null;
        so_tien_tt: import("@prisma/client-runtime-utils").Decimal;
        ma_tham_chieu: string | null;
        ma_gd_vnpay: string | null;
        ma_phan_hoi: string | null;
        ma_ngan_hang: string | null;
        thoi_gian_tt_vnpay: string | null;
        trang_thai_giao_dich: string;
        noi_dung_thanh_toan: string | null;
    }>;
    CapNhatTrangThaiHuy(ma_dat_san: string): Promise<import("../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
}
export declare const thanhToanRepository: ThanhToanRepository;
//# sourceMappingURL=thanhtoan.repository.d.ts.map