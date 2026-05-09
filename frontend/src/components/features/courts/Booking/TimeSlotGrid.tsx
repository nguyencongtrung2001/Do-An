"use client";

import { TIME_SLOTS } from "@/lib/constants/timeline";
import { SPORT_LABELS } from "@/lib/constants/sports";
import { DetailCourt } from "@/types/court.types";

interface TimeSlotGridProps {
  court: DetailCourt;
  selectedDate: string;
  selectedSlots: string[];
  onSlotToggle: (slot: string) => void;
  isSelected: boolean;
  onSelect: () => void;
}

export default function TimeSlotGrid({
  court,
  selectedDate,
  selectedSlots,
  onSlotToggle,
  isSelected,
  onSelect,
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
              const isActive = selectedSlots.includes(slot);
              const isPrevActive = index > 0 && selectedSlots.includes(TIME_SLOTS[index - 1]);
              const isNextActive = index < TIME_SLOTS.length - 1 && selectedSlots.includes(TIME_SLOTS[index + 1]);

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
