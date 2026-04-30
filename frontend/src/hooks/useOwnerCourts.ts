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
    const loadData = async () => {
      await fetchCourts();
    };
    loadData();
  }, [fetchCourts]);

  const toggleCourtStatus = async (court: OwnerCourt) => {
    if (!token) return;
    const newStatus = court.trang_thai_san === "Đang hoạt động" ? "Đang bảo trì" : "Đang hoạt động";

    try {
      const data = await courtService.updateCourt(token, court.ma_san, {
        ...court,
        trang_thai_san: newStatus,
      });
      if (data.success) {
        setCourts(prev => prev.map(c =>
          c.ma_san === court.ma_san ? { ...c, trang_thai_san: newStatus } : c
        ));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error toggling status:", error);
      return false;
    }
  };

  const addCourt = async (formData: FormData) => {
    if (!token) return null;
    try {
      const data = await courtService.addCourt(token, formData);
      if (data.success) {
        await fetchCourts();
        return data;
      }
      return null;
    } catch (error) {
      console.error("Error adding court:", error);
      return null;
    }
  };

  const updateCourt = async (ma_san: string, courtData: Record<string, unknown>, isJSON: boolean = true) => {
    if (!token) return null;
    try {
      const data = await courtService.updateCourt(token, ma_san, courtData, isJSON);
      if (data.success) {
        await fetchCourts();
        return data;
      }
      return null;
    } catch (error) {
      console.error("Error updating court:", error);
      return null;
    }
  };

  return {
    courts,
    loading,
    fetchCourts,
    toggleCourtStatus,
    addCourt,
    updateCourt,
  };
}
