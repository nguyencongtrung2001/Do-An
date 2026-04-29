"use client";

import { useState, useEffect } from "react";
import CourtCard from "../shared/CourtCard";

// 1. Định nghĩa cấu trúc Filter để dễ quản lý
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

  // Define a type for the court state based on what CourtCard expects
  interface CourtItem {
    id: string | number;
    name: string;
    sport: string;
    rating: number;
    location: string;
    imageUrl: string;
    slug: string;
    price: string;
    isHot: boolean;
  }
  
  const [courts, setCourts] = useState<CourtItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/field")
      .then(res => res.json())
      .then(data => {
        // Define a type for the API response item
        interface ApiCourt {
          ma_san: string | number;
          ten_san: string;
          loai_the_thao: string;
          so_sao: number;
          ten_dia_diem: string;
          gia_thue_30p?: number | string;
        }
        
        const mappedCourts = data.map((item: ApiCourt) => {
          // Normalize sport type to match filter ID
          const normalizeSport = (sport: string) => {
            const normalized = sport?.toLowerCase() || "";
            if (normalized.includes("đá")) return "bong-da";
            if (normalized.includes("lông")) return "cau-long";
            if (normalized.includes("rổ")) return "bong-ro";
            if (normalized.includes("tennis")) return "tennis";
            if (normalized.includes("pickleball")) return "pickleball";
            if (normalized.includes("bida")) return "bida";
            return normalized;
          };

          const pricePerHour = item.gia_thue_30p ? Number(item.gia_thue_30p) * 2 : 0;
          const priceFormatted = pricePerHour >= 1000 
            ? `${pricePerHour / 1000}K` 
            : `${pricePerHour}đ`;

          return {
            id: item.ma_san,
            name: item.ten_san,
            sport: normalizeSport(item.loai_the_thao),
            rating: item.so_sao,
            location: `${item.ten_dia_diem}`, 
            imageUrl: "/images/categories/soccer.png", 
            slug: item.ma_san,
            price: priceFormatted,
            isHot: item.so_sao >= 4.5
          };
        });
        setCourts(mappedCourts);
      })
      .catch(err => {
        console.error("Lỗi khi tải danh sách sân:", err);
      });
  }, []);

  // Hàm helper để viết hoa chữ cái đầu (Senior Tip: Tách logic xử lý chuỗi)
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const filteredCourts = filter === "all" 
    ? courts 
    : courts.filter(court => court.sport === filter);

  return (
    <section className="w-full flex flex-col gap-10">
      <div>
        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-2xl font-bold">Sân bóng phổ biến</h2>

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
                {/* Render Icon */}
                <span className="flex items-center justify-center">
                    {item.icon}
                </span>
                
                {/* Render Label đã được viết hoa */}
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