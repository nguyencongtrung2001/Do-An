"use client";

import { TIMELINE_START_HOUR, TIMELINE_END_HOUR, TOTAL_HALF_HOURS, TIMELINE_LABELS } from "@/lib/constants/timeline";
import { BOOKING_STATUS_CONFIG } from "@/lib/constants/status";
import { BookingDetail } from "@/types/booking.types";
import { OwnerCourt } from "@/types/court.types";
import { formatTimeFromISO } from "@/utils/booking.utils";
import { formatVND } from "@/utils/date.utils";

interface TimelineGridProps {
  courts: OwnerCourt[];
  bookings: BookingDetail[];
  loading: boolean;
}

export default function TimelineGrid({ courts, bookings, loading }: TimelineGridProps) {
  const getStatusConfig = (status: string) => BOOKING_STATUS_CONFIG[status] || {
    gradient: "linear-gradient(135deg, #94a3b8, #64748b)",
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="timeline-wrapper overflow-x-auto custom-scrollbar">
          {/* Header row */}
          <div className="flex min-w-[1400px] bg-gray-50 border-b border-gray-200">
            <div className="w-[160px] min-w-[160px] border-r border-gray-200 px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider sticky left-0 z-10 bg-gray-50 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">stadium</span> 
              Sân
            </div>
            <div className="flex-1 grid grid-cols-[repeat(32,1fr)]">
              {TIMELINE_LABELS.map((label, idx) => (
                <div
                  key={idx}
                  className={`px-1 py-4 text-[10px] font-bold text-center border-r border-gray-100 last:border-0 ${
                    label.endsWith(":00") ? "text-slate-500" : "text-slate-300"
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Rows for each court */}
          {loading ? (
            <div className="min-w-[1400px] p-20 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary/20 border-t-primary mb-4" />
              <p className="text-slate-400 font-bold animate-pulse">Đang đồng bộ lịch sân...</p>
            </div>
          ) : courts.length === 0 ? (
            <div className="min-w-[1400px] p-20 text-center text-slate-400">
              <p className="font-medium text-lg">Chưa có dữ liệu sân.</p>
              <p className="text-sm">Hãy thêm sân mới để bắt đầu nhận lịch đặt.</p>
            </div>
          ) : (
            courts.map((court) => {
              const courtBookings = bookings.filter((b) => b.ma_san === court.ma_san);

              return (
                <div key={court.ma_san} className="flex min-w-[1400px] border-b border-gray-100 group hover:bg-gray-50/50 transition-colors">
                  {/* Court name (sticky left) */}
                  <div className="w-[160px] min-w-[160px] px-4 py-6 border-r border-gray-100 bg-white group-hover:bg-gray-50 sticky left-0 z-10 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                    <span className="text-sm font-bold text-slate-700 truncate">{court.ten_san}</span>
                  </div>

                  {/* Timeline area */}
                  <div className="flex-1 relative h-20">
                    {/* Grid lines */}
                    <div className="absolute inset-0 grid grid-cols-[repeat(32,1fr)] pointer-events-none">
                      {Array.from({ length: TOTAL_HALF_HOURS }).map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`border-r h-full ${idx % 2 === 0 ? "border-gray-200" : "border-gray-100"}`} 
                        />
                      ))}
                    </div>

                    {/* Booking blocks */}
                    {courtBookings.map((booking) => {
                      const startDate = new Date(booking.gio_bat_dau);
                      const endDate = new Date(booking.gio_ket_thuc);
                      
                      // Calculate positions (assuming 6:00 to 22:00)
                      const startMinutes = (startDate.getUTCHours() - TIMELINE_START_HOUR) * 60 + startDate.getUTCMinutes();
                      const endMinutes = (endDate.getUTCHours() - TIMELINE_START_HOUR) * 60 + endDate.getUTCMinutes();
                      const totalMinutes = (TIMELINE_END_HOUR - TIMELINE_START_HOUR) * 60;

                      const leftPct = (startMinutes / totalMinutes) * 100;
                      const widthPct = ((endMinutes - startMinutes) / totalMinutes) * 100;
                      const statusCfg = getStatusConfig(booking.trang_thai_dat);

                      return (
                        <div
                          key={booking.ma_dat_san_chi_tiet}
                          className="absolute top-2 bottom-2 rounded-lg px-3 flex items-center text-white text-[11px] font-bold shadow-md cursor-pointer transition-all hover:scale-y-110 hover:shadow-xl hover:z-20 group/booking"
                          style={{
                            left: `${leftPct}%`,
                            width: `${widthPct}%`,
                            background: statusCfg.gradient,
                          }}
                        >
                          <span className="truncate">{booking.datsan?.nguoidung?.ho_ten}</span>
                          
                          {/* Custom Tooltip */}
                          <div className="invisible group-hover/booking:visible absolute top-full left-0 mt-2 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl z-50 min-w-[240px] animate-in fade-in slide-in-from-top-2">
                            <p className="font-black text-sm mb-2">{booking.datsan?.nguoidung?.ho_ten}</p>
                            <div className="space-y-1.5 opacity-90 text-[11px]">
                              <p className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-xs">call</span>
                                {booking.datsan?.nguoidung?.so_dien_thoai}
                              </p>
                              <p className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-xs">schedule</span>
                                {formatTimeFromISO(booking.gio_bat_dau)} - {formatTimeFromISO(booking.gio_ket_thuc)}
                              </p>
                              <p className="pt-2 border-t border-white/10 flex justify-between font-bold">
                                <span>Tiền cọc:</span>
                                <span>{formatVND(booking.tien_coc)}</span>
                              </p>
                              <p className="flex justify-between font-bold text-primary">
                                <span>Còn lại:</span>
                                <span>{formatVND(booking.tien_con_lai)}</span>
                              </p>
                            </div>
                            <div className="mt-3 flex justify-center">
                              <span className="bg-white/10 px-2 py-1 rounded text-[10px] uppercase font-black tracking-widest">
                                {booking.trang_thai_dat}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
