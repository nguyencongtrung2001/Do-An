"use client";

import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";

// Fix leaflet default icon issue in Next.js
// @ts-expect-error - _getIconUrl is a private property in Leaflet's Icon.Default prototype
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface VenueMapSelectorProps {
  onLocationSelect: (lat: number, lng: number) => void;
  defaultLat?: number;
  defaultLng?: number;
}

const DEFAULT_CENTER: [number, number] = [16.0544, 108.2022]; // Da Nang default

function MapUpdater({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15);
    }
  }, [center, map]);
  return null;
}

export default function VenueMapSelector({ onLocationSelect, defaultLat, defaultLng }: VenueMapSelectorProps) {
  const [position, setPosition] = useState<[number, number]>(
    defaultLat && defaultLng ? [defaultLat, defaultLng] : DEFAULT_CENTER
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const markerRef = useRef<L.Marker>(null);

  const provider = new OpenStreetMapProvider({
    params: {
      "accept-language": "vi", // Prefer Vietnamese results
      countrycodes: "vn", // Restrict to Vietnam
    },
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await provider.search({ query: searchQuery });
      if (results && results.length > 0) {
        const firstResult = results[0];
        const newPos: [number, number] = [firstResult.y, firstResult.x];
        setPosition(newPos);
        onLocationSelect(Number(firstResult.y.toFixed(8)), Number(firstResult.x.toFixed(8)));
      } else {
        alert("Không tìm thấy địa chỉ. Vui lòng thử lại với từ khóa khác.");
      }
    } catch (error) {
      console.error("Geosearch error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleDragEnd = () => {
    const marker = markerRef.current;
    if (marker != null) {
      const latLng = marker.getLatLng();
      const newPos: [number, number] = [latLng.lat, latLng.lng];
      setPosition(newPos);
      onLocationSelect(Number(latLng.lat.toFixed(8)), Number(latLng.lng.toFixed(8)));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2 transition-all duration-200 bg-gray-50/50 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/10">
          <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
            placeholder="Tìm kiếm địa chỉ trên bản đồ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          type="button"
          onClick={handleSearch}
          disabled={isSearching}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center disabled:opacity-50"
        >
          {isSearching ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Tìm"
          )}
        </button>
      </div>
      
      <div className="relative w-full h-[300px] rounded-xl overflow-hidden border border-gray-200 z-0">
        <MapContainer center={position} zoom={13} style={{ width: "100%", height: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={position} />
          <Marker 
            position={position} 
            draggable={true} 
            ref={markerRef} 
            eventHandlers={{ dragend: handleDragEnd }}
          />
        </MapContainer>
      </div>
      <p className="text-xs text-slate-500 flex items-center gap-1.5">
        <span className="material-symbols-outlined text-sm text-amber-500">lightbulb</span>
        Kéo thả ghim đỏ trên bản đồ để chọn chính xác vị trí sân của bạn.
      </p>
    </div>
  );
}
