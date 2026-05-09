"use client";

import { UserCheck, MapPin } from "lucide-react";

interface ApprovalsTabsProps {
  activeTab: "owners" | "locations";
  onTabChange: (tab: "owners" | "locations") => void;
  pendingOwnersCount: number;
  pendingLocationsCount: number;
}

export default function ApprovalsTabs({
  activeTab,
  onTabChange,
  pendingOwnersCount,
  pendingLocationsCount,
}: ApprovalsTabsProps) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <button
        onClick={() => onTabChange("owners")}
        className={`px-6 py-3 rounded-2xl text-sm font-black transition-all flex items-center gap-2.5 ${
          activeTab === "owners"
            ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
            : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50"
        }`}
      >
        <UserCheck className="w-5 h-5" />
        <span>KIỂM DUYỆT CHỦ SÂN</span>
        {pendingOwnersCount > 0 && (
          <span className={`ml-1 w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center ${
            activeTab === "owners" ? "bg-white text-primary" : "bg-primary text-white"
          }`}>
            {pendingOwnersCount}
          </span>
        )}
      </button>

      <button
        onClick={() => onTabChange("locations")}
        className={`px-6 py-3 rounded-2xl text-sm font-black transition-all flex items-center gap-2.5 ${
          activeTab === "locations"
            ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
            : "bg-white text-slate-500 border border-slate-100 hover:bg-slate-50"
        }`}
      >
        <MapPin className="w-5 h-5" />
        <span>KIỂM DUYỆT ĐỊA ĐIỂM</span>
        {pendingLocationsCount > 0 && (
          <span className={`ml-1 w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center ${
            activeTab === "locations" ? "bg-white text-primary" : "bg-primary text-white"
          }`}>
            {pendingLocationsCount}
          </span>
        )}
      </button>
    </div>
  );
}
