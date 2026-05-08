"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { apiGet } from "@/services/api";
import { toast } from "react-hot-toast";

// ==============================
// Types & Mock Data
// ==============================
type BookingStatus = "confirmed" | "pending" | "cancelled";

interface BookingInfo {
  id: string;
  courtName: string;
  address: string;
  totalPrice: number;
  depositPrice?: number;
  status: BookingStatus;
  image: string;
  courtSubName: string;
  date: string;
  timeRange: string;
  cancelDate?: string;
}

const MOCK_BOOKINGS: BookingInfo[] = [
  {
    id: "#BK20260305001",
    courtName: "Sân bóng đá K34",
    address: "123 Đường Bạch Đằng, Hải Châu, Đà Nẵng",
    totalPrice: 400000,
    depositPrice: 200000,
    status: "confirmed",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAauiqdyNWVqjMU-Gkl5aqFLVfulhFpw0Hqha3VQhLjyid0gZJB6f0o-9T9uoScJMYUAUC97puxCjT9FeEFLFHfltL8BC6IPaNpllVu7PBjUnNTOqkC_S6L0KjIlQPqjI5r4NieQwCl1xA2jIcfW79nBwXX-y4AxZnX_3ajpINCy80E97a2zONBECkyFvSa28lnD3zxyPkc9iGaAz59dQwRUtr6Dl3DGLjRtvPH3wheVRoyK2va7IKvx47GxDXw168SjqQT9Jjt24kV",
    courtSubName: "Sân 5 người - A",
    date: "5/3/2026",
    timeRange: "17:00 → 19:00 (2 tiếng)",
  },
  {
    id: "#BK20260307002",
    courtName: "Tennis Sơn Trà",
    address: "45 Ngô Quyền, Sơn Trà, Đà Nẵng",
    totalPrice: 600000,
    depositPrice: 300000,
    status: "confirmed",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA9sS28oSBqGXC5LgD5R_CrfxjT2yrJp4E-KLbO7YPGoBV7BpZLvfM07bR8TMk2m9hEthZHPMr6aSiU7IATa2hbpWNaT6X3_VNQ5aDhQ59ckIa5ib1e8nywcSXhdhcQpeCTRJ_yyRt4mA",
    courtSubName: "Sân 2",
    date: "7/3/2026",
    timeRange: "08:00 → 11:00 (3 tiếng)",
  },
  {
    id: "#BK20260306003",
    courtName: "Sân Cầu lông Thanh Khê",
    address: "78 Điện Biên Phủ, Thanh Khê, Đà Nẵng",
    totalPrice: 200000,
    status: "pending",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCcDd1VhaBo0zCcsjHNkEkhAq2I_Za3RRqTaxatKSZSiHXIqKw_joEYSWUk6GbznOE4QhiLf9iJ-90TetB09-hiZI7f9VFzthrKFiB34IFv9r6d_l7afvQoCL1Y_1cLSpBJ9bVj-3egZQqL4lm80kz0ayKiAt4GdS0Mdd6jizop30Ke6WOnftFLFJfCE_Gk61eiQq_A51zkkx5xE6VlG-CNdNExTh5f2x1etfRIh9Cls8xzVbrFf4GLHE_mRYwJ0b9gzS5XfA8W07-P",
    courtSubName: "Sân 1",
    date: "6/3/2026",
    timeRange: "14:00 → 15:00 (1 tiếng)",
  },
  {
    id: "#BK20260308004",
    courtName: "Sân bóng đá K34",
    address: "123 Đường Bạch Đằng, Hải Châu, Đà Nẵng",
    totalPrice: 800000,
    status: "pending",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAauiqdyNWVqjMU-Gkl5aqFLVfulhFpw0Hqha3VQhLjyid0gZJB6f0o-9T9uoScJMYUAUC97puxCjT9FeEFLFHfltL8BC6IPaNpllVu7PBjUnNTOqkC_S6L0KjIlQPqjI5r4NieQwCl1xA2jIcfW79nBwXX-y4AxZnX_3ajpINCy80E97a2zONBECkyFvSa28lnD3zxyPkc9iGaAz59dQwRUtr6Dl3DGLjRtvPH3wheVRoyK2va7IKvx47GxDXw168SjqQT9Jjt24kV",
    courtSubName: "Sân 7 người - B",
    date: "8/3/2026",
    timeRange: "18:00 → 20:00 (2 tiếng)",
  },
  {
    id: "#BK20260301005",
    courtName: "Pickleball Ngũ Hành Sơn",
    address: "56 Lê Văn Hiến, Ngũ Hành Sơn, Đà Nẵng",
    totalPrice: 300000,
    status: "cancelled",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA9sS28oSBqGXC5LgD5R_CrfxjT2yrJp4E-KLbO7YPGoBV7BpZLvfM07bR8TMk2m9hEthZHPMr6aSiU7IATa2hbpWNaT6X3_VNQ5aDhQ59ckIa5ib1e8nywcSXhdhcQpeCTRJ_yyRt4mA",
    courtSubName: "Sân 3",
    date: "1/3/2026",
    timeRange: "09:00 → 10:30 (1.5 tiếng)",
    cancelDate: "28/2/2026",
  },
];

// ==============================
// Component
// ==============================
export default function HistoryClient() {
  const { user, token } = useAuth() || {};
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "Chờ xử lý" | "Đã xác nhận" | "Đã hủy" | "Đã thanh toán">("all");

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user || !token) return;
      try {
        const response: any = await apiGet(`/booking/user/${user.ma_nguoi_dung}`, token);
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

  const filteredBookings = filter === "all" 
    ? bookings 
    : bookings.filter((b) => {
        // A booking (datsan) has multiple details (datsanchitiet)
        // We filter if ANY detail matches the status
        return b.datsanchitiet.some((d: any) => d.trang_thai_dat === filter);
      });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã xác nhận": return "bg-green-500";
      case "Đã thanh toán": return "bg-blue-500";
      case "Chờ xử lý": 
      case "Chờ nhận cọc": return "bg-amber-500";
      case "Đã hủy":
      case "Hủy": return "bg-red-500";
      default: return "bg-slate-500";
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="layout-container px-4 lg:px-40 py-8 min-h-[calc(100vh-200px)]">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Lịch sử đặt sân</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Theo dõi các lần đặt sân của bạn</p>
        </div>
        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === "all"
                ? "bg-primary text-white shadow-md shadow-primary/30"
                : "bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter("Đã xác nhận")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === "Đã xác nhận"
                ? "bg-primary text-white shadow-md shadow-primary/30"
                : "bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary"
            }`}
          >
            Đã xác nhận
          </button>
          <button
            onClick={() => setFilter("Chờ xử lý")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === "Chờ xử lý"
                ? "bg-primary text-white shadow-md shadow-primary/30"
                : "bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary"
            }`}
          >
            Chờ xử lý
          </button>
          <button
            onClick={() => setFilter("Đã hủy")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === "Đã hủy"
                ? "bg-primary text-white shadow-md shadow-primary/30"
                : "bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary"
            }`}
          >
            Đã hủy
          </button>
        </div>
      </div>

      {/* Booking List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-500 animate-pulse">Đang tải lịch sử...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#2a1d1d] rounded-2xl border border-gray-100 dark:border-gray-800">
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">history</span>
            <p className="text-slate-500 font-medium">Bạn chưa có lịch sử đặt sân nào.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => {
            const firstDetail = booking.datsanchitiet[0];
            const court = firstDetail?.san;
            const location = court?.diadiem;
            const status = firstDetail?.trang_thai_dat || "Chờ xử lý";
            
            return (
              <div
                key={booking.ma_dat_san}
                className={`booking-card bg-white dark:bg-[#2a1d1d] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-shadow overflow-hidden ${
                  status === "Đã hủy" ? "opacity-70" : "hover:shadow-md"
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-32 md:h-auto relative shrink-0">
                    <Image
                      src={court?.anhsan?.[0]?.duong_dan_anh || "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=800"}
                      alt={location?.ten_dia_diem || "Sân"}
                      fill
                      className={`object-cover ${status === "Đã hủy" ? "grayscale" : ""}`}
                    />
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase text-white shadow-sm ${getStatusColor(status)}`}>
                        {status}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className={`text-lg font-bold text-slate-900 dark:text-white ${status === "Đã hủy" ? "line-through" : ""}`}>
                          {location?.ten_dia_diem}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-sm">location_on</span>
                          {location?.dia_chi}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${status === "Đã hủy" ? "text-slate-400 line-through" : "text-primary"}`}>
                          {Number(booking.tong_tien).toLocaleString("vi-VN")}đ
                        </p>
                        <p className="text-[11px] text-slate-400 capitalize">Thanh toán: {booking.phuong_thuc_thanh_toan === "wallet" ? "Ví hệ thống" : booking.phuong_thuc_thanh_toan}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4 bg-gray-50/50 dark:bg-gray-800/30 p-3 rounded-xl">
                      {booking.datsanchitiet.map((detail: any, dIdx: number) => (
                        <div key={dIdx} className="flex flex-wrap gap-x-6 gap-y-2 text-xs border-b border-gray-100 dark:border-gray-800 last:border-0 pb-2 last:pb-0">
                          <div className="flex items-center gap-1.5 min-w-[120px]">
                            <span className="material-symbols-outlined text-base text-primary">sports_soccer</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{detail.san.ten_san}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-primary">calendar_today</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              {new Date(detail.ngay_dat).toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-primary">schedule</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              {formatTime(detail.gio_bat_dau)} → {formatTime(detail.gio_ket_thuc)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <p className="text-xs text-slate-400">
                        Mã đơn: <span className="font-mono font-bold text-slate-600 dark:text-slate-300">{booking.ma_dat_san}</span>
                      </p>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-all">
                          Chi tiết
                        </button>
                        {status !== "Đã hủy" && (
                          <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 hover:bg-red-100 transition-all">
                            Hủy đặt
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
