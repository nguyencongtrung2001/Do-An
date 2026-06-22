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

  // 2. Thuật toán gộp các block 30 phút liên tục khít nhau
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
      if (!lastMarker) continue;
      
      // Thời gian mong đợi của block tiếp theo để được tính là liên tục
      const expectedTime = addThirtyMinutes(lastMarker.gio_bat_dau);

      if (
        currentGroup.ma_san === marker.ma_san &&
        currentGroup.ngay_dat === marker.ngay_dat &&
        marker.gio_bat_dau === expectedTime
      ) {
        // Nếu liên tục: Cập nhật giờ kết thúc tổng và đẩy slot vào mảng
        currentGroup.gio_ket_thuc = addThirtyMinutes(marker.gio_bat_dau);
        currentGroup.slots.push(marker);
        currentGroup.gia_thue = currentGroup.slots.length * (currentGroup.slots[0]?.gia_thue ?? 0);
      } else {
        // Nếu đứt đoạn: Đẩy nhóm cũ vào mảng kết quả và khởi tạo nhóm mới
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

  // ĐÃ LOẠI BỎ ĐOẠN MAP CUT SLOTS GÂY LỖI
  return grouped;
}