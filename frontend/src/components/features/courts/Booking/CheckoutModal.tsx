"use client";

import { useState } from "react";
import { X, CreditCard, Wallet, Banknote } from "lucide-react";
import { GroupedSlot } from "@/types/court.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupedSlots: GroupedSlot[];
  totalPrice: number;
  onConfirm: (method: string) => Promise<void>;
  isSubmitting: boolean;
  paymentStatus: string;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  groupedSlots,
  totalPrice,
  onConfirm,
  isSubmitting,
  paymentStatus,
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const depositPrice = totalPrice * 0.3;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <DialogTitle className="text-xl font-bold text-slate-900">Xác nhận đơn hàng</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 space-y-8">
          {/* Order Summary */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Thông tin sân đã đặt</h3>
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3 border border-gray-100">
              {groupedSlots.map((group, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-bold text-slate-800">{group.ten_san}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Ngày: {new Date(group.ngay_dat).toLocaleDateString("vi-VN")} | {group.gio_bat_dau} - {group.gio_ket_thuc}
                    </p>
                  </div>
                  <p className="font-bold text-slate-800">{group.gia_thue.toLocaleString()}đ</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 space-y-2 px-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-600">Tổng tiền</span>
                <span className="text-sm font-bold text-slate-900">{totalPrice.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-bold text-slate-800">Tiền cọc (30%)</span>
                <span className="text-2xl font-black text-primary">{depositPrice.toLocaleString()}đ</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Phương thức thanh toán</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button 
                onClick={() => setPaymentMethod("cash")}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col ${
                  paymentMethod === "cash" 
                  ? "border-primary bg-primary/5 ring-1 ring-primary" 
                  : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                  <Banknote className="w-4 h-4" />
                </div>
                <p className="font-bold text-slate-800 text-sm">Tiền mặt</p>
                <p className="text-xs text-slate-500 mt-1">Thanh toán tại sân</p>
              </button>
              
              <button 
                onClick={() => setPaymentMethod("wallet")}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col ${
                  paymentMethod === "wallet" 
                  ? "border-primary bg-primary/5 ring-1 ring-primary" 
                  : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <Wallet className="w-4 h-4" />
                </div>
                <p className="font-bold text-slate-800 text-sm">Ví nội bộ</p>
                <p className="text-xs text-slate-500 mt-1">Sử dụng số dư ví</p>
              </button>
              
              <button 
                disabled
                className="p-4 rounded-2xl border-2 text-left transition-all border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed group"
              >
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mb-3">
                  <CreditCard className="w-4 h-4" />
                </div>
                <p className="font-bold text-slate-400 text-sm">VNPAY</p>
                <p className="text-[10px] text-primary font-bold uppercase tracking-tight mt-1">Sắp ra mắt</p>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-10">
          <button
            onClick={() => onConfirm(paymentMethod)}
            disabled={isSubmitting}
            className="w-full py-4 bg-primary hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/30 flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{paymentStatus}</span>
              </>
            ) : (
              `Xác nhận thanh toán ${depositPrice.toLocaleString()}đ`
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
