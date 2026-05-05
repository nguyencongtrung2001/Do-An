"use client";

import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  CalendarCheck, 
  Wallet, 
  TrendingUp, 

} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Định nghĩa Interface cụ thể để thay thế 'any'
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
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

