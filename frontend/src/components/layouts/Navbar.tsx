
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          ...(user?.vai_tro === "Chủ sân"
            ? [{ label: "Quản lý sân", href: "/dashboard" }]
            : [
                { label: "Cá nhân", href: "/profile" },
                { label: "Lịch sử", href: "/history" },
              ]),
        ]
      : []),
    { label: "Chính sách", href: "/policy" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md px-6 lg:px-40 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined fill text-3xl! font-bold">location_on</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-black tracking-tight">Book Sport</h2>
        </Link>

        {}
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

        {}
        <div className="flex items-center gap-3">
          {mounted && isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link 
                href={user?.vai_tro === "Chủ sân" ? "/dashboard" : "/profile"} 
                className="flex items-center gap-2 group cursor-pointer"
              >
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

          {}
          <button
            className="md:hidden flex items-center justify-center p-2 text-slate-700 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {}
      {isMobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 shadow-lg py-4 px-6 flex flex-col gap-4">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-base font-bold transition-colors ${
                      isActive ? "text-primary" : "text-slate-600 dark:text-slate-300 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {}
          {mounted && !isAuthenticated && (
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <Link 
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-600 dark:text-slate-300 text-center text-sm font-bold px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link 
                href="/login?tab=signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-xl h-11 px-6 bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all shadow-lg shadow-primary/30"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}