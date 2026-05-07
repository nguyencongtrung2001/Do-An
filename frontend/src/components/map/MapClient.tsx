"use client";

import { useState, useEffect } from "react";
import MapView from "./MapView";
import Sidebar from "./Sidebar";
import DetailCard from "./DetailCard";
import FilterPills from "./FilterPills";
import { courtService } from "@/services/court.service";
import type { LocationMapData } from "@/types/court.types";

export default function MapClient() {
  const [filter, setFilter] = useState("all");
  const [locations, setLocations] = useState<LocationMapData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<LocationMapData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const data = await courtService.getMapLocations(filter);
        if (isMounted) {
          setLocations(data);
        }
      } catch (err) {
        console.error("Lỗi khi tải danh sách địa điểm:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchLocations();
    return () => { isMounted = false; };
  }, [filter]);

  const handleSelectLocation = (location: LocationMapData) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <MapView 
        locations={locations} 
        onMarkerClick={handleSelectLocation} 
        activeId={selectedLocation?.ma_dia_diem}
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
        locations={locations} 
        onClose={() => setIsSidebarOpen(false)}
        onSelect={handleSelectLocation}
        activeId={selectedLocation?.ma_dia_diem}
      />

      {selectedLocation && (
        <DetailCard 
          location={selectedLocation} 
          onClose={() => setSelectedLocation(null)} 
        />
      )}
    </>
  );
}
