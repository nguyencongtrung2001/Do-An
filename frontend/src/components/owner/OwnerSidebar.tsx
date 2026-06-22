"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { OWNER_NAV_LINKS } from "@/constants/navigation";
import { bookingService } from "@/services/booking.service";
import { Bell, Clock, XCircle, CalendarCheck, ChevronRight } from "lucide-react";
import type { BookingDetail } from "@/types/booking.types";

export default function OwnerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { token, user, logout } = useAuth();
  
  // State mounted dùng để khắc phục lỗi Hydration Mismatch
  const [isMounted, setIsMounted] = useState(false);
  
  const [pendingCount, setPendingCount] = useState(0);
  const [lastSeenCount, setLastSeenCount] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("owner_last_seen_count");
      return stored ? parseInt(stored, 10) : 0;
    }
    return 0;
  });
  const prevCountRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<BookingDetail[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Ép Component chỉ render giao diện chi tiết sau khi đã nạp thành công vào Trình duyệt
  useEffect(() => {
    setIsMounted(true);
    audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
  }, []);

  // Polling check ca đặt sân đang chờ xử lý
  useEffect(() => {
    if (!token || !isMounted) return;

    const checkPending = async () => {
      try {
        const res = await bookingService.getPendingCount(token);
        if (res.success) {
          if (res.count > prevCountRef.current) {
            audioRef.current?.play().catch(e => console.log("Audio play failed:", e));
          }
          setPendingCount(res.count);
          prevCountRef.current = res.count;
          
          setLastSeenCount(prev => {
            if (res.count < prev) {
              localStorage.setItem("owner_last_seen_count", res.count.toString());
              return res.count;
            }
            return prev;
          });
        }
      } catch (error) {
        console.error("Error checking pending count:", error);
      }
    };

    checkPending();
    const interval = setInterval(checkPending, 30000);
    return () => clearInterval(interval);
  }, [token, isMounted]);

  // Fetch danh sách thông báo mới
  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    setLoadingNotifications(true);
    try {
      const res = await bookingService.getOwnerBookings(token);
      if (res.success) {
        const filtered = res.bookings
          .filter((b: BookingDetail) => b.trang_thai_dat === "Chờ xử lý" || b.trang_thai_dat === "Đã hủy")
          .sort((a: BookingDetail, b: BookingDetail) => new Date(b.datsan?.ngay_tao).getTime() - new Date(a.datsan?.ngay_tao).getTime())
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
      setLastSeenCount(pendingCount);
      localStorage.setItem("owner_last_seen_count", pendingCount.toString());
    }
  };

  const displayBadgeCount = Math.max(0, pendingCount - lastSeenCount);

  // Đóng dropdown panel khi click ra ngoài vùng hiển thị
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

  // NẾU CHƯA MOUNTED: Trả về bộ khung trống (Skeleton CSS) tương tự máy chủ để chống lệch Hydration
  if (!isMounted) {
    return (
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-50 animate-pulse">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-slate-100" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-slate-100 rounded w-24" />
            <div className="h-3 bg-slate-100 rounded w-12" />
          </div>
        </div>
        <div className="flex-1 p-4 space-y-4">
          <div className="h-8 bg-slate-100 rounded w-full" />
          <div className="h-8 bg-slate-100 rounded w-full" />
          <div className="h-8 bg-slate-100 rounded w-full" />
        </div>
      </aside>
    );
  }

  // NẾU ĐÃ MOUNTED THÀNH CÔNG: Trả về HTML hoàn chỉnh phục vụ tương tác phía Client
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl!" style={{ fontVariationSettings: "'FILL' 1" }}>
                location_on
              </span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-slate-900">Book Sport</h1>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Chủ sân</p>
            </div>
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <span className="material-symbols-outlined text-slate-400 text-xl">close</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tổng quan</p>
          {OWNER_NAV_LINKS.filter((l) => l.category === "Tổng quan").map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-primary/10 text-primary border-r-[3px] border-primary" : "text-slate-600 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-xl" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {link.icon}
                </span>
                {link.label}
              </Link>
            );
          })}

          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-2">Quản lý</p>
          {OWNER_NAV_LINKS.filter((l) => l.category === "Quản lý").map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-primary/10 text-primary border-r-[3px] border-primary" : "text-slate-600 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                    {link.icon}
                  </span>
                  {link.label}
                </div>
              </Link>
            );
          })}

          {/* Nút Thông báo */}
          <div className="relative mt-1" ref={dropdownRef}>
            <button
              onClick={handleBellClick}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                showNotifications ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-xl ${displayBadgeCount > 0 ? "animate-ring text-primary" : ""}`} style={showNotifications ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  notifications
                </span>
                Thông báo
              </div>
              
              {displayBadgeCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white">
                  {displayBadgeCount > 99 ? "99+" : displayBadgeCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <div className="fixed left-[260px] top-[calc(50%-210px)] w-[400px] bg-white rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden z-100 animate-in fade-in slide-in-from-left-4 duration-200">
                {/* Header */}
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-linear-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-primary" />
                    <h3 className="text-sm font-bold text-slate-900">Thông báo</h3>
                    {displayBadgeCount > 0 && (
                      <span className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white px-1.5">
                        {displayBadgeCount}
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

                {/* Notification List */}
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
                    notifications.map((booking: BookingDetail) => {
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
                            <div className={`mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isPending 
                                ? "bg-amber-100 text-amber-600" 
                                : "bg-red-100 text-red-600"
                            }`}>
                              {isPending ? <CalendarCheck size={18} /> : <XCircle size={18} />}
                            </div>

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

                {/* Footer */}
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
        </nav>

        {/* User Section */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold transition-transform hover:scale-105 overflow-hidden">
              {user?.anh_dai_dien ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.anh_dai_dien} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.ho_ten?.charAt(0) || "O"
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-slate-900">
                {user?.ho_ten || "Chủ sân"}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.email || ""}
              </p>
            </div>
            <button
              onClick={logout}
              className="text-slate-400 hover:text-red-600 transition-all hover:rotate-12"
              title="Đăng xuất"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
            </button>
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
      </aside>
    </>
  );
}