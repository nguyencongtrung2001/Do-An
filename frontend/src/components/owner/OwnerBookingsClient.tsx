"use client";

import { useState } from "react";

// Types
type BookingStatus = "confirmed" | "deposited" | "pending" | "checked-in";

interface Notification {
  id: string;
  name: string;
  court: string;
  time: string;
  total: number;
  deposit: number;
  status: BookingStatus;
  timeAgo: string;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: "n1", name: "Trần Văn A", court: "Sân 5A", time: "06:00 - 08:00", status: "confirmed", timeAgo: "2 phút trước", total: 400000, deposit: 400000 },
  { id: "n2", name: "Nguyễn Văn B", court: "Sân 5A", time: "16:00 - 18:00", status: "deposited", timeAgo: "15 phút trước", total: 300000, deposit: 100000 },
  { id: "n3", name: "Lê Văn C", court: "Sân 5A", time: "18:00 - 20:00", status: "pending", timeAgo: "30 phút trước", total: 400000, deposit: 0 },
  { id: "n4", name: "Hoàng Văn E", court: "Sân 5B", time: "17:00 - 20:00", status: "deposited", timeAgo: "1 giờ trước", total: 500000, deposit: 200000 },
  { id: "n5", name: "Ngô Văn F", court: "Sân 7A", time: "05:00 - 08:00", status: "confirmed", timeAgo: "2 giờ trước", total: 1050000, deposit: 1050000 },
  { id: "n6", name: "Vũ Văn G", court: "Sân 7A", time: "19:00 - 21:00", status: "pending", timeAgo: "3 giờ trước", total: 700000, deposit: 0 },
  { id: "n7", name: "Đỗ Văn H", court: "Sân CL-1", time: "09:00 - 11:00", status: "checked-in", timeAgo: "4 giờ trước", total: 240000, deposit: 240000 },
  { id: "n8", name: "Bùi Văn I", court: "Sân CL-1", time: "14:00 - 16:00", status: "confirmed", timeAgo: "5 giờ trước", total: 240000, deposit: 240000 },
  { id: "n9", name: "Lý Văn L", court: "Sân BR-1", time: "09:00 - 11:00", status: "pending", timeAgo: "6 giờ trước", total: 600000, deposit: 0 },
];

export default function OwnerBookingsClient() {
  const [dateStr, setDateStr] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [checkinData, setCheckinData] = useState<Notification | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "transfer">("cash");
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

  const handleOpenCheckin = (notif: Notification) => {
    setCheckinData(notif);
    setPaymentMethod("cash");
  };

  const handleCloseCheckin = () => {
    setCheckinData(null);
  };

  const handleConfirmCheckin = () => {
    if (!checkinData) return;
    setNotifications((prev) =>
      prev.map((n) => (n.id === checkinData.id ? { ...n, status: "checked-in" } : n))
    );
    handleCloseCheckin();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatVND = (n: number) => {
    return n.toLocaleString("vi-VN") + "đ";
  };

  // Derived counts
  const countConfirmed = notifications.filter((n) => n.status === "confirmed").length;
  const countDeposited = notifications.filter((n) => n.status === "deposited").length;
  const countPending = notifications.filter((n) => n.status === "pending").length;
  const countCheckedIn = notifications.filter((n) => n.status === "checked-in").length;

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
          <div className="flex items-center gap-2 ml-4">
            <span className="w-3 h-3 rounded-sm bg-linear-to-r from-green-500 to-green-600"></span>
            <span className="text-xs text-slate-500">Đã xác nhận</span>
            <span className="w-3 h-3 rounded-sm bg-linear-to-r from-blue-500 to-blue-600 ml-2"></span>
            <span className="text-xs text-slate-500">Đã đặt cọc</span>
            <span className="w-3 h-3 rounded-sm bg-linear-to-r from-amber-500 to-amber-600 ml-2"></span>
            <span className="text-xs text-slate-500">Chờ xác nhận</span>
            <span className="w-3 h-3 rounded-sm bg-linear-to-r from-violet-500 to-violet-600 ml-2"></span>
            <span className="text-xs text-slate-500">Đã nhận sân</span>
          </div>
        </div>
      </header>

      {/* TIMELINE AREA */}
      <div className="p-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="timeline-wrapper">
            {/* Header row */}
            <div className="timeline-grid bg-gray-50 border-b border-gray-200">
              <div className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                <span className="material-symbols-outlined text-sm mr-1">stadium</span> Sân
              </div>
              {Array.from({ length: 17 }).map((_, i) => {
                const hour = i + 5; // 5:00 to 21:00
                return (
                  <div key={hour} className="contents">
                    <div className="px-1 py-3 text-[10px] font-bold text-slate-400 text-center th-hour">{hour}:00</div>
                    <div className="px-1 py-3 text-[10px] font-medium text-slate-300 text-center th-half">:30</div>
                  </div>
                );
              })}
            </div>

            {/* Sân 5A */}
            <div className="timeline-grid hover:bg-gray-50/30 transition-colors">
              <div className="px-4 py-0 flex items-center gap-2 border-r border-gray-100 bg-gray-50/50 sticky left-0 z-10">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm font-bold text-slate-700">Sân 5A</span>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 2" }}></div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}>
                <div className="booking-block confirmed" style={{ left: 0, right: 0 }}>
                  <span>Trần Văn A</span>
                  <div className="tooltip-content absolute top-full left-0 mt-2 bg-slate-900 text-white p-3  shadow-xl z-50 min-w-[200px]">
                    <p className="font-bold text-sm mb-1">Trần Văn A</p>
                    <p className="text-xs text-slate-300">📞 0901 234 567</p>
                    <p className="text-xs text-slate-300 mt-1">⏰ 06:00 - 08:00</p>
                    <p className="text-xs mt-1">
                      <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px] font-bold">Đã xác nhận</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 16" }}></div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}>
                <div className="booking-block deposited" style={{ left: 0, right: 0 }}>
                  <span>Nguyễn B</span>
                  <div className="tooltip-content absolute top-full left-0 mt-2 bg-slate-900 text-white p-3 rounded-xl shadow-xl z-50 min-w-[200px]">
                    <p className="font-bold text-sm mb-1">Nguyễn Văn B</p>
                    <p className="text-xs text-slate-300">📞 0912 345 678</p>
                    <p className="text-xs text-slate-300 mt-1">⏰ 16:00 - 18:00</p>
                    <p className="text-xs mt-1">
                      <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[10px] font-bold">Đã đặt cọc</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}>
                <div className="booking-block pending" style={{ left: 0, right: 0 }}>
                  <span>Lê C</span>
                  <div className="tooltip-content absolute top-full left-0 mt-2 bg-slate-900 text-white p-3 rounded-xl shadow-xl z-50 min-w-[200px]">
                    <p className="font-bold text-sm mb-1">Lê Văn C</p>
                    <p className="text-xs text-slate-300">📞 0923 456 789</p>
                    <p className="text-xs text-slate-300 mt-1">⏰ 18:00 - 20:00</p>
                    <p className="text-xs mt-1">
                      <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded text-[10px] font-bold">Chưa thanh toán</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}></div>
            </div>

            {/* Sân 5B */}
            <div className="timeline-grid hover:bg-gray-50/30 transition-colors">
              <div className="px-4 py-0 flex items-center gap-2 border-r border-gray-100 bg-gray-50/50 sticky left-0 z-10">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm font-bold text-slate-700">Sân 5B</span>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}></div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}>
                <div className="booking-block confirmed" style={{ left: 0, right: 0 }}>
                  <span>Phạm D</span>
                  <div className="tooltip-content absolute top-full left-0 mt-2 bg-slate-900 text-white p-3 rounded-xl shadow-xl z-50 min-w-[200px]">
                    <p className="font-bold text-sm mb-1">Phạm Văn D</p>
                    <p className="text-xs text-slate-300">📞 0934 567 890</p>
                    <p className="text-xs text-slate-300 mt-1">⏰ 07:00 - 09:00</p>
                    <p className="text-xs mt-1">
                      <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px] font-bold">Đã xác nhận</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 16" }}></div>
              <div className="time-slot" style={{ gridColumn: "span 6" }}>
                <div className="booking-block deposited" style={{ left: 0, right: 0 }}>
                  <span>Hoàng E - Team Building</span>
                  <div className="tooltip-content absolute top-full left-0 mt-2 bg-slate-900 text-white p-3 rounded-xl shadow-xl z-50 min-w-[200px]">
                    <p className="font-bold text-sm mb-1">Hoàng Văn E</p>
                    <p className="text-xs text-slate-300">📞 0945 678 901</p>
                    <p className="text-xs text-slate-300 mt-1">⏰ 17:00 - 20:00</p>
                    <p className="text-xs mt-1">
                      <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[10px] font-bold">Đã đặt cọc</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}></div>
            </div>

            {/* Sân 7A */}
            <div className="timeline-grid hover:bg-gray-50/30 transition-colors">
              <div className="px-4 py-0 flex items-center gap-2 border-r border-gray-100 bg-gray-50/50 sticky left-0 z-10">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm font-bold text-slate-700">Sân 7A</span>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 6" }}>
                <div className="booking-block confirmed" style={{ left: 0, right: 0 }}>
                  <span>Ngô F - Đội FC Sài Gòn</span>
                  <div className="tooltip-content absolute top-full left-0 mt-2 bg-slate-900 text-white p-3 rounded-xl shadow-xl z-50 min-w-[200px]">
                    <p className="font-bold text-sm mb-1">Ngô Văn F</p>
                    <p className="text-xs text-slate-300">📞 0956 789 012</p>
                    <p className="text-xs text-slate-300 mt-1">⏰ 05:00 - 08:00</p>
                    <p className="text-xs mt-1">
                      <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px] font-bold">Đã xác nhận</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 22" }}></div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}>
                <div className="booking-block pending" style={{ left: 0, right: 0 }}>
                  <span>Vũ G</span>
                  <div className="tooltip-content absolute top-full left-0 mt-2 bg-slate-900 text-white p-3 rounded-xl shadow-xl z-50 min-w-[200px]">
                    <p className="font-bold text-sm mb-1">Vũ Văn G</p>
                    <p className="text-xs text-slate-300">📞 0967 890 123</p>
                    <p className="text-xs text-slate-300 mt-1">⏰ 19:00 - 21:00</p>
                    <p className="text-xs mt-1">
                      <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded text-[10px] font-bold">Chưa thanh toán</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 2" }}></div>
            </div>

            {/* Sân 7B (Maintenance) */}
            <div className="timeline-grid bg-gray-50/50">
              <div className="px-4 py-0 flex items-center gap-2 border-r border-gray-100 bg-gray-100/50 sticky left-0 z-10">
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                <span className="text-sm font-bold text-slate-400">Sân 7B</span>
                <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold ml-1">BẢO TRÌ</span>
              </div>
              <div className="time-slot bg-gray-50" style={{ gridColumn: "span 34" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                    <span className="material-symbols-outlined text-sm">build</span>
                    Sân đang bảo trì - Không nhận đặt chỗ
                  </div>
                </div>
              </div>
            </div>

            {/* Sân CL-1 */}
            <div className="timeline-grid hover:bg-gray-50/30 transition-colors">
              <div className="px-4 py-0 flex items-center gap-2 border-r border-gray-100 bg-gray-50/50 sticky left-0 z-10">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm font-bold text-slate-700">Sân CL-1</span>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 8" }}></div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}>
                <div className="booking-block checked-in" style={{ left: 0, right: 0 }}>
                  <span>Đỗ H</span>
                  <div className="tooltip-content absolute top-full left-0 mt-2 bg-slate-900 text-white p-3 rounded-xl shadow-xl z-50 min-w-[200px]">
                    <p className="font-bold text-sm mb-1">Đỗ Văn H</p>
                    <p className="text-xs text-slate-300">📞 0978 901 234</p>
                    <p className="text-xs text-slate-300 mt-1">⏰ 09:00 - 11:00</p>
                    <p className="text-xs mt-1">
                      <span className="px-1.5 py-0.5 bg-violet-500/20 text-violet-400 rounded text-[10px] font-bold">Đã nhận sân</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 6" }}></div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}>
                <div className="booking-block confirmed" style={{ left: 0, right: 0 }}>
                  <span>Bùi I</span>
                  <div className="tooltip-content absolute top-full left-0 mt-2 bg-slate-900 text-white p-3 rounded-xl shadow-xl z-50 min-w-[200px]">
                    <p className="font-bold text-sm mb-1">Bùi Văn I</p>
                    <p className="text-xs text-slate-300">📞 0989 012 345</p>
                    <p className="text-xs text-slate-300 mt-1">⏰ 14:00 - 16:00</p>
                    <p className="text-xs mt-1">
                      <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px] font-bold">Đã xác nhận</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 8" }}></div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}>
                <div className="booking-block confirmed" style={{ left: 0, right: 0 }}>
                  <span>Cao J</span>
                  <div className="tooltip-content absolute top-full left-0 mt-2 bg-slate-900 text-white p-3 rounded-xl shadow-xl z-50 min-w-[200px]">
                    <p className="font-bold text-sm mb-1">Cao Văn J</p>
                    <p className="text-xs text-slate-300">📞 0990 123 456</p>
                    <p className="text-xs text-slate-300 mt-1">⏰ 19:00 - 21:00</p>
                    <p className="text-xs mt-1">
                      <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px] font-bold">Đã xác nhận</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 2" }}></div>
            </div>

            {/* Sân CL-2 */}
            <div className="timeline-grid hover:bg-gray-50/30 transition-colors">
              <div className="px-4 py-0 flex items-center gap-2 border-r border-gray-100 bg-gray-50/50 sticky left-0 z-10">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm font-bold text-slate-700">Sân CL-2</span>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 24" }}></div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}>
                <div className="booking-block deposited" style={{ left: 0, right: 0 }}>
                  <span>Đinh K</span>
                  <div className="tooltip-content absolute top-full left-0 mt-2 bg-slate-900 text-white p-3 rounded-xl shadow-xl z-50 min-w-[200px]">
                    <p className="font-bold text-sm mb-1">Đinh Văn K</p>
                    <p className="text-xs text-slate-300">📞 0901 234 890</p>
                    <p className="text-xs text-slate-300 mt-1">⏰ 17:00 - 19:00</p>
                    <p className="text-xs mt-1">
                      <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[10px] font-bold">Đã đặt cọc</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 6" }}></div>
            </div>

            {/* Sân BR-1 */}
            <div className="timeline-grid hover:bg-gray-50/30 transition-colors">
              <div className="px-4 py-0 flex items-center gap-2 border-r border-gray-100 bg-gray-50/50 sticky left-0 z-10">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm font-bold text-slate-700">Sân BR-1</span>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 8" }}></div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}>
                <div className="booking-block pending" style={{ left: 0, right: 0 }}>
                  <span>Lý L</span>
                  <div className="tooltip-content absolute top-full left-0 mt-2 bg-slate-900 text-white p-3 rounded-xl shadow-xl z-50 min-w-[200px]">
                    <p className="font-bold text-sm mb-1">Lý Văn L</p>
                    <p className="text-xs text-slate-300">📞 0912 567 890</p>
                    <p className="text-xs text-slate-300 mt-1">⏰ 09:00 - 11:00</p>
                    <p className="text-xs mt-1">
                      <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded text-[10px] font-bold">Chưa thanh toán</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 14" }}></div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}>
                <div className="booking-block confirmed" style={{ left: 0, right: 0 }}>
                  <span>Mạc M</span>
                  <div className="tooltip-content absolute top-full left-0 mt-2 bg-slate-900 text-white p-3 rounded-xl shadow-xl z-50 min-w-[200px]">
                    <p className="font-bold text-sm mb-1">Mạc Văn M</p>
                    <p className="text-xs text-slate-300">📞 0923 678 901</p>
                    <p className="text-xs text-slate-300 mt-1">⏰ 18:00 - 20:00</p>
                    <p className="text-xs mt-1">
                      <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px] font-bold">Đã xác nhận</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="time-slot" style={{ gridColumn: "span 4" }}></div>
            </div>

          </div>
        </div>
      </div>

      {/* RECENT BOOKINGS - GRID LAYOUT */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
              <h3 className="text-sm font-bold text-slate-900">Ca đặt mới nhất</h3>
            </div>
            {/* Summary badges */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-bold text-slate-700">
                Tổng: <span className="text-slate-900">{notifications.length}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 rounded-lg text-xs font-bold text-green-700">✓ {countConfirmed}</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 rounded-lg text-xs font-bold text-amber-700">⏳ {countPending}</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 rounded-lg text-xs font-bold text-blue-700">💰 {countDeposited}</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-50 rounded-lg text-xs font-bold text-violet-700">🏟 {countCheckedIn}</span>
            </div>
          </div>

          <div className="recent-bookings-grid">
            {notifications.map((notif, index) => {
              const isConfirmed = notif.status === "confirmed";
              const isDeposited = notif.status === "deposited";
              const isPending = notif.status === "pending";
              const isCheckedIn = notif.status === "checked-in";

              let borderColor = "border-gray-100";
              let bgColor = "bg-gray-50/30";
              let dotColor = "bg-gray-500";
              let statusText = "";
              let statusClass = "text-gray-600";

              if (isConfirmed) {
                borderColor = "border-green-100";
                bgColor = "bg-green-50/30";
                dotColor = "bg-green-500 animate-pulse";
                statusText = "✓ Đã xác nhận";
                statusClass = "text-green-600";
              } else if (isDeposited) {
                borderColor = "border-blue-100";
                bgColor = "bg-blue-50/30";
                dotColor = "bg-blue-500 animate-pulse";
                statusText = `💰 Đã đặt cọc ${formatVND(notif.deposit)}`;
                statusClass = "text-blue-600";
              } else if (isPending) {
                borderColor = "border-amber-100";
                bgColor = "bg-amber-50/30";
                dotColor = "bg-amber-500 animate-pulse";
                statusText = "⏳ Chờ thanh toán";
                statusClass = "text-amber-600";
              } else if (isCheckedIn) {
                borderColor = "border-violet-100";
                bgColor = "bg-violet-50/30";
                dotColor = "bg-violet-500";
                statusText = "🏟 Đã nhận sân • Đã TT đủ";
                statusClass = "text-violet-600";
              }

              return (
                <div key={notif.id} className={`notification-item slide-in p-4 rounded-[10px] border ${borderColor} ${bgColor} cursor-pointer`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></span>
                    <p className="text-sm font-bold text-slate-900">{notif.name}</p>
                  </div>
                  <p className="text-xs text-slate-500 pl-5">{notif.court} • {notif.time}</p>
                  {isDeposited && (
                    <p className={`text-[10px] ${statusClass} font-bold pl-5 mt-1`}>{statusText}</p>
                  )}
                  <div className="flex items-center justify-between mt-2 pl-5">
                    {isDeposited ? (
                      <button
                        onClick={() => handleOpenCheckin(notif)}
                        className="text-[10px] font-bold text-white bg-violet-500 hover:bg-violet-600 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        🏟 Nhận sân
                      </button>
                    ) : (
                      <p className={`text-[10px] ${statusClass} font-bold`}>{!isDeposited ? statusText : ""}</p>
                    )}
                    <span className="text-[10px] text-slate-400">{notif.timeAgo}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CHECK-IN MODAL */}
      {checkinData && (
        <div
          className="fixed inset-0 bg-black/50 z-100 flex items-center justify-center transition-opacity opacity-100"
          onClick={handleCloseCheckin}
        >
          <div
            className="bg-white rounded-3xl p-8 w-[90%] max-w-[480px] shadow-[0_25px_50px_rgba(0,0,0,0.25)] transition-transform transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-violet-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_reg</span>
                <h3 className="text-lg font-bold text-slate-900">Xác nhận nhận sân</h3>
              </div>
              <button
                onClick={handleCloseCheckin}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors scroll-m-0"
              >
                <span className="material-symbols-outlined text-slate-500 text-lg">close</span>
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Khách hàng</p>
                  <p className="font-bold text-slate-900">{checkinData.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Sân</p>
                  <p className="font-bold text-slate-900">{checkinData.court}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Thời gian</p>
                  <p className="font-bold text-slate-900">{checkinData.time}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Trạng thái</p>
                  <p className="font-bold text-blue-600">Đã đặt cọc</p>
                </div>
              </div>
            </div>

            <div className="bg-violet-50 rounded-xl p-4 mb-4 border border-violet-100">
              <h4 className="text-xs font-bold text-violet-700 uppercase tracking-wider mb-3">Chi tiết thanh toán</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Tổng tiền sân</span>
                  <span className="text-sm font-bold text-slate-900">{formatVND(checkinData.total)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Đã đặt cọc</span>
                  <span className="text-sm font-bold text-green-600">- {formatVND(checkinData.deposit)}</span>
                </div>
                <hr className="border-violet-200" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">Còn lại cần thu</span>
                  <span className="text-lg font-black text-primary">{formatVND(checkinData.total - checkinData.deposit)}</span>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Hình thức thanh toán phần còn lại</label>
              <div className="grid grid-cols-2 gap-2">
                <label className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "cash" ? "border-violet-400 bg-violet-50" : "border-gray-200 hover:border-violet-300"}`}>
                  <input
                    type="radio"
                    name="paymethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                    className="accent-violet-500 hidden"
                  />
                  <span className={`material-symbols-outlined text-sm ${paymentMethod === "cash" ? "text-violet-600" : "text-slate-500"}`}>payments</span>
                  <span className="text-sm font-semibold text-slate-700">Tiền mặt</span>
                </label>
                <label className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === "transfer" ? "border-violet-400 bg-violet-50" : "border-gray-200 hover:border-violet-300"}`}>
                  <input
                    type="radio"
                    name="paymethod"
                    value="transfer"
                    checked={paymentMethod === "transfer"}
                    onChange={() => setPaymentMethod("transfer")}
                    className="accent-violet-500 hidden"
                  />
                  <span className={`material-symbols-outlined text-sm ${paymentMethod === "transfer" ? "text-violet-600" : "text-slate-500"}`}>account_balance</span>
                  <span className="text-sm font-semibold text-slate-700">Chuyển khoản</span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCloseCheckin}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-sm font-bold text-slate-600 hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmCheckin}
                className="flex-1 py-3 rounded-xl bg-linear-to-r from-violet-500 to-violet-600 text-white text-sm font-bold hover:from-violet-600 hover:to-violet-700 transition-all shadow-lg shadow-violet-200"
              >
                <span className="material-symbols-outlined text-sm align-middle mr-1">check_circle</span>Xác nhận nhận sân
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold z-200 toast-enter">
          ✅ Đã xác nhận nhận sân thành công!
        </div>
      )}
    </div>
  );
}
