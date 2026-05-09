"use client";

import { Users, Building2, User, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserStatsProps {
  totalUsers: number;
  totalOwners: number;
  totalRenters: number;
  lockedAccounts: number;
}

export default function UserStats({
  totalUsers,
  totalOwners,
  totalRenters,
  lockedAccounts,
}: UserStatsProps) {
  const stats = [
    { title: "Tổng người dùng", value: totalUsers, icon: Users, color: "blue", label: "Tài khoản hệ thống" },
    { title: "Chủ sân", value: totalOwners, icon: Building2, color: "indigo", label: "Đối tác kinh doanh" },
    { title: "Khách hàng", value: totalRenters, icon: User, color: "emerald", label: "Người thuê sân" },
    { title: "Tài khoản khóa", value: lockedAccounts, icon: Lock, color: "red", label: "Cần xem xét" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((s) => {
        const colors: any = {
          blue: "bg-blue-50 text-blue-600",
          indigo: "bg-indigo-50 text-indigo-600",
          emerald: "bg-emerald-50 text-emerald-600",
          red: "bg-red-50 text-red-600",
        };

        return (
          <Card key={s.title} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.title}</CardTitle>
              <div className={`p-2.5 rounded-xl ${colors[s.color]}`}>
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
