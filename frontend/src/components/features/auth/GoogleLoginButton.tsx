"use client";

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { apiPost } from '@/services/api';
import { useAuth, UserData } from '@/contexts/AuthContext';

export default function GoogleLoginButton() {
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("Không lấy được token từ Google");
      }

      // 1. Send Google ID Token to our backend
      const res = await apiPost<{ token: string; user: UserData }>('/auth/google', {
        idToken: credentialResponse.credential
      });

      // 2. Extract returned user & token
      if (res && res.token && res.user) {
        // 3. Login through AuthContext
        login(res.token, res.user);
        toast.success("Đăng nhập bằng Google thành công!");
      } else {
        toast.error("Đăng nhập thất bại: Không nhận được dữ liệu xác thực.");
      }
    } catch (error: unknown) {
      console.error("Google Login Error:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Đăng nhập thất bại");
      } else {
        toast.error("Đăng nhập thất bại");
      }
    }
  };

  const handleError = () => {
    toast.error("Đăng nhập bằng Google thất bại.");
  };

  return (
    <div className="flex justify-center w-full mt-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="outline"
        size="large"
        width={250}
        text="continue_with"
        shape="rectangular"
      />
    </div>
  );
}
