import { SelectedSlot, GroupedSlot } from "@/types/court.types";

export function parseTimeUTC(timeStr: string): Date {
  const [h, m] = timeStr.split(':').map(Number);
  return new Date(`1970-01-01T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00Z`);
}


export function formatTimeFromISO(isoString: string): string {
  const date = new Date(isoString);
  const h = String(date.getUTCHours()).padStart(2, "0");
  const m = String(date.getUTCMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}


export function mergeSelectedSlots(markers: SelectedSlot[]): GroupedSlot[] {
  if (markers.length === 0) return [];
  
  const sorted = [...markers].sort((a, b) => {
    if (a.ma_san !== b.ma_san) return a.ma_san.localeCompare(b.ma_san);
    if (a.ngay_dat !== b.ngay_dat) return a.ngay_dat.localeCompare(b.ngay_dat);
    return a.gio_bat_dau.localeCompare(b.gio_bat_dau);
  });

  const grouped: GroupedSlot[] = [];
  let currentGroup: GroupedSlot | null = null;

  for (const marker of sorted) {
    if (!currentGroup) {
      // Slot đầu tiên — tính giờ kết thúc là +30 phút
      const [h, m] = marker.gio_bat_dau.split(':').map(Number);
      const endDate = new Date(0, 0, 0, h, m + 30);
      const endTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
      
      currentGroup = { 
        ...marker, 
        gio_ket_thuc: endTime, 
        slots: [marker],
        gia_thue: marker.gia_thue 
      };
    } else {
      const lastMarker = currentGroup.slots[currentGroup.slots.length - 1];
      if (!lastMarker) {
        currentGroup = { ...marker, gio_ket_thuc: marker.gio_bat_dau, slots: [marker], gia_thue: 0 };
        continue;
      }
      const [lastH, lastM] = lastMarker.gio_bat_dau.split(':').map(Number);
      const expectedDate = new Date(0, 0, 0, lastH, lastM + 30);
      const expectedTime = `${String(expectedDate.getHours()).padStart(2, '0')}:${String(expectedDate.getMinutes()).padStart(2, '0')}`;

      // So sánh expectedTime với marker.gio_bat_dau
      if (
        currentGroup.ma_san === marker.ma_san &&
        currentGroup.ngay_dat === marker.ngay_dat &&
        marker.gio_bat_dau === expectedTime
      ) {
        // Block liên tiếp — tính giờ kết thúc mới là marker + 30 phút
        const [mh, mm] = marker.gio_bat_dau.split(':').map(Number);
        const mEndDate = new Date(0, 0, 0, mh, mm + 30);
        const mEndTime = `${String(mEndDate.getHours()).padStart(2, '0')}:${String(mEndDate.getMinutes()).padStart(2, '0')}`;
      
        currentGroup.gio_ket_thuc = mEndTime;
        currentGroup.slots.push(marker);
        
        currentGroup.gia_thue = currentGroup.slots.length * currentGroup.slots[0].gia_thue;
      } else {
        // Không liên tiếp
        grouped.push(currentGroup);
        
        const [mh, mm] = marker.gio_bat_dau.split(':').map(Number);
        const mEndDate = new Date(0, 0, 0, mh, mm + 30);
        const mEndTime = `${String(mEndDate.getHours()).padStart(2, '0')}:${String(mEndDate.getMinutes()).padStart(2, '0')}`;

        currentGroup = { 
          ...marker, 
          gio_ket_thuc: mEndTime, 
          slots: [marker],
          gia_thue: marker.gia_thue
        };
      }
    }
  }
  if (currentGroup) grouped.push(currentGroup);

  return grouped;
}
