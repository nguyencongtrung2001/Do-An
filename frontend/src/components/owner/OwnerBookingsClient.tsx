"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Types
type BookingStatus = "Chờ xử lý" | "Đã xác nhận" | "Đã nhận sân" | "Đã hủy" | "Đã đặt cọc";

interface BookingDetail {
  ma_dat_san_chi_tiet: string;
  ma_dat_san: string;
  ma_san: string;
  ngay_dat: string;
  gio_bat_dau: string;
  gio_ket_thuc: string;
  tien_coc: number;
  tien_con_lai: number;
  trang_thai_dat: string;
  san: {
    ten_san: string;
    ma_san: string;
  };
  datsan: {
    tong_tien: number;
    nguoidung: {
      ho_ten: string;
      so_dien_thoai: string;
    };
    ngay_tao: string;
  };
}

const SPORT_COLORS: Record<string, string> = {
  "Đã xác nhận": "confirmed",
  "Đã đặt cọc": "deposited",
  "Chờ xử lý": "pending",
  "Đã nhận sân": "checked-in",
  "Đã hủy": "cancelled"
};

export default function OwnerBookingsClient() {
  const { token } = useAuth();
  const [dateStr, setDateStr] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [bookings, setBookings] = useState<BookingDetail[]>([]);
  const [courts, setCourts] = useState<{ma_san: string, ten_san: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkinData, setCheckinData] = useState<BookingDetail | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "transfer">("cash");
  const [showToast, setShowToast] = useState(false);

  const fetchBookings = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/owner/my-bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
        // Extract unique courts for the timeline
        const uniqueCourts = Array.from(new Set(data.bookings.map((b: any) => JSON.stringify({ ma_san: b.san.ma_san, ten_san: b.san.ten_san }))))
          .map((s: any) => JSON.parse(s));
        
        // If no bookings, we might still want to show all courts of this owner
        // For now, just use courts from bookings or a separate API if needed
        setCourts(uniqueCourts);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const prevDay = () => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() - 1);
    setDateStr(d.toISOString().split("T")[0]);
  };

  const nextDay = () => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + 1);
    setDateStr(d.toISOString().split("T")[0]);
  };

  const handleOpenCheckin = (booking: BookingDetail) => {
    setCheckinData(booking);
    setPaymentMethod("cash");
  };

  const handleCloseCheckin = () => {
    setCheckinData(null);
  };

  const handleConfirmStatus = async (id: string, status: string) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:3000/owner/update-booking-status/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setBookings(prev => prev.map(b => b.ma_dat_san_chi_tiet === id ? { ...b, trang_thai_dat: status } : b));
        if (status === "Đã nhận sân") {
          handleCloseCheckin();
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const formatVND = (n: number) => {
    return Number(n).toLocaleString("vi-VN") + "đ";
  };

  const getTimelineColumn = (timeStr: string) => {
    // ISO string or HH:mm:ss
    const date = new Date(timeStr);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return (hour - 5) * 2 + (minute >= 30 ? 1 : 0) + 2;
  };

  const getTimelineSpan = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    return Math.round(diffMins / 30);
  };

  // Filter bookings for the selected date
  const filteredBookings = bookings.filter(b => {
      const bDate = new Date(b.ngay_dat).toISOString().split('T')[0];
      return bDate === dateStr;
  });

  const countConfirmed = filteredBookings.filter((n) => n.trang_thai_dat === "Đã xác nhận").length;
  const countDeposited = filteredBookings.filter((n) => n.trang_thai_dat === "Đã đặt cọc").length;
  const countPending = filteredBookings.filter((n) => n.trang_thai_dat === "Chờ xử lý").length;
  const countCheckedIn = filteredBookings.filter((n) => n.trang_thai_dat === "Đã nhận sân").length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Lịch đặt sân</h2>
          <p className="text-sm text-slate-400">Theo dõi danh sách đặt sân theo thời gian thực</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={prevDay}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors scroll-m-0"
          >
            <span className="material-symbols-outlined text-slate-600 text-lg">chevron_left</span>
          </button>
          <input
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold outline-none focus:border-primary transition-all"
          />
          <button
            onClick={nextDay}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors scroll-m-0"
          >
            <span className="material-symbols-outlined text-slate-600 text-lg">chevron_right</span>
          </button>
        </div>
      </header>

      {/* TIMELINE AREA */}
      <div className="p-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="timeline-wrapper overflow-x-auto">
            {/* Header row */}
            <div className="timeline-grid bg-gray-50 border-b border-gray-200 min-w-[1200px]">
              <div className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center sticky left-0 bg-gray-50 z-10 border-r border-gray-200 w-40">
                <span className="material-symbols-outlined text-sm mr-1">stadium</span> Sân
              </div>
              {Array.from({ length: 17 }).map((_, i) => {
                const hour = i + 5;
                return (
                  <div key={hour} className="contents">
                    <div className="px-1 py-3 text-[10px] font-bold text-slate-400 text-center th-hour">{hour}:00</div>
                    <div className="px-1 py-3 text-[10px] font-medium text-slate-300 text-center th-half">:30</div>
                  </div>
                );
              })}
            </div>

            {/* Rows for each court */}
            {courts.length === 0 ? (
                <div className="p-10 text-center text-slate-400 text-sm">Chưa có dữ liệu sân hoặc lịch đặt trong ngày này.</div>
            ) : courts.map(court => (
                <div key={court.ma_san} className="timeline-grid hover:bg-gray-50/30 transition-colors min-w-[1200px]">
                    <div className="px-4 py-3 flex items-center gap-2 border-r border-gray-100 bg-gray-50/50 sticky left-0 z-10 w-40">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-sm font-bold text-slate-700 truncate">{court.ten_san}</span>
                    </div>
                    {/* Render booking blocks */}
                    {filteredBookings.filter(b => b.ma_san === court.ma_san).map(booking => {
                        const startCol = getTimelineColumn(booking.gio_bat_dau);
                        const span = getTimelineSpan(booking.gio_bat_dau, booking.gio_ket_thuc);
                        const statusClass = SPORT_COLORS[booking.trang_thai_dat] || "pending";
                        
                        return (
                            <div 
                                key={booking.ma_dat_san_chi_tiet}
                                className={`booking-block ${statusClass}`}
                                style={{ gridColumn: `${startCol} / span ${span}` }}
                            >
                                <span>{booking.datsan.nguoidung.ho_ten}</span>
                                <div className="tooltip-content absolute top-full left-0 mt-2 bg-slate-900 text-white p-3 rounded-xl shadow-xl z-50 min-w-[200px]">
                                    <p className="font-bold text-sm mb-1">{booking.datsan.nguoidung.ho_ten}</p>
                                    <p className="text-xs text-slate-300">📞 {booking.datsan.nguoidung.so_dien_thoai}</p>
                                    <p className="text-xs text-slate-300 mt-1">⏰ {new Date(booking.gio_bat_dau).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(booking.gio_ket_thuc).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                    <p className="text-xs mt-1">
                                        <span className="px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-bold">{booking.trang_thai_dat}</span>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT BOOKINGS */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
              <h3 className="text-sm font-bold text-slate-900">Danh sách đặt chỗ ({dateStr})</h3>
            </div>
            <div className="flex items-center gap-3 flex-wrap text-[10px] font-bold uppercase tracking-wider">
              <span className="px-2 py-1 bg-green-50 text-green-700 rounded">Xác nhận: {countConfirmed}</span>
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">Đặt cọc: {countDeposited}</span>
              <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded">Chờ: {countPending}</span>
              <span className="px-2 py-1 bg-violet-50 text-violet-700 rounded">Nhận sân: {countCheckedIn}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.length === 0 ? (
                <div className="col-span-full py-10 text-center text-slate-400 text-sm">Không có ca đặt chỗ nào cho ngày này.</div>
            ) : filteredBookings.map((booking) => {
              const statusClass = SPORT_COLORS[booking.trang_thai_dat] || "pending";
              const isPending = booking.trang_thai_dat === "Chờ xử lý";
              const isConfirmed = booking.trang_thai_dat === "Đã xác nhận";
              const isDeposited = booking.trang_thai_dat === "Đã đặt cọc";

              return (
                <div key={booking.ma_dat_san_chi_tiet} className={`p-4 rounded-xl border border-gray-100 bg-gray-50/30 hover:shadow-md transition-all`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-slate-900">{booking.datsan.nguoidung.ho_ten}</p>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${statusClass}`}>
                      {booking.trang_thai_dat}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{booking.san.ten_san} • {new Date(booking.gio_bat_dau).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(booking.gio_ket_thuc).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  <p className="text-xs text-slate-400 mb-3">📞 {booking.datsan.nguoidung.so_dien_thoai}</p>
                  
                  <div className="flex items-center justify-between gap-2">
                    {isPending && (
                        <div className="flex gap-2">
                            <button onClick={() => handleConfirmStatus(booking.ma_dat_san_chi_tiet, "Đã xác nhận")} className="text-[10px] bg-green-500 text-white px-3 py-1 rounded-lg font-bold">Xác nhận</button>
                            <button onClick={() => handleConfirmStatus(booking.ma_dat_san_chi_tiet, "Đã hủy")} className="text-[10px] bg-red-100 text-red-600 px-3 py-1 rounded-lg font-bold">Hủy</button>
                        </div>
                    )}
                    {isDeposited && (
                        <button onClick={() => handleOpenCheckin(booking)} className="text-[10px] bg-violet-500 text-white px-3 py-1 rounded-lg font-bold">Nhận sân</button>
                    )}
                    {isConfirmed && (
                         <button onClick={() => handleOpenCheckin(booking)} className="text-[10px] bg-violet-500 text-white px-3 py-1 rounded-lg font-bold">Nhận sân</button>
                    )}
                    <span className="text-[10px] text-slate-400 ml-auto">
                        {new Date(booking.datsan.ngay_tao).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CHECK-IN MODAL */}
      {checkinData && (
        <div className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center p-4 backdrop-blur-sm" onClick={handleCloseCheckin}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-[480px] shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Xác nhận nhận sân</h3>
              <button onClick={handleCloseCheckin} className="material-symbols-outlined text-slate-400">close</button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Khách hàng</p>
                    <p className="font-bold">{checkinData.datsan.nguoidung.ho_ten}</p>
                </div>
                <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Sân</p>
                    <p className="font-bold">{checkinData.san.ten_san}</p>
                </div>
            </div>

            <div className="bg-violet-50 rounded-xl p-5 mb-6 border border-violet-100">
                <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Tổng thanh toán</span>
                    <span className="text-sm font-bold">{formatVND(checkinData.datsan.tong_tien)}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Đã đặt cọc</span>
                    <span className="text-sm font-bold text-green-600">- {formatVND(checkinData.tien_coc)}</span>
                </div>
                <div className="border-t border-violet-200 my-2 pt-2 flex justify-between">
                    <span className="font-bold text-slate-900">Còn lại cần thu</span>
                    <span className="text-xl font-black text-primary">{formatVND(Number(checkinData.datsan.tong_tien) - Number(checkinData.tien_coc))}</span>
                </div>
            </div>

            <div className="flex gap-3">
              <button onClick={handleCloseCheckin} className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-slate-600">Hủy</button>
              <button onClick={() => handleConfirmStatus(checkinData.ma_dat_san_chi_tiet, "Đã nhận sân")} className="flex-1 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30">Xác nhận nhận sân</button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold z-50">
          ✅ Đã xác nhận nhận sân thành công!
        </div>
      )}

      <style>{`
        .timeline-grid {
            display: grid;
            grid-template-columns: 160px repeat(34, 1fr);
            border-bottom: 1px solid #f1f5f9;
        }
        .time-slot {
            height: 50px;
            border-right: 1px solid #f1f5f9;
            position: relative;
        }
        .booking-block {
            position: absolute;
            top: 4px;
            bottom: 4px;
            margin: 0 2px;
            border-radius: 6px;
            padding: 4px 8px;
            font-size: 10px;
            font-weight: 700;
            color: white;
            display: flex;
            align-items: center;
            overflow: hidden;
            z-index: 5;
            cursor: pointer;
        }
        .booking-block.confirmed { background: linear-gradient(to right, #22c55e, #16a34a); }
        .booking-block.deposited { background: linear-gradient(to right, #3b82f6, #2563eb); }
        .booking-block.pending { background: linear-gradient(to right, #f59e0b, #d97706); }
        .booking-block.checked-in { background: linear-gradient(to right, #8b5cf6, #7c3aed); }
        
        .tooltip-content { display: none; }
        .booking-block:hover .tooltip-content { display: block; }
      `}</style>
    </div>
  );
}
