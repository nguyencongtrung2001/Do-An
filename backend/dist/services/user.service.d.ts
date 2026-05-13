import type * as User from '../types/user.type.js';
export declare class UserService {
    createUser(data: User.UserClient): Promise<{
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
    loginUser(data: User.LoginUserClient): Promise<{
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
}
export declare const userService: UserService;
//# sourceMappingURL=user.service.d.ts.map