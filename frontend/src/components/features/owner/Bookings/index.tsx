"use client";

import { useState, useMemo } from "react";
import { useOwnerBookings } from "@/hooks/useOwnerBookings";
import { BookingDetail } from "@/types/booking.types";
import toast from "react-hot-toast";

// Sub-components
import TimelineHeader from "./Timeline/TimelineHeader";
import TimelineGrid from "./Timeline/TimelineGrid";
import BookingCard from "./BookingList/BookingCard";
import CheckinModal from "./CheckinModal";

export default function OwnerBookingsClient() {
  const { bookings, courts, loading, updateBookingStatus } = useOwnerBookings();
  
  const [dateStr, setDateStr] = useState<string>(() => new Date().toISOString().split("T")[0]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [checkinData, setCheckinData] = useState<BookingDetail | null>(null);

  // Stats for the header
  const filteredByDate = useMemo(() => {
    return bookings.filter(b => {
      const bDate = new Date(b.ngay_dat).toISOString().split("T")[0];
      return bDate === dateStr;
    });
  }, [bookings, dateStr]);

  const countsByStatus = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredByDate.forEach(b => {
      counts[b.trang_thai_dat] = (counts[b.trang_thai_dat] || 0) + 1;
    });
    return counts;
  }, [filteredByDate]);

  const filteredBookings = useMemo(() => {
    return statusFilter === "all"
      ? filteredByDate
      : filteredByDate.filter(b => b.trang_thai_dat === statusFilter);
  }, [filteredByDate, statusFilter]);

  const handleStatusUpdate = async (id: string, status: string) => {
    const success = await updateBookingStatus(id, status);
    if (success) {
      setCheckinData(null);
      toast.success(`Đã cập nhật trạng thái: ${status}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30 pb-12">
      <TimelineHeader
        dateStr={dateStr}
        onDateChange={setDateStr}
        statusFilter={statusFilter}
        onFilterChange={setStatusFilter}
        counts={countsByStatus}
        totalCount={filteredByDate.length}
      />

      <TimelineGrid
        courts={courts}
        bookings={filteredByDate}
        loading={loading}
      />

      <section className="px-8 mt-4">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined font-black">list_alt</span>
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Chi tiết danh sách đặt chỗ</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Ngày: {dateStr}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.length === 0 ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">event_busy</span>
                <p className="text-slate-500 font-bold">Không có yêu cầu đặt sân nào.</p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.ma_dat_san_chi_tiet}
                  booking={booking}
                  onUpdateStatus={handleStatusUpdate}
                  onCheckin={setCheckinData}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <CheckinModal
        isOpen={!!checkinData}
        onClose={() => setCheckinData(null)}
        booking={checkinData}
        onConfirm={handleStatusUpdate}
      />
    </div>
  );
}
