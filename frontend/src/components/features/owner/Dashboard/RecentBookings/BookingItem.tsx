"use client";

import { BookingDetail } from "@/types/booking.types";
import { formatVND } from "@/utils/date.utils";
import { formatTimeFromISO } from "@/utils/booking.utils";

interface BookingItemProps {
  booking: BookingDetail;
}

export default function BookingItem({ booking }: BookingItemProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Đã xác nhận": return "bg-green-100 text-green-700 border-green-200";
      case "Đã nhận sân": return "bg-violet-100 text-violet-700 border-violet-200";
      case "Hoàn thành": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Chờ xử lý": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Đã hủy": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const totalAmount = Number(booking.tien_coc) + Number(booking.tien_con_lai);

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all group">
      <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-black shrink-0 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform">
        {booking.datsan?.nguoidung?.ho_ten?.charAt(0) || "?"}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-black text-slate-900 truncate tracking-tight">
            {booking.datsan?.nguoidung?.ho_ten}
          </p>
          <span className={`text-[9px] px-2.5 py-1 rounded-lg font-black uppercase tracking-widest border ${getStatusStyle(booking.trang_thai_dat)}`}>
            {booking.trang_thai_dat}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
          <span className="text-primary">{booking.san?.ten_san}</span>
          <span>•</span>
          <span>{formatTimeFromISO(booking.gio_bat_dau)} - {formatTimeFromISO(booking.gio_ket_thuc)}</span>
          <span>•</span>
          <span>{new Date(booking.ngay_dat).toLocaleDateString("vi-VN")}</span>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-black text-slate-900">{formatVND(totalAmount)}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Tổng phí</p>
      </div>
    </div>
  );
}
