"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_NAV_LINKS } from "@/constants/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, isMounted, logout } = useAuth();

  const navGroups = [
    {
      label: "Quản lý hệ thống",
      items: ADMIN_NAV_LINKS,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-background-dark flex items-center justify-center">
          <span
            className="material-symbols-outlined text-primary text-xl!"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            location_on
          </span>
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight">SportLink</h1>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
            System Admin
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navGroups.map((group, index) => (
          <div key={index} className={index > 0 ? "mt-6" : ""}>
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              {group.label}
            </p>
            {group.items.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary border-r-[3px] border-primary"
                      : "text-slate-600 hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
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
            <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg shadow-slate-200">
              {user?.ho_ten?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || "AD"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-slate-900">{user?.ho_ten || "Quản trị viên"}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email || "admin@sportlink.vn"}</p>
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
