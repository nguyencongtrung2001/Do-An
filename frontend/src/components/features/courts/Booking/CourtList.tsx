"use client";

import { LocationDetail, DetailCourt } from "@/types/court.types";
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
          />
        );
      })}
    </div>
  );
}
