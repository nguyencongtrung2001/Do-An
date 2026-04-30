"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  CalendarCheck, 
  Wallet, 
  TrendingUp, 
  ChevronRight,
  PlusCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Định nghĩa Interface cụ thể để thay thế 'any'
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

interface BookingRowProps {
  code: string;
  court: string;
  time: string;
  status: string;
}

export default function OwnerDashboardClient() {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true); 
    
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: "long", 
      day: "numeric", 
      month: "long", 
      year: "numeric" 
    };
    setCurrentDate(now.toLocaleDateString("vi-VN", options));
  }, []);

  // Nếu chưa mounted (đang ở server), không render gì để tránh lỗi Hydration
  if (!isMounted) return null;

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tổng quan Dashboard</h1>
          <p className="text-slate-500">{currentDate}</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <PlusCircle className="mr-2 h-4 w-4" /> Thêm sân mới
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Số dư ví" 
          value="1.500.000đ" 
          icon={<Wallet className="text-emerald-600" />} 
          description="Ví SportLink nội bộ"
        />
        <StatCard 
          title="Tổng đơn đặt" 
          value="128" 
          icon={<CalendarCheck className="text-blue-600" />} 
          description="+12% so với tháng trước"
        />
        <StatCard 
          title="Doanh thu tháng" 
          value="12.450.000đ" 
          icon={<TrendingUp className="text-indigo-600" />} 
          description="Doanh thu thực tế"
        />
        <StatCard 
          title="Sân hoạt động" 
          value="8/10" 
          icon={<MapPin className="text-orange-600" />} 
          description="Trạng thái sẵn sàng"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between text-black">
            <CardTitle className="text-lg">Đơn đặt sân gần đây</CardTitle>
            <Button variant="ghost" size="sm" className="text-indigo-600">
              Xem tất cả <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-slate-500">
                    <th className="h-10 px-2 text-left font-medium">Mã đơn</th>
                    <th className="h-10 px-2 text-left font-medium">Sân</th>
                    <th className="h-10 px-2 text-left font-medium">Thời gian</th>
                    <th className="h-10 px-2 text-left font-medium text-black">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  <BookingRow code="SL-1024" court="Sân 5A - Tuyên Sơn" time="17:00 - 18:00" status="Đã xác nhận" />
                  <BookingRow code="SL-1025" court="Sân 7B - Hòa Xuân" time="19:00 - 20:30" status="Chờ xử lý" />
                  <BookingRow code="SL-1026" court="Sân Cầu lông 1" time="08:00 - 09:00" status="Hoàn thành" />
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-black">
            <CardTitle className="text-lg">Sân hiệu suất cao</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-black">
             <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sân 5A - Tuyên Sơn</span>
                <span className="text-sm text-slate-500">45 ca/tuần</span>
             </div>
             <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[85%]"></div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 text-black">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      </CardHeader>
      <CardContent className="text-black">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-slate-400 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

function BookingRow({ code, court, time, status }: BookingRowProps) {
  const getStatusColor = (s: string) => {
    if (s === "Đã xác nhận") return "text-emerald-600 bg-emerald-50";
    if (s === "Chờ xử lý") return "text-orange-600 bg-orange-50";
    return "text-slate-600 bg-slate-100";
  };

  return (
    <tr className="border-b transition-colors hover:bg-slate-50">
      <td className="p-2 font-medium">{code}</td>
      <td className="p-2 text-slate-600">{court}</td>
      <td className="p-2 text-slate-600">{time}</td>
      <td className="p-2">
        <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${getStatusColor(status)}`}>
          {status}
        </span>
      </td>
    </tr>
  );
}