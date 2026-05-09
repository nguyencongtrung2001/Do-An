"use client";

import { LocationDetail } from "@/types/court.types";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { useBooking } from "@/hooks/useBooking";

// Sub-components
import CourtGallery from "./CourtGallery";
import CourtHeader from "./CourtHeader";
import CourtList from "../Booking/CourtList";
import BookingCart from "../Booking/BookingCart";
import CheckoutModal from "../Booking/CheckoutModal";

interface CourtDetailProps {
  location: LocationDetail;
}

export default function CourtDetail({ location }: CourtDetailProps) {
  const { user } = useAuth() || {};
  
  const {
    selectedDate,
    setSelectedDate,
    selectedCourt,
    setSelectedCourt,
    selectedSlots,
    handleSlotToggle,
    removeGroup,
    groupedSlots,
    isInvalid,
    totalPrice,
    isCheckoutOpen,
    setIsCheckoutOpen,
    isSubmitting,
    paymentStatus,
    confirmBooking,
  } = useBooking();

  const handleCheckoutClick = () => {
    if (selectedSlots.length === 0 || isInvalid) return;
    
    if (!user) {
      toast.error("Vui lòng đăng nhập trước khi đặt sân");
      window.location.href = "/login";
      return;
    }
    
    setIsCheckoutOpen(true);
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-12">
      <CourtGallery images={location.hinh_anh} locationName={location.ten_dia_diem} />
      <CourtHeader location={location} />

      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Chọn sân & đặt giờ</h2>

          {/* Date Picker */}
          <div className="flex items-center gap-4 mb-8">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">calendar_today</span>
              Ngày đặt:
            </label>
            <input
              type="date"
              value={selectedDate}
              min={todayStr}
              onChange={e => setSelectedDate(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CourtList
              location={location}
              selectedDate={selectedDate}
              selectedCourt={selectedCourt}
              onCourtSelect={setSelectedCourt}
              selectedSlots={selectedSlots}
              onSlotToggle={handleSlotToggle}
            />
            
            <div className="lg:col-span-1">
              <BookingCart
                groupedSlots={groupedSlots}
                totalPrice={totalPrice}
                onRemoveGroup={removeGroup}
                onCheckout={handleCheckoutClick}
                isInvalid={isInvalid}
                selectedSlotsCount={selectedSlots.length}
              />
            </div>
          </div>
        </div>
      </section>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        groupedSlots={groupedSlots}
        totalPrice={totalPrice}
        onConfirm={confirmBooking}
        isSubmitting={isSubmitting}
        paymentStatus={paymentStatus}
      />
    </div>
  );
}
