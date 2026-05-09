"use client";

import { Award, User, MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Court {
  id: number;
  rank: number;
  name: string;
  owner: string;
  type: string;
  typeIcon: string;
  typeColor: string;
  area: string;
  bookings: number;
  occupancy: string;
  revenue: string;
}

interface TopCourtsTableProps {
  courts: Court[];
}

export default function TopCourtsTable({ courts }: TopCourtsTableProps) {
  const TYPE_COLOR_MAP: Record<string, string> = {
    green: 'bg-green-50 text-green-700 border-green-100',
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
  };

  return (
    <Card className="border-none shadow-sm overflow-hidden bg-white animate-in fade-in slide-in-from-bottom-4">
      <CardHeader className="px-8 py-6 border-b border-gray-100 flex flex-row items-center justify-between bg-slate-50/50">
        <CardTitle className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Hạng hiệu suất kinh doanh
        </CardTitle>
        <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">
          Xem toàn bộ báo cáo
        </button>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] border-b border-gray-100">
              <th className="px-8 py-5 text-center">Hạng</th>
              <th className="px-8 py-5">Tên cơ sở</th>
              <th className="px-8 py-5">Chủ sở hữu</th>
              <th className="px-8 py-5">Bộ môn</th>
              <th className="px-8 py-5">Khu vực</th>
              <th className="px-8 py-5 text-right">Lượt đặt</th>
              <th className="px-8 py-5 text-center">Hiệu suất</th>
              <th className="px-8 py-5 text-right">Doanh thu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {courts.map((court, idx) => (
              <tr key={court.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6 text-center">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mx-auto text-xs font-black shadow-sm ${
                    idx === 0 ? 'bg-amber-100 text-amber-600' :
                    idx === 1 ? 'bg-slate-200 text-slate-600' :
                    idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {court.rank}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <p className="font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors">{court.name}</p>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <User className="w-3.5 h-3.5" />
                    {court.owner}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${TYPE_COLOR_MAP[court.typeColor] || 'bg-slate-50 text-slate-600'}`}>
                    {court.type}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {court.area}
                  </div>
                </td>
                <td className="px-8 py-6 text-right font-black text-slate-700">
                  {court.bookings}
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[10px] font-black text-slate-900">{court.occupancy}</span>
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: court.occupancy }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="font-black text-emerald-600 text-sm tracking-tight">{court.revenue}</span>
                    <div className="flex items-center gap-1 text-[9px] font-black text-emerald-500 uppercase">
                       <TrendingUp className="w-2.5 h-2.5" /> Ổn định
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
