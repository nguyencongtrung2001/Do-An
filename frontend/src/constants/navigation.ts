// ── Navigation Constants ──
// Centralized navigation data, shared between Navbar and other components.

import type { NavLink } from "@/types";

export const USER_NAV_LINKS: NavLink[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Bản đồ", href: "/map" },
  { label: "Profile", href: "/profile" },
  { label: "Lịch sử", href: "/history" },
];

export const ADMIN_NAV_LINKS: NavLink[] = [
  { label: "Dashboard", href: "/overview", icon: "dashboard", exact: true },
  { label: "Quản lý người dùng", href: "/users", icon: "group" },
  { label: "Kiểm duyệt sân", href: "/approvals", icon: "verified" },
  { label: "Tài chính", href: "/finance", icon: "payments" },
];

export const OWNER_NAV_LINKS: (NavLink & { category: string })[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard", category: "Tổng quan", exact: true },
  { label: "Quản lý sân", href: "/courts", icon: "stadium", category: "Quản lý" },
  { label: "Lịch đặt sân", href: "/bookings", icon: "calendar_month", category: "Quản lý" },
  { label: "Trạng thái sân", href: "/status", icon: "toggle_on", category: "Quản lý" },
];
