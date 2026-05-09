"use client";

import Image from "next/image";
import { MapPin, Calendar, Clock, CreditCard, Wallet, Trash2, CheckCircle2 } from "lucide-react";
import { formatVND, formatDate } from "@/utils/date.utils";
import { formatTimeFromISO } from "@/utils/booking.utils";

interface BookingItemProps {
  item: {
    detail: any;
    ma_dat_san: string;
    phuong_thuc: string;
  };
}

export default function BookingItem({ item }: BookingItemProps) {
  const { detail, phuong_thuc } = item;
  const court = detail.san;
  const location = court?.diadiem;
  const status = detail.trang_thai_dat;
  const tienCoc = Number(detail.tien_coc);
  const tienConLai = Number(detail.tien_con_lai);
  const tongTienSan = tienCoc + tienConLai;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Đã xác nhận": return "bg-green-500 shadow-green-200";
      case "Đã nhận sân": return "bg-blue-500 shadow-blue-200";
      case "Hoàn thành": return "bg-emerald-600 shadow-emerald-200";
      case "Chờ xử lý": return "bg-amber-500 shadow-amber-200";
      case "Đã hủy": return "bg-red-500 shadow-red-200";
      default: return "bg-slate-500 shadow-slate-200";
    }
  };

  return (
    <div className={`group bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden ${status === "Đã hủy" ? "opacity-75 grayscale-[0.5]" : ""}`}>
      <div className="flex flex-col md:flex-row">
        {/* Visual Section */}
        <div className="md:w-64 h-48 md:h-auto relative shrink-0">
          {court?.anhsan?.[0]?.duong_dan_anh ? (
            <Image
              src={court.anhsan[0].duong_dan_anh}
              alt={court.ten_san}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-slate-900 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-white/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors" />
          <div className="absolute top-4 left-4">
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${getStatusStyle(status)}`}>
              {status}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900 tracking-tighter group-hover:text-primary transition-colors">
                {court?.ten_san}
              </h3>
              <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {location?.ten_dia_diem} • {location?.dia_chi}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-primary tracking-tighter">
                {formatVND(tongTienSan)}
              </p>
              <div className="flex items-center justify-end gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                 <CreditCard className="w-3.5 h-3.5" /> {phuong_thuc}
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100/50">
              <Calendar className="w-4 h-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">NGÀY ĐẶT</span>
                <span className="text-xs font-black text-slate-700">{formatDate(detail.ngay_dat)}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100/50">
              <Clock className="w-4 h-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">KHUNG GIỜ</span>
                <span className="text-xs font-black text-slate-700">
                  {formatTimeFromISO(detail.gio_bat_dau)} — {formatTimeFromISO(detail.gio_ket_thuc)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-emerald-50 px-4 py-3 rounded-2xl border border-emerald-100/50">
              <Wallet className="w-4 h-4 text-emerald-600" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-emerald-600/60 uppercase tracking-widest">ĐÃ ĐẶT CỌC</span>
                <span className="text-xs font-black text-emerald-700">{formatVND(tienCoc)}</span>
              </div>
            </div>
            {tienConLai > 0 && (
              <div className="flex items-center gap-3 bg-amber-50 px-4 py-3 rounded-2xl border border-amber-100/50">
                <Wallet className="w-4 h-4 text-amber-600" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-amber-600/60 uppercase tracking-widest">CÒN LẠI</span>
                  <span className="text-xs font-black text-amber-700">{formatVND(tienConLai)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
              MÃ ĐƠN: <span className="text-slate-500">{detail.ma_dat_san_chi_tiet.toUpperCase()}</span>
            </p>
            {status === "Chờ xử lý" && (
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-50 hover:bg-red-500 text-red-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all border border-red-100 shadow-sm active:scale-95">
                <Trash2 className="w-3.5 h-3.5" /> HỦY ĐẶT SÂN
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
