export declare class LocationRepository {
    findByOwnerId(userId: string): Promise<({
        san: ({
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
    })[]>;
    findFirstByOwnerId(userId: string): Promise<{
        ma_nguoi_dung: string | null;
        ngay_tao: Date | null;
        ma_dia_diem: string;
        ten_dia_diem: string;
        dia_chi: string;
        mo_ta: string | null;
        kinh_do: import("@prisma/client-runtime-utils").Decimal;
        vi_do: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_duyet: boolean | null;
    } | null>;
    create(data: {
        ma_dia_diem: string;
        ten_dia_diem: string;
        dia_chi: string;
        kinh_do: number;
        vi_do: number;
        ma_nguoi_dung: string;
    }): Promise<{
        ma_nguoi_dung: string | null;
        ngay_tao: Date | null;
        ma_dia_diem: string;
        ten_dia_diem: string;
        dia_chi: string;
        mo_ta: string | null;
        kinh_do: import("@prisma/client-runtime-utils").Decimal;
        vi_do: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_duyet: boolean | null;
    }>;
    generateNextLocationId(): Promise<string>;
    findAll(): Promise<({
        nguoidung: {
            ma_nguoi_dung: string;
            email: string;
            so_dien_thoai: string | null;
            ho_ten: string;
            trang_thai: boolean | null;
        } | null;
        san: {
            ngay_tao: Date | null;
            ma_dia_diem: string | null;
            ma_san: string;
            ten_san: string;
            loai_the_thao: string;
            gia_thue_30p: import("@prisma/client-runtime-utils").Decimal;
            trang_thai_san: string;
        }[];
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
    })[]>;
    findPending(): Promise<({
        nguoidung: {
            ma_nguoi_dung: string;
            email: string;
            so_dien_thoai: string | null;
            ho_ten: string;
            trang_thai: boolean | null;
        } | null;
        san: {
            ngay_tao: Date | null;
            ma_dia_diem: string | null;
            ma_san: string;
            ten_san: string;
            loai_the_thao: string;
            gia_thue_30p: import("@prisma/client-runtime-utils").Decimal;
            trang_thai_san: string;
        }[];
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
    })[]>;
    approve(id: string): Promise<{
        ma_nguoi_dung: string | null;
        ngay_tao: Date | null;
        ma_dia_diem: string;
        ten_dia_diem: string;
        dia_chi: string;
        mo_ta: string | null;
        kinh_do: import("@prisma/client-runtime-utils").Decimal;
        vi_do: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_duyet: boolean | null;
    }>;
    reject(id: string): Promise<{
        ma_nguoi_dung: string | null;
        ngay_tao: Date | null;
        ma_dia_diem: string;
        ten_dia_diem: string;
        dia_chi: string;
        mo_ta: string | null;
        kinh_do: import("@prisma/client-runtime-utils").Decimal;
        vi_do: import("@prisma/client-runtime-utils").Decimal;
        trang_thai_duyet: boolean | null;
    }>;
    updateStatusByOwnerId(userId: string, status: boolean): Promise<import("../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
}
export declare const locationRepository: LocationRepository;
//# sourceMappingURL=location.repository.d.ts.map