"use client";

import { Check, X, MapPin, User, Building2, Calendar, AlertCircle } from "lucide-react";
import { formatDate } from "@/utils/date.utils";

interface Location {
  ma_dia_diem: string;
  ten_dia_diem: string;
  dia_chi: string;
  kinh_do: number;
  vi_do: number;
  trang_thai_duyet: boolean;
  ngay_tao: string;
  nguoidung: {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai: string | null;
    trang_thai: boolean;
  };
  san: { ma_san: string }[];
}

interface LocationTableProps {
  locations: Location[];
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  approvingId: string | null;
  rejectingId: string | null;
}

export default function LocationTable({
  locations,
  onApprove,
  onReject,
  approvingId,
  rejectingId,
}: LocationTableProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] bg-slate-50/50">
              <th className="px-8 py-5 border-b border-gray-100">Địa điểm & Địa chỉ</th>
              <th className="px-8 py-5 border-b border-gray-100">Chủ sở hữu</th>
              <th className="px-8 py-5 border-b border-gray-100">Cấu hình</th>
              <th className="px-8 py-5 border-b border-gray-100">Ngày tạo</th>
              <th className="px-8 py-5 border-b border-gray-100">Trạng thái</th>
              <th className="px-8 py-5 border-b border-gray-100 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {locations.map((loc) => (
              <tr key={loc.ma_dia_diem} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 tracking-tight">{loc.ten_dia_diem}</p>
                      <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {loc.dia_chi}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-black shrink-0">
                      {loc.nguoidung.ho_ten.charAt(0)}
                    </div>
                    <div>
                      <p className="text-slate-900 font-black text-xs tracking-tight">{loc.nguoidung.ho_ten}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{loc.nguoidung.so_dien_thoai || loc.nguoidung.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">
                      {loc.san.length}
                    </span>
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Sân con</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-slate-600 font-bold">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {formatDate(loc.ngay_tao)}
                  </div>
                </td>
                <td className="px-8 py-6">
                  {loc.trang_thai_duyet ? (
                    <span className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600 border border-green-100 flex items-center gap-1.5 w-fit">
                      <Check className="w-3 h-3" /> Đã duyệt
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1.5 w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> Chờ duyệt
                    </span>
                  )}
                </td>
                <td className="px-8 py-6 text-center">
                  {!loc.trang_thai_duyet ? (
                    !loc.nguoidung.trang_thai ? (
                      <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-50 text-slate-400 border border-dashed border-slate-200">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Chờ duyệt chủ sân</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onApprove(loc.ma_dia_diem)}
                          disabled={!!approvingId}
                          className="w-10 h-10 rounded-xl bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all shadow-lg shadow-green-500/20 active:scale-90"
                          title="Duyệt"
                        >
                          {approvingId === loc.ma_dia_diem ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                          ) : (
                            <Check className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          onClick={() => onReject(loc.ma_dia_diem)}
                          disabled={!!rejectingId}
                          className="w-10 h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-lg shadow-red-500/20 active:scale-90"
                          title="Từ chối"
                        >
                          {rejectingId === loc.ma_dia_diem ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                          ) : (
                            <X className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    )
                  ) : (
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Không có thao tác</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
