/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const NAV_LINKS = [
    { label: "Trang chủ", href: "/" },
    { label: "Bản đồ", href: "/map" },
    ...(mounted && isAuthenticated
      ? [
          { label: "Cá nhân", href: "/profile" },
          { label: "Lịch sử", href: "/history" },
        ]
      : []),
    { label: "Chính sách", href: "/policy" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md px-6 lg:px-40 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined fill text-3xl! font-bold">location_on</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-black tracking-tight">Book Sport</h2>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className={`text-sm font-bold transition-colors ${
                      isActive ? "text-primary" : "text-slate-600 dark:text-slate-300 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {mounted && isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden">
                  {user?.anh_dai_dien ? (
                    <img src={user.anh_dai_dien} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-sm">person</span>
                  )}
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-white group-hover:text-primary transition-colors hidden sm:block">
                  {user?.ho_ten || 'User'}
                </span>
              </Link>
              <button 
                onClick={logout}
                className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
                title="Đăng xuất"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </div>
          ) : mounted ? (
            <>
              <Link 
                href="/login"
                className="hidden sm:block text-slate-600 dark:text-slate-300 text-sm font-bold px-4 py-2 hover:text-primary transition-colors"
              >
                Đăng nhập
              </Link>
              <Link 
                href="/login?tab=signup"
                className="flex items-center justify-center rounded-full h-10 px-6 bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all shadow-lg shadow-primary/30 active:scale-95"
              >
                Đăng ký
              </Link>
            </>
          ) : (
            <div className="h-10 w-40"></div>
          )}
        </div>
      </div>
    </header>
  );
}