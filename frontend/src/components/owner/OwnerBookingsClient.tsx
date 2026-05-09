"use client";

import { useState } from "react";
import { useOwnerBookings } from "@/hooks/useOwnerBookings";
import type { BookingDetail } from "@/types/booking.types";

// ==============================
// Status Config — khớp với DB constraint
// ==============================
const STATUS_CONFIG: Record<string, { bg: string; text: string; gradient: string; label: string }> = {
  "Chờ xử lý":   { bg: "bg-amber-50",  text: "text-amber-700",  gradient: "linear-gradient(135deg, #f59e0b, #d97706)", label: "Chờ xử lý" },
  "Đã xác nhận":  { bg: "bg-green-50",  text: "text-green-700",  gradient: "linear-gradient(135deg, #22c55e, #16a34a)", label: "Đã xác nhận" },
  "Đã nhận sân":  { bg: "bg-violet-50", text: "text-violet-700", gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)", label: "Đã nhận sân" },
  "Hoàn thành":   { bg: "bg-blue-50",   text: "text-blue-700",   gradient: "linear-gradient(135deg, #3b82f6, #2563eb)", label: "Hoàn thành" },
  "Đã hủy":       { bg: "bg-red-50",    text: "text-red-700",    gradient: "linear-gradient(135deg, #ef4444, #dc2626)", label: "Đã hủy" },
};

const DEFAULT_STATUS = { bg: "bg-gray-50", text: "text-gray-700", gradient: "linear-gradient(135deg, #94a3b8, #64748b)", label: "Không rõ" };

export default function OwnerBookingsClient() {
  const { bookings, courts, loading, updateBookingStatus } = useOwnerBookings();
  const [dateStr, setDateStr] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [checkinData, setCheckinData] = useState<BookingDetail | null>(null);
  const [showToast, setShowToast] = useState(false);

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
  };

  const handleCloseCheckin = () => {
    setCheckinData(null);
  };

  const handleConfirmStatus = async (id: string, status: string) => {
    const success = await updateBookingStatus(id, status);
    if (success && status === "Đã nhận sân") {
      handleCloseCheckin();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const formatVND = (n: number) => {
    return Number(n).toLocaleString("vi-VN") + "đ";
  };

  // Format time từ ISO string — sử dụng UTC để tránh lệch múi giờ
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const h = String(date.getUTCHours()).padStart(2, "0");
    const m = String(date.getUTCMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  };

  const getTimelineColumn = (timeStr: string) => {
    const date = new Date(timeStr);
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    return (hour - 5) * 2 + (minute >= 30 ? 1 : 0) + 2;
  };

  const getTimelineSpan = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    return Math.max(1, Math.round(diffMins / 30));
  };

  const getStatusConfig = (status: string) => STATUS_CONFIG[status] || DEFAULT_STATUS;

  // Filter bookings for the selected date
  const filteredBookings = bookings.filter(b => {
    const bDate = new Date(b.ngay_dat).toISOString().split("T")[0];
    return bDate === dateStr;
  });

  const countByStatus = (status: string) => filteredBookings.filter(n => n.trang_thai_dat === status).length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== Top Bar ===== */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Lịch đặt sân</h2>
          <p className="text-sm text-slate-400">Theo dõi danh sách đặt sân theo thời gian thực</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={prevDay}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
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
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-slate-600 text-lg">chevron_right</span>
          </button>
        </div>
      </header>

      {/* ===== TIMELINE ===== */}
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
                    <div className="px-1 py-3 text-[10px] font-bold text-slate-400 text-center">{hour}:00</div>
                    <div className="px-1 py-3 text-[10px] font-medium text-slate-300 text-center">:30</div>
                  </div>
                );
              })}
            </div>

            {/* Rows for each court */}
            {loading ? (
              <div className="min-w-[1200px] p-10 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : courts.length === 0 ? (
              <div className="p-10 text-center text-slate-400 text-sm">Chưa có dữ liệu sân hoặc lịch đặt trong ngày này.</div>
            ) : courts.map(court => (
              <div key={court.ma_san} className="timeline-grid hover:bg-gray-50/30 transition-colors min-w-[1200px] relative" style={{ minHeight: "50px" }}>
                <div className="px-4 py-3 flex items-center gap-2 border-r border-gray-100 bg-gray-50/50 sticky left-0 z-10 w-40">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-sm font-bold text-slate-700 truncate">{court.ten_san}</span>
                </div>
                {/* Render booking blocks */}
                {filteredBookings.filter(b => b.ma_san === court.ma_san).map(booking => {
                  const startCol = getTimelineColumn(booking.gio_bat_dau);
                  const span = getTimelineSpan(booking.gio_bat_dau, booking.gio_ket_thuc);
                  const statusCfg = getStatusConfig(booking.trang_thai_dat);

                  return (
                    <div
                      key={booking.ma_dat_san_chi_tiet}
                      className="booking-block"
                      style={{
                        gridColumn: `${startCol} / span ${span}`,
                        background: statusCfg.gradient,
                      }}
                    >
                      <span className="truncate">{booking.datsan?.nguoidung?.ho_ten}</span>
                      <div className="tooltip-content">
                        <p className="font-bold text-sm mb-1">{booking.datsan?.nguoidung?.ho_ten}</p>
                        <p className="text-xs text-slate-300">📞 {booking.datsan?.nguoidung?.so_dien_thoai}</p>
                        <p className="text-xs text-slate-300 mt-1">
                          ⏰ {formatTime(booking.gio_bat_dau)} - {formatTime(booking.gio_ket_thuc)}
                        </p>
                        <p className="text-xs text-slate-300 mt-1">
                          💰 Cọc: {formatVND(booking.tien_coc)} • Còn lại: {formatVND(booking.tien_con_lai)}
                        </p>
                        <p className="text-xs mt-1.5">
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

      {/* ===== DANH SÁCH ĐẶT CHỖ ===== */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
              <h3 className="text-sm font-bold text-slate-900">Danh sách đặt chỗ ({dateStr})</h3>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-[10px] font-bold uppercase tracking-wider">
              <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg">Chờ: {countByStatus("Chờ xử lý")}</span>
              <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-lg">Xác nhận: {countByStatus("Đã xác nhận")}</span>
              <span className="px-2.5 py-1 bg-violet-50 text-violet-700 rounded-lg">Nhận sân: {countByStatus("Đã nhận sân")}</span>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg">Hoàn thành: {countByStatus("Hoàn thành")}</span>
              <span className="px-2.5 py-1 bg-red-50 text-red-700 rounded-lg">Hủy: {countByStatus("Đã hủy")}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.length === 0 ? (
              <div className="col-span-full py-10 text-center text-slate-400 text-sm">Không có ca đặt chỗ nào cho ngày này.</div>
            ) : filteredBookings.map((booking) => {
              const statusCfg = getStatusConfig(booking.trang_thai_dat);
              const isPending = booking.trang_thai_dat === "Chờ xử lý";
              const isConfirmed = booking.trang_thai_dat === "Đã xác nhận";

              return (
                <div
                  key={booking.ma_dat_san_chi_tiet}
                  className="p-4 rounded-xl border border-gray-100 bg-white hover:shadow-lg transition-all group"
                >
                  {/* Header: Tên khách + Trạng thái */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {booking.datsan?.nguoidung?.ho_ten?.charAt(0) || "?"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{booking.datsan?.nguoidung?.ho_ten}</p>
                        <p className="text-[11px] text-slate-400">📞 {booking.datsan?.nguoidung?.so_dien_thoai}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase ${statusCfg.bg} ${statusCfg.text}`}>
                      {statusCfg.label}
                    </span>
                  </div>

                  {/* Chi tiết sân + giờ */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="material-symbols-outlined text-sm text-primary">sports_soccer</span>
                      <span className="font-semibold text-slate-700">{booking.san?.ten_san}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                      <span className="font-semibold text-slate-700">
                        {formatTime(booking.gio_bat_dau)} → {formatTime(booking.gio_ket_thuc)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-emerald-600">payments</span>
                        <span className="font-semibold text-emerald-700">Cọc: {formatVND(booking.tien_coc)}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-amber-600">account_balance_wallet</span>
                        <span className="font-semibold text-amber-700">Còn lại: {formatVND(booking.tien_con_lai)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between gap-2">
                    {isPending && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleConfirmStatus(booking.ma_dat_san_chi_tiet, "Đã xác nhận")}
                          className="text-[11px] bg-green-500 hover:bg-green-600 text-white px-3.5 py-1.5 rounded-lg font-bold transition-colors"
                        >
                          ✓ Xác nhận
                        </button>
                        <button
                          onClick={() => handleConfirmStatus(booking.ma_dat_san_chi_tiet, "Đã hủy")}
                          className="text-[11px] bg-red-50 hover:bg-red-100 text-red-600 px-3.5 py-1.5 rounded-lg font-bold transition-colors"
                        >
                          ✗ Hủy
                        </button>
                      </div>
                    )}
                    {isConfirmed && (
                      <button
                        onClick={() => handleOpenCheckin(booking)}
                        className="text-[11px] bg-violet-500 hover:bg-violet-600 text-white px-3.5 py-1.5 rounded-lg font-bold transition-colors"
                      >
                        📋 Nhận sân
                      </button>
                    )}
                    {!isPending && !isConfirmed && <div />}
                    <span className="text-[10px] text-slate-400 ml-auto">
                      {new Date(booking.datsan?.ngay_tao).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== CHECK-IN MODAL ===== */}
      {checkinData && (
        <div className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center p-4 backdrop-blur-sm" onClick={handleCloseCheckin}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Xác nhận nhận sân</h3>
              <button onClick={handleCloseCheckin} className="material-symbols-outlined text-slate-400 hover:text-slate-600 transition-colors">close</button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Khách hàng</p>
                <p className="font-bold">{checkinData.datsan?.nguoidung?.ho_ten}</p>
                <p className="text-xs text-slate-400">📞 {checkinData.datsan?.nguoidung?.so_dien_thoai}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Sân</p>
                <p className="font-bold">{checkinData.san?.ten_san}</p>
                <p className="text-xs text-slate-400">
                  {formatTime(checkinData.gio_bat_dau)} → {formatTime(checkinData.gio_ket_thuc)}
                </p>
              </div>
            </div>

            <div className="bg-violet-50 rounded-xl p-5 mb-6 border border-violet-100">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-600">Tổng tiền sân</span>
                <span className="text-sm font-bold">{formatVND(Number(checkinData.tien_coc) + Number(checkinData.tien_con_lai))}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-600">Đã đặt cọc</span>
                <span className="text-sm font-bold text-green-600">- {formatVND(checkinData.tien_coc)}</span>
              </div>
              <div className="border-t border-violet-200 my-2 pt-2 flex justify-between">
                <span className="font-bold text-slate-900">Còn lại cần thu</span>
                <span className="text-xl font-black text-primary">{formatVND(checkinData.tien_con_lai)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={handleCloseCheckin} className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-slate-600 hover:bg-gray-50 transition-colors">Hủy</button>
              <button onClick={() => handleConfirmStatus(checkinData.ma_dat_san_chi_tiet, "Đã nhận sân")} className="flex-1 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-all">Xác nhận nhận sân</button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold z-50 animate-bounce">
          ✅ Đã xác nhận nhận sân thành công!
        </div>
      )}

      <style>{`
        .timeline-grid {
          display: grid;
          grid-template-columns: 160px repeat(34, 1fr);
          border-bottom: 1px solid #f1f5f9;
        }
        .booking-block {
          position: relative;
          margin: 4px 2px;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 700;
          color: white;
          display: flex;
          align-items: center;
          overflow: hidden;
          z-index: 5;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .booking-block:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .tooltip-content {
          display: none;
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: #1e293b;
          color: white;
          padding: 12px 16px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          z-index: 50;
          min-width: 220px;
          white-space: nowrap;
        }
        .booking-block:hover .tooltip-content {
          display: block;
        }
      `}</style>
    </div>
  );
}
