"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { LocationDetail, DetailCourt } from "@/types/court.types";
import { MapPin, Star, Phone, Trash2, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { apiPost } from "@/services/api";

export interface SelectedSlot {
  ma_san: string;
  ten_san: string;
  ngay_dat: string;
  gio_bat_dau: string;
  gio_ket_thuc: string;
  gia_thue: number;
}

interface GroupedSlot {
  ma_san: string;
  ten_san: string;
  ngay_dat: string;
  gio_bat_dau: string;
  gio_ket_thuc: string;
  gia_thue: number;
  slots: SelectedSlot[];
}

function calculateDuration(startTime: string, endTime: string): string {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  
  const diffMinutes = (endH * 60 + endM) - (startH * 60 + startM);
  const hours = Math.floor(diffMinutes / 60);
  const mins = diffMinutes % 60;
  
  const result = [];
  if (hours > 0) result.push(`${hours} tiếng`);
  if (mins > 0) result.push(`${mins} phút`);
  
  return result.length > 0 ? `(${result.join(' ')})` : "";
}

function mergeSelectedSlots(markers: SelectedSlot[]): GroupedSlot[] {
  if (markers.length === 0) return [];
  
  const sorted = [...markers].sort((a, b) => {
    if (a.ma_san !== b.ma_san) return a.ma_san.localeCompare(b.ma_san);
    if (a.ngay_dat !== b.ngay_dat) return a.ngay_dat.localeCompare(b.ngay_dat);
    return a.gio_bat_dau.localeCompare(b.gio_bat_dau);
  });

  const grouped: GroupedSlot[] = [];
  let currentGroup: GroupedSlot | null = null;

  for (const marker of sorted) {
    if (!currentGroup) {
      // First marker in a potential group
      currentGroup = { ...marker, gio_ket_thuc: marker.gio_bat_dau, slots: [marker] };
    } else {
      // Check if this marker is exactly 30 mins after the current group's last marker
      const [lastH, lastM] = currentGroup.gio_ket_thuc.split(':').map(Number);
      const expectedDate = new Date(0, 0, 0, lastH, lastM + 30);
      const expectedTime = `${String(expectedDate.getHours()).padStart(2, '0')}:${String(expectedDate.getMinutes()).padStart(2, '0')}`;

      if (
        currentGroup.ma_san === marker.ma_san &&
        currentGroup.ngay_dat === marker.ngay_dat &&
        marker.gio_bat_dau === expectedTime
      ) {
        currentGroup.gio_ket_thuc = marker.gio_bat_dau;
        currentGroup.slots.push(marker);
      } else {
        // Gap detected, start new group
        grouped.push(currentGroup);
        currentGroup = { ...marker, gio_ket_thuc: marker.gio_bat_dau, slots: [marker] };
      }
    }
  }
  if (currentGroup) grouped.push(currentGroup);

  // After grouping markers, we need to filter out groups with only 1 marker (no duration)
  // because 2 markers = 1 slot (30 mins).
  return grouped.filter(g => g.slots.length > 1);
}

// Sport label map
const SPORT_LABELS: Record<string, string> = {
  "bong-da": "Bóng đá",
  "cau-long": " Cầu lông",
  "pickleball": "Pickleball",
  "bong-ro": "Bóng rổ",
  "tennis": "Tennis",
  "bida": "Bida",
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
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  
  const { user, token } = useAuth() || {};

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  // Today's date string for min attribute
  const todayStr = new Date().toISOString().split("T")[0];

  const handleSlotToggle = (court: DetailCourt, marker: string) => {
    setSelectedSlots(prev => {
      const exists = prev.find(s => s.ma_san === court.ma_san && s.ngay_dat === selectedDate && s.gio_bat_dau === marker);
      if (exists) {
        return prev.filter(s => s !== exists);
      } else {
        return [...prev, {
          ma_san: court.ma_san,
          ten_san: court.ten_san,
          ngay_dat: selectedDate,
          gio_bat_dau: marker,
          gio_ket_thuc: marker, // Temporary, will be merged
          gia_thue: court.gia_thue_30p
        }];
      }
    });
  };

  const removeGroup = (groupToRemove: GroupedSlot) => {
    setSelectedSlots(prev => prev.filter(s => !groupToRemove.slots.includes(s)));
  };

  const groupedSlots = useMemo(() => mergeSelectedSlots(selectedSlots), [selectedSlots]);

  // Ruler Logic: 2 markers = 30 min, 3 markers = 1 hour. 
  // Minimum 1 hour = 3 consecutive markers.
  const invalidGroups = groupedSlots.filter(g => g.slots.length < 3);
  const isInvalid = invalidGroups.length > 0;

  const handleBooking = () => {
    if (selectedSlots.length === 0 || isInvalid) return;
    
    if (!user) {
      toast.error("Vui lòng đăng nhập trước khi đặt sân");
      window.location.href = "/login";
      return;
    }
    
    setIsCheckoutOpen(true);
  };

  const confirmBooking = async () => {
    if (!user || !token) {
      toast.error("Phiên đăng nhập không hợp lệ");
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (paymentMethod === "cash" || paymentMethod === "wallet") {
        setPaymentStatus("Đang xử lý đơn hàng...");
        
        // Convert markers back to 30-min slots for backend
        const slotsForBackend = groupedSlots.flatMap(group => {
          const slots: {
            ma_san: string;
            ten_san: string;
            ngay_dat: string;
            gio_bat_dau: string;
            gio_ket_thuc: string;
            gia_thue: number;
          }[] = [];
          
          for (let i = 0; i < group.slots.length - 1; i++) {
            const currentMarker = group.slots[i];
            const nextMarker = group.slots[i + 1];
            slots.push({
              ma_san: group.ma_san,
              ten_san: group.ten_san,
              ngay_dat: group.ngay_dat,
              gio_bat_dau: currentMarker.gio_bat_dau,
              gio_ket_thuc: nextMarker.gio_bat_dau,
              gia_thue: currentMarker.gia_thue
            });
          }
          return slots;
        });

        console.log("📤 Sending Booking Payload:", { paymentMethod, slotsCount: slotsForBackend.length });

        const payload = {
          ma_nguoi_dung: user.ma_nguoi_dung,
          phuong_thuc_thanh_toan: paymentMethod,
          selectedSlots: slotsForBackend
        };

        const result = await apiPost("/booking", JSON.stringify(payload), token);
        console.log("✅ Booking Success Result:", result);

        toast.success("Đặt sân thành công! Vui lòng kiểm tra lịch sử.");
        setTimeout(() => {
          window.location.href = "/history";
        }, 1500);
      } else if (paymentMethod === "vnpay") {
        setPaymentStatus("Đang kết nối cổng thanh toán VNPAY...");
        // Giả lập gọi API lấy URL VNPAY (POST /api/payments/vnpay)
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.href = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?fake_params=123";
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra khi xử lý.";
      toast.error(errorMessage);
      setIsSubmitting(false);
      setPaymentStatus("");
    }
  };

  const totalPrice = useMemo(() => {
    return groupedSlots.reduce((sum, group) => {
      const slotCount = group.slots.length - 1;
      // gia_thue stored in each marker is price for 30p
      const groupPrice = slotCount * group.slots[0].gia_thue;
      return sum + groupPrice;
    }, 0);
  }, [groupedSlots]);

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
              <Image
                src={location.hinh_anh[activeImage] || "/hero-stadium.png"}
                alt={location.ten_dia_diem}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
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
                <Image
                  src={img}
                  alt={`${location.ten_dia_diem} - ${idx + 2}`}
                  fill
                  sizes="(max-width: 768px) 25vw, 15vw"
                  className="object-cover"
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-6">
              {location.sans.map(court => {
                // Lọc ra các slot đã chọn của sân này trong ngày được chọn
                const courtSelectedSlots = selectedSlots
                  .filter(s => s.ma_san === court.ma_san && s.ngay_dat === selectedDate)
                  .map(s => s.gio_bat_dau);

                return (
                  <CourtCard
                    key={court.ma_san}
                    court={court}
                    isSelected={selectedCourt === court.ma_san}
                    onSelect={() => setSelectedCourt(court.ma_san)}
                    selectedDate={selectedDate}
                    selectedSlots={courtSelectedSlots}
                    onSlotToggle={(slot) => handleSlotToggle(court, slot)}
                  />
                );
              })}
            </div>
            
            {/* Booking Summary (Cart) */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24 shadow-xl shadow-gray-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center justify-between">
                  <span>Giỏ hàng đặt sân</span>
                  <span className="bg-primary text-white text-sm w-6 h-6 rounded-full flex items-center justify-center">
                    {selectedSlots.length}
                  </span>
                </h3>
                
                {groupedSlots.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <p>Chưa có khung giờ nào được chọn.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {groupedSlots.map((group, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">
                            {group.ten_san} | {group.gio_bat_dau} - {group.gio_ket_thuc} | {calculateDuration(group.gio_bat_dau, group.gio_ket_thuc)}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Ngày: {new Date(group.ngay_dat).toLocaleDateString("vi-VN")}
                          </p>
                          <p className="text-sm font-bold text-primary mt-1">{group.gia_thue.toLocaleString()}đ</p>
                        </div>
                        <button 
                          onClick={() => removeGroup(group)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-slate-600 font-medium">Tổng tạm tính</span>
                    <span className="text-2xl font-black text-primary">{totalPrice.toLocaleString()}đ</span>
                  </div>
                  <button
                    onClick={handleBooking}
                    disabled={selectedSlots.length === 0 || isInvalid}
                    className="w-full py-3.5 bg-primary hover:bg-red-600 disabled:bg-gray-300 disabled:text-gray-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/30 disabled:shadow-none"
                  >
                    Tiến hành đặt sân
                  </button>
                  {isInvalid && (
                    <p className="text-red-500 text-xs text-center mt-3 font-medium">
                      * Tối thiểu 1 tiếng / sân
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-slate-900">Xác nhận đơn hàng</h2>
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-8 flex-1">
              {/* Order Summary */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Thông tin sân đã đặt</h3>
                <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                  {groupedSlots.map((group, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-bold text-slate-800">{group.ten_san}</p>
                        <p className="text-xs text-slate-500 mt-1">Ngày: {new Date(group.ngay_dat).toLocaleDateString("vi-VN")} | {group.gio_bat_dau} - {group.gio_ket_thuc}</p>
                      </div>
                      <p className="font-bold text-slate-800">{group.gia_thue.toLocaleString()}đ</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4 px-4">
                  <span className="font-semibold text-slate-600">Tổng tiền</span>
                  <span className="text-lg font-bold text-slate-900">{totalPrice.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between items-center mt-2 px-4 border-t border-gray-200 pt-3">
                  <span className="font-bold text-slate-800">Cọc trước (30%)</span>
                  <span className="text-2xl font-black text-primary">{(totalPrice * 0.3).toLocaleString()}đ</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Phương thức thanh toán</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button 
                    onClick={() => setPaymentMethod("cash")}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${paymentMethod === "cash" ? "border-primary bg-primary/5" : "border-gray-100 bg-white hover:border-gray-200"}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">💵</div>
                    <p className="font-bold text-slate-800 text-sm">Tiền mặt</p>
                    <p className="text-xs text-slate-500 mt-1">Thanh toán tại sân</p>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod("wallet")}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${paymentMethod === "wallet" ? "border-primary bg-primary/5" : "border-gray-100 bg-white hover:border-gray-200"}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">💳</div>
                    <p className="font-bold text-slate-800 text-sm">Ví hệ thống</p>
                    <p className="text-xs text-slate-500 mt-1">Sử dụng số dư ví</p>
                  </button>
                  <button 
                    disabled
                    className="p-4 rounded-2xl border-2 text-left transition-all border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mb-3 font-bold text-xs">VNP</div>
                    <p className="font-bold text-slate-400 text-sm">VNPAY</p>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-tight mt-1">Sắp ra mắt</p>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-10">
              <button
                onClick={confirmBooking}
                disabled={isSubmitting}
                className="w-full py-4 bg-primary hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/30 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{paymentStatus}</span>
                  </>
                ) : (
                  `Xác nhận thanh toán ${(totalPrice * 0.3).toLocaleString()}đ`
                )}
              </button>
            </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-0 gap-y-3">
            {TIME_SLOTS.map((slot, index) => {
              const isActive = selectedSlots.includes(slot);
              const isPrevActive = index > 0 && selectedSlots.includes(TIME_SLOTS[index - 1]);
              const isNextActive = index < TIME_SLOTS.length - 1 && selectedSlots.includes(TIME_SLOTS[index + 1]);

              let radiusClass = "rounded-lg";
              let borderClass = "border";

              if (isActive) {
                if (isPrevActive && isNextActive) {
                  radiusClass = "rounded-none";
                  borderClass = "border-y border-x-0 border-blue-700";
                } else if (isPrevActive && !isNextActive) {
                  radiusClass = "rounded-r-lg rounded-l-none";
                  borderClass = "border border-l-0 border-blue-700";
                } else if (!isPrevActive && isNextActive) {
                  radiusClass = "rounded-l-lg rounded-r-none";
                  borderClass = "border border-r-0 border-blue-700";
                } else {
                  borderClass = "border border-blue-700";
                }
              }

              return (
                <button
                  key={slot}
                  onClick={() => onSlotToggle(slot)}
                  className={`px-1 py-2 text-xs font-medium transition-all ${radiusClass} ${borderClass} ${
                    isActive
                      ? "bg-blue-700 text-white shadow-sm z-10 relative" // Đổi màu xanh đậm
                      : "bg-white text-slate-600 hover:bg-primary/5 hover:border-primary/30 border-gray-200 m-0.5 rounded-lg z-0"
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
