"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { bookingService } from "@/services/booking.service";
import { OWNER_NAV_LINKS } from "@/constants/navigation";

export default function OwnerSidebar() {
  const pathname = usePathname();
  const { token, user, isMounted, logout } = useAuth();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (!token) return;

    const checkPending = async () => {
      try {
        const res = await bookingService.getPendingCount(token);
        if (res.success) setPendingCount(res.count);
      } catch (error) {
        console.error("Sidebar pending check error:", error);
      }
    };

    checkPending();
    const interval = setInterval(checkPending, 30000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
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
          const isBookings = link.label === "Lịch đặt sân";
          
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
              
              {isBookings && pendingCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white">
                  {pendingCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-gray-100 p-4">
        {!isMounted ? (
          <div className="flex items-center gap-3 animate-pulse">
            <div className="w-9 h-9 rounded-full bg-slate-100 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-slate-100 rounded w-24" />
              <div className="h-2 bg-slate-100 rounded w-32" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold transition-transform hover:scale-105">
              {user?.ho_ten?.charAt(0) || "O"}
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
        )}
      </div>
    </aside>
  );
}
