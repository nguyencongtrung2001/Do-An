interface RawSlot {
    ma_san: string;
    ngay_dat: string;
    gio_bat_dau: string;
    gio_ket_thuc: string;
    gia_thue: number;
}
export declare class BookingService {
    createBooking(data: {
        ma_nguoi_dung: string;
        phuong_thuc_thanh_toan: string;
        selectedSlots: RawSlot[];
    }): Promise<{
        ma_nguoi_dung: string | null;
        ngay_tao: Date | null;
        ma_dat_san: string;
        tong_tien: import("@prisma/client-runtime-utils").Decimal;
        phuong_thuc_thanh_toan: string;
    }>;
    getUserBookings(userId: string): Promise<({
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
export declare const bookingService: BookingService;
export {};
//# sourceMappingURL=booking.service.d.ts.map