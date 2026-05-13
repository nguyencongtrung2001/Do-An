import type { CreateOwner } from "../types/owner.type.js";
export declare class AdminService {
    getAllUsers(): Promise<{
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
    }[]>;
    getUserById(id: string): Promise<{
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
    }>;
    toggleUserStatus(id: string): Promise<{
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
    }>;
    deleteUser(id: string): Promise<{
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
    }>;
    getPendingOwners(): Promise<{
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
    }[]>;
    approveOwner(id: string): Promise<{
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
    }>;
    createOwner(data: CreateOwner): Promise<{
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
    }>;
    getAllLocations(): Promise<({
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
    getPendingLocations(): Promise<({
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
    approveLocation(id: string): Promise<{
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
    rejectLocation(id: string): Promise<{
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
}
export declare const adminService: AdminService;
//# sourceMappingURL=admin.service.d.ts.map