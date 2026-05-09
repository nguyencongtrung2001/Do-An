"use client";

import { Wallet, Landmark, TrendingUp, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FinanceStatsProps {
  totalRevenue: string;
  systemBalance: string;
  profit: string;
  monthlyTransactions: number;
}

export default function FinanceStats({
  totalRevenue,
  systemBalance,
  profit,
  monthlyTransactions,
}: FinanceStatsProps) {
  const stats = [
    { title: "Tổng doanh thu", value: totalRevenue, icon: Wallet, color: "blue", trend: "+12%", label: "Toàn bộ hệ thống" },
    { title: "Số dư ví SportLink", value: systemBalance, icon: Landmark, color: "emerald", label: "Tài khoản hệ thống" },
    { title: "Lợi nhuận hệ thống", value: profit, icon: TrendingUp, color: "purple", trend: "+8.5%", label: "Chiết khấu 15%" },
    { title: "Giao dịch tháng", value: String(monthlyTransactions), icon: Receipt, color: "amber", label: "45 đơn chờ xử lý" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((s, idx) => {
        const colors: any = {
          blue: "bg-blue-50 text-blue-600",
          emerald: "bg-emerald-50 text-emerald-600",
          purple: "bg-purple-50 text-purple-600",
          amber: "bg-amber-50 text-amber-600",
        };

        return (
          <Card key={s.title} className="border-none shadow-sm hover:shadow-xl transition-all overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.title}</CardTitle>
              <div className={`p-2.5 rounded-2xl ${colors[s.color]} group-hover:scale-110 transition-transform`}>
                <s.icon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-black text-slate-900 tracking-tighter">{s.value}</div>
                  <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{s.label}</p>
                </div>
                {s.trend && (
                  <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                    {s.trend}
                  </span>
                )}
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] text-slate-900 group-hover:opacity-[0.06] transition-opacity">
                <s.icon className="w-24 h-24" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
