"use client";

import { Trash2 } from "lucide-react";
import { GroupedSlot } from "@/types/court.types";
import { calculateDuration } from "@/utils/date.utils";

interface BookingCartProps {
  groupedSlots: GroupedSlot[];
  totalPrice: number;
  onRemoveGroup: (group: GroupedSlot) => void;
  onCheckout: () => void;
  isInvalid: boolean;
  selectedSlotsCount: number;
}

export default function BookingCart({
  groupedSlots,
  totalPrice,
  onRemoveGroup,
  onCheckout,
  isInvalid,
  selectedSlotsCount,
}: BookingCartProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24 shadow-xl shadow-gray-100">
      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center justify-between">
        <span>Giỏ hàng đặt sân</span>
        <span className="bg-primary text-white text-sm w-6 h-6 rounded-full flex items-center justify-center">
          {selectedSlotsCount}
        </span>
      </h3>
      
      {groupedSlots.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <p>Chưa có khung giờ nào được chọn.</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
          {groupedSlots.map((group, idx) => (
            <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div>
                <p className="font-bold text-slate-800 text-sm truncate max-w-[200px]">
                  {group.ten_san} | {group.gio_bat_dau} - {group.gio_ket_thuc}
                </p>
                <p className="text-[10px] font-semibold text-primary/80 uppercase">
                   {calculateDuration(group.gio_bat_dau, group.gio_ket_thuc)}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Ngày: {new Date(group.ngay_dat).toLocaleDateString("vi-VN")}
                </p>
                <p className="text-sm font-bold text-primary mt-1">{group.gia_thue.toLocaleString()}đ</p>
              </div>
              <button 
                onClick={() => onRemoveGroup(group)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <span className="text-slate-600 font-medium">Tổng tạm tính</span>
          <span className="text-2xl font-black text-primary">{totalPrice.toLocaleString()}đ</span>
        </div>
        <button
          onClick={onCheckout}
          disabled={selectedSlotsCount === 0 || isInvalid}
          className="w-full py-3.5 bg-primary hover:bg-red-600 disabled:bg-gray-300 disabled:text-gray-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/30 disabled:shadow-none"
        >
          Tiến hành đặt sân
        </button>
        {isInvalid && (
          <p className="text-red-500 text-xs text-center mt-3 font-medium">
            * Tối thiểu 1 tiếng / sân
          </p>
        )}
      </div>
    </div>
  );
}
