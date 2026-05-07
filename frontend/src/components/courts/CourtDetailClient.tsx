"use client";

import { useState, useMemo } from "react";
import type { LocationDetail, DetailCourt } from "@/types/court.types";
import { MapPin, Star, Wifi, Car, Coffee, Phone, Clock } from "lucide-react";

// Sport label map
const SPORT_LABELS: Record<string, string> = {
  "bong-da": "⚽ Bóng đá",
  "cau-long": "🏸 Cầu lông",
  "pickleball": "🏓 Pickleball",
  "bong-ro": "🏀 Bóng rổ",
  "tennis": "🎾 Tennis",
  "bida": "🎱 Bida",
};

// Generate time slots (6:00 - 22:00, 30-min intervals)
const TIME_SLOTS = Array.from({ length: 32 }, (_, i) => {
  const hour = Math.floor(i / 2) + 6;
  const minute = i % 2 === 0 ? "00" : "30";
  return `${String(hour).padStart(2, "0")}:${minute}`;
});

interface CourtDetailClientProps {
  location: LocationDetail;
}

export default function CourtDetailClient({ location }: CourtDetailClientProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  // Today's date string for min attribute
  const todayStr = new Date().toISOString().split("T")[0];

  const handleSlotToggle = (slot: string) => {
    setSelectedSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const handleBooking = () => {
    if (!selectedCourt || selectedSlots.length === 0) return;
    const court = location.sans.find(c => c.ma_san === selectedCourt);
    if (!court) return;

    // Build query params for checkout page
    const params = new URLSearchParams({
      ma_san: selectedCourt,
      ten_san: court.ten_san,
      slots: selectedSlots.join(","),
      date: selectedDate,
      gia: String(court.gia_thue_30p),
    });

    // Navigate to checkout — adjust path as needed
    window.location.href = `/checkout?${params.toString()}`;
  };

  const totalPrice = useMemo(() => {
    const court = location.sans.find(c => c.ma_san === selectedCourt);
    if (!court) return 0;
    return court.gia_thue_30p * selectedSlots.length;
  }, [selectedCourt, selectedSlots, location.sans]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ===== PART 1: Image Gallery ===== */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[300px] md:h-[450px] rounded-2xl overflow-hidden">
            {/* Main large image */}
            <div
              className="md:col-span-2 md:row-span-2 relative group cursor-pointer rounded-xl overflow-hidden"
              onClick={() => setActiveImage(0)}
            >
              <img
                src={location.hinh_anh[activeImage] || "/hero-stadium.png"}
                alt={location.ten_dia_diem}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Thumbnail images */}
            {location.hinh_anh.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  activeImage === idx + 1
                    ? "ring-4 ring-primary shadow-lg"
                    : "hover:ring-2 hover:ring-primary/50"
                }`}
                onClick={() => setActiveImage(idx + 1)}
              >
                <img
                  src={img}
                  alt={`${location.ten_dia_diem} - ${idx + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Image counter */}
          {location.hinh_anh.length > 1 && (
            <div className="flex items-center justify-center mt-3 text-sm text-slate-500">
              <span className="material-symbols-outlined text-base mr-1">photo_library</span>
              {location.hinh_anh.length} ảnh
            </div>
          )}
        </div>
      </section>

      {/* ===== PART 2: Location Header ===== */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
                {location.ten_dia_diem}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{location.dia_chi}</span>
                </div>
                {location.so_dien_thoai && (
                  <>
                    <span className="w-1 h-1 bg-slate-400 rounded-full" />
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{location.so_dien_thoai}</span>
                    </div>
                  </>
                )}
                <span className="w-1 h-1 bg-slate-400 rounded-full" />
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-slate-900 font-bold">{location.danh_gia_tb}</span>
                  <span className="text-slate-500">({location.so_danh_gia} đánh giá)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Đang mở cửa
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PART 3: Info & Description ===== */}
      {location.mo_ta && (
        <section className="w-full bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Giới thiệu</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{location.mo_ta}</p>
          </div>
        </section>
      )}

      {/* Amenities */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Tiện ích</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Wifi, label: "Wifi miễn phí" },
              { icon: Car, label: "Gửi xe" },
              { icon: Coffee, label: "Nước uống" },
              { icon: Clock, label: "Mở cửa 6h - 22h" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
              >
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-slate-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PART 4: Court List & Booking ===== */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Chọn sân & đặt giờ</h2>

          {/* Date Picker */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <CalendarIcon />
              Ngày đặt:
            </label>
            <input
              type="date"
              value={selectedDate}
              min={todayStr}
              onChange={e => setSelectedDate(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          {/* Courts */}
          <div className="space-y-6">
            {location.sans.map(court => (
              <CourtCard
                key={court.ma_san}
                court={court}
                isSelected={selectedCourt === court.ma_san}
                onSelect={() => {
                  setSelectedCourt(court.ma_san);
                  setSelectedSlots([]);
                }}
                selectedDate={selectedDate}
                selectedSlots={selectedCourt === court.ma_san ? selectedSlots : []}
                onSlotToggle={handleSlotToggle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Booking Bar */}
      {selectedCourt && selectedSlots.length > 0 && (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {location.sans.find(c => c.ma_san === selectedCourt)?.ten_san} — {selectedSlots.length} khung giờ
              </p>
              <p className="text-xl font-bold text-primary">{totalPrice.toLocaleString()}đ</p>
            </div>
            <button
              onClick={handleBooking}
              className="px-8 py-3 bg-primary hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/30 active:scale-[0.98]"
            >
              Đặt ngay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== Sub-components ===== */

function CalendarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

interface CourtCardProps {
  court: DetailCourt;
  isSelected: boolean;
  onSelect: () => void;
  selectedDate: string;
  selectedSlots: string[];
  onSlotToggle: (slot: string) => void;
}

function CourtCard({ court, isSelected, onSelect, selectedDate, selectedSlots, onSlotToggle }: CourtCardProps) {
  return (
    <div
      className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-gray-100 bg-white hover:border-gray-200"
      }`}
    >
      {/* Court header */}
      <button
        onClick={onSelect}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
            isSelected ? "bg-primary text-white" : "bg-gray-100"
          }`}>
            {court.loai_the_thao === "bong-da" ? "⚽" :
             court.loai_the_thao === "cau-long" ? "🏸" :
             court.loai_the_thao === "pickleball" ? "🏓" :
             court.loai_the_thao === "bong-ro" ? "🏀" : "🏟️"}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{court.ten_san}</h3>
            <p className="text-xs text-slate-500">{SPORT_LABELS[court.loai_the_thao] || court.loai_the_thao}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary">{court.gia_thue_30p.toLocaleString()}đ</p>
          <p className="text-xs text-slate-400">/30 phút</p>
        </div>
      </button>

      {/* Time slots — shown when court is selected */}
      {isSelected && (
        <div className="px-6 pb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Khung giờ — {new Date(selectedDate).toLocaleDateString("vi-VN")}
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {TIME_SLOTS.map(slot => {
              const isActive = selectedSlots.includes(slot);
              return (
                <button
                  key={slot}
                  onClick={() => onSlotToggle(slot)}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-50 text-slate-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
