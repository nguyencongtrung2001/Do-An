"use client";

import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, useRef, useCallback } from "react";
import { userService, type UserProfile } from "@/services/user.service";

function formatCurrency(value: number | string | null | undefined): string {
  if (value === null || value === undefined) return "0";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0";
  return num.toLocaleString("vi-VN");
}

function getAvatarFallbackUrl(name: string): string {
  const encoded = encodeURIComponent(name || "U");
  return `https://ui-avatars.com/api/?name=${encoded}&size=160&background=ec1313&color=fff&bold=true&font-size=0.4`;
}

export default function ProfileClient() {
  const { user, token, login } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProfile = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await userService.getProfile(token);
      setProfile(res.user);
    } catch (err: any) {
      setError(err.message || "Không thể tải thông tin hồ sơ");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    
    if (!file.type.startsWith("image/")) {
      setError("Vui lòng chọn file ảnh (jpg, png, webp)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Kích thước ảnh tối đa 5MB");
      return;
    }

    
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setError(null);

    try {
      setAvatarUploading(true);
      const res = await userService.updateAvatar(token, file);
      setProfile(res.user);

      
      if (user) {
        login(token, {
          ...user,
          anh_dai_dien: res.user.anh_dai_dien,
          so_vi_du: Number(res.user.so_vi_du),
        });
      }

      setAvatarPreview(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Không thể cập nhật ảnh đại diện");
      setAvatarPreview(null);
    } finally {
      setAvatarUploading(false);
      
      if (fileInputRef.current) fileInputRef.current.value = "";
      URL.revokeObjectURL(previewUrl);
    }
  };

  const displayName = profile?.ho_ten || user?.ho_ten || "Người dùng";
  const displayEmail = profile?.email || user?.email || "";
  const displayPhone = profile?.so_dien_thoai || user?.so_dien_thoai || null;
  const displayAvatar = avatarPreview || profile?.anh_dai_dien || user?.anh_dai_dien || null;
  const walletBalance = profile?.so_vi_du ?? 0;

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 lg:px-8 py-8 min-h-[calc(100vh-200px)]">
        <div className="bg-white dark:bg-[#2a1d1d] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 mb-6 animate-pulse">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36" />
            </div>
          </div>
        </div>
        <div className="h-40 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse mb-6" />
        <div className="bg-white dark:bg-[#2a1d1d] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 animate-pulse">
          <div className="space-y-4">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32" />
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 lg:px-8 py-8 min-h-[calc(100vh-200px)]">
      {}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
        id="avatar-upload-input"
      />

      {}
      <div
        className={`fixed top-6 right-6 z-50 flex items-center gap-3 bg-emerald-500 text-white px-5 py-3.5 rounded-xl shadow-2xl shadow-emerald-500/30 transition-all duration-500 ${
          showSuccess
            ? "translate-x-0 opacity-100"
            : "translate-x-[120%] opacity-0"
        }`}
      >
        <span className="material-symbols-outlined text-xl">check_circle</span>
        <span className="font-semibold text-sm">Cập nhật ảnh đại diện thành công!</span>
      </div>

      {}
      {error && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-red-500 text-white px-5 py-3.5 rounded-xl shadow-2xl shadow-red-500/30 animate-[slideIn_0.3s_ease-out]">
          <span className="material-symbols-outlined text-xl">error</span>
          <span className="font-semibold text-sm">{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {}
      <div className="bg-white dark:bg-[#2a1d1d] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 mb-6">
        <div className="flex items-center gap-5">
          {}
          <div className="relative shrink-0 group">
            <button
              onClick={handleAvatarClick}
              disabled={avatarUploading}
              className="relative w-20 h-20 rounded-full bg-linear-to-br from-primary/20 to-primary/5 border-[3px] border-primary/30 overflow-hidden shadow-lg shadow-primary/10 cursor-pointer transition-all duration-300 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:cursor-wait"
              title="Nhấn để thay đổi ảnh đại diện"
              id="avatar-change-button"
            >
              {displayAvatar ? (
                <Image
                  src={displayAvatar}
                  alt="Avatar"
                  fill
                  className={`object-cover transition-all duration-300 ${
                    avatarUploading ? "opacity-40 blur-sm" : "group-hover:scale-110"
                  }`}
                  unoptimized={displayAvatar.startsWith("blob:")}
                />
              ) : (
                <Image
                  src={getAvatarFallbackUrl(displayName)}
                  alt="Avatar"
                  fill
                  className={`object-cover transition-all duration-300 ${
                    avatarUploading ? "opacity-40 blur-sm" : "group-hover:scale-110"
                  }`}
                  unoptimized
                />
              )}

              {}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  avatarUploading
                    ? "bg-black/50"
                    : "bg-black/0 group-hover:bg-black/40"
                }`}
              >
                {avatarUploading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="material-symbols-outlined text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                    photo_camera
                  </span>
                )}
              </div>
            </button>

            {}
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#2a1d1d] flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[10px]">check</span>
            </div>
          </div>

          {}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white truncate">
                {displayName}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-xs">verified</span>
                {profile?.vai_tro || user?.vai_tro || "Khách hàng"}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">mail</span>
              {displayEmail}
            </p>
            {displayPhone && (
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                <span className="material-symbols-outlined text-sm">phone</span>
                {displayPhone}
              </p>
            )}
          </div>
        </div>
      </div>

      {}
      <div className="relative overflow-hidden rounded-2xl shadow-xl mb-6 group">
        {}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-700" />
        
        {}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
        </div>
        
        {}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative p-6 md:p-8">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-emerald-100/80 text-xs font-semibold uppercase tracking-widest">
              <span className="material-symbols-outlined text-base">account_balance_wallet</span>
              Số dư ví nội bộ
            </div>
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/90 text-xs font-semibold">
              <span className="material-symbols-outlined text-sm">verified</span>
              Đã xác minh
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3" id="wallet-balance">
                {formatCurrency(walletBalance)}
                <span className="text-lg md:text-xl font-bold text-emerald-100/80 ml-1">VNĐ</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="bg-white dark:bg-[#2a1d1d] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">info</span>
          Thông tin tài khoản
        </h2>

        <div className="space-y-4">
          {}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-blue-500">person</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Họ tên</p>
              <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{displayName}</p>
            </div>
          </div>

          {}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-violet-500">mail</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email</p>
              <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{displayEmail}</p>
            </div>
          </div>

          {}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-amber-500">phone</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Số điện thoại</p>
              <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                {displayPhone || "Chưa cập nhật"}
              </p>
            </div>
          </div>

          {}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-emerald-500">shield_person</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Vai trò</p>
              <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                {profile?.vai_tro || user?.vai_tro || "Khách hàng"}
              </p>
            </div>
          </div>

          {}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-teal-500">account_balance_wallet</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Số dư ví nội bộ</p>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 truncate">
                {formatCurrency(walletBalance)} VNĐ
              </p>
            </div>
          </div>

          {}
          {profile?.ngay_tao && (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-pink-500">calendar_month</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Ngày tham gia</p>
                <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                  {new Date(profile.ngay_tao).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
