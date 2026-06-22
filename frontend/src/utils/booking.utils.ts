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
 * Cộng thêm 30 phút vào chuỗi "HH:mm", trả về "HH:mm" mới.
 * Ví dụ: "07:30" → "08:00", "23:30" → "00:00"
 */
function addThirtyMinutes(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + 30;
  const newH = Math.floor(total / 60) % 24;
  const newM = total % 60;
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}

/**
 * Gộp các marker liên tiếp thành GroupedSlot.
 *
 * Mô hình: mỗi nút bấm = 1 khung chơi 30 phút thực sự.
 * - Chọn 06:00, 06:30, 07:00, 07:30, 08:00 (5 markers)
 *   → gio_bat_dau = 06:00
 *   → gio_ket_thuc = 08:00 + 30p = ... sai, xem bên dưới.
 *
 * Đúng hơn: marker cuối là 08:00 → kết thúc thực tế = 08:00 + 30p = 08:30? Không.
 *
 * Yêu cầu của bạn:
 *   Chọn 06:00, 06:30, 07:00, 07:30, 08:00 → hiển thị 06:00 - 08:00, 4 × giá.
 *   Tức là: marker CUỐI (08:00) chính là THỜI ĐIỂM KẾT THÚC, không phải thêm 30p.
 *   Số khung chơi = số markers - 1 = 4.
 *
 * Vậy mô hình đúng:
 *   - gio_bat_dau  = gio_bat_dau của marker ĐẦU
 *   - gio_ket_thuc = gio_bat_dau của marker CUỐI  (đây là thời điểm kết thúc)
 *   - gia_thue     = (slots.length - 1) * giá_30p
 *   - Tối thiểu 2 markers để hợp lệ (= 1 tiếng khi có ≥ 3 markers theo yêu cầu)
 *
 * Lỗi cũ: gio_ket_thuc khởi tạo = marker.gio_bat_dau (đúng khi chỉ có 1 marker)
 * nhưng khi merge, cập nhật = marker.gio_bat_dau của marker mới nhất (cũng đúng).
 * Vấn đề là HIỂN THỊ: BookingCart hiển thị gio_ket_thuc nhưng value này là
 * "07:30" thay vì "08:00" khi chọn đến 08:00.
 *
 * Fix: khi merge marker mới vào group, gio_ket_thuc = gio_bat_dau của marker MỚI
 * (không phải của lastMarker). Đây đúng là cái đang làm... vậy lỗi ở đâu?
 *
 * À - lỗi nằm ở chỗ expectedTime tính từ lastMarker.gio_bat_dau + 30p.
 * Nếu lastMarker = "07:30" thì expectedTime = "08:00".
 * Khi marker = "08:00" khớp → merge → gio_ket_thuc = "08:00" ✓
 * Nhưng nếu lastMarker = "07:00" thì expectedTime = "07:30",
 * marker tiếp = "07:30" → merge → gio_ket_thuc = "07:30".
 * Vòng lặp tiếp: lastMarker = "07:30", expected = "08:00",
 * marker = "08:00" → merge → gio_ket_thuc = "08:00" ✓
 *
 * Vậy code cũ về logic merge ĐÃ ĐÚNG khi đủ markers.
 * Lỗi thực sự: khi user chỉ chọn đến "07:30" mà không bấm "08:00",
 * gio_ket_thuc = "07:30" → hiển thị kết thúc 07:30 thay vì 08:00.
 *
 * Giải pháp đúng theo yêu cầu:
 *   gio_ket_thuc = addThirtyMinutes(marker_cuoi.gio_bat_dau)
 *   gia_thue     = slots.length * giá_30p  (mỗi marker = 1 khung)
 *
 * Với cách này:
 *   Chọn 06:00, 06:30, 07:00, 07:30 (4 markers)
 *   → gio_ket_thuc = addThirtyMinutes("07:30") = "08:00"
 *   → gia_thue = 4 * giá ✓
 *   → Hiển thị: 06:00 - 08:00 (2 tiếng), 4 × giá ✓
 *
 *   Chọn 06:00, 06:30 (2 markers)
 *   → gio_ket_thuc = addThirtyMinutes("06:30") = "07:00"
 *   → gia_thue = 2 * giá ✓
 *   → Hiển thị: 06:00 - 07:00 (1 tiếng) ✓
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
        // gio_ket_thuc = marker này + 30p (marker đầu tiên = 1 khung 30p)
        gio_ket_thuc: addThirtyMinutes(marker.gio_bat_dau),
        slots: [marker],
        // 1 marker = 1 khung 30p
        gia_thue: marker.gia_thue,
      };
    } else {
      const lastMarker = currentGroup.slots[currentGroup.slots.length - 1];
      if (!lastMarker) {
        currentGroup = {
          ...marker,
          gio_ket_thuc: addThirtyMinutes(marker.gio_bat_dau),
          slots: [marker],
          gia_thue: marker.gia_thue,
        };
        continue;
      }

      // Marker tiếp theo liên tiếp = lastMarker + 30p
      const expectedTime = addThirtyMinutes(lastMarker.gio_bat_dau);

      if (
        currentGroup.ma_san === marker.ma_san &&
        currentGroup.ngay_dat === marker.ngay_dat &&
        marker.gio_bat_dau === expectedTime
      ) {
        currentGroup.slots.push(marker);
        // gio_ket_thuc = marker mới nhất + 30p
        currentGroup.gio_ket_thuc = addThirtyMinutes(marker.gio_bat_dau);
        // gia_thue = tổng số markers × giá 30p
        currentGroup.gia_thue = currentGroup.slots.length * (currentGroup.slots[0]?.gia_thue ?? 0);
      } else {
        // Không liên tiếp → đóng group hiện tại, bắt đầu group mới
        grouped.push(currentGroup);
        currentGroup = {
          ...marker,
          gio_ket_thuc: addThirtyMinutes(marker.gio_bat_dau),
          slots: [marker],
          gia_thue: marker.gia_thue,
        };
      }
    }
  }

  if (currentGroup) grouped.push(currentGroup);

  return grouped;
}