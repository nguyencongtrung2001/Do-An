"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiGet } from "@/services/api";
import toast from "react-hot-toast";
import { History as HistoryIcon, SearchX, Loader2 } from "lucide-react";

// Sub-components
import HistoryFilters from "./HistoryFilters";
import BookingItem from "./BookingItem";

export default function History() {
  const { user, token } = useAuth() || {};
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user || !token) return;
      try {
        const response = await apiGet<{ data: any[] }>(`/booking/user/${user.ma_nguoi_dung}`, token);
        setBookings(response.data || []);
      } catch (error) {
        toast.error("Không thể tải lịch sử đặt sân");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, token]);

  const flatDetails = useMemo(() => {
    return bookings.flatMap((booking) =>
      booking.datsanchitiet.map((detail: any) => ({
        detail,
        ma_dat_san: booking.ma_dat_san,
        phuong_thuc: booking.phuong_thuc_thanh_toan,
      }))
    );
  }, [bookings]);

  const filteredDetails = useMemo(() => {
    return filter === "all"
      ? flatDetails
      : flatDetails.filter((item) => item.detail.trang_thai_dat === filter);
  }, [flatDetails, filter]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[24px] bg-slate-900 text-white flex items-center justify-center shadow-2xl shadow-slate-200">
            <HistoryIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Lịch sử đặt sân</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Hành trình trải nghiệm thể thao của bạn</p>
          </div>
        </div>

        <HistoryFilters 
          currentFilter={filter}
          onFilterChange={setFilter}
        />
      </div>

      {/* Main List */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Đang đồng bộ dữ liệu lịch sử...</p>
          </div>
        ) : filteredDetails.length === 0 ? (
          <div className="bg-white rounded-[40px] p-24 border border-slate-100 shadow-sm text-center">
            <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-8">
              <SearchX className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">DANH SÁCH TRỐNG</h3>
            <p className="text-slate-400 font-bold mt-2">Bạn chưa có bất kỳ giao dịch nào trong danh mục này.</p>
            <button className="mt-8 px-8 py-4 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95">
              KHÁM PHÁ SÂN NGAY
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredDetails.map((item) => (
              <BookingItem key={item.detail.ma_dat_san_chi_tiet} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
