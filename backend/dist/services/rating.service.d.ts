export declare const ratingService: {
    /**
     * Tạo một đánh giá mới
     */
    createRating(data: {
        ma_nguoi_dung: string;
        ma_dat_san_chi_tiet: string;
        so_sao: number;
    }): Promise<{
        ma_danh_gia: string;
        ma_nguoi_dung: string | null;
        ma_dat_san_chi_tiet: string | null;
        so_sao: number | null;
        ngay_danh_gia: Date | null;
    }>;
    /**
     * Lấy điểm đánh giá trung bình của một địa điểm (dựa trên tất cả các sân thuộc địa điểm đó)
     */
    getAverageRatingForLocation(ma_dia_diem: string): Promise<{
        average: number;
        count: number;
    }>;
    /**
     * Lấy điểm đánh giá trung bình của một sân cụ thể
     */
    getAverageRatingForCourt(ma_san: string): Promise<{
        average: number;
        count: number;
    }>;
    /**
     * Lấy đánh giá của một người dùng cho một chi tiết đặt sân
     */
    getRatingByUserAndBooking(ma_nguoi_dung: string, ma_dat_san_chi_tiet: string): Promise<{
        ma_danh_gia: string;
        ma_nguoi_dung: string | null;
        ma_dat_san_chi_tiet: string | null;
        so_sao: number | null;
        ngay_danh_gia: Date | null;
    } | null>;
};
//# sourceMappingURL=rating.service.d.ts.map