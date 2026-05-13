"use client";

import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { apiPost } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

export default function GoogleLoginButton() {
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      // 1. Send Google ID Token to our backend
      const res = await apiPost<any>('/auth/google', {
        idToken: credentialResponse.credential
      });

      // 2. Extract returned user & token
      if (res && res.data && res.data.token && res.data.user) {
        // 3. Login through AuthContext
        login(res.data.token, res.data.user);
        toast.success("Đăng nhập bằng Google thành công!");
      } else {
        toast.error("Đăng nhập thất bại: Không nhận được dữ liệu xác thực.");
      }
    } catch (error: any) {
      toast.error(error.message || "Lỗi khi đăng nhập bằng Google");
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
        width="100%"
        text="continue_with"
        shape="rectangular"
      />
    </div>
  );
}
