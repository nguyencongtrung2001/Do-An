"use client";

import Image from "next/image";
import { CheckCircle2, Hammer, Lock, Loader2, Trophy } from "lucide-react";
import type { OwnerCourt } from "@/types/court.types";

interface CourtStatusItemProps {
  court: OwnerCourt;
  onStatusChange: (id: string, status: string) => Promise<void>;
  isUpdating: boolean;
}

export default function CourtStatusItem({
  court,
  onStatusChange,
  isUpdating,
}: CourtStatusItemProps) {
  const options = [
    { value: "Đang hoạt động", label: "Hoạt động", icon: CheckCircle2, color: "emerald" },
    { value: "Đang bảo trì", label: "Bảo trì", icon: Hammer, color: "amber" },
    { value: "Đã khóa", label: "Khóa", icon: Lock, color: "red" },
  ];

  return (
    <div className={`bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/20 hover:shadow-xl transition-all ${isUpdating ? "opacity-50 pointer-events-none" : ""}`}>
      {/* Thumbnail */}
      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-lg shadow-slate-100 group-hover:scale-105 transition-transform duration-500">
        <Image
          src={court.anhsan?.[0]?.duong_dan_anh || "/hero-stadium.png"}
          alt={court.ten_san}
          fill
          className={`object-cover ${court.trang_thai_san !== "Đang hoạt động" ? "grayscale-[0.5]" : ""}`}
        />
        {isUpdating && (
          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors">{court.ten_san}</h4>
        <div className="flex items-center gap-3 mt-1.5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <Trophy className="w-3 h-3" /> {court.loai_the_thao}
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">UID: {court.ma_san.slice(-6).toUpperCase()}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
        {options.map((opt) => {
          const isActive = court.trang_thai_san === opt.value;
          const colors: Record<string, string> = {
            emerald: isActive ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-emerald-600 hover:bg-emerald-50",
            amber: isActive ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : "text-amber-600 hover:bg-amber-50",
            red: isActive ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "text-red-600 hover:bg-red-50",
          };


          return (
            <button
              key={opt.value}
              onClick={() => onStatusChange(court.ma_san, opt.value)}
              disabled={isUpdating}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-90 ${colors[opt.color]}`}
            >
              <opt.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
