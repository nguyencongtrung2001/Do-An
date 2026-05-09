"use client";

import Image from "next/image";
import { SPORT_LABELS } from "@/lib/constants/sports";
import { OwnerCourt } from "@/types/court.types";
import { formatVND } from "@/utils/date.utils";

interface CourtCardProps {
  court: OwnerCourt;
  onEdit: (id: string) => void;
  onDelete: (court: OwnerCourt) => void;
}

export default function CourtCard({ court, onEdit, onDelete }: CourtCardProps) {
  return (
    <div className="court-card-admin fade-in bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {/* Thumbnail */}
      <div className="relative w-full aspect-4/3 overflow-hidden">
        {/* Sport label */}
        <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
          {SPORT_LABELS[court.loai_the_thao] || court.loai_the_thao}
        </div>

        {/* Image count badge */}
        {court.anhsan && court.anhsan.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-[10px]">photo_library</span>
            {court.anhsan.length}
          </div>
        )}

        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-110"
          style={{
            backgroundImage: `url("${court.anhsan?.[0]?.duong_dan_anh || "/hero-stadium.png"}")`,
          }}
        />
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="text-base font-bold mb-1 text-slate-900 truncate">
          {court.ten_san}
        </h3>

        {/* Image count info */}
        <p className="text-[11px] text-slate-400 mb-3 flex items-center gap-1">
          <span className="material-symbols-outlined text-[11px]">image</span>
          {court.anhsan && court.anhsan.length > 0
            ? `${court.anhsan.length} hình ảnh`
            : "Chưa có hình ảnh"}
        </p>

        <div className="flex items-center justify-between py-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-slate-400">Giá thuê (30p)</p>
            <p className="text-lg font-bold text-primary">
              {formatVND(court.gia_thue_30p)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(court.ma_san)}
              className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-500 flex items-center justify-center transition-colors"
              title="Chỉnh sửa"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
            </button>
            <button
              onClick={() => onDelete(court)}
              className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors"
              title="Xóa"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
