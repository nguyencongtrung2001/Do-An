"use client";

interface HistoryFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: any) => void;
}

export default function HistoryFilters({
  currentFilter,
  onFilterChange,
}: HistoryFiltersProps) {
  const tabs = [
    { label: "Tất cả", value: "all" },
    { label: "Chờ xử lý", value: "Chờ xử lý" },
    { label: "Đã xác nhận", value: "Đã xác nhận" },
    { label: "Hoàn thành", value: "Hoàn thành" },
    { label: "Đã hủy", value: "Đã hủy" },
  ];

  return (
    <div className="flex gap-2 flex-wrap bg-white p-1.5 rounded-[20px] border border-slate-100 shadow-sm w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onFilterChange(tab.value)}
          className={`px-6 py-2.5 rounded-[14px] text-[10px] font-black uppercase tracking-widest transition-all ${
            currentFilter === tab.value
              ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
