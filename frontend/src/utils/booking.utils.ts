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
 * Cộng thêm phút vào chuỗi "HH:mm" và trả về chuỗi "HH:mm" mới.
 * Ví dụ: addMinutes("07:30", 30) → "08:00"
 */
function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  const d = new Date(0, 0, 0, h, m + minutes);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
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
      // Marker đầu tiên — giờ kết thúc tạm = chính gio_bat_dau của marker này
      // (sẽ được cập nhật khi có marker tiếp theo)
      currentGroup = { 
        ...marker, 
        gio_ket_thuc: addMinutes(marker.gio_bat_dau, 30), 
        slots: [marker] 
      };
    } else {
      // Kiểm tra marker này có liên tiếp 30p sau marker trước không
      const lastMarker = currentGroup.slots[currentGroup.slots.length - 1];
      if (!lastMarker) {
        currentGroup = { ...marker, gio_ket_thuc: addMinutes(marker.gio_bat_dau, 30), slots: [marker] };
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
        // Marker liên tiếp — cập nhật giờ kết thúc = gio_bat_dau của marker mới + 30 phút
        currentGroup.gio_ket_thuc = addMinutes(marker.gio_bat_dau, 30);
        currentGroup.gia_thue += marker.gia_thue;
        currentGroup.slots.push(marker);
      } else {
        // Không liên tiếp — push group cũ, bắt đầu group mới
        grouped.push(currentGroup);
        currentGroup = { 
          ...marker, 
          gio_ket_thuc: addMinutes(marker.gio_bat_dau, 30), 
          slots: [marker] 
        };
      }
    }
  }
  if (currentGroup) grouped.push(currentGroup);

  return grouped;
}
