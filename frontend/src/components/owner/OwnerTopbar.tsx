"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { bookingService } from "@/services/booking.service";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function OwnerTopbar() {
  const { token, user } = useAuth();
  const router = useRouter();
  const [currentDate] = useState(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    return now.toLocaleDateString("vi-VN", options);
  });
  const [pendingCount, setPendingCount] = useState(0);
  const prevCountRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    // Create audio element for notifications
    audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
  }, []);

  // Polling for pending count
  useEffect(() => {
    if (!token) return;

    const checkPending = async () => {
      try {
        const res = await bookingService.getPendingCount(token);
        if (res.success) {
          if (res.count > prevCountRef.current) {
            // New bookings arrived!
            audioRef.current?.play().catch(e => console.log("Audio play failed:", e));
          }
          setPendingCount(res.count);
          prevCountRef.current = res.count;
        }
      } catch (error) {
        console.error("Error checking pending count:", error);
      }
    };

    checkPending(); // Initial check
    const interval = setInterval(checkPending, 30000); // Polling every 30s

    return () => clearInterval(interval);
  }, [token]);

  const handleNotificationClick = () => {
    router.push("/bookings");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-sm text-slate-400">Chào mừng quay lại, {user?.ho_ten || "Chủ sân"}!</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative">
          <button 
            onClick={handleNotificationClick}
            aria-label="Thông báo" 
            className="relative w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group"
          >
            <Bell className={`w-5 h-5 ${pendingCount > 0 ? "text-primary animate-ring" : "text-slate-600"}`} />
            {pendingCount > 0 && (
              <Badge className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-red-600 text-white flex items-center justify-center border-2 border-white">
                {pendingCount > 99 ? "99+" : pendingCount}
              </Badge>
            )}
          </button>
        </div>
        
        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

        <div className="text-right hidden sm:block">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Hôm nay</p>
          <p className="text-sm font-semibold text-slate-700">{currentDate}</p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes ring {
          0% { transform: rotate(0); }
          10% { transform: rotate(15deg); }
          20% { transform: rotate(-15deg); }
          30% { transform: rotate(10deg); }
          40% { transform: rotate(-10deg); }
          50% { transform: rotate(0); }
          100% { transform: rotate(0); }
        }
        .animate-ring {
          animation: ring 2s ease infinite;
          transform-origin: top;
        }
      `}</style>
    </header>
  );
}
