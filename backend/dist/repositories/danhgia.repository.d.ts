export declare class DanhGiaRepository {
    TimDatSanChiTiet(ma_dat_san_chi_tiet: string): Promise<({
        datsan: {
            ma_nguoi_dung: string | null;
            ngay_tao: Date | null;
            ma_dat_san: string;
            tong_tien: import("@prisma/client-runtime-utils").Decimal;
            phuong_thuc_thanh_toan: string;
        } | null;
    } & {
        ma_san: string | null;
        ma_dat_san_chi_tiet: string;
        ma_dat_san: string | null;
        ngay_dat: Date;
        gio_bat_dau: Date;
        gio_ket_thuc: Date;
        tien_coc: import("@prisma/client-runtime-utils").Decimal;
        tien_con_lai: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_dat: string;
    }) | null>;
    TimDanhGiaCuaNguoiDung(ma_nguoi_dung: string, ma_dat_san_chi_tiet: string): Promise<{
        ma_nguoi_dung: string | null;
        ma_dat_san_chi_tiet: string | null;
        ma_danh_gia: string;
        so_sao: number | null;
        ngay_danh_gia: Date | null;
    } | null>;
    CapNhatDanhGia(ma_danh_gia: string, so_sao: number): Promise<{
        ma_nguoi_dung: string | null;
        ma_dat_san_chi_tiet: string | null;
        ma_danh_gia: string;
        so_sao: number | null;
        ngay_danh_gia: Date | null;
    }>;
    TaoDanhGia(data: {
        ma_danh_gia: string;
        ma_nguoi_dung: string;
        ma_dat_san_chi_tiet: string;
        so_sao: number;
    }): Promise<{
        ma_nguoi_dung: string | null;
        ma_dat_san_chi_tiet: string | null;
        ma_danh_gia: string;
        so_sao: number | null;
        ngay_danh_gia: Date | null;
    }>;
    TimDanhGiaTheoDiaDiem(ma_dia_diem: string): Promise<{
        so_sao: number | null;
    }[]>;
    TimDanhGiaTheoSan(ma_san: string): Promise<{
        so_sao: number | null;
    }[]>;
}
export declare const danhgiaRepository: DanhGiaRepository;
//# sourceMappingURL=danhgia.repository.d.ts.map