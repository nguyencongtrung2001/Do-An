"use client";

import { useState } from "react";
import Image from "next/image";
import { useOwnerCourts } from "@/hooks/useOwnerCourts";

const STATUS_OPTIONS = [
  {
    value: "Đang hoạt động",
    label: "Hoạt động",
    icon: "check_circle",
    bg: "bg-green-100 text-green-700 border-green-300",
    activeBg: "bg-green-500 text-white border-green-500 shadow-green-500/30 shadow-md",
    dot: "bg-green-500",
  },
  {
    value: "Đang bảo trì",
    label: "Bảo trì",
    icon: "build",
    bg: "bg-amber-100 text-amber-700 border-amber-300",
    activeBg: "bg-amber-500 text-white border-amber-500 shadow-amber-500/30 shadow-md",
    dot: "bg-amber-500",
  },
  {
    value: "Đã khóa",
    label: "Đã khóa",
    icon: "lock",
    bg: "bg-red-100 text-red-600 border-red-300",
    activeBg: "bg-red-500 text-white border-red-500 shadow-red-500/30 shadow-md",
    dot: "bg-red-500",
  },
];

export default function OwnerStatusClient() {
  const { courts, loading, changeCourtStatus } = useOwnerCourts();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredCourts = filterStatus === "all"
    ? courts
    : courts.filter((c) => c.trang_thai_san === filterStatus);

  const handleStatusChange = async (courtId: string, newStatus: string) => {
    if (updatingId) return;
    const court = courts.find((c) => c.ma_san === courtId);
    if (!court || court.trang_thai_san === newStatus) return;

    setUpdatingId(courtId);
    try {
      await changeCourtStatus(court, newStatus);
    } finally {
      setUpdatingId(null);
    }
  };

  // Stats
  const totalActive = courts.filter((c) => c.trang_thai_san === "Đang hoạt động").length;
  const totalMaintenance = courts.filter((c) => c.trang_thai_san === "Đang bảo trì").length;
  const totalLocked = courts.filter((c) => c.trang_thai_san === "Đã khóa").length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4">
        <h2 className="text-xl font-bold text-slate-900">Trạng thái sân</h2>
        <p className="text-sm text-slate-400">Quản lý trạng thái hoạt động của tất cả các sân</p>
      </header>

      {/* Stats cards */}
      <div className="px-8 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-green-600 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{totalActive}</p>
            <p className="text-xs text-slate-400">Đang hoạt động</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-amber-600 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>build</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{totalMaintenance}</p>
            <p className="text-xs text-slate-400">Đang bảo trì</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-red-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{totalLocked}</p>
            <p className="text-xs text-slate-400">Đã khóa</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="px-8 pt-5 pb-2 flex items-center gap-2">
        {[
          { value: "all", label: "Tất cả", count: courts.length },
          { value: "Đang hoạt động", label: "Hoạt động", count: totalActive },
          { value: "Đang bảo trì", label: "Bảo trì", count: totalMaintenance },
          { value: "Đã khóa", label: "Đã khóa", count: totalLocked },
        ].map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilterStatus(f.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              filterStatus === f.value
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-gray-200 hover:border-slate-400"
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Court list */}
      <div className="px-8 pb-8 pt-2">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
          </div>
        ) : filteredCourts.length === 0 ? (
          <div className="py-16 text-center">
            <span className="material-symbols-outlined text-slate-300 text-5xl">sports_score</span>
            <p className="text-slate-400 mt-2">Không có sân nào.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCourts.map((court) => {
              const isUpdating = updatingId === court.ma_san;
              const currentOpt = STATUS_OPTIONS.find((o) => o.value === court.trang_thai_san) || STATUS_OPTIONS[0];

              return (
                <div
                  key={court.ma_san}
                  className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all ${
                    isUpdating ? "opacity-60 pointer-events-none" : ""
                  }`}
                >
                  {/* Thumbnail */}
                  <div className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 ${court.trang_thai_san !== "Đang hoạt động" ? "grayscale-[0.5]" : ""}`}>
                    <Image
                      src={court.anhsan?.[0]?.duong_dan_anh || "/hero-stadium.png"}
                      alt={court.ten_san}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{court.ten_san}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${currentOpt.bg}`}>
                        <span className="material-symbols-outlined text-[10px]">{currentOpt.icon}</span>
                        {court.trang_thai_san}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {court.loai_the_thao}
                      </span>
                    </div>
                  </div>

                  {/* 3 status buttons */}
                  <div className="flex gap-1.5 shrink-0">
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleStatusChange(court.ma_san, opt.value)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
                          court.trang_thai_san === opt.value ? opt.activeBg : opt.bg
                        } ${isUpdating ? "cursor-wait" : "cursor-pointer hover:scale-105 active:scale-95"}`}
                      >
                        <span className="material-symbols-outlined text-xs mr-0.5 align-middle" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {opt.icon}
                        </span>
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {/* Loading indicator */}
                  {isUpdating && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
