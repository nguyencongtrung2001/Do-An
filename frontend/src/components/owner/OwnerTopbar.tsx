
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { bookingService } from "@/services/booking.service";
import { useRouter } from "next/navigation";
import { Bell, Clock, XCircle, CalendarCheck, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BookingDetail } from "@/types/booking.types";

export default function OwnerTopbar() {
  const { token, user } = useAuth();
  const router = useRouter();
  const [currentDate] = useState(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    return now.toLocaleDateString("vi-VN", options);
  });
  const [pendingCount, setPendingCount] = useState(0);
  const prevCountRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<BookingDetail[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
  }, []);

  
  useEffect(() => {
    if (!token) return;

    const checkPending = async () => {
      try {
        const res = await bookingService.getPendingCount(token);
        if (res.success) {
          if (res.count > prevCountRef.current) {
            audioRef.current?.play().catch(e => console.log("Audio play failed:", e));
          }
          setPendingCount(res.count);
          prevCountRef.current = res.count;
        }
      } catch (error) {
        console.error("Error checking pending count:", error);
      }
    };

    checkPending();
    const interval = setInterval(checkPending, 30000);
    return () => clearInterval(interval);
  }, [token]);

  
  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    setLoadingNotifications(true);
    try {
      const res = await bookingService.getOwnerBookings(token);
      if (res.success) {
        const filtered = res.bookings
          .filter(b => b.trang_thai_dat === "Chờ xử lý" || b.trang_thai_dat === "Đã hủy")
          .sort((a, b) => new Date(b.datsan?.ngay_tao).getTime() - new Date(a.datsan?.ngay_tao).getTime())
          .slice(0, 20);
        setNotifications(filtered);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoadingNotifications(false);
    }
  }, [token]);

  
  const handleBellClick = () => {
    const next = !showNotifications;
    setShowNotifications(next);
    if (next) {
      fetchNotifications();
    }
  };

  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const h = String(date.getUTCHours()).padStart(2, "0");
    const m = String(date.getUTCMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  };

  
  const timeAgo = (isoString: string) => {
    const now = new Date().getTime();
    const then = new Date(isoString).getTime();
    const diffMs = now - then;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "Vừa xong";
    if (diffMin < 60) return `${diffMin} phút trước`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours} giờ trước`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} ngày trước`;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between gap-4">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-xs md:text-sm text-slate-400">Chào mừng quay lại, {user?.ho_ten || "Chủ sân"}!</p>
      </div>
      <div className="flex items-center gap-3 sm:gap-6">
        {}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleBellClick}
            aria-label="Thông báo"
            className="relative w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group"
          >
            <Bell className={`w-5 h-5 ${pendingCount > 0 ? "text-primary animate-ring" : "text-slate-600"}`} />
            {pendingCount > 0 && (
              <Badge className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-red-600 text-white flex items-center justify-center border-2 border-white">
                {pendingCount > 99 ? "99+" : pendingCount}
              </Badge>
            )}
          </button>

          {}
          {showNotifications && (
            <div className="absolute right-[-10px] sm:right-0 top-[calc(100%+8px)] w-[320px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-linear-to-r from-slate-50 to-white">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-primary" />
                  <h3 className="text-sm font-bold text-slate-900">Thông báo</h3>
                  {pendingCount > 0 && (
                    <span className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white px-1.5">
                      {pendingCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    router.push("/bookings");
                  }}
                  className="text-[11px] font-semibold text-primary hover:text-primary/80 flex items-center gap-0.5 transition-colors"
                >
                  Xem tất cả
                  <ChevronRight size={14} />
                </button>
              </div>

              {}
              <div className="max-h-[420px] overflow-y-auto">
                {loadingNotifications ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="py-10 text-center">
                    <Bell size={32} className="mx-auto text-slate-200 mb-2" />
                    <p className="text-sm text-slate-400">Không có thông báo mới</p>
                  </div>
                ) : (
                  notifications.map((booking) => {
                    const isPending = booking.trang_thai_dat === "Chờ xử lý";
                    const isCancelled = booking.trang_thai_dat === "Đã hủy";
                    return (
                      <div
                        key={booking.ma_dat_san_chi_tiet}
                        onClick={() => {
                          setShowNotifications(false);
                          router.push("/bookings");
                        }}
                        className={`px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50/80 cursor-pointer transition-colors group ${
                          isPending ? "bg-amber-50/30" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {}
                          <div className={`mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isPending 
                              ? "bg-amber-100 text-amber-600" 
                              : "bg-red-100 text-red-600"
                          }`}>
                            {isPending ? <CalendarCheck size={18} /> : <XCircle size={18} />}
                          </div>

                          {}
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-slate-800 leading-tight">
                              {isPending && (
                                <>
                                  <span className="text-primary font-bold">{booking.datsan?.nguoidung?.ho_ten}</span>
                                  {" "}đã đặt sân{" "}
                                  <span className="font-bold text-slate-900">{booking.san?.ten_san}</span>
                                </>
                              )}
                              {isCancelled && (
                                <>
                                  <span className="text-red-600 font-bold">{booking.datsan?.nguoidung?.ho_ten}</span>
                                  {" "}đã hủy đặt sân{" "}
                                  <span className="font-bold text-slate-900">{booking.san?.ten_san}</span>
                                </>
                              )}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                <Clock size={11} />
                                {formatTime(booking.gio_bat_dau)} - {formatTime(booking.gio_ket_thuc)}
                              </span>
                              <span className="text-slate-200">•</span>
                              <span className="text-[11px] text-slate-400">
                                {new Date(booking.ngay_dat).toLocaleDateString("vi-VN")}
                              </span>
                              <span className="text-slate-200">•</span>
                              <span className="text-[11px] font-bold text-primary">
                                {(Number(booking.tien_coc) + Number(booking.tien_con_lai)).toLocaleString("vi-VN")}đ
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-1.5">
                              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                isPending
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-red-100 text-red-700"
                              }`}>
                                {booking.trang_thai_dat}
                              </span>
                              <span className="text-[10px] text-slate-300">{timeAgo(booking.datsan?.ngay_tao)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {}
              {notifications.length > 0 && (
                <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      router.push("/bookings");
                    }}
                    className="w-full text-center text-[12px] font-bold text-primary hover:text-primary/80 transition-colors py-1"
                  >
                    Xem tất cả lịch đặt →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

        <div className="text-right hidden sm:block">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Hôm nay</p>
          <p className="text-sm font-semibold text-slate-700">{currentDate}</p>
        </div>

        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

        {}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden ring-2 ring-primary/20 transition-transform hover:scale-105">
            {user?.anh_dai_dien ? (
              <img src={user.anh_dai_dien} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-bold">{user?.ho_ten?.charAt(0) || "O"}</span>
            )}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 truncate max-w-[120px]">{user?.ho_ten || "Chủ sân"}</p>
            <p className="text-[10px] text-slate-400 truncate max-w-[120px]">{user?.email || ""}</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes ring {
          0% { transform: rotate(0); }
          10% { transform: rotate(15deg); }
          20% { transform: rotate(-15deg); }
          30% { transform: rotate(10deg); }
          40% { transform: rotate(-10deg); }
          50% { transform: rotate(0); }
          100% { transform: rotate(0); }
        }
        .animate-ring {
          animation: ring 2s ease infinite;
          transform-origin: top;
        }
      `}</style>
    </header>
  );
}
