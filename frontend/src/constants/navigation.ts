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
  { label: "Quản lý người dùng", href: "/users", icon: "group" },
  { label: "Kiểm duyệt sân", href: "/approvals", icon: "verified" },
  { label: "Tài chính", href: "/finance", icon: "payments" },
];

export const OWNER_NAV_LINKS: NavLink[] = [
  { label: "Tổng quan", href: "/owner/dashboard", icon: "dashboard" },
  { label: "Quản lý sân", href: "/owner/courts", icon: "stadium" },
  { label: "Lịch đặt sân", href: "/owner/bookings", icon: "calendar_month" },
  { label: "Trạng thái sân", href: "/owner/status", icon: "toggle_on" },
];
