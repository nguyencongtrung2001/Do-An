"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  ChartOptions
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const TOP_COURTS = [
  { id: 1, rank: 1, name: "Sân bóng đá SunSport", owner: "Nguyễn Văn Trung", type: "Bóng đá", typeIcon: "sports_soccer", typeColor: "green", area: "Thanh Khê", bookings: 456, occupancy: "85%", revenue: "125.400.000đ" },
  { id: 2, rank: 2, name: "CLB Cầu lông Phượng Hoàng", owner: "Trần Quốc Bảo", type: "Cầu lông", typeIcon: "sports_tennis", typeColor: "blue", area: "Thanh Khê", bookings: 380, occupancy: "92%", revenue: "65.200.000đ" },
  { id: 3, rank: 3, name: "Sân Tennis Hải Vân", owner: "Đặng Hữu Phước", type: "Tennis", typeIcon: "sports_tennis", typeColor: "yellow", area: "Hải Châu", bookings: 120, occupancy: "70%", revenue: "55.800.000đ" },
  { id: 4, rank: 4, name: "Sân bóng đá Hòa Khánh", owner: "Khoa Phạm", type: "Bóng đá", typeIcon: "sports_soccer", typeColor: "green", area: "Liên Chiểu", bookings: 310, occupancy: "80%", revenue: "45.500.000đ" },
  { id: 5, rank: 5, name: "Sân bóng rổ Galaxy", owner: "Hoàng Lê", type: "Bóng rổ", typeIcon: "sports_basketball", typeColor: "orange" as const, area: "Sơn Trà", bookings: 85, occupancy: "65%", revenue: "15.300.000đ" },
];

const TYPE_COLOR_MAP: Record<string, string> = {
  green: 'bg-green-50 text-green-700 border-green-100',
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  yellow: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  orange: 'bg-orange-50 text-orange-700 border-orange-100',
};

export default function AdminFinanceClient() {
  const [currentDate] = useState(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return now.toLocaleDateString('vi-VN', options);
  });
  const [selectedMonth, setSelectedMonth] = useState("03/2026");
  const [selectedRegion, setSelectedRegion] = useState("all");

  // Line Chart Config
  const lineData = {
    labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
    datasets: [
      {
        label: 'Bóng đá',
        data: [45, 52, 58, 65],
        borderColor: '#10b981', // emerald-500
        backgroundColor: '#10b981',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#10b981',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Cầu lông',
        data: [20, 25, 22, 28],
        borderColor: '#3b82f6', // blue-500
        backgroundColor: '#3b82f6',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#3b82f6',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Tennis',
        data: [10, 15, 12, 18],
        borderColor: '#eab308', // yellow-500
        backgroundColor: '#eab308',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#eab308',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Bóng rổ',
        data: [5, 8, 10, 12],
        borderColor: '#f97316', // orange-500
        backgroundColor: '#f97316',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#f97316',
        pointBorderWidth: 2,
        pointRadius: 4,
      }
    ]
  };

  const lineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { family: 'Inter' }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#0f172a',
        bodyColor: '#475569',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        titleFont: { family: 'Inter', size: 13, weight: 'bold' },
        bodyFont: { family: 'Inter', size: 12 },
        callbacks: {
          label: function(context) {
            return ` ${context.dataset.label}: ${context.raw} triệu đ`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9',
          drawTicks: false,
        },
        border: { display: false },
        ticks: {
          font: { family: 'Inter', size: 11 },
          color: '#64748b',
          callback: function(value) {
            return value + 'Tr';
          }
        }
      },
      x: {
        grid: { display: false, drawTicks: false },
        border: { display: false },
        ticks: { font: { family: 'Inter', size: 12 }, color: '#64748b', padding: 10 }
      }
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false }
  };

  // Doughnut Chart Config
  const doughnutData = {
    labels: ['Bóng đá', 'Cầu lông', 'Tennis', 'Bóng rổ'],
    datasets: [{
      data: [55, 25, 12, 8],
      backgroundColor: ['#10b981', '#3b82f6', '#eab308', '#f97316'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'right',
        labels: { usePointStyle: true, padding: 20, font: { family: 'Inter', size: 12 } }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#0f172a',
        bodyColor: '#475569',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: function(context) {
            return ` ${context.label}: ${context.raw}%`;
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-10">
      
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Thống kê & Tài chính</h2>
          <p className="text-sm text-slate-400">Báo cáo doanh thu, lợi nhuận và giao dịch hệ thống</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button aria-label="Thông báo" className="relative w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-slate-600 text-xl">notifications</span>
            </button>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Hôm nay</p>
            <p className="text-sm font-semibold text-slate-700" suppressHydrationWarning>{currentDate}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8">
        
        {/* Filters & Export */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_month</span>
              <select 
                title="Month filter"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none pl-9 pr-10 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none bg-white cursor-pointer transition-all"
              >
                <option value="03/2026">Tháng 3/2026</option>
                <option value="02/2026">Tháng 2/2026</option>
                <option value="01/2026">Tháng 1/2026</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">expand_more</span>
            </div>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">location_on</span>
              <select 
                title="Region filter"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="appearance-none pl-9 pr-10 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none bg-white cursor-pointer transition-all"
              >
                <option value="all">Tất cả khu vực</option>
                <option value="Thanh Khê">Thanh Khê</option>
                <option value="Hải Châu">Hải Châu</option>
                <option value="Liên Chiểu">Liên Chiểu</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">expand_more</span>
            </div>
          </div>
          
          <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-lg">download</span>
            Xuất báo cáo
          </button>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card fade-in-up bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 relative z-10">
                <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full relative z-10">
                <span className="material-symbols-outlined text-[10px]">arrow_upward</span> +12%
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium relative z-10">Tổng doanh thu</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 relative z-10">345.200.000đ</h3>
            <div className="absolute -right-6 -bottom-6 text-blue-50 opacity-50 z-0">
              <span className="material-symbols-outlined text-9xl">monetization_on</span>
            </div>
          </div>

          <div className="stat-card fade-in-up bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden" style={{animationDelay: '0.1s'}}>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 relative z-10">
                <span className="material-symbols-outlined text-2xl">savings</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium relative z-10">Số dư hệ thống (SportLink Wallet)</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 relative z-10">124.500.000đ</h3>
            <div className="absolute -right-6 -bottom-6 text-emerald-50 opacity-50 z-0">
              <span className="material-symbols-outlined text-9xl">account_balance</span>
            </div>
          </div>

          <div className="stat-card fade-in-up bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden" style={{animationDelay: '0.2s'}}>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 relative z-10">
                <span className="material-symbols-outlined text-2xl">moving</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full relative z-10">
                <span className="material-symbols-outlined text-[10px]">arrow_upward</span> +8.5%
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium relative z-10">Lợi nhuận (15% chiết khấu)</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 relative z-10">51.780.000đ</h3>
            <div className="absolute -right-6 -bottom-6 text-purple-50 opacity-50 z-0">
              <span className="material-symbols-outlined text-9xl">trending_up</span>
            </div>
          </div>

          <div className="stat-card fade-in-up bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden" style={{animationDelay: '0.3s'}}>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 relative z-10">
                <span className="material-symbols-outlined text-2xl">receipt_long</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full relative z-10">
                <span className="material-symbols-outlined text-[10px]">sync</span> 45 Pending
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium relative z-10">Giao dịch trong tháng</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 relative z-10">4,250</h3>
            <div className="absolute -right-6 -bottom-6 text-amber-50 opacity-50 z-0">
              <span className="material-symbols-outlined text-9xl">payment</span>
            </div>
          </div>
        </div>

        {/* Charts & Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Biểu đồ doanh thu theo bộ môn</h3>
                <p className="text-sm text-slate-400">Doanh thu qua các tuần trong tháng</p>
              </div>
              <button aria-label="Tùy chọn khác" className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100 text-slate-500 transition-colors">
                <span className="material-symbols-outlined text-xl">more_vert</span>
              </button>
            </div>
            <div className="h-72 w-full">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 fade-in-up" style={{animationDelay: '0.5s'}}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Phân bổ doanh thu</h3>
                <p className="text-sm text-slate-400">Tỉ lệ theo các bộ môn</p>
              </div>
            </div>
            <div className="h-64 w-full relative">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-slate-900">100%</span>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Tổng cộng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Courts Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Top sân có doanh thu cao nhất</h3>
            <button className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">Xem toàn bộ</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 uppercase tracking-wider bg-gray-50/50">
                  <th className="px-6 py-4 font-semibold w-16 text-center">Hạng</th>
                  <th className="px-6 py-4 font-semibold">Tên sân</th>
                  <th className="px-6 py-4 font-semibold">Chủ sân</th>
                  <th className="px-6 py-4 font-semibold">Bộ môn</th>
                  <th className="px-6 py-4 font-semibold">Khu vực</th>
                  <th className="px-6 py-4 font-semibold text-right">Số lượt đặt</th>
                  <th className="px-6 py-4 font-semibold text-center">Tỉ lệ lấp đầy</th>
                  <th className="px-6 py-4 font-semibold text-right rounded-tr-lg">Tổng doanh thu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {TOP_COURTS.map((court, idx) => (
                  <tr key={court.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-sm font-bold ${
                        idx === 0 ? 'bg-amber-100 text-amber-600' :
                        idx === 1 ? 'bg-gray-200 text-gray-600' :
                        idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-gray-50 text-slate-500'
                      }`}>
                        {court.rank}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{court.name}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {court.owner}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${TYPE_COLOR_MAP[court.typeColor] || 'bg-gray-50 text-gray-700 border-gray-100'}`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {court.typeIcon}
                        </span>
                        {court.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {court.area}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-900">
                      {court.bookings}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-center">
                        <span className="font-semibold text-slate-900 w-10 text-right">{court.occupancy}</span>
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-linear-to-r from-red-500 to-orange-400 rounded-full" 
                            style={{ width: court.occupancy }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-emerald-600">{court.revenue}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
