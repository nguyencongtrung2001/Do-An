"use client";

import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { BOOKING_STATUS_CONFIG } from "@/lib/constants/status";

interface TimelineHeaderProps {
  dateStr: string;
  onDateChange: (date: string) => void;
  statusFilter: string;
  onFilterChange: (filter: any) => void;
  counts: Record<string, number>;
  totalCount: number;
}

export default function TimelineHeader({
  dateStr,
  onDateChange,
  statusFilter,
  onFilterChange,
  counts,
  totalCount,
}: TimelineHeaderProps) {
  const prevDay = () => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() - 1);
    onDateChange(d.toISOString().split("T")[0]);
  };

  const nextDay = () => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + 1);
    onDateChange(d.toISOString().split("T")[0]);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Lịch đặt sân</h2>
          <p className="text-sm text-slate-400">Theo dõi danh sách đặt sân theo thời gian thực</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button onClick={prevDay} className="w-8 h-8 rounded-lg hover:bg-white hover:shadow-sm transition-all flex items-center justify-center text-slate-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 px-3">
              <Calendar className="w-4 h-4 text-primary" />
              <input
                type="date"
                value={dateStr}
                onChange={(e) => onDateChange(e.target.value)}
                className="bg-transparent border-none p-0 text-sm font-bold text-slate-700 focus:ring-0 outline-none w-[110px]"
              />
            </div>
            <button onClick={nextDay} className="w-8 h-8 rounded-lg hover:bg-white hover:shadow-sm transition-all flex items-center justify-center text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 flex-wrap overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => onFilterChange("all")}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
            statusFilter === "all" ? "bg-slate-900 text-white shadow-md" : "bg-gray-100 text-slate-500 hover:bg-gray-200"
          }`}
        >
          Tất cả: {totalCount}
        </button>
        {Object.entries(BOOKING_STATUS_CONFIG).map(([status, cfg]) => (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
              statusFilter === status 
              ? `${cfg.bg} ${cfg.text} ${cfg.border} shadow-sm ring-1 ring-current/20` 
              : `${cfg.bg} ${cfg.text} border-transparent opacity-60 hover:opacity-100`
            }`}
          >
            {cfg.label}: {counts[status] || 0}
          </button>
        ))}
      </div>
    </header>
  );
}
