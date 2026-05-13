export declare class BookingRepository {
    findByOwnerId(userId: string): Promise<({
        datsan: ({
            nguoidung: {
                ma_nguoi_dung: string;
                email: string;
                so_dien_thoai: string | null;
                ma_google: string | null;
                ho_ten: string;
                mat_khau: string | null;
                anh_dai_dien: string | null;
                anh_cloudinary: string | null;
                vai_tro: string;
                so_vi_du: import("@prisma/client-runtime-utils").Decimal;
                anh_cccd_truoc: string | null;
                anh_cccd_sau: string | null;
                trang_thai: boolean | null;
                ngay_tao: Date | null;
            } | null;
        } & {
            ma_nguoi_dung: string | null;
            ngay_tao: Date | null;
            ma_dat_san: string;
            tong_tien: import("@prisma/client-runtime-utils").Decimal;
            phuong_thuc_thanh_toan: string;
        }) | null;
        san: {
            ngay_tao: Date | null;
            ma_dia_diem: string | null;
            ma_san: string;
            ten_san: string;
            loai_the_thao: string;
            gia_thue_30p: import("@prisma/client-runtime-utils").Decimal;
            trang_thai_san: string;
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
    })[]>;
    findByIdAndOwnerId(bookingDetailId: string, userId: string): Promise<{
        ma_san: string | null;
        ma_dat_san_chi_tiet: string;
        ma_dat_san: string | null;
        ngay_dat: Date;
        gio_bat_dau: Date;
        gio_ket_thuc: Date;
        tien_coc: import("@prisma/client-runtime-utils").Decimal;
        tien_con_lai: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_dat: string;
    } | null>;
    updateStatus(bookingDetailId: string, status: string): Promise<{
        ma_san: string | null;
        ma_dat_san_chi_tiet: string;
        ma_dat_san: string | null;
        ngay_dat: Date;
        gio_bat_dau: Date;
        gio_ket_thuc: Date;
        tien_coc: import("@prisma/client-runtime-utils").Decimal;
        tien_con_lai: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_dat: string;
    }>;
    countPendingByOwnerId(userId: string): Promise<number>;
    checkSlotsAvailability(slots: {
        ma_san: string;
        ngay_dat: Date;
        gio_bat_dau: Date;
        gio_ket_thuc: Date;
    }[]): Promise<{
        ma_san: string | null;
        ma_dat_san_chi_tiet: string;
        ma_dat_san: string | null;
        ngay_dat: Date;
        gio_bat_dau: Date;
        gio_ket_thuc: Date;
        tien_coc: import("@prisma/client-runtime-utils").Decimal;
        tien_con_lai: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_dat: string;
    }[]>;
    createBooking(bookingData: any, detailsData: any[], walletDeduction?: {
        userId: string;
        amount: number;
    }): Promise<{
        ma_nguoi_dung: string | null;
        ngay_tao: Date | null;
        ma_dat_san: string;
        tong_tien: import("@prisma/client-runtime-utils").Decimal;
        phuong_thuc_thanh_toan: string;
    }>;
    findByUserId(userId: string): Promise<({
        datsanchitiet: ({
            san: ({
                diadiem: {
                    ma_nguoi_dung: string | null;
                    ngay_tao: Date | null;
                    ma_dia_diem: string;
                    ten_dia_diem: string;
                    dia_chi: string;
                    mo_ta: string | null;
                    kinh_do: import("@prisma/client-runtime-utils").Decimal;
                    vi_do: import("@prisma/client-runtime-utils").Decimal;
                    trang_thai_duyet: boolean | null;
                } | null;
                anhsan: {
                    ngay_tao: Date | null;
                    ma_san: string | null;
                    ma_anh_san: string;
                    duong_dan_anh: string;
                    ma_cloudinary: string;
                }[];
            } & {
                ngay_tao: Date | null;
                ma_dia_diem: string | null;
                ma_san: string;
                ten_san: string;
                loai_the_thao: string;
                gia_thue_30p: import("@prisma/client-runtime-utils").Decimal;
                trang_thai_san: string;
            }) | null;
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
        })[];
    } & {
        ma_nguoi_dung: string | null;
        ngay_tao: Date | null;
        ma_dat_san: string;
        tong_tien: import("@prisma/client-runtime-utils").Decimal;
        phuong_thuc_thanh_toan: string;
    })[]>;
}
export declare const bookingRepository: BookingRepository;
//# sourceMappingURL=booking.repository.d.ts.map