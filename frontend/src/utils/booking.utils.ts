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

export function mergeSelectedSlots(markers: SelectedSlot[]): GroupedSlot[] {
  if (markers.length === 0) return [];
  
  // 1. Sắp xếp các slot tăng dần theo mã sân, ngày đặt và giờ bắt đầu
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
      const expectedTime = addThirtyMinutes(lastMarker.gio_bat_dau);

      // Nếu slot tiếp theo liên tục (cách nhau đúng 30 phút)
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

  // 2. KHẮC PHỤC LỖI USER BẤM THỪA Ô CUỐI:
  // Nếu nhóm slot liên tục có từ 2 ô trở lên và ô cuối cùng khớp với thói quen chọn mốc kết thúc của User
  return grouped.map(group => {
    if (group.slots.length > 1) {
      // Lấy ô cuối cùng hiện tại trong danh sách chọn
      const lastSlot = group.slots[group.slots.length - 1];
      
      // Nếu gio_ket_thuc tính toán (ví dụ 21:00) trừ đi 30 phút chính là ô user click (20:30)
      // Và trước đó đã có ô liền kề (20:00 -> 20:30), ta tiến hành cắt bớt ô thừa này đi
      if (lastSlot && group.gio_ket_thuc === addThirtyMinutes(lastSlot.gio_bat_dau)) {
        // Thực hiện cắt bỏ slot cuối cùng ra khỏi mảng hiển thị & tính tiền của giỏ hàng
        const newSlots = group.slots.slice(0, -1);
        const finalLastSlot = newSlots[newSlots.length - 1];
        
        if (finalLastSlot) {
          return {
            ...group,
            gio_ket_thuc: addThirtyMinutes(finalLastSlot.gio_bat_dau), // Giờ kết thúc lùi lại về 20:30
            slots: newSlots,
            gia_thue: newSlots.length * (newSlots[0]?.gia_thue ?? 0) // Tính lại tiền chuẩn cho 4 ô (2 tiếng)
          };
        }
      }
    }
    return group;
  });
}