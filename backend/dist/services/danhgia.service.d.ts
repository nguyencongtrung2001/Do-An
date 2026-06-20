export declare const ratingService: {
    TaoDanhGia(data: {
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
    LayDiemDanhGiaDiaDiem(ma_dia_diem: string): Promise<{
        average: number;
        count: number;
    }>;
    LayDiemDanhGiaSan(ma_san: string): Promise<{
        average: number;
        count: number;
    }>;
    LayDanhGiaCuaToi(ma_nguoi_dung: string, ma_dat_san_chi_tiet: string): Promise<{
        ma_nguoi_dung: string | null;
        ma_dat_san_chi_tiet: string | null;
        ma_danh_gia: string;
        so_sao: number | null;
        ngay_danh_gia: Date | null;
    } | null>;
};
//# sourceMappingURL=danhgia.service.d.ts.map