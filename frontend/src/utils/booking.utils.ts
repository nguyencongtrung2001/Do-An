import { SelectedSlot, GroupedSlot } from "@/types/court.types";

/**
 * Chuyển chuỗi "HH:mm" thành Date dạng UTC 1970-01-01T[HH:mm:ss]Z
 * Giúp Prisma lưu đúng giá trị Time mà không bị lệch múi giờ.
 */
export function parseTimeUTC(timeStr: string): Date {
  const [h, m] = timeStr.split(':').map(Number);
  return new Date(`1970-01-01T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00Z`);
}

/**
 * Format time từ ISO string — sử dụng UTC để tránh lệch múi giờ
 */
export function formatTimeFromISO(isoString: string): string {
  const date = new Date(isoString);
  const h = String(date.getUTCHours()).padStart(2, "0");
  const m = String(date.getUTCMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

/**
 * Gộp các mốc chọn giờ (markers) thành các nhóm liên tiếp.
 * Mỗi marker đại diện cho một block 30 phút.
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
      const [h, m] = marker.gio_bat_dau.split(':').map(Number);
      const endDate = new Date(0, 0, 0, h, m + 30);
      const gio_ket_thuc = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
      
      currentGroup = { 
        ...marker, 
        gio_ket_thuc, 
        slots: [marker] 
      };
    } else {
      const [lastH, lastM] = currentGroup.gio_ket_thuc.split(':').map(Number);
      const expectedTime = `${String(lastH).padStart(2, '0')}:${String(lastM).padStart(2, '0')}`;

      if (
        currentGroup.ma_san === marker.ma_san &&
        currentGroup.ngay_dat === marker.ngay_dat &&
        marker.gio_bat_dau === expectedTime
      ) {
        const [h, m] = marker.gio_bat_dau.split(':').map(Number);
        const endDate = new Date(0, 0, 0, h, m + 30);
        currentGroup.gio_ket_thuc = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
        currentGroup.gia_thue += marker.gia_thue;
        currentGroup.slots.push(marker);
      } else {
        grouped.push(currentGroup);
        const [h, m] = marker.gio_bat_dau.split(':').map(Number);
        const endDate = new Date(0, 0, 0, h, m + 30);
        const gio_ket_thuc = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
        currentGroup = { 
          ...marker, 
          gio_ket_thuc, 
          slots: [marker] 
        };
      }
    }
  }
  if (currentGroup) grouped.push(currentGroup);

  return grouped;
}
