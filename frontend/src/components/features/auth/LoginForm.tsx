"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";
import { UserData } from "@/types/auth.types";
import GoogleLoginButton from "./GoogleLoginButton";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onError: (msg: string | null) => void;
}

export default function LoginForm({ onSwitchToRegister, onError }: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();
  
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onError(null);
    setLoading(true);

    try {
      const data = await authService.loginUser({
        contact,
        mat_khau: password,
      });
      
      login(data.token, data.user as UserData);
      
      // Navigate based on role
      if (data.user.vai_tro === "Quản trị viên") {
        router.push("/overview");
      } else if (data.user.vai_tro === "Chủ sân") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        onError(error.message);
      } else {
        onError("Đăng nhập thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 auth-fade-in">
      <div className="flex flex-col gap-1.5">
        <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Email hoặc Số điện thoại</label>
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
          <span className="material-symbols-outlined text-slate-400 text-xl">mail</span>
          <input
            className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
            type="text"
            placeholder="email@example.com"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
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
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="material-symbols-outlined text-slate-400 text-lg hover:text-slate-600 focus:outline-none"
          >
            {showPassword ? "visibility" : "visibility_off"}
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

      <div className="flex gap-3 mt-1">
        <GoogleLoginButton />
      </div>

      <p className="text-center text-sm text-slate-400 mt-2">
        Chưa có tài khoản?{" "}
        <button type="button" onClick={onSwitchToRegister} className="text-primary font-semibold hover:underline">
          Đăng ký ngay
        </button>
      </p>
    </form>
  );
}
