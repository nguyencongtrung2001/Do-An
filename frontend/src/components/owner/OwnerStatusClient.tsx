"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image"; // Import Image từ Next.js
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, AlertCircle, CheckCircle2, Wrench } from "lucide-react";
import { toast } from "react-hot-toast";

interface Court {
  ma_san: string;
  ten_san: string;
  loai_the_thao: string;
  trang_thai_san: string;
  gia_thue_30p: number;
  anhsan?: { duong_dan_anh: string }[];
}

// const SPORT_LABELS: Record<string, string> = {
//   "Bóng đá": "⚽ Bóng đá",
//   "Cầu lông": "🏸 Cầu lông",
//   "Pickleball": "🏓 Pickleball",
//   "Bóng rổ": "🏀 Bóng rổ"
// };

export default function OwnerStatusClient() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
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
    // Gọi fetchCourts một cách gián tiếp để tránh cascading render trực tiếp
    const initData = async () => {
      await fetchCourts();
    };
    initData();
  }, [fetchCourts]);

  const toggleStatus = async (courtId: string) => {
    if (!token || updatingId) return;

    const court = courts.find(c => c.ma_san === courtId);
    if (!court || court.trang_thai_san === "Đã khóa") {
      toast.error("Sân đã bị khóa bởi hệ thống!");
      return;
    }

    const newStatus = court.trang_thai_san === "Đang hoạt động" ? "Đang bảo trì" : "Đang hoạt động";
    setUpdatingId(courtId);

    try {
      const res = await fetch(`http://localhost:3000/owner/update-court-status/${courtId}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ trang_thai_san: newStatus })
      });

      const data = await res.json();
      if (data.success) {
        setCourts(prev => prev.map(c => 
          c.ma_san === courtId ? { ...c, trang_thai_san: newStatus } : c
        ));
        toast.success(`Đã cập nhật ${court.ten_san}`);
      }
    } catch (error) {
      toast.error("Lỗi cập nhật Database");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <header className="bg-white border-b border-slate-200 px-8 py-5 shadow-sm">
        <h2 className="text-xl font-bold">Trạng thái sân</h2>
      </header>

      <div className="p-8 max-w-5xl mx-auto w-full">
        <div className="divide-y divide-slate-100 bg-white rounded-2xl border">
          {loading ? (
            <div className="p-12 flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-indigo-500 w-8 h-8" />
            </div>
          ) : (
            courts.map((court) => {
              const isActive = court.trang_thai_san === "Đang hoạt động";
              return (
                <div key={court.ma_san} className="flex items-center gap-6 px-6 py-5">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                    {/* Sử dụng Image thay cho img */}
                    <Image 
                      src={court.anhsan?.[0]?.duong_dan_anh || '/hero-stadium.png'} 
                      alt={court.ten_san}
                      fill
                      className={`object-cover ${!isActive ? "grayscale opacity-50" : ""}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{court.ten_san}</h4>
                    <StatusBadge status={court.trang_thai_san} />
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full cursor-pointer transition-all ${isActive ? "bg-green-500" : "bg-slate-300"}`}
                    onClick={() => toggleStatus(court.ma_san)}
                  >
                    <div className={`w-4 h-4 m-1 bg-white rounded-full transition-all ${isActive ? "translate-x-6" : ""}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// Định nghĩa types rõ ràng cho Icon và Style
interface BadgeConfig {
  style: string;
  icon: React.ReactNode;
}

function StatusBadge({ status }: { status: string }) {
  const badgeMap: Record<string, BadgeConfig> = {
    "Đang hoạt động": {
      style: "bg-green-100 text-green-700",
      icon: <CheckCircle2 className="w-3 h-3" />
    },
    "Đang bảo trì": {
      style: "bg-amber-100 text-amber-700",
      icon: <Wrench className="w-3 h-3" />
    },
    "Đã khóa": {
      style: "bg-red-100 text-red-700",
      icon: <AlertCircle className="w-3 h-3" />
    }
  };
  
  const config = badgeMap[status] || badgeMap["Đang bảo trì"];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold ${config.style}`}>
      {config.icon} {status.toUpperCase()}
    </span>
  );
}