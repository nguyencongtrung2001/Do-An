import type { CreateOwner } from "../types/owner.type.js";
export declare class AdminService {
    LayTatCaNguoiDung(): Promise<{
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
    LayNguoiDungTheoId(id: string): Promise<{
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
    DoiTrangThaiNguoiDung(id: string): Promise<{
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
    XoaNguoiDung(id: string): Promise<{
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
    LayChuSanChoDuyet(): Promise<{
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
    DuyetChuSan(id: string): Promise<{
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
    TaoChuSan(data: CreateOwner): Promise<{
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
    LayTatCaDiaDiem(): Promise<({
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
    LayDiaDiemChoDuyet(): Promise<({
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
    DuyetDiaDiem(id: string): Promise<{
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
    TuChoiDiaDiem(id: string, mo_ta?: string): Promise<{
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
//# sourceMappingURL=quantrivien.service.d.ts.map