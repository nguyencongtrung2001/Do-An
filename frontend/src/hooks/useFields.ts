"use client";

import { useState, useEffect } from "react";
import { courtService } from "@/services/court.service";
import { normalizeSport } from "@/lib/constants/sports";
import type { CourtGridItem, CourtMapData, CourtApiItem } from "@/types/court.types";

/**
 * Hook for fetching public field list (used by CourtGrid and MapClient).
 * Returns both grid items and map items from the same API call.
 */
export function useFields() {
  const [gridItems, setGridItems] = useState<CourtGridItem[]>([]);
  const [mapItems, setMapItems] = useState<CourtMapData[]>([]);
  const [loading, setLoading] = useState(true);

  // Slugify helper — matches backend
  const slugify = (str: string): string =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await courtService.getFields();

        if (cancelled) return;

        const apiItems = data as CourtApiItem[];

        // Map to grid items
        const grid: CourtGridItem[] = apiItems.map(item => ({
          id: item.ma_san,
          name: item.ten_san,
          sport: normalizeSport(item.loai_the_thao),
          rating: item.so_sao,
          location: item.ten_dia_diem || "Chưa có tên địa điểm",
          address: item.dia_chi || "Chưa có địa chỉ",
          imageUrl: item.anh_dai_dien || "/images/categories/soccer.png",
          slug: item.ten_dia_diem ? slugify(item.ten_dia_diem) : String(item.ma_san),
        }));

        // Map to map items
        const map: CourtMapData[] = apiItems.map(item => {
          const pricePerHour = item.gia_thue_30p ? item.gia_thue_30p * 2 : 0;
          const priceFormatted = pricePerHour >= 1000 ? `${pricePerHour / 1000}K/giờ` : `${pricePerHour}đ/giờ`;

          return {
            id: typeof item.ma_san === 'string' ? parseInt(item.ma_san.replace(/[^0-9]/g, '') || '0') : item.ma_san,
            name: item.ten_san,
            sport: normalizeSport(item.loai_the_thao),
            lat: item.vi_do || 16.0544,
            lng: item.kinh_do || 108.2022,
            distance: "Đang tính...",
            address: item.dia_chi || "Chưa có địa chỉ",
            price: priceFormatted,
            rating: item.so_sao ? item.so_sao.toFixed(1) : "0.0",
            image: item.anh_dai_dien || "/images/categories/soccer.png",
            slug: item.ten_dia_diem ? slugify(item.ten_dia_diem) : String(item.ma_san),
          };
        });

        setGridItems(grid);
        setMapItems(map);
      } catch (err) {
        console.error("Lỗi khi tải danh sách sân:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { gridItems, mapItems, loading };
}
