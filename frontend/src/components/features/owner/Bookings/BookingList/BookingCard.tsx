"use client";

import { BOOKING_STATUS_CONFIG } from "@/lib/constants/status";
import { BookingDetail } from "@/types/booking.types";
import { formatTimeFromISO } from "@/utils/booking.utils";
import { formatVND } from "@/utils/date.utils";
import { Check, X, ClipboardCheck, Play } from "lucide-react";

interface BookingCardProps {
  booking: BookingDetail;
  onUpdateStatus: (id: string, status: string) => Promise<void>;
  onCheckin: (booking: BookingDetail) => void;
}

export default function BookingCard({ booking, onUpdateStatus, onCheckin }: BookingCardProps) {
  const statusCfg = BOOKING_STATUS_CONFIG[booking.trang_thai_dat] || {
    bg: "bg-gray-50",
    text: "text-gray-700",
    label: booking.trang_thai_dat,
  };

  const isPending = booking.trang_thai_dat === "Chờ xử lý";
  const isConfirmed = booking.trang_thai_dat === "Đã xác nhận";
  const isCheckedIn = booking.trang_thai_dat === "Đã nhận sân";

  return (
    <div className="p-5 rounded-2xl border border-gray-100 bg-white hover:shadow-xl transition-all group animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shadow-inner">
            {booking.datsan?.nguoidung?.ho_ten?.charAt(0) || "?"}
          </div>
          <div>
            <p className="text-sm font-black text-slate-900 tracking-tight">{booking.datsan?.nguoidung?.ho_ten}</p>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">{booking.datsan?.nguoidung?.so_dien_thoai}</p>
          </div>
        </div>
        <span className={`text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest shadow-sm ${statusCfg.bg} ${statusCfg.text} border border-current/10`}>
          {statusCfg.label}
        </span>
      </div>

      <div className="bg-gray-50/80 rounded-xl p-4 mb-4 space-y-2 border border-gray-100">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="material-symbols-outlined text-sm text-primary">sports_soccer</span>
          {booking.san?.ten_san}
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="material-symbols-outlined text-sm text-primary">schedule</span>
          {formatTimeFromISO(booking.gio_bat_dau)} → {formatTimeFromISO(booking.gio_ket_thuc)}
        </div>
        <div className="flex items-center gap-4 pt-2 border-t border-gray-200/50">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase font-bold">Tiền cọc</span>
            <span className="text-xs font-black text-emerald-600">{formatVND(booking.tien_coc)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase font-bold">Còn lại</span>
            <span className="text-xs font-black text-amber-600">{formatVND(booking.tien_con_lai)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mt-auto">
        <div className="flex gap-2">
          {isPending && (
            <>
              <button
                onClick={() => onUpdateStatus(booking.ma_dat_san_chi_tiet, "Đã xác nhận")}
                className="p-2 rounded-xl bg-green-500 hover:bg-green-600 text-white transition-all shadow-md shadow-green-500/20"
                title="Xác nhận"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => onUpdateStatus(booking.ma_dat_san_chi_tiet, "Đã hủy")}
                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all"
                title="Hủy"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
          {isConfirmed && (
            <button
              onClick={() => onCheckin(booking)}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl text-xs font-black transition-all shadow-md shadow-violet-600/20 active:scale-95"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>NHẬN SÂN</span>
            </button>
          )}
          {isCheckedIn && (
            <button
              onClick={() => onUpdateStatus(booking.ma_dat_san_chi_tiet, "Hoàn thành")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-black transition-all shadow-md shadow-blue-600/20 active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>HOÀN TẤT</span>
            </button>
          )}
        </div>
        
        <span className="text-[10px] text-slate-400 font-bold ml-auto opacity-60">
          ID: #{booking.ma_dat_san_chi_tiet.slice(-4)}
        </span>
      </div>
    </div>
  );
}
