"use client";

import { useState, useEffect } from "react";
import { LocationDetail, DetailCourt } from "@/types/court.types";
import { courtService } from "@/services/court.service";
import TimeSlotGrid from "./TimeSlotGrid";

interface CourtListProps {
  location: LocationDetail;
  selectedDate: string;
  selectedCourt: string | null;
  onCourtSelect: (id: string) => void;
  selectedSlots: any[];
  onSlotToggle: (court: DetailCourt, slot: string) => void;
}

export default function CourtList({
  location,
  selectedDate,
  selectedCourt,
  onCourtSelect,
  selectedSlots,
  onSlotToggle,
}: CourtListProps) {
  
  const [bookedSlotsMap, setBookedSlotsMap] = useState<Record<string, { gio_bat_dau: string; gio_ket_thuc: string }[]>>({});

  
  useEffect(() => {
    const fetchBookedSlots = async () => {
      const newMap: Record<string, { gio_bat_dau: string; gio_ket_thuc: string }[]> = {};

      
      await Promise.all(
        location.sans.map(async (court) => {
          try {
            const res = await courtService.getBookedSlots(court.ma_san, selectedDate);
            newMap[court.ma_san] = res.data || [];
          } catch (error) {
            console.error(`Lỗi fetch booked slots cho sân ${court.ma_san}:`, error);
            newMap[court.ma_san] = [];
          }
        })
      );

      setBookedSlotsMap(newMap);
    };

    if (selectedDate) {
      fetchBookedSlots();
    }
  }, [selectedDate, location.sans]);

  return (
    <div className="lg:col-span-2 space-y-6">
      {location.sans.map(court => {
        const courtSelectedSlots = selectedSlots
          .filter(s => s.ma_san === court.ma_san && s.ngay_dat === selectedDate)
          .map(s => s.gio_bat_dau);

        return (
          <TimeSlotGrid
            key={court.ma_san}
            court={court}
            isSelected={selectedCourt === court.ma_san}
            onSelect={() => onCourtSelect(court.ma_san)}
            selectedDate={selectedDate}
            selectedSlots={courtSelectedSlots}
            onSlotToggle={(slot) => onSlotToggle(court, slot)}
            bookedSlots={bookedSlotsMap[court.ma_san] || []}
          />
        );
      })}
    </div>
  );
}
