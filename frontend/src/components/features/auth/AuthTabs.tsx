"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AuthTab, Role } from "@/types/auth.types";

// Sub-components
import RoleSelector from "./RoleSelector";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const initialTab = (searchParams.get("tab") === "register" ? "register" : "login") as AuthTab;

  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);
const [role, setRole] = useState<Role>(Role.CUSTOMER);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const switchTab = (tab: AuthTab) => {
    setActiveTab(tab);
    setErrorMsg(null);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex min-h-screen w-full bg-background-light font-display text-slate-900 antialiased overflow-x-hidden">
      
      {/* ========== LEFT PANE — Decorative ========== */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAauiqdyNWVqjMU-Gkl5aqFLVfulhFpw0Hqha3VQhLjyid0gZJB6f0o-9T9uoScJMYUAUC97puxCjT9FeEFLFHfltL8BC6IPaNpllVu7PBjUnNTOqkC_S6L0KjIlQPqjI5r4NieQwCl1xA2jIcfW79nBwXX-y4AxZnX_3ajpINCy80E97a2zONBECkyFvSa28lnD3zxyPkc9iGaAz59dQwRUtr6Dl3DGLjRtvPH3wheVRoyK2va7IKvx47GxDXw168SjqQT9Jjt24kV")',
          }}
        />
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-primary/30" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <button onClick={() => router.push("/")} className="flex items-center gap-3 w-fit transition-transform hover:scale-105 active:scale-95">
            <span className="material-symbols-outlined text-primary text-3xl! font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <h1 className="text-white text-2xl font-bold tracking-tight">Book Sport</h1>
          </button>

          <div className="flex flex-col gap-6 max-w-md auth-slide-up">
            <h2 className="text-white text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              Kết nối với
              <br />
              <span className="text-primary">sân thể thao</span>
              <br />
              yêu thích của bạn.
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Đặt sân dễ dàng trong 30 giây. Hàng nghìn sân bóng đá, cầu lông, tennis và nhiều hơn nữa đang chờ bạn.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">format_quote</span>
            </div>
            <p className="text-white/60 text-sm italic">&quot;Ứng dụng tuyệt vời, đặt sân cực nhanh!&quot; — Nguyễn Văn A</p>
          </div>
        </div>
      </div>

      {/* ========== RIGHT PANE — Auth Forms ========== */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 lg:px-16 bg-white overflow-y-auto">
        <div className="w-full max-w-110 auth-fade-in">
          {/* Mobile logo */}
          <button onClick={() => router.push("/")} className="lg:hidden flex items-center gap-3 mb-8 justify-center w-full">
            <span className="material-symbols-outlined text-primary text-3xl! font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <h1 className="text-slate-900 text-2xl font-bold tracking-tight">Book Sport</h1>
          </button>

          {/* Auth Tabs */}
          <div className="flex border-b border-gray-200 mb-8 relative">
            <button
              className={`flex-1 pb-3 text-center text-sm font-bold transition-colors duration-200 ${
                activeTab === "login" ? "text-primary border-b-2 border-primary" : "text-slate-400 hover:text-slate-600"
              }`}
              onClick={() => switchTab("login")}
            >
              Đăng nhập
            </button>
            <button
              className={`flex-1 pb-3 text-center text-sm font-bold transition-colors duration-200 ${
                activeTab === "register" ? "text-primary border-b-2 border-primary" : "text-slate-400 hover:text-slate-600"
              }`}
              onClick={() => switchTab("register")}
            >
              Đăng ký
            </button>
          </div>

          {/* Role Selector (only for signup) */}
          <RoleSelector 
            role={role} 
            setRole={setRole} 
            isVisible={activeTab === "register"} 
          />

          {errorMsg && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-1">
              {errorMsg}
            </div>
          )}

          {activeTab === "login" ? (
            <LoginForm 
              onSwitchToRegister={() => switchTab("register")} 
              onError={setErrorMsg} 
            />
          ) : (
            <SignupForm 
              role={role} 
              onSwitchToLogin={() => switchTab("login")} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
