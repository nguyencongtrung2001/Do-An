"use client";

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
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";

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

interface RevenueChartsProps {
  lineData: any;
  doughnutData: any;
}

export default function RevenueCharts({ lineData, doughnutData }: RevenueChartsProps) {
  const lineOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { usePointStyle: true, padding: 25, font: { family: 'Inter', weight: '600', size: 11 } }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#0f172a',
        bodyColor: '#475569',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 15,
        titleFont: { family: 'Inter', size: 13, weight: 'bold' },
        bodyFont: { family: 'Inter', size: 12 },
        callbacks: {
          label: (context: any) => ` ${context.dataset.label}: ${context.raw} triệu đ`,
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f1f5f9', drawTicks: false },
        border: { display: false },
        ticks: {
          font: { family: 'Inter', size: 11, weight: '600' },
          color: '#64748b',
          callback: (value: any) => value + 'Tr'
        }
      },
      x: {
        grid: { display: false, drawTicks: false },
        border: { display: false },
        ticks: { font: { family: 'Inter', size: 12, weight: '600' }, color: '#64748b', padding: 10 }
      }
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false }
  };

  const doughnutOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { usePointStyle: true, padding: 20, font: { family: 'Inter', weight: '600', size: 11 } }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#0f172a',
        bodyColor: '#475569',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => ` ${context.label}: ${context.raw}%`,
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-8">
          <div>
            <CardTitle className="text-lg font-black text-slate-900 tracking-tight">Doanh thu theo bộ môn</CardTitle>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Xu hướng tăng trưởng qua các tuần</p>
          </div>
          <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <MoreVertical className="w-5 h-5 text-slate-400" />
          </button>
        </CardHeader>
        <CardContent className="h-80 w-full px-8 pb-8">
          <Line data={lineData} options={lineOptions} />
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="pb-8">
          <CardTitle className="text-lg font-black text-slate-900 tracking-tight">Cơ cấu doanh thu</CardTitle>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Phân bổ theo tỉ lệ phần trăm</p>
        </CardHeader>
        <CardContent className="h-72 w-full relative px-8 pb-8">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
            <span className="text-3xl font-black text-slate-900 tracking-tighter">100%</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">TỔNG QUAN</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
