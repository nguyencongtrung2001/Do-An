"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatVND } from "@/utils/date.utils";

interface CourtStat {
  ma_san: string;
  ten_san: string;
  revenue: number;
  totalBookings: number;
}

interface RevenueByCourtProps {
  courtStats: CourtStat[];
  loading: boolean;
}

export default function RevenueByCourt({ courtStats, loading }: RevenueByCourtProps) {
  const maxRevenue = courtStats[0]?.revenue || 1;

  return (
    <Card className="border-none shadow-sm h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-slate-700 flex items-center justify-between">
          <span>Doanh thu theo sân</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Hiệu suất sân</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary/20 border-t-primary" />
            <p className="text-xs text-slate-400 font-bold animate-pulse">Đang tính toán...</p>
          </div>
        ) : courtStats.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-slate-400 font-bold">Chưa có dữ liệu giao dịch.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {courtStats.map((court, idx) => {
              const pct = Math.round((court.revenue / maxRevenue) * 100);
              return (
                <div key={court.ma_san} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-lg shadow-slate-200">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-black text-slate-700 truncate tracking-tight">{court.ten_san}</span>
                      <span className="font-black text-primary shrink-0 ml-2">{formatVND(court.revenue)}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-tighter">
                      {court.totalBookings} đơn đặt thành công
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
