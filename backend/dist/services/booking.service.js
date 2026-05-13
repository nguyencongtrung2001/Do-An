import { bookingRepository } from '../repositories/booking.repository.js';
import { ApiError } from '../utils/ApiError.js';
// ==============================
// Utility: Merge consecutive slots
// ==============================
/**
 * Gộp các khung giờ liên tiếp trên cùng một sân thành 1 bản ghi duy nhất.
 *
 * Ví dụ: [06:00-06:30, 06:30-07:00, 07:00-07:30, 09:00-09:30]
 *   → [06:00-07:30, 09:00-09:30]
 *
 * Quy tắc:
 *   - Cùng ma_san VÀ cùng ngay_dat
 *   - gio_ket_thuc của slot trước === gio_bat_dau của slot sau
 */
function mergeSlots(slots) {
    if (slots.length === 0)
        return [];
    // Sắp xếp theo sân → ngày → giờ bắt đầu
    const sorted = [...slots].sort((a, b) => {
        if (a.ma_san !== b.ma_san)
            return a.ma_san.localeCompare(b.ma_san);
        if (a.ngay_dat.getTime() !== b.ngay_dat.getTime())
            return a.ngay_dat.getTime() - b.ngay_dat.getTime();
        return a.gio_bat_dau.getTime() - b.gio_bat_dau.getTime();
    });
    const merged = [];
    const first = sorted[0];
    if (!first)
        return [];
    let current = {
        ma_san: first.ma_san,
        ngay_dat: first.ngay_dat,
        gio_bat_dau: first.gio_bat_dau,
        gio_ket_thuc: first.gio_ket_thuc,
        tong_gia: first.gia_thue,
    };
    for (let i = 1; i < sorted.length; i++) {
        const slot = sorted[i];
        if (!slot)
            continue;
        const sameCourt = slot.ma_san === current.ma_san;
        const sameDate = slot.ngay_dat.getTime() === current.ngay_dat.getTime();
        const consecutive = slot.gio_bat_dau.getTime() === current.gio_ket_thuc.getTime();
        if (sameCourt && sameDate && consecutive) {
            // Gộp: mở rộng giờ kết thúc, cộng dồn giá
            current.gio_ket_thuc = slot.gio_ket_thuc;
            current.tong_gia += slot.gia_thue;
        }
        else {
            // Không liên tiếp → push bản ghi hiện tại, bắt đầu bản ghi mới
            merged.push(current);
            current = {
                ma_san: slot.ma_san,
                ngay_dat: slot.ngay_dat,
                gio_bat_dau: slot.gio_bat_dau,
                gio_ket_thuc: slot.gio_ket_thuc,
                tong_gia: slot.gia_thue,
            };
        }
    }
    // Đừng quên push bản ghi cuối cùng
    merged.push(current);
    return merged;
}
/**
 * Chuyển chuỗi "HH:mm" thành Date dạng UTC 1970-01-01T[HH:mm:ss]Z
 * Giúp Prisma lưu đúng giá trị Time mà không bị lệch múi giờ.
 */
function parseTimeUTC(timeStr) {
    if (!timeStr || !/^\d{2}:\d{2}$/.test(timeStr)) {
        throw new ApiError(400, "Định dạng giờ không hợp lệ");
    }
    const [h, m] = timeStr.split(':').map(Number);
    return new Date(`1970-01-01T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00Z`);
}
// ==============================
// Service
// ==============================
export class BookingService {
    async createBooking(data) {
        const { ma_nguoi_dung, phuong_thuc_thanh_toan, selectedSlots } = data;
        if (!selectedSlots || selectedSlots.length === 0) {
            throw new ApiError(400, "Vui lòng chọn ít nhất 1 khung giờ.");
        }
        if (!ma_nguoi_dung) {
            throw new ApiError(401, "Bạn chưa đăng nhập.");
        }
        // 1. Parse raw strings → Date objects
        const formattedSlots = selectedSlots.map((s) => ({
            ma_san: s.ma_san,
            ngay_dat: new Date(s.ngay_dat),
            gio_bat_dau: parseTimeUTC(s.gio_bat_dau),
            gio_ket_thuc: parseTimeUTC(s.gio_ket_thuc),
            gia_thue: Number(s.gia_thue),
        }));
        // 2. Concurrency Check (kiểm tra trùng lịch trước khi gộp)
        const overlaps = await bookingRepository.checkSlotsAvailability(formattedSlots);
        if (overlaps && overlaps.length > 0) {
            throw new ApiError(409, "Một số khung giờ bạn chọn đã có người đặt hoặc đang chờ xử lý. Vui lòng tải lại trang và chọn giờ khác.");
        }
        // 3. Gộp các slot liên tiếp trên cùng sân thành 1 bản ghi
        const mergedSlots = mergeSlots(formattedSlots);
        // 4. Tính tổng tiền từ các slot đã gộp
        const tongTien = mergedSlots.reduce((sum, slot) => sum + slot.tong_gia, 0);
        // 5. Trạng thái & mapping phương thức thanh toán
        // - Ví nội bộ: tự động "Đã xác nhận", không cần chủ sân xác nhận
        // - Tiền mặt: "Chờ xử lý", cần chủ sân xác nhận
        // Check constraint: 'Chờ xử lý', 'Đã xác nhận', 'Đã nhận sân', 'Hoàn thành', 'Đã hủy'
        const status = phuong_thuc_thanh_toan === "wallet" ? "Đã xác nhận" : "Chờ xử lý";
        const paymentMap = {
            cash: "Tiền mặt",
            wallet: "Ví nội bộ",
            vnpay: "VNPAY",
        };
        const mappedPayment = paymentMap[phuong_thuc_thanh_toan] || phuong_thuc_thanh_toan;
        const validPayments = ["Tiền mặt", "Ví nội bộ", "VNPAY"];
        if (!validPayments.includes(mappedPayment)) {
            throw new ApiError(400, `Phương thức thanh toán không hợp lệ: ${mappedPayment}`);
        }
        const ma_dat_san = `DS_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const bookingData = {
            ma_dat_san,
            ma_nguoi_dung,
            tong_tien: tongTien,
            phuong_thuc_thanh_toan: mappedPayment,
        };
        // 6. Tạo chi tiết từ các slot ĐÃ GỘP (không phải từ slot thô)
        const detailsData = mergedSlots.map((s, idx) => {
            const tienCoc = s.tong_gia * 0.3;
            const tienConLai = s.tong_gia - tienCoc;
            return {
                ma_dat_san_chi_tiet: `CTDS_${Date.now()}_${idx}`,
                ma_san: s.ma_san,
                ngay_dat: s.ngay_dat,
                gio_bat_dau: s.gio_bat_dau,
                gio_ket_thuc: s.gio_ket_thuc,
                tien_coc: tienCoc,
                tien_con_lai: tienConLai,
                trang_thai_dat: status,
            };
        });
        // 7. Lưu vào DB (trong transaction)
        try {
            let walletDeduction;
            if (phuong_thuc_thanh_toan === "wallet") {
                walletDeduction = { userId: ma_nguoi_dung, amount: tongTien };
            }
            const booking = await bookingRepository.createBooking(bookingData, detailsData, walletDeduction);
            return booking;
        }
        catch (error) {
            if (error instanceof Error && error.message === "Số dư ví không đủ để thực hiện giao dịch này") {
                throw new ApiError(400, error.message);
            }
            throw error;
        }
    }
    async getUserBookings(userId) {
        if (!userId) {
            throw new ApiError(400, "User ID is required");
        }
        return await bookingRepository.findByUserId(userId);
    }
}
export const bookingService = new BookingService();
//# sourceMappingURL=booking.service.js.map