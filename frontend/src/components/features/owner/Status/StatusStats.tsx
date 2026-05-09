"use client";

import { CheckCircle2, Hammer, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusStatsProps {
  active: number;
  maintenance: number;
  locked: number;
}

export default function StatusStats({ active, maintenance, locked }: StatusStatsProps) {
  const stats = [
    { title: "Đang hoạt động", value: active, icon: CheckCircle2, color: "emerald", label: "Sẵn sàng đón khách" },
    { title: "Đang bảo trì", value: maintenance, icon: Hammer, color: "amber", label: "Đang sửa chữa" },
    { title: "Đã khóa", value: locked, icon: Lock, color: "red", label: "Tạm ngưng hoạt động" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {stats.map((s) => {
        const colors: any = {
          emerald: "bg-emerald-50 text-emerald-600",
          amber: "bg-amber-50 text-amber-600",
          red: "bg-red-50 text-red-600",
        };

        return (
          <Card key={s.title} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.title}</CardTitle>
              <div className={`p-2.5 rounded-xl ${colors[s.color]} group-hover:scale-110 transition-transform`}>
                <s.icon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900 tracking-tighter">{s.value}</div>
              <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{s.label}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
