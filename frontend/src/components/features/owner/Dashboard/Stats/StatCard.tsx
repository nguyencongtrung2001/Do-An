"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  trend?: "up" | "down" | "neutral";
  color: "indigo" | "blue" | "emerald" | "orange";
}

export default function StatCard({ title, value, icon, description, trend, color }: StatCardProps) {
  const colorMap = {
    indigo: { iconBg: "bg-indigo-100", iconText: "text-indigo-600" },
    blue: { iconBg: "bg-blue-100", iconText: "text-blue-600" },
    emerald: { iconBg: "bg-emerald-100", iconText: "text-emerald-600" },
    orange: { iconBg: "bg-orange-100", iconText: "text-orange-600" },
  };

  const c = colorMap[color];

  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</CardTitle>
        <div className={`p-2.5 ${c.iconBg} ${c.iconText} rounded-xl`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-black text-slate-900 tracking-tight">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          {trend === "up" && <ArrowUpRight size={14} className="text-emerald-500" />}
          {trend === "down" && <ArrowDownRight size={14} className="text-red-500" />}
          <p className="text-[11px] font-medium text-slate-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
