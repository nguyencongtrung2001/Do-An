"use client";

import { GoogleLogin, CredentialResponse, GoogleOAuthProvider } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { apiPost } from '@/services/api';
import { useAuth, UserData } from '@/contexts/AuthContext';

export default function GoogleLoginButton() {
  const { login } = useAuth();

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  console.log("🔑 Google Client ID:", googleClientId ? "✅ Loaded" : "❌ Undefined");

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("Không lấy được token từ Google");
      }

      const res = await apiPost<{ token: string; user: UserData }>('/auth/google', {
        idToken: credentialResponse.credential
      });

      if (res?.token && res?.user) {
        login(res.token, res.user);
        toast.success("Đăng nhập Google thành công!");
      } else {
        toast.error("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập Google thất bại");
    }
  };

  const handleError = () => {
    toast.error("Đăng nhập Google thất bại");
  };

  if (!googleClientId) {
    return <div className="text-red-500 text-center p-4">❌ Chưa cấu hình NEXT_PUBLIC_GOOGLE_CLIENT_ID</div>;
  }

  return (
    <div className="flex justify-center w-full mt-4">
      <GoogleOAuthProvider clientId={googleClientId}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          theme="outline"
          size="large"
          width={280}
          text="continue_with"
          shape="rectangular"
          logo_alignment="left"
        />
      </GoogleOAuthProvider>
    </div>
  );
}