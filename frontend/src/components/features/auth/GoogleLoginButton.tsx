"use client";

import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import toast from "react-hot-toast";
import { apiPost } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import type { UserData } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

// Kiểu dữ liệu trả về từ backend /auth/google
interface GoogleAuthResponse {
  success: boolean;
  data?: {
    token: string;
    user: UserData;
  };
  // Một số backend trả thẳng token/user ở root (không lồng trong data)
  token?: string;
  user?: UserData;
}

export default function GoogleLoginButton() {
  const { login } = useAuth();
  const router = useRouter();

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("Không lấy được token từ Google");
      }

      const res = await apiPost<GoogleAuthResponse>("/auth/google", {
        idToken: credentialResponse.credential,
      });

      // Hỗ trợ cả 2 cấu trúc response: { data: { token, user } } hoặc { token, user }
      const token = res?.data?.token ?? res?.token;
      const user = res?.data?.user ?? res?.user;

      if (token && user) {
        login(token, user);
        toast.success("Đăng nhập Google thành công!");

        if (user.vai_tro === "Quản trị viên") {
          router.push("/overview");
        } else if (user.vai_tro === "Chủ sân") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      } else {
        toast.error("Đăng nhập thất bại – không nhận được dữ liệu người dùng");
      }
    } catch (error: unknown) {
      console.error("Google login error:", error);
      const msg =
        error instanceof Error ? error.message : "Đăng nhập Google thất bại";
      toast.error(msg);
    }
  };

  const handleError = () => {
    toast.error(
      "Không thể đăng nhập bằng Google. Hãy kiểm tra cấu hình OAuth Console."
    );
  };

  if (!googleClientId) {
    return (
      <p className="text-xs text-red-500 text-center py-2">
        ❌ Chưa cấu hình NEXT_PUBLIC_GOOGLE_CLIENT_ID
      </p>
    );
  }

  return (
    <div className="flex justify-center w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="outline"
        size="large"
        width={280}
        text="continue_with"
        shape="rectangular"
        logo_alignment="left"
        use_fedcm_for_prompt={false}
      />
    </div>
  );
}