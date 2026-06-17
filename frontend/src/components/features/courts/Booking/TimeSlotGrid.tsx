"use client";

import { TIME_SLOTS } from "@/lib/constants/timeline";
import { SPORT_LABELS } from "@/lib/constants/sports";
import { DetailCourt } from "@/types/court.types";

interface BookedSlot {
  gio_bat_dau: string;
  gio_ket_thuc: string;
}

interface TimeSlotGridProps {
  court: DetailCourt;
  selectedDate: string;
  selectedSlots: string[];
  onSlotToggle: (slot: string) => void;
  isSelected: boolean;
  onSelect: () => void;
  bookedSlots: BookedSlot[];
}

/**
 * Chuyển chuỗi "HH:mm" thành số phút tính từ 00:00
 * Ví dụ: "06:30" → 390
 */
function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Kiểm tra xem 1 slot 30 phút (bắt đầu tại `marker`) có bị trùng
 * với bất kỳ khoảng booked nào không.
 *
 * Ví dụ: marker = "06:00" → block [06:00, 06:30)
 * BookedSlot = { gio_bat_dau: "06:00", gio_ket_thuc: "07:00" }
 * → trùng vì [06:00, 06:30) nằm trong [06:00, 07:00)
 */
function isSlotBooked(marker: string, bookedSlots: BookedSlot[]): boolean {
  const slotStart = timeToMinutes(marker);
  const slotEnd = slotStart + 30;

  return bookedSlots.some((booked) => {
    const bookedStart = timeToMinutes(booked.gio_bat_dau);
    const bookedEnd = timeToMinutes(booked.gio_ket_thuc);
    
    return slotStart < bookedEnd && slotEnd > bookedStart;
  });
}

export default function TimeSlotGrid({
  court,
  selectedDate,
  selectedSlots,
  onSlotToggle,
  isSelected,
  onSelect,
  bookedSlots,
}: TimeSlotGridProps) {
  return (
    <div
      className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-gray-100 bg-white hover:border-gray-200"
      }`}
    >
      {/* Court header */}
      <button
        onClick={onSelect}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
            isSelected ? "bg-primary text-white" : "bg-gray-100"
          }`}>
            {court.loai_the_thao === "bong-da" ? "⚽" :
             court.loai_the_thao === "cau-long" ? "🏸" :
             court.loai_the_thao === "pickleball" ? "🏓" :
             court.loai_the_thao === "bong-ro" ? "🏀" : "🏟️"}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{court.ten_san}</h3>
            <p className="text-xs text-slate-500">{SPORT_LABELS[court.loai_the_thao] || court.loai_the_thao}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary">{court.gia_thue_30p.toLocaleString()}đ</p>
          <p className="text-xs text-slate-400">/30 phút</p>
        </div>
      </button>

      {/* Time slots — shown when court is selected */}
      {isSelected && (
        <div className="px-6 pb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Khung giờ — {new Date(selectedDate).toLocaleDateString("vi-VN")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-0 gap-y-3">
            {TIME_SLOTS.map((slot, index) => {
              const booked = isSlotBooked(slot, bookedSlots);
              const isActive = !booked && selectedSlots.includes(slot);
              const isPrevActive = index > 0 && selectedSlots.includes(TIME_SLOTS[index - 1]);
              const isNextActive = index < TIME_SLOTS.length - 1 && selectedSlots.includes(TIME_SLOTS[index + 1]);

              // === Slot ĐÃ ĐẶT: disabled, mờ, ghi "Đã đặt" ===
              if (booked) {
                return (
                  <button
                    key={slot}
                    disabled
                    className="px-1 py-2 text-xs font-medium rounded-lg border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50 m-0.5 z-0 flex flex-col items-center justify-center gap-0.5"
                  >
                    <span>{slot}</span>
                    <span className="text-[10px] text-red-400 font-semibold">Đã đặt</span>
                  </button>
                );
              }

              // === Slot CHƯA ĐẶT: logic gộp viền giữ nguyên ===
              let radiusClass = "rounded-lg";
              let borderClass = "border";

              if (isActive) {
                if (isPrevActive && isNextActive) {
                  radiusClass = "rounded-none";
                  borderClass = "border-y border-x-0 border-blue-700";
                } else if (isPrevActive && !isNextActive) {
                  radiusClass = "rounded-r-lg rounded-l-none";
                  borderClass = "border border-l-0 border-blue-700";
                } else if (!isPrevActive && isNextActive) {
                  radiusClass = "rounded-l-lg rounded-r-none";
                  borderClass = "border border-r-0 border-blue-700";
                } else {
                  borderClass = "border border-blue-700";
                }
              }

              return (
                <button
                  key={slot}
                  onClick={() => onSlotToggle(slot)}
                  className={`px-1 py-2 text-xs font-medium transition-all ${radiusClass} ${borderClass} ${
                    isActive
                      ? "bg-blue-700 text-white shadow-sm z-10 relative"
                      : "bg-white text-slate-600 hover:bg-primary/5 hover:border-primary/30 border-gray-200 m-0.5 rounded-lg z-0"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
