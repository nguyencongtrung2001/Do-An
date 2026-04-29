"use client";

import { useEffect, useState } from "react";

export default function OwnerTopbar() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    setCurrentDate(now.toLocaleDateString("vi-VN", options));
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-sm text-slate-400">Chào mừng quay lại, Admin!</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button aria-label="Thông báo" className="relative w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-slate-600 text-xl">notifications</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              5
            </span>
          </button>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Hôm nay</p>
          <p className="text-sm font-semibold text-slate-700 min-h-[20px]">{currentDate}</p>
        </div>
      </div>
    </header>
  );
}
