/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";
import type { UserData } from "@/types/auth.types";

type AuthTab = "login" | "signup";
type Role = "player" | "owner";

export default function AuthClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const initialTab = searchParams.get("tab") === "signup" ? "signup" : "login";

  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);
  const [role, setRole] = useState<Role>("player");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [loginContact, setLoginContact] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupLocationName, setSignupLocationName] = useState("");
  const [signupAddress, setSignupAddress] = useState("");
  const [cccdTruoc, setCccdTruoc] = useState<File | null>(null);
  const [cccdSau, setCccdSau] = useState<File | null>(null);
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Update URL internally if tab changes via click
  const switchTab = (tab: AuthTab) => {
    setActiveTab(tab);
    setErrorMsg(null);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab); // Will set ?tab=signup or ?tab=login
    
    // Use Next.js router to update URL instead of history API
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const data = await authService.loginUser({
        contact: loginContact,
        mat_khau: loginPassword,
      });
      
      login(data.token, data.user as UserData);
      
      // Navigate based on role
      if (data.user.vai_tro === "Chủ sân") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg(String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    
    if (signupPassword !== signupConfirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không khớp");
      return;
    }
    
    setLoading(true);
    try {
      let data;

      if (role === "owner") {
        data = await authService.registerOwner({
          ho_ten: signupName,
          email: signupEmail,
          so_dien_thoai: signupPhone,
          mat_khau: signupPassword,
          ten_dia_diem: signupLocationName,
          dia_chi: signupAddress,
          anh_cccd_truoc: cccdTruoc,
          anh_cccd_sau: cccdSau,
        });
      } else {
        data = await authService.registerUser({
          ho_ten: signupName,
          email: signupEmail,
          so_dien_thoai: signupPhone,
          mat_khau: signupPassword,
        });
      }
      
      login(data.token, data.user as UserData);
      if (role === "owner") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg(String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background-light font-display text-slate-900 antialiased overflow-x-hidden">

      {/* ========== LEFT PANE — Sports Background ========== */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAauiqdyNWVqjMU-Gkl5aqFLVfulhFpw0Hqha3VQhLjyid0gZJB6f0o-9T9uoScJMYUAUC97puxCjT9FeEFLFHfltL8BC6IPaNpllVu7PBjUnNTOqkC_S6L0KjIlQPqjI5r4NieQwCl1xA2jIcfW79nBwXX-y4AxZnX_3ajpINCy80E97a2zONBECkyFvSa28lnD3zxyPkc9iGaAz59dQwRUtr6Dl3DGLjRtvPH3wheVRoyK2va7IKvx47GxDXw168SjqQT9Jjt24kV")',
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-primary/30" />

        {/* Floating decorative dots */}
        <div className="floating-dot" style={{ top: "15%", left: "20%", animationDelay: "0s" }} />
        <div className="floating-dot" style={{ top: "45%", left: "60%", animationDelay: "1.5s" }} />
        <div className="floating-dot" style={{ top: "70%", left: "30%", animationDelay: "3s" }} />
        <div className="floating-dot" style={{ top: "25%", left: "75%", animationDelay: "0.8s" }} />
        <div className="floating-dot" style={{ top: "80%", left: "70%", animationDelay: "2.2s" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <button onClick={() => router.push("/")} className="flex items-center gap-3 w-fit">
            <span className="material-symbols-outlined text-primary text-3xl! font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <h1 className="text-white text-2xl font-bold tracking-tight">Book Sport</h1>
          </button>

          {/* Center text */}
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
            <div className="flex items-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span className="text-white/80 text-sm font-medium">1,200+ Sân</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  group
                </span>
                <span className="text-white/80 text-sm font-medium">50K+ Người dùng</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="text-white/80 text-sm font-medium">4.9 Rating</span>
              </div>
            </div>
          </div>

          {/* Bottom quote */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-lg">format_quote</span>
            </div>
            <p className="text-white/60 text-sm italic">&quot;Ứng dụng tuyệt vời, đặt sân cực nhanh!&quot; — Nguyễn Văn A</p>
          </div>
        </div>
      </div>

      {/* ========== RIGHT PANE — Auth Form ========== */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 lg:px-16 bg-white overflow-y-auto">
        <div className="w-full max-w-110 auth-fade-in">
          {/* Mobile logo (only shows on small screens) */}
          <button onClick={() => router.push("/")} className="lg:hidden flex items-center gap-3 mb-8 justify-center w-full">
            <span className="material-symbols-outlined text-primary text-3xl! font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <h1 className="text-slate-900 text-2xl font-bold tracking-tight">Book Sport</h1>
          </button>

          {/* Auth Tabs (Login / Sign Up) */}
          <div className="flex border-b border-gray-200 mb-8 relative">
            <button
              className={`flex-1 pb-3 text-center text-sm font-bold transition-colors duration-200 z-10 ${
                activeTab === "login" ? "text-primary border-b-2 border-primary" : "text-slate-400 hover:text-slate-600"
              }`}
              onClick={() => switchTab("login")}
            >
              Đăng nhập
            </button>
            <button
              className={`flex-1 pb-3 text-center text-sm font-bold transition-colors duration-200 z-10 ${
                activeTab === "signup" ? "text-primary border-b-2 border-primary" : "text-slate-400 hover:text-slate-600"
              }`}
              onClick={() => switchTab("signup")}
            >
              Đăng ký
            </button>
          </div>

          {/* Role Selector (always visible but primarily used for Signup, so we can hide or dim it if on login tab) */}
          <div className={`flex bg-gray-100 rounded-full p-1 mb-8 transition-opacity duration-300 ${activeTab === 'login' ? 'opacity-0 h-0 w-0 mb-0 overflow-hidden' : 'opacity-100'}`}>
            <button
              onClick={() => setRole("player")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                role === "player" ? "bg-primary text-white shadow-[0_4px_14px_rgba(236,19,19,0.35)]" : "text-slate-500"
              }`}
            >
              <span className="material-symbols-outlined text-lg">sports_soccer</span>
              Tôi là Người chơi
            </button>
            <button
              onClick={() => setRole("owner")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                role === "owner" ? "bg-primary text-white shadow-[0_4px_14px_rgba(236,19,19,0.35)]" : "text-slate-500"
              }`}
            >
              <span className="material-symbols-outlined text-lg">stadium</span>
              Tôi là Chủ sân
            </button>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
              {errorMsg}
            </div>
          )}

          {/* ===== LOGIN FORM ===== */}
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5 auth-fade-in">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Email hoặc Số điện thoại</label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
                  <span className="material-symbols-outlined text-slate-400 text-xl">mail</span>
                  <input
                    className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                    type="text"
                    placeholder="email@example.com"
                    required
                    value={loginContact}
                    onChange={(e) => setLoginContact(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Mật khẩu</label>
                  <a href="#" className="text-primary text-xs font-semibold hover:underline">
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
                  <span className="material-symbols-outlined text-slate-400 text-xl">lock</span>
                  <input
                    className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="material-symbols-outlined text-slate-400 text-lg hover:text-slate-600 focus:outline-none"
                  >
                    {showLoginPassword ? "visibility" : "visibility_off"}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember-me" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <label htmlFor="remember-me" className="text-sm text-slate-500 cursor-pointer">
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl h-12 bg-primary hover:bg-red-600 text-white text-sm font-bold transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Đang xử lý..." : "Đăng nhập"}</span>
                {!loading && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
              </button>

              {/* Social Divider */}
              <div className="flex items-center gap-4 my-1">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Hoặc tiếp tục với</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Social Login */}
              <div className="flex gap-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:bg-gray-50 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                  Google
                </button>
              </div>

              <p className="text-center text-sm text-slate-400 mt-2">
                Chưa có tài khoản?{" "}
                <button type="button" onClick={() => switchTab("signup")} className="text-primary font-semibold hover:underline">
                  Đăng ký ngay
                </button>
              </p>
            </form>
          )}

          {/* ===== SIGN UP FORM ===== */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignupSubmit} className="flex flex-col gap-5 auth-fade-in">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Họ và tên</label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
                  <span className="material-symbols-outlined text-slate-400 text-xl">person</span>
                  <input
                    className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                  />
                </div>
              </div>

              {/* Owner Specific Fields */}
              {role === "owner" && (
                <div className="flex flex-col gap-4 auth-fade-in">
                  {/* Location Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Tên địa điểm / Cơ sở</label>
                    <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
                      <span className="material-symbols-outlined text-slate-400 text-xl">stadium</span>
                      <input
                        className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                        type="text"
                        placeholder="Ví dụ: Sân bóng ABC"
                        required
                        value={signupLocationName}
                        onChange={(e) => setSignupLocationName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Địa chỉ</label>
                    <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
                      <span className="material-symbols-outlined text-slate-400 text-xl">location_on</span>
                      <input
                        className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                        type="text"
                        placeholder="Số nhà, Đường, Quận, Thành phố..."
                        required
                        value={signupAddress}
                        onChange={(e) => setSignupAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* CCCD Front */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Ảnh CCCD Mặt Trước</label>
                    <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
                      <span className="material-symbols-outlined text-slate-400 text-xl">badge</span>
                      <input
                        className="flex-1 bg-transparent outline-none text-sm text-slate-900 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => setCccdTruoc(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                  
                  {/* CCCD Back */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Ảnh CCCD Mặt Sau</label>
                    <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
                      <span className="material-symbols-outlined text-slate-400 text-xl">badge</span>
                      <input
                        className="flex-1 bg-transparent outline-none text-sm text-slate-900 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => setCccdSau(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Email</label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
                  <span className="material-symbols-outlined text-slate-400 text-xl">mail</span>
                  <input
                    className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Số điện thoại</label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
                  <span className="material-symbols-outlined text-slate-400 text-xl">call</span>
                  <input
                    className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                    type="tel"
                    placeholder="0987654321"
                    required
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Mật khẩu</label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
                  <span className="material-symbols-outlined text-slate-400 text-xl">lock</span>
                  <input
                    className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="Tối thiểu 8 ký tự"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="material-symbols-outlined text-slate-400 text-lg hover:text-slate-600 focus:outline-none"
                  >
                    {showSignupPassword ? "visibility" : "visibility_off"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Xác nhận mật khẩu</label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
                  <span className="material-symbols-outlined text-slate-400 text-xl">lock</span>
                  <input
                    className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    required
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="material-symbols-outlined text-slate-400 text-lg hover:text-slate-600 focus:outline-none"
                  >
                    {showConfirmPassword ? "visibility" : "visibility_off"}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="agree-terms" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" required />
                <label htmlFor="agree-terms" className="text-sm text-slate-500 cursor-pointer leading-snug">
                  Tôi đồng ý với <a href="#" className="text-primary font-semibold hover:underline">Điều khoản dịch vụ</a> và{" "}
                  <a href="#" className="text-primary font-semibold hover:underline">Chính sách bảo mật</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl h-12 bg-primary hover:bg-red-600 text-white text-sm font-bold transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Đang xử lý..." : "Tạo tài khoản"}</span>
                {!loading && <span className="material-symbols-outlined text-lg">how_to_reg</span>}
              </button>

              {/* Social Divider */}
              <div className="flex items-center gap-4 my-1">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Hoặc đăng ký với</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Social Login */}
              <div className="flex gap-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:bg-gray-50 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                  Google
                </button>
              </div>

              <p className="text-center text-sm text-slate-400 mt-2">
                Đã có tài khoản?{" "}
                <button type="button" onClick={() => switchTab("login")} className="text-primary font-semibold hover:underline">
                  Đăng nhập
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
