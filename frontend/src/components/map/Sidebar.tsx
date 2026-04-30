"use client";

import Image from "next/image";
import type { CourtMapData } from "@/types/court.types";

interface SidebarProps {
  isOpen: boolean;
  courts: CourtMapData[];
  onClose: () => void;
  onSelect: (court: CourtMapData) => void;
  activeId?: number;
}

export default function Sidebar({ isOpen, courts, onClose, onSelect, activeId }: SidebarProps) {
  return (
    <aside
      className={`absolute top-0 left-0 bottom-0 w-[380px] max-w-[85vw] bg-white dark:bg-[#2a1d1d] z-1001 shadow-2xl border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Kết quả tìm kiếm</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{courts.length} sân bóng</p>
        </div>
        <button 
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-slate-500 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {courts.map((court) => (
          <div
            key={court.id}
            onClick={() => onSelect(court)}
            className={`cursor-pointer px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex gap-4 items-start transition-all hover:bg-red-50/50 dark:hover:bg-red-900/10 ${
              activeId === court.id ? "bg-red-50 dark:bg-red-900/20 border-l-4 border-l-primary" : ""
            }`}
          >
            <div className="w-16 h-16 rounded-xl relative overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
              <Image src={court.image} alt={court.name} fill sizes="64px" className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight truncate">{court.name}</h4>
              <div className="flex items-start gap-1 mt-1.5 text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined text-[14px]! mt-0.5 shrink-0">location_on</span>
                <span className="text-xs leading-snug line-clamp-2">{court.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}