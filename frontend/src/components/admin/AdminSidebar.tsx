"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navGroups = [
    {
      label: "Tổng quan",
      items: [
        { href: "/admin", icon: "dashboard", label: "Dashboard", exact: true },
      ],
    },
    {
      label: "Quản lý hệ thống",
      items: [
        { href: "/admin/users", icon: "group", label: "Quản lý người dùng", exact: false },
        { href: "/admin/approvals", icon: "rule", label: "Kiểm duyệt", exact: false },
      ],
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
                      ? "bg-red-50 text-red-600 border-r-4 border-red-600"
                      : "text-slate-600 hover:bg-red-50 hover:text-red-600"
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
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-sm font-bold shrink-0">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">System Admin</p>
            <p className="text-xs text-slate-400 truncate">sysadmin@sportlink.vn</p>
          </div>
          <Link
            href="/login"
            className="text-slate-400 hover:text-red-600 transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
