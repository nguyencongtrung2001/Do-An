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


/**
 * Cộng thêm 30 phút vào chuỗi "HH:mm"
 */
function addThirtyMinutes(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const endDate = new Date(0, 0, 0, h, m + 30);
  return `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
}


/**
 * Gộp các marker liên tiếp thành nhóm (GroupedSlot).
 *
 * Mỗi marker đại diện cho 1 khung chơi 30 phút thực tế.
 * gio_ket_thuc = gio_bat_dau của marker cuối + 30 phút.
 *
 * Ví dụ: chọn 08:30, 09:00, 09:30, 10:00
 * → gio_bat_dau = 08:30, gio_ket_thuc = 10:30
 * → 4 khung chơi (08:30-09:00, 09:00-09:30, 09:30-10:00, 10:00-10:30)
 * → gia_thue = 4 * giá_30p
 */
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
      currentGroup = { 
        ...marker, 
        gio_ket_thuc: addThirtyMinutes(marker.gio_bat_dau), 
        slots: [marker],
        gia_thue: marker.gia_thue 
      };
    } else {
      const lastMarker = currentGroup.slots[currentGroup.slots.length - 1];
      if (!lastMarker) {
        currentGroup = { ...marker, gio_ket_thuc: addThirtyMinutes(marker.gio_bat_dau), slots: [marker], gia_thue: marker.gia_thue };
        continue;
      }
      const [lastH, lastM] = lastMarker.gio_bat_dau.split(':').map(Number);
      const expectedDate = new Date(0, 0, 0, lastH, lastM + 30);
      const expectedTime = `${String(expectedDate.getHours()).padStart(2, '0')}:${String(expectedDate.getMinutes()).padStart(2, '0')}`;

      if (
        currentGroup.ma_san === marker.ma_san &&
        currentGroup.ngay_dat === marker.ngay_dat &&
        marker.gio_bat_dau === expectedTime
      ) {
        currentGroup.gio_ket_thuc = addThirtyMinutes(marker.gio_bat_dau);
        currentGroup.slots.push(marker);
        currentGroup.gia_thue = currentGroup.slots.length * (currentGroup.slots[0]?.gia_thue ?? 0);
      } else {
        grouped.push(currentGroup);
        currentGroup = { 
          ...marker, 
          gio_ket_thuc: addThirtyMinutes(marker.gio_bat_dau), 
          slots: [marker],
          gia_thue: marker.gia_thue
        };
      }
    }
  }
  if (currentGroup) grouped.push(currentGroup);

  return grouped;
}

