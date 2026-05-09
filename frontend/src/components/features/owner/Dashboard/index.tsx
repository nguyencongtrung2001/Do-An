"use client";

import { useMemo } from "react";
import {
  CalendarCheck,
  Wallet,
  TrendingUp,
  MapPin,
  Clock,
  Users,
  LayoutDashboard,
} from "lucide-react";
import { useOwnerBookings } from "@/hooks/useOwnerBookings";
import { useAuth } from "@/contexts/AuthContext";
import { formatVND } from "@/utils/date.utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sub-components
import StatCard from "./Stats/StatCard";
import StatusBreakdown from "./Charts/StatusBreakdown";
import RevenueByCourt from "./Charts/RevenueByCourt";
import BookingItem from "./RecentBookings/BookingItem";

export default function OwnerDashboard() {
  const { bookings, courts, loading } = useOwnerBookings();
  const { user } = useAuth();

  const currentDate = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayBookings = bookings.filter(b => new Date(b.ngay_dat).toISOString().split("T")[0] === today);
    
    const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.tien_coc) + Number(b.tien_con_lai), 0);
    const todayRevenue = todayBookings.reduce((sum, b) => sum + Number(b.tien_coc) + Number(b.tien_con_lai), 0);

    const counts = {
      pending: bookings.filter(b => b.trang_thai_dat === "Chờ xử lý").length,
      confirmed: bookings.filter(b => b.trang_thai_dat === "Đã xác nhận").length,
      checkedIn: bookings.filter(b => b.trang_thai_dat === "Đã nhận sân").length,
      completed: bookings.filter(b => b.trang_thai_dat === "Hoàn thành").length,
      cancelled: bookings.filter(b => b.trang_thai_dat === "Đã hủy").length,
    };

    const uniqueCustomers = new Set(bookings.map(b => b.datsan?.nguoidung?.ho_ten).filter(Boolean)).size;

    return {
      totalBookings: bookings.length,
      todayBookings: todayBookings.length,
      totalRevenue,
      todayRevenue,
      counts,
      todayPending: todayBookings.filter(b => b.trang_thai_dat === "Chờ xử lý").length,
      uniqueCustomers,
      activeCourts: courts.length,
    };
  }, [bookings, courts]);

  const recentBookings = useMemo(() => {
    return [...bookings]
      .sort((a, b) => new Date(b.datsan?.ngay_tao).getTime() - new Date(a.datsan?.ngay_tao).getTime())
      .slice(0, 5);
  }, [bookings]);

  const statusBars = useMemo(() => {
    const total = stats.totalBookings || 1;
    return [
      { label: "Chờ xử lý", count: stats.counts.pending, pct: Math.round((stats.counts.pending / total) * 100), color: "bg-amber-500" },
      { label: "Đã xác nhận", count: stats.counts.confirmed, pct: Math.round((stats.counts.confirmed / total) * 100), color: "bg-green-500" },
      { label: "Đã nhận sân", count: stats.counts.checkedIn, pct: Math.round((stats.counts.checkedIn / total) * 100), color: "bg-violet-500" },
      { label: "Hoàn thành", count: stats.counts.completed, pct: Math.round((stats.counts.completed / total) * 100), color: "bg-blue-500" },
      { label: "Đã hủy", count: stats.counts.cancelled, pct: Math.round((stats.counts.cancelled / total) * 100), color: "bg-red-500" },
    ];
  }, [stats]);

  const courtStats = useMemo(() => {
    return courts.map(court => {
      const courtBookings = bookings.filter(b => b.ma_san === court.ma_san);
      const revenue = courtBookings.reduce((sum, b) => sum + Number(b.tien_coc) + Number(b.tien_con_lai), 0);
      return {
        ma_san: court.ma_san,
        ten_san: court.ten_san,
        totalBookings: courtBookings.length,
        revenue,
      };
    }).sort((a, b) => b.revenue - a.revenue);
  }, [bookings, courts]);

  return (
    <div className="p-8 space-y-8 bg-gray-50/30 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-3xl bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
              Xin chào, {user?.ho_ten?.split(' ').pop() || "Chủ sân"}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[11px] tracking-widest mt-1">{currentDate}</p>
          </div>
        </div>
        
        {stats.todayPending > 0 && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-700 px-6 py-3 rounded-2xl text-sm font-black shadow-sm animate-bounce-subtle">
            <Clock size={18} className="animate-spin-slow" />
            <span>{stats.todayPending} ĐƠN CHỜ DUYỆT HÔM NAY</span>
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng doanh thu"
          value={formatVND(stats.totalRevenue)}
          icon={<TrendingUp size={22} />}
          description={`Hôm nay: +${formatVND(stats.todayRevenue)}`}
          trend="up"
          color="indigo"
        />
        <StatCard
          title="Đơn đặt sân"
          value={String(stats.totalBookings)}
          icon={<CalendarCheck size={22} />}
          description={`Hôm nay: ${stats.todayBookings} đơn`}
          trend="up"
          color="blue"
        />
        <StatCard
          title="Khách hàng"
          value={String(stats.uniqueCustomers)}
          icon={<Users size={22} />}
          description="Khách hàng quay lại"
          color="emerald"
        />
        <StatCard
          title="Sân đang dùng"
          value={String(stats.activeCourts)}
          icon={<MapPin size={22} />}
          description="Đang hoạt động tốt"
          color="orange"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <StatusBreakdown statusBars={statusBars} loading={loading} />
        <div className="lg:col-span-2">
          <RevenueByCourt courtStats={courtStats} loading={loading} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wallet & Quick Stats */}
        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-none shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            <CardContent className="py-8 space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                  <Wallet size={28} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest">SỐ DƯ VÍ SPORTLINK</p>
                  <p className="text-3xl font-black tracking-tight">{user?.so_vi_du ? formatVND(Number(user.so_vi_du)) : "---"}</p>
                </div>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tổng cọc thu được</p>
                  <p className="text-xl font-black text-emerald-400">
                    {formatVND(bookings.reduce((sum, b) => sum + Number(b.tien_coc), 0))}
                  </p>
                </div>
                <button className="bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Rút tiền</button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
               <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
                 <Clock size={20} />
               </div>
               <p className="text-xl font-black text-slate-900">{stats.counts.pending}</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase">Chờ xử lý</p>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
               <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-2">
                 <CalendarCheck size={20} />
               </div>
               <p className="text-xl font-black text-slate-900">{stats.counts.confirmed + stats.counts.completed}</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase">Xác nhận</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm h-full rounded-3xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-black text-slate-900 flex items-center justify-between">
                <span>Đơn đặt sân mới nhất</span>
                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Xem tất cả</button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              {loading ? (
                 <div className="space-y-4">
                    {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-50 rounded-2xl animate-pulse" />)}
                 </div>
              ) : recentBookings.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Chưa có hoạt động mới</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <BookingItem key={booking.ma_dat_san_chi_tiet} booking={booking} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
