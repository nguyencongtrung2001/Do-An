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
 * 
 * MÔ HÌNH: Mỗi marker đại diện cho 1 khung chơi 30 phút.
 * Ví dụ: chọn 06:00, 06:30, 07:00, 07:30
 * → gio_bat_dau = 06:00, gio_ket_thuc = 08:00, chơi 2 tiếng (4 khung × 30p).
 * Số khung chơi thực tế = slots.length.
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

  const addThirtyMin = (time: string): string => {
    const [h, m] = time.split(':').map(Number);
    const d = new Date(0, 0, 0, h, m + 30);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  for (const marker of sorted) {
    if (!currentGroup) {
      currentGroup = { 
        ...marker, 
        gio_ket_thuc: addThirtyMin(marker.gio_bat_dau), 
        slots: [marker],
        gia_thue: marker.gia_thue 
      };
    } else {
      const lastMarker = currentGroup.slots[currentGroup.slots.length - 1];
      if (!lastMarker) {
        currentGroup = { ...marker, gio_ket_thuc: addThirtyMin(marker.gio_bat_dau), slots: [marker], gia_thue: marker.gia_thue };
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
        // Marker liên tiếp — cập nhật giờ kết thúc = marker mới + 30 phút
        currentGroup.gio_ket_thuc = addThirtyMin(marker.gio_bat_dau);
        currentGroup.slots.push(marker);
        // Cập nhật tổng giá thuê = tất cả khung chơi × giá 30p
        currentGroup.gia_thue = currentGroup.slots.length * currentGroup.slots[0].gia_thue;
      } else {
        // Không liên tiếp — push group cũ, bắt đầu group mới
        grouped.push(currentGroup);
        currentGroup = { 
          ...marker, 
          gio_ket_thuc: addThirtyMin(marker.gio_bat_dau), 
          slots: [marker],
          gia_thue: marker.gia_thue
        };
      }
    }
  }
  if (currentGroup) grouped.push(currentGroup);

  return grouped;
}
