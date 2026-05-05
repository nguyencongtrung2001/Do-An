"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { courtService } from "@/services/court.service";
import type { OwnerCourt } from "@/types/court.types";

export function useOwnerCourts() {
  const { token } = useAuth();
  const [courts, setCourts] = useState<OwnerCourt[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourts = useCallback(async () => {
    if (!token) return;
    try {
      const data = await courtService.getOwnerCourts(token);
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
    (async () => { await fetchCourts(); })();
  }, [fetchCourts]);

  /** Change court status to any of 3 values. Sends JSON (no image). */
  const changeCourtStatus = async (court: OwnerCourt, newStatus: string) => {
    if (!token) return false;
    try {
      const data = await courtService.updateCourt(token, court.ma_san, {
        ten_san: court.ten_san,
        loai_the_thao: court.loai_the_thao,
        gia_thue_30p: court.gia_thue_30p,
        trang_thai_san: newStatus,
      });
      if (data.success) {
        setCourts((prev) =>
          prev.map((c) =>
            c.ma_san === court.ma_san ? { ...c, trang_thai_san: newStatus } : c
          )
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error changing status:", error);
      return false;
    }
  };

  return {
    courts,
    loading,
    fetchCourts,
    changeCourtStatus,
  };
}
