import { Suspense } from "react";
import AuthClient from "@/components/auth/AuthClient";

export const metadata = {
  title: "Đăng nhập & Đăng ký — Book Sport",
  description: "Đăng nhập hoặc đăng ký tài khoản SportLink để đặt sân thể thao nhanh chóng và tiện lợi.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background-light">Đang tải...</div>}>
      <AuthClient />
    </Suspense>
  );
}
