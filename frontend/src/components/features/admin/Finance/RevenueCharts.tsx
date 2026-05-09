"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical, ArrowUpRight } from "lucide-react";

interface RevenueChartsProps {
  lineData: unknown;
  doughnutData: unknown;
}

export default function RevenueCharts({ lineData: _lineData, doughnutData: _doughnutData }: RevenueChartsProps) {
  // We use the mock data logic but with native SVG for zero-dependency high-fidelity charts
  const revenuePoints = [35, 45, 30, 55, 40, 70, 65, 80, 75, 90, 85, 100];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      {/* Line Chart Area */}
      <Card className="lg:col-span-2 rounded-[40px] border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500 bg-white">
        <CardHeader className="p-8 pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Doanh thu hệ thống</CardTitle>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Xu hướng tăng trưởng 12 tháng</p>
          </div>
          <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <MoreVertical className="w-5 h-5 text-slate-400" />
          </button>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black">
              <ArrowUpRight className="w-3 h-3" /> +12.5%
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">so với cùng kỳ</span>
          </div>
          
          <div className="h-[300px] w-full relative">
            <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1="0" y1={i * 100} x2="1000" y2={i * 100} stroke="#f1f5f9" strokeWidth="1" />
              ))}
              <path
                d={`M 0 300 ${revenuePoints.map((v, i) => `L ${(i * 1000) / 11} ${300 - v * 2.5}`).join(" ")} L 1000 300 Z`}
                fill="url(#chartGrad)"
              />
              <path
                d={revenuePoints.map((v, i) => `${i === 0 ? "M" : "L"} ${(i * 1000) / 11} ${300 - v * 2.5}`).join(" ")}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {revenuePoints.map((v, i) => (
                <circle key={i} cx={(i * 1000) / 11} cy={300 - v * 2.5} r="6" fill="white" stroke="#8b5cf6" strokeWidth="3" />
              ))}
            </svg>
            <div className="flex justify-between mt-4">
              {["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"].map((m) => (
                <span key={m} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribution Area */}
      <Card className="rounded-[40px] border-slate-100 shadow-sm overflow-hidden bg-white">
        <CardHeader className="p-8 pb-2">
          <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Cơ cấu môn tập</CardTitle>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Phân bổ doanh thu</p>
        </CardHeader>
        <CardContent className="p-8 flex flex-col items-center">
          <div className="relative w-48 h-48 mb-8">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.45)} strokeLinecap="round" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.25)} className="transform rotate-162 origin-center" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-900">100%</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng hợp</span>
            </div>
          </div>
          <div className="w-full space-y-3">
            {[
              { name: "Cầu lông", value: 45, color: "bg-violet-500" },
              { name: "Bóng đá", value: 25, color: "bg-emerald-500" },
              { name: "Tennis", value: 20, color: "bg-amber-500" },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${s.color}`} />
                  <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">{s.name}</span>
                </div>
                <span className="text-[11px] font-black text-slate-900">{s.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
