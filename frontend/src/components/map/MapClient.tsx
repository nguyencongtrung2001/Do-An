"use client";

import { useState, useEffect } from "react";
import MapView from "./MapView";
import Sidebar from "./Sidebar";
import DetailCard from "./DetailCard";
import FilterPills from "./FilterPills";

export interface CourtMapData {
  id: number;
  name: string;
  sport: string;
  lat: number;
  lng: number;
  distance: string;
  address: string;
  price: string;
  rating: string;
  image: string;
  slug: string;
}

export default function MapClient() {
  const [filter, setFilter] = useState("all");
  const [selectedCourt, setSelectedCourt] = useState<CourtMapData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courts, setCourts] = useState<CourtMapData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/field")
      .then(res => res.json())
      .then(data => {
        interface ApiCourt {
          ma_san: string | number;
          ten_san: string;
          loai_the_thao: string;
          so_sao: number;
          ten_dia_diem: string;
          dia_chi: string;
          anh_dai_dien?: string;
          vi_do?: number | null;
          kinh_do?: number | null;
          gia_thue_30p?: number;
        }

        const mappedCourts = data.map((item: ApiCourt) => {
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

          const pricePerHour = item.gia_thue_30p ? item.gia_thue_30p * 2 : 0;
          const priceFormatted = pricePerHour >= 1000 ? `${pricePerHour / 1000}K/giờ` : `${pricePerHour}đ/giờ`;

          return {
            id: typeof item.ma_san === 'string' ? parseInt(item.ma_san.replace(/[^0-9]/g, '') || '0') : item.ma_san,
            name: item.ten_san,
            sport: normalizeSport(item.loai_the_thao),
            lat: item.vi_do || 16.0544,
            lng: item.kinh_do || 108.2022,
            distance: "Đang tính...", // Can calculate later if we get user's location
            address: item.dia_chi || "Chưa có địa chỉ",
            price: priceFormatted,
            rating: item.so_sao ? item.so_sao.toFixed(1) : "0.0",
            image: item.anh_dai_dien || "/images/categories/soccer.png",
            slug: String(item.ma_san)
          };
        });
        
        // Lọc các sân có vĩ độ/kinh độ hợp lệ nếu cần, ở đây default fallback là 16.0544, 108.2022
        setCourts(mappedCourts);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi tải danh sách sân map:", err);
        setLoading(false);
      });
  }, []);

  const filteredCourts = filter === "all" 
    ? courts 
    : courts.filter(c => c.sport === filter);

  const handleSelectCourt = (court: CourtMapData) => {
    setSelectedCourt(court);
  };

  if (loading) {
    return <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-[#1a1313]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  return (
    <>
      <MapView 
        courts={filteredCourts} 
        onMarkerClick={handleSelectCourt} 
        activeId={selectedCourt?.id}
      />
      
      <FilterPills 
        currentFilter={filter} 
        onFilterChange={(f: string) => {
          setFilter(f);
          setIsSidebarOpen(f !== "all");
        }} 
      />

      <Sidebar 
        isOpen={isSidebarOpen} 
        courts={filteredCourts} 
        onClose={() => setIsSidebarOpen(false)}
        onSelect={handleSelectCourt}
        activeId={selectedCourt?.id}
      />

      {selectedCourt && (
        <DetailCard 
          court={selectedCourt} 
          onClose={() => setSelectedCourt(null)} 
        />
      )}
    </>
  );
}