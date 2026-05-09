"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Download, 
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";

// Sub-components
import FinanceStats from "./FinanceStats";
import RevenueCharts from "./RevenueCharts";
import TopCourtsTable from "./TopCourtsTable";

// Mock Data Strategy
const MOCK_TOP_COURTS = [
  { id: 1, rank: 1, name: "Sân bóng đá SunSport", owner: "Nguyễn Văn Trung", type: "Bóng đá", typeIcon: "sports_soccer", typeColor: "green", area: "Thanh Khê", bookings: 456, occupancy: "85%", revenue: "125.400.000đ" },
  { id: 2, rank: 2, name: "CLB Cầu lông Phượng Hoàng", owner: "Trần Quốc Bảo", type: "Cầu lông", typeIcon: "sports_tennis", typeColor: "blue", area: "Thanh Khê", bookings: 380, occupancy: "92%", revenue: "65.200.000đ" },
  { id: 3, rank: 3, name: "Sân Tennis Hải Vân", owner: "Đặng Hữu Phước", type: "Tennis", typeIcon: "sports_tennis", typeColor: "yellow", area: "Hải Châu", bookings: 120, occupancy: "70%", revenue: "55.800.000đ" },
  { id: 4, rank: 4, name: "Sân bóng đá Hòa Khánh", owner: "Khoa Phạm", type: "Bóng đá", typeIcon: "sports_soccer", typeColor: "green", area: "Liên Chiểu", bookings: 310, occupancy: "80%", revenue: "45.500.000đ" },
  { id: 5, rank: 5, name: "Sân bóng rổ Galaxy", owner: "Hoàng Lê", type: "Bóng rổ", typeIcon: "sports_basketball", typeColor: "orange", area: "Sơn Trà", bookings: 85, occupancy: "65%", revenue: "15.300.000đ" },
];

const MOCK_LINE_DATA = {
  labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
  datasets: [
    { label: 'Bóng đá', data: [45, 52, 58, 65], borderColor: '#10b981', backgroundColor: '#10b981', tension: 0.4, borderWidth: 3, pointBackgroundColor: '#fff', pointBorderColor: '#10b981', pointBorderWidth: 2, pointRadius: 4 },
    { label: 'Cầu lông', data: [20, 25, 22, 28], borderColor: '#3b82f6', backgroundColor: '#3b82f6', tension: 0.4, borderWidth: 3, pointBackgroundColor: '#fff', pointBorderColor: '#3b82f6', pointBorderWidth: 2, pointRadius: 4 },
    { label: 'Tennis', data: [10, 15, 12, 18], borderColor: '#eab308', backgroundColor: '#eab308', tension: 0.4, borderWidth: 3, pointBackgroundColor: '#fff', pointBorderColor: '#eab308', pointBorderWidth: 2, pointRadius: 4 },
    { label: 'Bóng rổ', data: [5, 8, 10, 12], borderColor: '#f97316', backgroundColor: '#f97316', tension: 0.4, borderWidth: 3, pointBackgroundColor: '#fff', pointBorderColor: '#f97316', pointBorderWidth: 2, pointRadius: 4 }
  ]
};

const MOCK_DOUGHNUT_DATA = {
  labels: ['Bóng đá', 'Cầu lông', 'Tennis', 'Bóng rổ'],
  datasets: [{
    data: [55, 25, 12, 8],
    backgroundColor: ['#10b981', '#3b82f6', '#eab308', '#f97316'],
    borderWidth: 0,
    hoverOffset: 4
  }]
};

export default function AdminFinance() {
  const [selectedMonth, setSelectedMonth] = useState("03/2026");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString('vi-VN', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }, []);

  const handleExport = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Đang trích xuất dữ liệu tài chính...',
        success: 'Báo cáo đã được tải xuống thành công!',
        error: 'Lỗi khi xuất báo cáo.',
      }
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 pb-20">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">TÀI CHÍNH & THỐNG KÊ</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Báo cáo doanh thu, lợi nhuận và dòng tiền hệ thống</p>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Thời gian hệ thống</p>
          <p className="text-xs font-black text-slate-600 uppercase tracking-tight">{currentDate}</p>
        </div>
      </header>

      <div className="p-8">
        {/* Filters & Export */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="relative group min-w-[200px]">
              <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none group-focus-within:text-primary transition-colors" />
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full appearance-none pl-11 pr-12 py-3.5 text-[11px] font-black uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none cursor-pointer transition-all"
              >
                <option value="03/2026">Tháng 03 / 2026</option>
                <option value="02/2026">Tháng 02 / 2026</option>
                <option value="01/2026">Tháng 01 / 2026</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            </div>

            <div className="relative group min-w-[200px]">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none group-focus-within:text-primary transition-colors" />
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full appearance-none pl-11 pr-12 py-3.5 text-[11px] font-black uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none cursor-pointer transition-all"
              >
                <option value="all">Tất cả khu vực</option>
                <option value="Thanh Khê">Thanh Khê</option>
                <option value="Hải Châu">Hải Châu</option>
                <option value="Liên Chiểu">Liên Chiểu</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          
          <button 
            onClick={handleExport}
            className="w-full lg:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-primary text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-slate-900/10 active:scale-95"
          >
            <Download className="w-4 h-4" />
            XUẤT BÁO CÁO (PDF/XLS)
          </button>
        </div>

        <FinanceStats
          totalRevenue="345.200.000đ"
          systemBalance="124.500.000đ"
          profit="51.780.000đ"
          monthlyTransactions={4250}
        />

        <RevenueCharts
          lineData={MOCK_LINE_DATA}
          doughnutData={MOCK_DOUGHNUT_DATA}
        />

        <TopCourtsTable courts={MOCK_TOP_COURTS} />
      </div>
    </div>
  );
}
