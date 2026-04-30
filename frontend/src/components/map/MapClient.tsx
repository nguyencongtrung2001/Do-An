"use client";

import { useState } from "react";
import MapView from "./MapView";
import Sidebar from "./Sidebar";
import DetailCard from "./DetailCard";
import FilterPills from "./FilterPills";
import { useFields } from "@/hooks/useFields";
import type { CourtMapData } from "@/types/court.types";

export default function MapClient() {
  const [filter, setFilter] = useState("all");
  const [selectedCourt, setSelectedCourt] = useState<CourtMapData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { mapItems: courts, loading } = useFields();

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
