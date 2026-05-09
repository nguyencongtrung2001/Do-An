"use client";

import { useState, useMemo } from "react";
import { useOwnerCourts } from "@/hooks/useOwnerCourts";
import { ToggleRight, SearchX, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import StatusStats from "./StatusStats";
import CourtStatusItem from "./CourtStatusItem";


export default function OwnerStatus() {
  const { courts, loading, changeCourtStatus } = useOwnerCourts();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredCourts = useMemo(() => {
    return filterStatus === "all"
      ? courts
      : courts.filter((c) => c.trang_thai_san === filterStatus);
  }, [courts, filterStatus]);

  const handleStatusChange = async (courtId: string, newStatus: string) => {
    if (updatingId) return;
    const court = courts.find((c) => c.ma_san === courtId);
    if (!court || court.trang_thai_san === newStatus) return;

    setUpdatingId(courtId);
    try {
      await changeCourtStatus(court, newStatus);
      toast.success(`Đã cập nhật trạng thái sân thành ${newStatus}`);
    } catch (err) {
      console.error("Failed to update court status:", err);
      toast.error("Không thể cập nhật trạng thái sân.");
    } finally {
      setUpdatingId(null);
    }
  };

  const stats = useMemo(() => ({
    active: courts.filter((c) => c.trang_thai_san === "Đang hoạt động").length,
    maintenance: courts.filter((c) => c.trang_thai_san === "Đang bảo trì").length,
    locked: courts.filter((c) => c.trang_thai_san === "Đã khóa").length,
  }), [courts]);

  return (
    <div className="p-8 space-y-10 bg-slate-50/50 min-h-screen pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[24px] bg-slate-900 text-white flex items-center justify-center shadow-2xl shadow-slate-200">
            <ToggleRight className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Trạng thái cơ sở</h1>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">Điều khiển vận hành tài nguyên sân bãi</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {[
            { value: "all", label: "Tất cả", count: courts.length },
            { value: "Đang hoạt động", label: "Hoạt động", count: stats.active },
            { value: "Đang bảo trì", label: "Bảo trì", count: stats.maintenance },
            { value: "Đã khóa", label: "Đã khóa", count: stats.locked },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilterStatus(f.value)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filterStatus === f.value
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10 scale-105"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
      </div>

      <StatusStats 
        active={stats.active}
        maintenance={stats.maintenance}
        locked={stats.locked}
      />

      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Đang kiểm tra kết nối thiết bị...</p>
          </div>
        ) : filteredCourts.length === 0 ? (
          <div className="bg-white rounded-[40px] p-24 border border-slate-100 shadow-sm text-center">
            <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-8">
              <SearchX className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">DANH SÁCH TRỐNG</h3>
            <p className="text-slate-400 font-bold mt-2">Không tìm thấy sân nào thuộc trạng thái này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredCourts.map((court) => (
              <CourtStatusItem
                key={court.ma_san}
                court={court}
                onStatusChange={handleStatusChange}
                isUpdating={updatingId === court.ma_san}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
