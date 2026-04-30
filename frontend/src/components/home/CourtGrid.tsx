"use client";

import { useState } from "react";
import CourtCard from "../shared/CourtCard";
import { useFields } from "@/hooks/useFields";

const SPORT_FILTERS = [
  { id: "all", label: "Tất cả", icon: <span className="material-symbols-outlined text-[18px]!">grid_view</span> },
  { id: "bong-da", label: "Bóng đá", icon: <span className="material-symbols-outlined text-[18px]!">sports_soccer</span> },
  { id: "cau-long", label: "Cầu lông", icon: <span className="material-symbols-outlined text-[18px]!">sports_volleyball</span> },
  { id: "pickleball", label: "Pickleball", icon: <span className="material-symbols-outlined text-[18px]!">sports_tennis</span> },
  { id: "bong-ro", label: "Bóng rổ", icon: <span className="material-symbols-outlined text-[18px]!">sports_basketball</span> },
  { id: "tennis", label: "Tennis", icon: <span className="material-symbols-outlined text-[18px]!">sports_tennis</span> },
  { id: "bida", label: "Bida", icon: <span className="material-symbols-outlined text-[18px]!">table_bar</span> },
];

export default function CourtGrid() {
  const [filter, setFilter] = useState("all");
  const { gridItems: courts, loading } = useFields();

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const filteredCourts = filter === "all" 
    ? courts 
    : courts.filter(court => court.sport === filter);

  if (loading) {
    return (
      <section className="w-full flex flex-col gap-10">
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col gap-10">
      <div>
        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-2xl font-bold">Sân thể thao phổ biến</h2>

          <div className="flex items-center gap-2 flex-wrap">
            {SPORT_FILTERS.map((item) => (
              <button
                key={item.id}
                onClick={() => setFilter(item.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  filter === item.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/30" 
                    : "bg-white dark:bg-[#2a1d1d] border border-gray-200 hover:border-primary/50 text-slate-600 dark:text-slate-300"
                }`}
              >
                <span className="flex items-center justify-center">
                    {item.icon}
                </span>
                
                {capitalizeFirstLetter(item.label)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredCourts.length > 0 ? (
            filteredCourts.map((court) => (
              <CourtCard key={court.id} {...court} />
            ))
          ) : (
            <p className="col-span-full text-center py-10 text-slate-400">Không tìm thấy sân phù hợp.</p>
          )}
        </div>
      </div>
    </section>
  );
}
