import { Suspense } from "react";
import AuthTabs from "@/components/features/auth/AuthTabs";

export const metadata = {
  title: "Đăng nhập & Đăng ký — Book Sport",
  description: "Đăng nhập hoặc đăng ký tài khoản SportLink để đặt sân thể thao nhanh chóng và tiện lợi.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background-light text-slate-500 font-medium">Đang tải hệ thống xác thực...</div>}>
      <AuthTabs />
    </Suspense>
  );
}
