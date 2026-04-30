"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Hàm cập nhật tâm bản đồ khi click
function RecenterMap({ lat, lng }: { lat: number, lng: number }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.flyTo([lat, lng], 15);
  }, [lat, lng, map]);
  return null;
}

import type { CourtMapData } from "@/types/court.types";

interface MapViewProps {
  courts: CourtMapData[];
  onMarkerClick: (court: CourtMapData) => void;
  activeId?: number;
}

export default function MapView({ courts, onMarkerClick, activeId }: MapViewProps) {
  const customIcon = (isActive: boolean) => L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-icon ${isActive ? 'active' : ''}" style="color: #ec1313; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <span class="material-symbols-outlined" style="font-size: 36px; font-variation-settings: 'FILL' 1">location_on</span>
      </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });

  return (
    <MapContainer 
      center={[16.0544, 108.2022]} 
      zoom={13} 
      className="h-full w-full z-0"
      zoomControl={false}
    >
      <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />
      
      {courts.map((court: any) => (
        <Marker 
          key={court.id} 
          position={[court.lat, court.lng]} 
          icon={customIcon(activeId === court.id)}
          eventHandlers={{ click: () => onMarkerClick(court) }}
        />
      ))}

      {activeId !== undefined && courts.find((c) => c.id === activeId) && (
        <RecenterMap 
            lat={courts.find((c) => c.id === activeId)!.lat} 
            lng={courts.find((c) => c.id === activeId)!.lng} 
        />
      )}
    </MapContainer>
  );
}