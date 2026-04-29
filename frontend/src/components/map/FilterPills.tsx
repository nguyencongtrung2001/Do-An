"use client";

import React from "react";

interface FilterPillsProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const SPORT_FILTERS = [
  { id: "all", label: "Tất cả", icon: "grid_view" },
  { id: "bong-da", label: "Bóng đá", icon: "sports_soccer" },
  { id: "cau-long", label: "Cầu lông", icon: "sports_volleyball" },
  { id: "pickleball", label: "Pickleball", icon: "sports_tennis" },
  { id: "bong-ro", label: "Bóng rổ", icon: "sports_basketball" },
  { id: "tennis", label: "Tennis", icon: "sports_tennis" },
  { id: "bida", label: "Bida", icon: "table_bar" },
];

export default function FilterPills({ currentFilter, onFilterChange }: FilterPillsProps) {
  return (
    <div className="absolute top-4 right-4 z-1000 flex gap-2 max-w-[calc(100vw-4rem)] overflow-x-auto scrollbar-hide py-2">
      {SPORT_FILTERS.map((item) => (
        <button
          key={item.id}
          onClick={() => onFilterChange(item.id)}
          className={`px-4 py-2 shrink-0 rounded-full whitespace-nowrap shadow-md transition-colors flex flex-row items-center gap-2 text-sm font-bold ${
            currentFilter === item.id 
              ? "bg-primary text-white" 
              : "bg-white dark:bg-[#2a1d1d] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#3d2a2a] border border-gray-100 dark:border-gray-800"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]!">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
}
