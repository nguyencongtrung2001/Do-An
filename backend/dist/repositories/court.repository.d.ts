export declare class CourtRepository {
    findByLocationId(locationId: string): Promise<{
        ngay_tao: Date | null;
        ma_dia_diem: string | null;
        ma_san: string;
        ten_san: string;
        loai_the_thao: string;
        gia_thue_30p: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_san: string;
    }[]>;
    findByIdAndOwnerId(courtId: string, userId: string): Promise<{
        ngay_tao: Date | null;
        ma_dia_diem: string | null;
        ma_san: string;
        ten_san: string;
        loai_the_thao: string;
        gia_thue_30p: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_san: string;
    } | null>;
    findById(courtId: string): Promise<{
        ngay_tao: Date | null;
        ma_dia_diem: string | null;
        ma_san: string;
        ten_san: string;
        loai_the_thao: string;
        gia_thue_30p: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_san: string;
    } | null>;
    findImagesByCourtId(courtId: string): Promise<{
        ngay_tao: Date | null;
        ma_san: string | null;
        ma_anh_san: string;
        duong_dan_anh: string;
        ma_cloudinary: string;
    }[]>;
    deleteImagesByCourtId(courtId: string): Promise<import("../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
    create(data: {
        ma_san: string;
        ma_dia_diem: string;
        ten_san: string;
        loai_the_thao: string;
        gia_thue_30p: number;
        trang_thai_san?: string;
    }): Promise<{
        ngay_tao: Date | null;
        ma_dia_diem: string | null;
        ma_san: string;
        ten_san: string;
        loai_the_thao: string;
        gia_thue_30p: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_san: string;
    }>;
    update(courtId: string, data: {
        ten_san?: string;
        loai_the_thao?: string;
        gia_thue_30p?: number;
        trang_thai_san?: string;
    }): Promise<{
        ngay_tao: Date | null;
        ma_dia_diem: string | null;
        ma_san: string;
        ten_san: string;
        loai_the_thao: string;
        gia_thue_30p: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_san: string;
    }>;
    createCourtImages(images: {
        ma_anh_san: string;
        ma_san: string;
        duong_dan_anh: string;
        ma_cloudinary: string;
    }[]): Promise<import("../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
    findAllWithDetails(): Promise<({
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
        datsanchitiet: ({
            danhgia: {
                ma_nguoi_dung: string | null;
                ma_dat_san_chi_tiet: string | null;
                ma_danh_gia: string;
                so_sao: number | null;
                ngay_danh_gia: Date | null;
            }[];
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
        ngay_tao: Date | null;
        ma_dia_diem: string | null;
        ma_san: string;
        ten_san: string;
        loai_the_thao: string;
        gia_thue_30p: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_san: string;
    })[]>;
    generateNextCourtId(): Promise<string>;
    generateNextImageId(): Promise<string>;
    findLocationBySlug(slug: string): Promise<({
        nguoidung: {
            so_dien_thoai: string | null;
            anh_dai_dien: string | null;
        } | null;
        san: ({
            anhsan: {
                ngay_tao: Date | null;
                ma_san: string | null;
                ma_anh_san: string;
                duong_dan_anh: string;
                ma_cloudinary: string;
            }[];
            datsanchitiet: ({
                danhgia: {
                    ma_nguoi_dung: string | null;
                    ma_dat_san_chi_tiet: string | null;
                    ma_danh_gia: string;
                    so_sao: number | null;
                    ngay_danh_gia: Date | null;
                }[];
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
            ngay_tao: Date | null;
            ma_dia_diem: string | null;
            ma_san: string;
            ten_san: string;
            loai_the_thao: string;
            gia_thue_30p: import("@prisma/client-runtime-utils").Decimal;
            trang_thai_san: string;
        })[];
    } & {
        ma_nguoi_dung: string | null;
        ngay_tao: Date | null;
        ma_dia_diem: string;
        ten_dia_diem: string;
        dia_chi: string;
        mo_ta: string | null;
        kinh_do: import("@prisma/client-runtime-utils").Decimal;
        vi_do: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_duyet: boolean | null;
    }) | null>;
}
export declare const courtRepository: CourtRepository;
//# sourceMappingURL=court.repository.d.ts.map