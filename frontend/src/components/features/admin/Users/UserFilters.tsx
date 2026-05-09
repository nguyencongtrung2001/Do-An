"use client";

import { Search, ChevronDown, Filter } from "lucide-react";

interface UserFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  roleFilter: string;
  onRoleChange: (val: string) => void;
  statusFilter: string;
  onStatusChange: (val: string) => void;
}

export default function UserFilters({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleChange,
  statusFilter,
  onStatusChange,
}: UserFiltersProps) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4">
      <div className="flex flex-wrap items-center gap-6">
        <div className="relative flex-1 min-w-[320px] group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Tìm theo tên khách, email hoặc số điện thoại..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-6 py-4 text-sm font-bold text-slate-700 bg-slate-50/50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            <select
              value={roleFilter}
              onChange={(e) => onRoleChange(e.target.value)}
              className="appearance-none pl-11 pr-12 py-4 text-[11px] font-black uppercase tracking-widest bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none cursor-pointer transition-all shadow-sm"
            >
              <option value="all">TẤT CẢ VAI TRÒ</option>
              <option value="owner">CHỦ SÂN</option>
              <option value="renter">KHÁCH HÀNG</option>
              <option value="admin">QUẢN TRỊ VIÊN</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none pl-11 pr-12 py-4 text-[11px] font-black uppercase tracking-widest bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none cursor-pointer transition-all shadow-sm"
            >
              <option value="all">TẤT CẢ TRẠNG THÁI</option>
              <option value="active">ĐANG HOẠT ĐỘNG</option>
              <option value="locked">BỊ KHÓA / VÔ HIỆU</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
