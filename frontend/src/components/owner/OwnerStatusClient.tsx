"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Court {
  ma_san: string;
  ten_san: string;
  loai_the_thao: string;
  trang_thai_san: string;
  gia_thue_30p: number;
  anhsan?: { duong_dan_anh: string }[];
}

const SPORT_LABELS: Record<string, string> = {
  "bong-da": "⚽ Bóng đá",
  "cau-long": "🏸 Cầu lông",
  "pickleball": "🏓 Pickleball",
  "bong-ro": "🏀 Bóng rổ"
};

export default function OwnerStatusClient() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchCourts = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:3000/owner/my-courts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setCourts(data.courts);
      }
    } catch (error) {
      console.error("Error fetching courts:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const load = async () => {
      await fetchCourts();
    };
    load();
  }, [fetchCourts]);

  // Derived counts
  const activeCount = courts.filter((c) => c.trang_thai_san === "Đang hoạt động").length;
  const maintenanceCount = courts.filter((c) => c.trang_thai_san === "Đang bảo trì").length;

  const toggleStatus = async (courtId: string) => {
    if (!token) return;
    const court = courts.find(c => c.ma_san === courtId);
    if (!court) return;

    const newStatus = court.trang_thai_san === "Đang hoạt động" ? "Đang bảo trì" : "Đang hoạt động";
    
    try {
      const res = await fetch(`http://localhost:3000/owner/update-court/${courtId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...court,
          trang_thai_san: newStatus
        })
      });
      const data = await res.json();
      if (data.success) {
        setCourts(prev => prev.map(c => 
          c.ma_san === courtId ? { ...c, trang_thai_san: newStatus } : c
        ));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <style>{`
        .toggle-switch {
            width: 52px; height: 28px;
            background: #d1d5db;
            border-radius: 14px;
            position: relative;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .toggle-switch.active { background: #22c55e; }
        .toggle-switch::after {
            content: '';
            position: absolute;
            top: 3px; left: 3px;
            width: 22px; height: 22px;
            background: white;
            border-radius: 50%;
            transition: transform 0.3s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }
        .toggle-switch.active::after { transform: translateX(24px); }

        .court-status-card { transition: all 0.3s ease; }
        .court-status-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .court-status-card.maintenance {
            background: #f9fafb;
            border-color: #e5e7eb;
        }
        .court-status-card.maintenance .court-image { 
            filter: grayscale(100%); opacity: 0.6; 
        }

        .holiday-card { transition: all 0.3s ease; }
        .holiday-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
      `}</style>

      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Trạng thái sân</h2>
          <p className="text-sm text-slate-400">Thiết lập trạng thái hoạt động và lịch bảo trì sân</p>
        </div>
      </header>

      <div className="p-8 space-y-8">
        {/* Status Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{activeCount}</p>
              <p className="text-sm text-slate-400">Đang hoạt động</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                build
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{maintenanceCount}</p>
              <p className="text-sm text-slate-400">Đang bảo trì</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                block
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">0</p>
              <p className="text-sm text-slate-400">Đã khóa</p>
            </div>
          </div>
        </div>

        {/* Court Status List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Danh sách sân</h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Hoạt động
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Bảo trì
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {loading ? (
              <div className="p-10 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
            ) : courts.map((court) => {
              const isActive = court.trang_thai_san === "Đang hoạt động";

              return (
                <div
                  key={court.ma_san}
                  className={`court-status-card flex items-center gap-5 px-6 py-4 hover:bg-gray-50/50 transition-colors ${
                    !isActive ? "maintenance" : ""
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <div
                      className="court-image w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url("${court.anhsan?.[0]?.duong_dan_anh || '/hero-stadium.png'}")` }}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`text-sm font-bold ${isActive ? "text-slate-900" : "text-slate-400"}`}>{court.ten_san}</h4>
                      <span className={`status-badge px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-green-50 text-green-600' : 'bg-amber-100 text-amber-700'}`}>
                        {isActive ? 'Hoạt động' : 'Bảo trì'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {SPORT_LABELS[court.loai_the_thao]} • {Number(court.gia_thue_30p).toLocaleString()}đ/30p
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Trạng thái</p>
                      <p className={`text-xs font-semibold ${isActive ? 'text-green-600' : 'text-amber-600'}`}>
                        {isActive ? 'Đang hoạt động' : 'Đang bảo trì'}
                      </p>
                    </div>
                    <div
                      className={`toggle-switch ${isActive ? "active" : ""}`}
                      onClick={() => toggleStatus(court.ma_san)}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
