"use client";

import { BookingDetail } from "@/types/booking.types";
import { formatTimeFromISO } from "@/utils/booking.utils";
import { formatVND } from "@/utils/date.utils";
import { X, User, Stadium, Wallet, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CheckinModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingDetail | null;
  onConfirm: (id: string, status: string) => Promise<void>;
}

export default function CheckinModal({
  isOpen,
  onClose,
  booking,
  onConfirm,
}: CheckinModalProps) {
  if (!booking) return null;

  const totalAmount = Number(booking.tien_coc) + Number(booking.tien_con_lai);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
        <DialogHeader className="p-8 bg-slate-900 text-white relative">
          <DialogTitle className="text-xl font-black tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            XÁC NHẬN NHẬN SÂN
          </DialogTitle>
          <p className="text-slate-400 text-sm mt-1">Vui lòng kiểm tra thông tin và thu phí còn lại</p>
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </DialogHeader>

        <div className="p-8 space-y-8 bg-white">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400">
                <User className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Khách hàng</span>
              </div>
              <div>
                <p className="font-black text-slate-900">{booking.datsan?.nguoidung?.ho_ten}</p>
                <p className="text-xs text-slate-500 font-medium">{booking.datsan?.nguoidung?.so_dien_thoai}</p>
              </div>
            </div>
            
            <div className="space-y-3 text-right">
              <div className="flex items-center gap-2 text-slate-400 justify-end">
                <span className="text-[10px] font-black uppercase tracking-widest">Thông tin sân</span>
                <Stadium className="w-4 h-4" />
              </div>
              <div>
                <p className="font-black text-slate-900">{booking.san?.ten_san}</p>
                <p className="text-xs text-slate-500 font-bold">
                  {formatTimeFromISO(booking.gio_bat_dau)} — {formatTimeFromISO(booking.gio_ket_thuc)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-violet-50 rounded-3xl p-6 border border-violet-100 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 font-bold">Tổng tiền dịch vụ</span>
              <span className="font-black text-slate-900">{formatVND(totalAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 font-bold">Đã thanh toán cọc</span>
              <span className="font-black text-emerald-600">-{formatVND(booking.tien_coc)}</span>
            </div>
            <div className="pt-4 border-t border-violet-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                <span className="font-black text-slate-900 text-base">CẦN THU THÊM</span>
              </div>
              <span className="text-3xl font-black text-primary tracking-tighter">
                {formatVND(booking.tien_con_lai)}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl border-2 border-gray-100 font-black text-slate-400 hover:bg-gray-50 transition-all text-xs tracking-widest uppercase"
            >
              HỦY BỎ
            </button>
            <button
              onClick={() => onConfirm(booking.ma_dat_san_chi_tiet, "Đã nhận sân")}
              className="flex-1 py-4 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/30 hover:bg-red-600 transition-all text-xs tracking-widest uppercase active:scale-95"
            >
              XÁC NHẬN NHẬN SÂN
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
