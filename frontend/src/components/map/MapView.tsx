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

import type { LocationMapData } from "@/types/court.types";
import { Popup } from "react-leaflet";

interface MapViewProps {
  locations: LocationMapData[];
  onMarkerClick: (location: LocationMapData) => void;
  activeId?: string;
}

export default function MapView({ locations, onMarkerClick, activeId }: MapViewProps) {
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
      
      {locations.map((loc) => (
        <Marker 
          key={loc.ma_dia_diem} 
          position={[loc.lat, loc.lng]} 
          icon={customIcon(activeId === loc.ma_dia_diem)}
          eventHandlers={{ click: () => onMarkerClick(loc) }}
        >
          <Popup closeButton={false} offset={[0, -25]}>
            <div className="w-48 p-1">
              <h3 className="font-bold text-slate-900 mb-1">{loc.ten_dia_diem}</h3>
              <p className="text-xs text-slate-500 mb-2 truncate">{loc.dia_chi}</p>
              <div className="flex flex-wrap gap-1">
                {loc.sports.map((sport, index) => (
                  <span key={index} className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded-md">
                    {sport}
                  </span>
                ))}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {activeId !== undefined && locations.find((c) => c.ma_dia_diem === activeId) && (
        <RecenterMap 
            lat={locations.find((c) => c.ma_dia_diem === activeId)!.lat} 
            lng={locations.find((c) => c.ma_dia_diem === activeId)!.lng} 
        />
      )}
    </MapContainer>
  );
}