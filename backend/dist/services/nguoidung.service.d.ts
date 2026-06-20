import type * as User from '../types/user.type.js';
export declare class UserService {
    DangKyNguoiDung(data: User.UserClient): Promise<{
        user: {
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
        };
        token: string;
    }>;
    DangNhapNguoiDung(data: User.LoginUserClient): Promise<{
        user: {
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
            }[];
        } & {
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
        };
        token: string;
    }>;
    LayThongTinCaNhan(userId: string): Promise<{
        ma_nguoi_dung: string;
        ho_ten: string;
        email: string;
        so_dien_thoai: string | null;
        vai_tro: string;
        anh_dai_dien: string | null;
        so_vi_du: import("@prisma/client-runtime-utils").Decimal;
        ngay_tao: Date | null;
        trang_thai: boolean | null;
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
        }[];
    }>;
    CapNhatAnhDaiDien(userId: string, avatarUrl: string, cloudinaryId: string): Promise<{
        ma_nguoi_dung: string;
        ho_ten: string;
        email: string;
        so_dien_thoai: string | null;
        vai_tro: string;
        anh_dai_dien: string | null;
        so_vi_du: import("@prisma/client-runtime-utils").Decimal;
        ngay_tao: Date | null;
    }>;
}
export declare const userService: UserService;
//# sourceMappingURL=nguoidung.service.d.ts.map