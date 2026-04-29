"use client";

import { useState } from "react";
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

// Dữ liệu mẫu (Bạn có thể fetch từ API sau này)
const COURTS_DATA: CourtMapData[] = [
  { id: 0, name: "Sân bóng đá Mini Sơn Trà", sport: "bong-da", lat: 16.0720, lng: 108.2300, distance: "1.2 km", address: "15 Ngô Quyền, Sơn Trà, Đà Nẵng", price: "200K/giờ", rating: "4.8", image: "/images/stadium-1.jpg", slug: "san-bong-da-k34" },
  { id: 1, name: "Sân Tennis Đà Nẵng", sport: "tennis", lat: 16.0470, lng: 108.2130, distance: "2.5 km", address: "62 Phan Đăng Lưu, Hải Châu, Đà Nẵng", price: "250K/giờ", rating: "4.5", image: "/images/stadium-2.jpg", slug: "san-cau-long-victor" },
];

export default function MapClient() {
  const [filter, setFilter] = useState("all");
  const [selectedCourt, setSelectedCourt] = useState<CourtMapData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredCourts = filter === "all" 
    ? COURTS_DATA 
    : COURTS_DATA.filter(c => c.sport === filter);

  const handleSelectCourt = (court: CourtMapData) => {
    setSelectedCourt(court);
    // Nếu chọn sân từ sidebar thì có thể đóng bớt overlay tùy ý
  };

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