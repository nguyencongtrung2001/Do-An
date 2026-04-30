"use client";

import Link from "next/link";
import Image from "next/image";
import type { CourtMapData } from "@/types/court.types";

interface DetailCardProps {
  court: CourtMapData;
  onClose: () => void;
}

export default function DetailCard({ court, onClose }: DetailCardProps) {
  return (
    <div className="absolute bottom-8 left-8 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-[#2a1d1d] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300 z-1001">
      {/* Banner Image */}
      <div className="h-32 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
        <Image src={court.image} alt={court.name} fill sizes="(max-width: 768px) 100vw, 384px" className="object-cover" />
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 h-8 w-8 z-10 rounded-full bg-white/80 dark:bg-[#2a1d1d]/80 backdrop-blur-sm flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
        <div className="absolute bottom-3 left-3 z-10 bg-white/90 dark:bg-[#2a1d1d]/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]! text-yellow-500 fill">star</span>
          {court.rating} (89 đánh giá)
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{court.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Địa chỉ : {court.address}</p>
          </div>
       
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
          
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]! text-green-500">check_circle</span>
            <span className="text-green-600 dark:text-green-400 font-medium">Đang hoạt động</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-2">
          <Link 
            href={`/courts/${court.slug}`}
            className="flex-1 bg-primary text-white font-bold py-2.5 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-primary/30 text-sm text-center"
          >
            Đặt sân ngay
          </Link>
          
        </div>
      </div>
    </div>
  );
}