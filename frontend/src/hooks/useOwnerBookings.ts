"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { bookingService } from "@/services/booking.service";
import type { BookingDetail } from "@/types/booking.types";
import { OwnerCourt } from "@/types/court.types";

export function useOwnerBookings() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<BookingDetail[]>([]);
  const [courts, setCourts] = useState<OwnerCourt[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await bookingService.getOwnerBookings(token);
      if (data.success) {
        setBookings(data.bookings);
        // Extract unique courts for the timeline
        const uniqueCourts = Array.from(
          new Set(data.bookings.map(b => JSON.stringify({ ma_san: b.san.ma_san, ten_san: b.san.ten_san })))
        ).map(s => {
          const parsed = JSON.parse(s as string);
          return {
            ...parsed,
            loai_the_thao: "Bóng đá", // Mocked as required by interface
            trang_thai_san: "Đang hoạt động", // Mocked as required by interface
            gia_thue_30p: 100000, // Mocked as required by interface
          } as OwnerCourt;
        });

        setCourts(uniqueCourts);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const loadData = async () => {
      await fetchBookings();
    };
    loadData();
  }, [fetchBookings]);

  const updateBookingStatus = async (id: string, status: string) => {
    if (!token) return false;
    try {
      const data = await bookingService.updateBookingStatus(token, id, status);
      if (data.success) {
        setBookings(prev => prev.map(b =>
          b.ma_dat_san_chi_tiet === id ? { ...b, trang_thai_dat: status as BookingDetail["trang_thai_dat"] } : b
        ));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating status:", error);
      return false;
    }
  };

  return {
    bookings,
    courts,
    loading,
    fetchBookings,
    updateBookingStatus,
  };
}
