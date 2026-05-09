"use client";

import Image from "next/image";
import { Lock, Unlock, Eye, Mail, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "@/utils/date.utils";

interface DbUser {
  ma_nguoi_dung: string;
  ho_ten: string;
  email: string;
  so_dien_thoai: string | null;
  vai_tro: string;
  trang_thai: boolean;
  ngay_tao: string;
  anh_dai_dien: string | null;
}

interface UserTableProps {
  users: DbUser[];
  loading: boolean;
  onToggleLock: (id: string) => Promise<void>;
  onViewDetail: (user: DbUser) => void;
  togglingId: string | null;
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  totalFiltered: number;
  totalAll: number;
}

export default function UserTable({
  users,
  loading,
  onToggleLock,
  onViewDetail,
  togglingId,
  page,
  totalPages,
  onPageChange,
  totalFiltered,
  totalAll,
}: UserTableProps) {
  const getRoleBadge = (role: string) => {
    const roles: any = {
      "Chủ sân": "bg-blue-50 text-blue-600 border-blue-100",
      "Quản trị viên": "bg-purple-50 text-purple-600 border-purple-100",
      "Khách hàng": "bg-emerald-50 text-emerald-600 border-emerald-100",
    };
    return (
      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${roles[role] || "bg-gray-50 text-gray-600"}`}>
        {role === "Quản trị viên" ? "Admin" : role}
      </span>
    );
  };

  const getStatusBadge = (active: boolean) => {
    if (active) return <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600 border border-green-100">Hoạt động</span>;
    return <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-600 border border-red-100">Bị khóa</span>;
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
      <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Danh sách hệ thống</h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          Hiển thị {totalFiltered} / {totalAll} người dùng
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] border-b border-gray-100">
              <th className="px-8 py-5">Danh tính & Hồ sơ</th>
              <th className="px-8 py-5">Liên lạc</th>
              <th className="px-8 py-5">Phân quyền</th>
              <th className="px-8 py-5">Ngày tạo</th>
              <th className="px-8 py-5">Trạng thái</th>
              <th className="px-8 py-5 text-center">Quản lý</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              [1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={6} className="px-8 py-6 h-20 bg-slate-50/30" />
                </tr>
              ))
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user.ma_nguoi_dung} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900 overflow-hidden shrink-0 shadow-lg shadow-slate-100 group-hover:scale-105 transition-transform">
                        {user.anh_dai_dien ? (
                          <Image src={user.anh_dai_dien} alt={user.ho_ten} width={40} height={40} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                            {user.ho_ten.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 tracking-tight">{user.ho_ten}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ID: {user.ma_nguoi_dung.slice(-8).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-primary" />
                        {user.email}
                      </p>
                      <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                        <Phone className="w-3 h-3" />
                        {user.so_dien_thoai || "—"}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6">{getRoleBadge(user.vai_tro)}</td>
                  <td className="px-8 py-6">
                    <div className="text-xs font-bold text-slate-500">{formatDate(user.ngay_tao)}</div>
                  </td>
                  <td className="px-8 py-6">{getStatusBadge(user.trang_thai)}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => onToggleLock(user.ma_nguoi_dung)}
                        disabled={togglingId === user.ma_nguoi_dung}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-90 ${
                          user.trang_thai
                            ? "bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white"
                            : "bg-green-50 text-green-600 hover:bg-green-500 hover:text-white"
                        } ${togglingId === user.ma_nguoi_dung ? "opacity-30 cursor-wait" : ""}`}
                        title={user.trang_thai ? "Khóa tài khoản" : "Mở khóa"}
                      >
                        {user.trang_thai ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => onViewDetail(user)}
                        className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center transition-all hover:bg-primary shadow-lg shadow-slate-200 active:scale-90"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                  Không tìm thấy hồ sơ người dùng nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-between bg-slate-50/30">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Trang <span className="text-slate-900">{page}</span> / <span className="text-slate-900">{totalPages}</span>
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-xs font-black text-slate-500 uppercase tracking-widest hover:bg-white disabled:opacity-30 transition-all active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" /> TRƯỚC
            </button>
            <button
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-xs font-black text-slate-500 uppercase tracking-widest hover:bg-white disabled:opacity-30 transition-all active:scale-95"
            >
              KẾ TIẾP <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
