"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard", category: "Tổng quan" },
  { label: "Quản lý sân", href: "/courts", icon: "stadium", category: "Quản lý" },
  { label: "Trạng thái sân", href: "/status", icon: "toggle_on", category: "Quản lý" },
  { label: "Lịch đặt sân", href: "/bookings", icon: "calendar_month", category: "Quản lý" },
];

export default function OwnerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-background-dark flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-xl!" style={{ fontVariationSettings: "'FILL' 1" }}>
            location_on
          </span>
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight">Book Sport</h1>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tổng quan</p>
        {NAV_LINKS.filter((l) => l.category === "Tổng quan").map((link) => {
          const isActive = pathname?.startsWith(link.href) || false;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "bg-primary/10 text-primary border-r-[3px] border-primary" : "text-slate-600 hover:bg-primary/10 hover:text-primary"
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
        {NAV_LINKS.filter((l) => l.category === "Quản lý").map((link) => {
          const isActive = pathname?.startsWith(link.href) || false;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "bg-primary/10 text-primary border-r-[3px] border-primary" : "text-slate-600 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-xl" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary to-red-700 flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Admin User</p>
            <p className="text-xs text-slate-400 truncate">admin@sportlink.vn</p>
          </div>
          <Link href="/login" className="text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
