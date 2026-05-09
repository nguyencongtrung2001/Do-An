"use client";

import { useState, useMemo } from "react";
import {
  CalendarCheck,
  Wallet,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOwnerBookings } from "@/hooks/useOwnerBookings";
import { useAuth } from "@/contexts/AuthContext";

// ==============================
// Types
// ==============================
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color: string;
}

// ==============================
// Component
// ==============================
export default function OwnerDashboardClient() {
  const { bookings, courts, loading } = useOwnerBookings();
  const { user } = useAuth();
  const [currentDate] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  // ==============================
  // Computed Stats từ dữ liệu thực
  // ==============================
  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];

    const todayBookings = bookings.filter(b => {
      const bDate = new Date(b.ngay_dat).toISOString().split("T")[0];
      return bDate === today;
    });

    const totalRevenue = bookings.reduce(
      (sum, b) => sum + Number(b.tien_coc) + Number(b.tien_con_lai), 0
    );

    const todayRevenue = todayBookings.reduce(
      (sum, b) => sum + Number(b.tien_coc) + Number(b.tien_con_lai), 0
    );

    const pendingCount = bookings.filter(b => b.trang_thai_dat === "Chờ xử lý").length;
    const confirmedCount = bookings.filter(b => b.trang_thai_dat === "Đã xác nhận").length;
    const checkedInCount = bookings.filter(b => b.trang_thai_dat === "Đã nhận sân").length;
    const completedCount = bookings.filter(b => b.trang_thai_dat === "Hoàn thành").length;
    const cancelledCount = bookings.filter(b => b.trang_thai_dat === "Đã hủy").length;

    const todayPending = todayBookings.filter(b => b.trang_thai_dat === "Chờ xử lý").length;
    const todayConfirmed = todayBookings.filter(b => b.trang_thai_dat === "Đã xác nhận").length;

    // Unique customers
    const uniqueCustomers = new Set(
      bookings.map(b => b.datsan?.nguoidung?.ho_ten).filter(Boolean)
    ).size;

    return {
      totalBookings: bookings.length,
      todayBookings: todayBookings.length,
      totalRevenue,
      todayRevenue,
      pendingCount,
      confirmedCount,
      checkedInCount,
      completedCount,
      cancelledCount,
      todayPending,
      todayConfirmed,
      uniqueCustomers,
      activeCourts: courts.length,
    };
  }, [bookings, courts]);

  // Recent bookings (5 gần nhất)
  const recentBookings = useMemo(() => {
    return [...bookings]
      .sort((a, b) => new Date(b.datsan?.ngay_tao).getTime() - new Date(a.datsan?.ngay_tao).getTime())
      .slice(0, 5);
  }, [bookings]);

  // Format time UTC
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const h = String(date.getUTCHours()).padStart(2, "0");
    const m = String(date.getUTCMinutes()).padStart(2, "0");
    return `${h}:${m}`;
  };

  const formatVND = (n: number) => Number(n).toLocaleString("vi-VN") + "đ";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã xác nhận": return "bg-green-100 text-green-700";
      case "Đã nhận sân": return "bg-violet-100 text-violet-700";
      case "Hoàn thành": return "bg-blue-100 text-blue-700";
      case "Chờ xử lý": return "bg-amber-100 text-amber-700";
      case "Đã hủy": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  // Tính % booking theo trạng thái cho biểu đồ thanh
  const statusBars = useMemo(() => {
    const total = stats.totalBookings || 1;
    return [
      { label: "Chờ xử lý", count: stats.pendingCount, pct: Math.round((stats.pendingCount / total) * 100), color: "bg-amber-500" },
      { label: "Đã xác nhận", count: stats.confirmedCount, pct: Math.round((stats.confirmedCount / total) * 100), color: "bg-green-500" },
      { label: "Đã nhận sân", count: stats.checkedInCount, pct: Math.round((stats.checkedInCount / total) * 100), color: "bg-violet-500" },
      { label: "Hoàn thành", count: stats.completedCount, pct: Math.round((stats.completedCount / total) * 100), color: "bg-blue-500" },
      { label: "Đã hủy", count: stats.cancelledCount, pct: Math.round((stats.cancelledCount / total) * 100), color: "bg-red-500" },
    ];
  }, [stats]);

  // Thống kê theo sân
  const courtStats = useMemo(() => {
    return courts.map(court => {
      const courtBookings = bookings.filter(b => b.ma_san === court.ma_san);
      const revenue = courtBookings.reduce((sum, b) => sum + Number(b.tien_coc) + Number(b.tien_con_lai), 0);
      return {
        ...court,
        totalBookings: courtBookings.length,
        revenue,
      };
    }).sort((a, b) => b.revenue - a.revenue);
  }, [bookings, courts]);


  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* ===== Header ===== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Xin chào, {user?.ho_ten || "Chủ sân"} 👋
          </h1>
          <p className="text-slate-500">{currentDate}</p>
        </div>
        {stats.todayPending > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-xl text-sm font-semibold animate-pulse">
            <Clock size={16} />
            {stats.todayPending} đơn chờ xử lý hôm nay
          </div>
        )}
      </div>

      {/* ===== Stat Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Tổng doanh thu"
          value={formatVND(stats.totalRevenue)}
          icon={<TrendingUp size={20} />}
          description={`Hôm nay: ${formatVND(stats.todayRevenue)}`}
          trend="up"
          color="indigo"
        />
        <StatCard
          title="Tổng đơn đặt"
          value={String(stats.totalBookings)}
          icon={<CalendarCheck size={20} />}
          description={`Hôm nay: ${stats.todayBookings} đơn`}
          trend="up"
          color="blue"
        />
        <StatCard
          title="Khách hàng"
          value={String(stats.uniqueCustomers)}
          icon={<Users size={20} />}
          description="Khách hàng riêng biệt"
          color="emerald"
        />
        <StatCard
          title="Sân hoạt động"
          value={`${stats.activeCourts}`}
          icon={<MapPin size={20} />}
          description="Sân có đơn đặt"
          color="orange"
        />
      </div>

      {/* ===== Row 2: Status Breakdown + Court Stats ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Phân bổ trạng thái */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Phân bổ trạng thái</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : (
              statusBars.map((bar) => (
                <div key={bar.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-600">{bar.label}</span>
                    <span className="font-bold text-slate-900">{bar.count} <span className="text-slate-400 font-normal">({bar.pct}%)</span></span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${bar.color} transition-all duration-500`}
                      style={{ width: `${bar.pct}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Thống kê theo sân */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Doanh thu theo sân</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : courtStats.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">Chưa có dữ liệu sân.</p>
            ) : (
              <div className="space-y-3">
                {courtStats.map((court, idx) => {
                  const maxRevenue = courtStats[0]?.revenue || 1;
                  const pct = Math.round((court.revenue / maxRevenue) * 100);
                  return (
                    <div key={court.ma_san} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-slate-700 truncate">{court.ten_san}</span>
                          <span className="font-bold text-slate-900 shrink-0 ml-2">{formatVND(court.revenue)}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">{court.totalBookings} đơn đặt</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ===== Row 3: Quick Stats + Recent Bookings ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Summary Cards */}
        <div className="space-y-4">
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="py-4 flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-lg">
                <Clock size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.pendingCount}</p>
                <p className="text-xs text-slate-500">Đang chờ xử lý</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="py-4 flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle2 size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.confirmedCount + stats.completedCount}</p>
                <p className="text-xs text-slate-500">Đã xác nhận + Hoàn thành</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="py-4 flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <XCircle size={18} className="text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.cancelledCount}</p>
                <p className="text-xs text-slate-500">Đã hủy</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-700">Đơn đặt gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : recentBookings.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">Chưa có đơn đặt sân nào.</p>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.ma_dat_san_chi_tiet}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      {booking.datsan?.nguoidung?.ho_ten?.charAt(0) || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900 truncate">{booking.datsan?.nguoidung?.ho_ten}</p>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ml-2 ${getStatusColor(booking.trang_thai_dat)}`}>
                          {booking.trang_thai_dat}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {booking.san?.ten_san} • {formatTime(booking.gio_bat_dau)} → {formatTime(booking.gio_ket_thuc)} •{" "}
                        {new Date(booking.ngay_dat).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-primary shrink-0">
                      {formatVND(Number(booking.tien_coc) + Number(booking.tien_con_lai))}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ===== Wallet Card ===== */}
      <Card className="bg-linear-to-r from-primary to-indigo-600 text-white border-0">
        <CardContent className="py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-sm text-white/70 font-medium">Số dư ví SportLink</p>
              <p className="text-3xl font-black">
                {user?.so_vi_du ? formatVND(Number(user.so_vi_du)) : "---"}
              </p>
            </div>
          </div>
          <div className="text-right text-sm text-white/60">
            <p>Tổng cọc thu được</p>
            <p className="text-xl font-bold text-white">
              {formatVND(bookings.reduce((sum, b) => sum + Number(b.tien_coc), 0))}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ==============================
// Stat Card Component
// ==============================
function StatCard({ title, value, icon, description, trend, color }: StatCardProps) {
  const colorMap: Record<string, { bg: string; iconBg: string; iconText: string }> = {
    indigo: { bg: "bg-indigo-50", iconBg: "bg-indigo-100", iconText: "text-indigo-600" },
    blue: { bg: "bg-blue-50", iconBg: "bg-blue-100", iconText: "text-blue-600" },
    emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", iconText: "text-emerald-600" },
    orange: { bg: "bg-orange-50", iconBg: "bg-orange-100", iconText: "text-orange-600" },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</CardTitle>
        <div className={`p-2 ${c.iconBg} ${c.iconText} rounded-xl`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-black text-slate-900">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          {trend === "up" && <ArrowUpRight size={14} className="text-emerald-500" />}
          {trend === "down" && <ArrowDownRight size={14} className="text-red-500" />}
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
