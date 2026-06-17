export declare class GoogleAuthService {
    loginWithGoogle(idToken: string): Promise<{
        user: {
            ngay_tao: Date | null;
            ma_nguoi_dung: string;
            ho_ten: string;
            email: string;
            so_dien_thoai: string | null;
            mat_khau: string | null;
            ma_google: string | null;
            anh_dai_dien: string | null;
            anh_cloudinary: string | null;
            vai_tro: string;
            so_vi_du: import("@prisma/client-runtime-utils").Decimal;
            anh_cccd_truoc: string | null;
            anh_cccd_sau: string | null;
            trang_thai: boolean | null;
        };
        token: string;
    }>;
}
export declare const googleAuthService: GoogleAuthService;
//# sourceMappingURL=google-auth.service.d.ts.map