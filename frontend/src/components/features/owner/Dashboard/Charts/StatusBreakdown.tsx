"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusBar {
  label: string;
  count: number;
  pct: number;
  color: string;
}

interface StatusBreakdownProps {
  statusBars: StatusBar[];
  loading: boolean;
}

export default function StatusBreakdown({ statusBars, loading }: StatusBreakdownProps) {
  return (
    <Card className="border-none shadow-sm h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-slate-700 flex items-center justify-between">
          <span>Phân bổ trạng thái</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Toàn thời gian</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary/20 border-t-primary" />
            <p className="text-xs text-slate-400 font-bold animate-pulse">Đang phân tích...</p>
          </div>
        ) : (
          statusBars.map((bar) => (
            <div key={bar.label}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-600">{bar.label}</span>
                <span className="font-black text-slate-900">
                  {bar.count} <span className="text-slate-400 font-bold text-[10px]">({bar.pct}%)</span>
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${bar.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${bar.pct}%` }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
