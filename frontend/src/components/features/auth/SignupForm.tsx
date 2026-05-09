"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSignup } from "@/hooks/useSignup";
import { Role } from "@/types/auth.types";

const VenueMapSelector = dynamic(
  () => import("@/components/map/VenueMapSelector"),
  { ssr: false }
);

interface SignupFormProps {
  role: Role;
  onSwitchToLogin: () => void;
}

export default function SignupForm({ role, onSwitchToLogin }: SignupFormProps) {
  const { state, actions } = useSignup(role);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={actions.handleSubmit} className="flex flex-col gap-5 auth-fade-in">
      {state.errorMsg && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
          {state.errorMsg}
        </div>
      )}

      {/* Common Fields */}
      <div className="flex flex-col gap-1.5">
        <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Họ và tên</label>
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
          <span className="material-symbols-outlined text-slate-400 text-xl">person</span>
          <input
            className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
            type="text"
            placeholder="Nguyễn Văn A"
            required
            value={state.name}
            onChange={(e) => state.setName(e.target.value)}
          />
        </div>
      </div>

      {/* Owner Specific Fields */}
      {role === Role.OWNER && (
        <div className="flex flex-col gap-4 auth-fade-in">
          {/* Avatar Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Ảnh đại diện</label>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                {state.avatarPreview ? (
                  <Image src={state.avatarPreview} alt="Avatar preview" fill className="object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-3xl text-slate-300">person</span>
                )}
              </div>
              <div className="flex-1">
                <input
                  className="bg-transparent outline-none text-sm text-slate-900 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  type="file"
                  accept="image/*"
                  onChange={(e) => actions.handleAvatarChange(e.target.files?.[0] || null)}
                />
                <p className="text-xs text-slate-400 mt-1">JPG, PNG tối đa 5MB</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Tên địa điểm / Cơ sở</label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
              <span className="material-symbols-outlined text-slate-400 text-xl">stadium</span>
              <input
                className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                type="text"
                placeholder="Ví dụ: Sân bóng ABC"
                required
                value={state.locationName}
                onChange={(e) => state.setLocationName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Địa chỉ</label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
              <span className="material-symbols-outlined text-slate-400 text-xl">location_on</span>
              <input
                className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                type="text"
                placeholder="Số nhà, Đường, Quận, Thành phố..."
                required
                value={state.address}
                onChange={(e) => state.setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Map Selector */}
          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Vị trí trên bản đồ</label>
            <VenueMapSelector
              onLocationSelect={(lat, lng) => {
                state.setViDo(lat);
                state.setKinhDo(lng);
              }}
            />
            {(!state.kinhDo || !state.viDo) && (
              <p className="text-xs text-red-500 mt-1">Vui lòng chọn vị trí trên bản đồ.</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">CCCD Mặt Trước</label>
              <input
                className="text-xs file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary cursor-pointer"
                type="file"
                accept="image/*"
                required
                onChange={(e) => state.setCccdTruoc(e.target.files?.[0] || null)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">CCCD Mặt Sau</label>
              <input
                className="text-xs file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary cursor-pointer"
                type="file"
                accept="image/*"
                required
                onChange={(e) => state.setCccdSau(e.target.files?.[0] || null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Common Contact Fields */}
      <div className="flex flex-col gap-1.5">
        <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Email</label>
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
          <span className="material-symbols-outlined text-slate-400 text-xl">mail</span>
          <input
            className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
            type="email"
            placeholder="email@example.com"
            required
            value={state.email}
            onChange={(e) => state.setEmail(e.target.value)}
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
            value={state.phone}
            onChange={(e) => state.setPhone(e.target.value)}
          />
        </div>
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Mật khẩu</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
            <input
              className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              value={state.password}
              onChange={(e) => state.setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="material-symbols-outlined text-slate-400 text-sm">
              {showPassword ? "visibility" : "visibility_off"}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Xác nhận</label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
            <input
              className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              value={state.confirmPassword}
              onChange={(e) => state.setConfirmPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="material-symbols-outlined text-slate-400 text-sm">
              {showConfirmPassword ? "visibility" : "visibility_off"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <input type="checkbox" id="agree-terms" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" required />
        <label htmlFor="agree-terms" className="text-[11px] text-slate-500 cursor-pointer leading-snug">
          Tôi đồng ý với <a href="#" className="text-primary font-semibold hover:underline">Điều khoản</a> và{" "}
          <a href="#" className="text-primary font-semibold hover:underline">Bảo mật</a>
        </label>
      </div>

      <button
        type="submit"
        disabled={state.loading}
        className="w-full flex items-center justify-center gap-2 rounded-xl h-12 bg-primary hover:bg-red-600 text-white text-sm font-bold transition-all duration-200 shadow-lg shadow-primary/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{state.loading ? "Đang xử lý..." : "Tạo tài khoản"}</span>
        {!state.loading && <span className="material-symbols-outlined text-lg">how_to_reg</span>}
      </button>

      <p className="text-center text-sm text-slate-400 mt-2">
        Đã có tài khoản?{" "}
        <button type="button" onClick={onSwitchToLogin} className="text-primary font-semibold hover:underline">
          Đăng nhập
        </button>
      </p>
    </form>
  );
}
