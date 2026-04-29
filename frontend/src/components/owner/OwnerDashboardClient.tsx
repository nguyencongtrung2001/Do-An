"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function OwnerDashboardClient() {
  const [currentDate, setCurrentDate] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    setCurrentDate(now.toLocaleDateString("vi-VN", options));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const MOCK_NOTIFICATIONS = [
    {
      id: 1,
      type: "payment",
      icon: "payments",
      color: "blue",
      title: "Thanh toán cọc thành công",
      message: "Lê Thị B đã thanh toán cọc 200,000đ cho ca 19:00 Sân 7B.",
      time: "10 phút trước",
      unread: true,
    },
    {
      id: 2,
      type: "booking",
      icon: "calendar_today",
      color: "green",
      title: "Có lịch đặt sân mới",
      message: "Nguyễn Văn A vừa đặt Sân 5A lúc 17:00 hôm nay. Chờ thanh toán.",
      time: "1 giờ trước",
      unread: true,
    },
    {
      id: 3,
      type: "alert",
      icon: "schedule",
      color: "amber",
      title: "Sắp đến giờ nhận sân",
      message: "Ca của khách Phạm Minh (Sân CL-1) sẽ bắt đầu sau 15 phút.",
      time: "15 phút trước",
      unread: true,
    },
    {
      id: 4,
      type: "cancel",
      icon: "event_busy",
      color: "red",
      title: "Khách hủy lịch đặt",
      message: "Trần Văn C vừa hủy lịch đặt Sân 5B ngày mai. Sân đã được mở trống.",
      time: "1 ngày trước",
      unread: false,
    },
  ];

  const NOTIF_COLOR_MAP: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    amber: 'bg-amber-100 text-amber-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-sm text-slate-400">Chào mừng quay lại, Admin!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Thông báo"
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${showNotifications ? 'bg-primary/10 text-primary' : 'bg-gray-100 hover:bg-gray-200 text-slate-600'}`}
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-bold text-slate-900">Thông báo</h3>
                  <button className="text-xs font-semibold text-primary hover:text-red-700 transition-colors">
                    Đánh dấu đã đọc
                  </button>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto">
                  {MOCK_NOTIFICATIONS.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-4 border-b border-gray-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${notif.unread ? 'bg-red-50/30' : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${NOTIF_COLOR_MAP[notif.color] || 'bg-gray-100 text-gray-600'}`}>
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {notif.icon}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1 mb-0.5">
                          <p className={`text-sm font-bold truncate ${notif.unread ? 'text-slate-900' : 'text-slate-700'}`}>
                            {notif.title}
                          </p>
                          {notif.unread && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5"></span>}
                        </div>
                        <p className={`text-xs line-clamp-2 ${notif.unread ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>
                          {notif.message}
                        </p>
                        <p className="text-[10px] font-semibold text-slate-400 mt-1.5 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[10px]">schedule</span>
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 border-t border-gray-50 text-center">
                  <button className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">
                    Xem tất cả thông báo
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Hôm nay</p>
            <p className="text-sm font-semibold text-slate-700 min-h-[20px]">{currentDate}</p>
          </div>
        </div>
      </header>

      <div className="p-8">

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat-card fade-in-up bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                stadium
              </span>
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span> +12%
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">24</p>
          <p className="text-sm text-slate-400 mt-1">Tổng số sân</p>
        </div>

        <div className="stat-card fade-in-up bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                event_available
              </span>
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span> +8%
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">156</p>
          <p className="text-sm text-slate-400 mt-1">Ca đặt tháng này</p>
        </div>

        <div className="stat-card fade-in-up bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                payments
              </span>
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_up</span> +23%
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">32.4M</p>
          <p className="text-sm text-slate-400 mt-1">Doanh thu tháng</p>
        </div>

        <div className="stat-card fade-in-up bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                percent
              </span>
            </div>
            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">trending_down</span> -2%
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">78%</p>
          <p className="text-sm text-slate-400 mt-1">Tỷ lệ lấp đầy</p>
        </div>
      </div>
      </div>
    </div>
  );
}
