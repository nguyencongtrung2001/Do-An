"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { adminService } from "@/services/admin.service";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalRenters: 0,
    lockedAccounts: 0,
    pendingOwners: 0,
    totalLocations: 0,
    pendingLocations: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    if (!token) return;
    try {
      const [usersRes, ownersRes, locationsRes] = await Promise.all([
        adminService.getAllUsers(token),
        adminService.getPendingOwners(token),
        adminService.getAllLocations(token),
      ]);

      const users = usersRes.success ? usersRes.users : [];
      const pendingOwnersList = ownersRes.success ? ownersRes.owners : [];
      const locationsList = locationsRes.success ? locationsRes.locations : [];

      setStats({
        totalUsers: users.length,
        totalOwners: users.filter((u: { vai_tro: string }) => u.vai_tro === "Chủ sân").length,
        totalRenters: users.filter((u: { vai_tro: string }) => u.vai_tro === "Khách hàng").length,
        lockedAccounts: users.filter((u: { trang_thai: boolean }) => !u.trang_thai).length,
        pendingOwners: pendingOwnersList.length,
        totalLocations: locationsList.length,
        pendingLocations: locationsList.filter((l: { trang_thai_duyet: boolean }) => !l.trang_thai_duyet).length,
      });
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    (async () => { await fetchStats(); })();
  }, [fetchStats]);

  const cards = [
    { label: "Tổng người dùng", value: stats.totalUsers, icon: "group", color: "blue", href: "/users" },
    { label: "Chủ sân", value: stats.totalOwners, icon: "domain", color: "indigo", href: "/users" },
    { label: "Khách hàng", value: stats.totalRenters, icon: "person", color: "emerald", href: "/users" },
    { label: "Tài khoản bị khóa", value: stats.lockedAccounts, icon: "lock", color: "red", href: "/users" },
    { label: "Chủ sân chờ duyệt", value: stats.pendingOwners, icon: "hourglass_top", color: "amber", href: "/approvals" },
    { label: "Tổng địa điểm", value: stats.totalLocations, icon: "location_on", color: "cyan", href: "/approvals" },
    { label: "Địa điểm chờ duyệt", value: stats.pendingLocations, icon: "pending", color: "orange", href: "/approvals" },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-500",
    indigo: "bg-indigo-50 text-indigo-500",
    emerald: "bg-emerald-50 text-emerald-500",
    red: "bg-red-50 text-red-500",
    amber: "bg-amber-50 text-amber-500",
    cyan: "bg-cyan-50 text-cyan-500",
    orange: "bg-orange-50 text-orange-500",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4">
        <h2 className="text-xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-sm text-slate-400">Tổng quan hệ thống quản trị</p>
      </header>

      <div className="p-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${colorMap[card.color]} flex items-center justify-center`}>
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {card.icon}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-slate-400 transition-colors">
                    arrow_forward
                  </span>
                </div>
                <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                <p className="text-sm text-slate-400 mt-1">{card.label}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
