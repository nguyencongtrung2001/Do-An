import { bookingRepository } from '../repositories/booking.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { VNPayUtil } from '../utils/vnpay.util.js';
import prisma from '../config/prisma.js';

// ==============================
// Types
// ==============================
interface RawSlot {
  ma_san: string;
  ngay_dat: string;
  gio_bat_dau: string;
  gio_ket_thuc: string;
  gia_thue: number;
}

interface FormattedSlot {
  ma_san: string;
  ngay_dat: Date;
  gio_bat_dau: Date;
  gio_ket_thuc: Date;
  gia_thue: number;
}

interface MergedSlot {
  ma_san: string;
  ngay_dat: Date;
  gio_bat_dau: Date;
  gio_ket_thuc: Date;
  tong_gia: number;
}

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
function mergeSlots(slots: FormattedSlot[]): MergedSlot[] {
  if (slots.length === 0) return [];

  // Sắp xếp theo sân → ngày → giờ bắt đầu
  const sorted = [...slots].sort((a, b) => {
    if (a.ma_san !== b.ma_san) return a.ma_san.localeCompare(b.ma_san);
    if (a.ngay_dat.getTime() !== b.ngay_dat.getTime()) return a.ngay_dat.getTime() - b.ngay_dat.getTime();
    return a.gio_bat_dau.getTime() - b.gio_bat_dau.getTime();
  });

  const merged: MergedSlot[] = [];

  const first = sorted[0];
  if (!first) return [];

  let current: MergedSlot = {
    ma_san: first.ma_san,
    ngay_dat: first.ngay_dat,
    gio_bat_dau: first.gio_bat_dau,
    gio_ket_thuc: first.gio_ket_thuc,
    tong_gia: first.gia_thue,
  };

  for (let i = 1; i < sorted.length; i++) {
    const slot = sorted[i];
    if (!slot) continue;

    const sameCourt = slot.ma_san === current.ma_san;
    const sameDate = slot.ngay_dat.getTime() === current.ngay_dat.getTime();
    const consecutive = slot.gio_bat_dau.getTime() === current.gio_ket_thuc.getTime();

    if (sameCourt && sameDate && consecutive) {
      // Gộp: mở rộng giờ kết thúc, cộng dồn giá
      current.gio_ket_thuc = slot.gio_ket_thuc;
      current.tong_gia += slot.gia_thue;
    } else {
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
function parseTimeUTC(timeStr: string): Date {
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
  async createBooking(data: { ma_nguoi_dung: string; phuong_thuc_thanh_toan: string; selectedSlots: RawSlot[] }, ipAddr: string = '127.0.0.1') {
    const { ma_nguoi_dung, phuong_thuc_thanh_toan, selectedSlots } = data;

    if (!selectedSlots || selectedSlots.length === 0) {
      throw new ApiError(400, "Vui lòng chọn ít nhất 1 khung giờ.");
    }

    if (!ma_nguoi_dung) {
      throw new ApiError(401, "Bạn chưa đăng nhập.");
    }

    // 1. Parse raw strings → Date objects
    const formattedSlots: FormattedSlot[] = selectedSlots.map((s) => ({
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

    const paymentMap: Record<string, string> = {
      cash: "Tiền mặt",
      wallet: "Ví nội bộ",
      vnpay: "VNPay",
    };
    // Đảm bảo chữ thường để map chính xác
    const normalizedPayment = phuong_thuc_thanh_toan.toLowerCase();
    const mappedPayment = paymentMap[normalizedPayment] || phuong_thuc_thanh_toan;

    const validPayments = ["Tiền mặt", "Ví nội bộ", "VNPay"];
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
      
      if (mappedPayment === "VNPay") {
        try {
          const orderInfo = `Thanh toan dat san ${ma_dat_san}`;
          
          console.log('--- VNPAY Payment Debug ---');
          console.log('OrderId:', ma_dat_san);
          console.log('Amount:', tongTien);
          console.log('IpAddr:', ipAddr);
          console.log('OrderInfo:', orderInfo);

          const paymentUrl = VNPayUtil.createPaymentUrl(
            ma_dat_san,
            tongTien,
            orderInfo,
            ipAddr
          );
          
          console.log('Payment URL generated:', paymentUrl);
          return { booking, paymentUrl, message: 'Chuyển hướng đến VNPAY' };
        } catch (vnpayError: any) {
          console.error('--- VNPAY Error Details ---');
          console.error('Error name:', vnpayError.name);
          console.error('Error message:', vnpayError.message);
          console.error('Stack trace:', vnpayError.stack);
          
          throw new ApiError(500, `Lỗi khởi tạo thanh toán VNPAY: ${vnpayError.message}`);
        }
      }

      return { booking };
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "Số dư ví không đủ để thực hiện giao dịch này") {
        throw new ApiError(400, error.message);
      }
      throw error;
    }
  }

  // Hàm xử lý kết quả trả về ngầm (IPN) hoặc từ Return URL
  async processVNPayCallback(vnp_Params: Record<string, string>) {
    // 1. Kiểm tra chữ ký bảo mật từ VNPay
    const isValid = VNPayUtil.verifyChecksum(vnp_Params);
    if (!isValid) {
      throw new ApiError(400, 'Chữ ký giao dịch không hợp lệ (Invalid Checksum)');
    }

    const orderId = vnp_Params['vnp_TxnRef']; // Mã đặt sân hệ thống
    const responseCode = vnp_Params['vnp_ResponseCode']; // Mã phản hồi kết quả
    const vnpayTranNo = vnp_Params['vnp_TransactionNo']; // Mã giao dịch của VNPay
    const amount = Number(vnp_Params['vnp_Amount']) / 100; // Chia 100 để về tiền gốc

    // 2. Tìm đơn đặt sân trong DB
    const booking = await prisma.datsan.findUnique({
      where: { ma_dat_san: orderId },
      include: { datsanchitiet: true },
    });

    if (!booking) {
      throw new ApiError(404, 'Không tìm thấy đơn đặt sân tương ứng');
    }

    // Nếu đơn hàng đã được xử lý trước đó rồi thì bỏ qua (tránh trùng lặp IPN)
    const isAlreadyPaid = booking.datsanchitiet.every((detail: any) => detail.trang_thai_dat === 'Đã xác nhận');
    if (isAlreadyPaid) {
      return { success: true, message: 'Đơn hàng đã được xử lý trước đó', status: 'SUCCESS' };
    }

    // 3. Nếu thanh toán thành công (Mã '00')
    if (responseCode === '00') {
      // Dùng $transaction để đảm bảo đồng bộ: Cập nhật trạng thái sân & Tạo bản ghi giao dịch
      await prisma.$transaction(async (tx: any) => {
        // Cập nhật trạng thái đơn đặt sân chi tiết
        await tx.datsanchitiet.updateMany({
          where: { ma_dat_san: orderId },
          data: { trang_thai_dat: 'Đã xác nhận' },
        });

        // Kiểm tra xem đã lưu giao dịch chưa
        const existingTx = await tx.giaodich.findFirst({
          where: { ma_dat_san: orderId, trang_thai_giao_dich: 'Thành công' },
        });

        if (!existingTx) {
          // Lưu lịch sử vào bảng giao dịch
          await tx.giaodich.create({
            data: {
              ma_giao_dich: `GD_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
              ma_dat_san: orderId,
              ma_nguoi_dung: booking.ma_nguoi_dung,
              ma_gd_vnpay: vnpayTranNo,
              so_tien_tt: amount,
              trang_thai_giao_dich: 'Thành công',
              ngay_tao: new Date(),
              noi_dung_thanh_toan: vnp_Params['vnp_OrderInfo'],
              ma_ngan_hang: vnp_Params['vnp_BankCode'],
              ma_phan_hoi: vnp_Params['vnp_ResponseCode'],
              thoi_gian_tt_vnpay: vnp_Params['vnp_PayDate'],
            },
          });
        }
      });

      return { success: true, status: 'SUCCESS' };
    } else {
      // Nếu khách hàng hủy hoặc lỗi thanh toán
      await prisma.datsanchitiet.updateMany({
        where: { ma_dat_san: orderId },
        data: { trang_thai_dat: 'Đã hủy' },
      });
      
      return { success: false, status: 'FAILED' };
    }
  }

  async getUserBookings(userId: string) {
    if (!userId) {
      throw new ApiError(400, "User ID is required");
    }
    return await bookingRepository.findByUserId(userId);
  }

  async cancelBooking(bookingId: string, userId: string) {
    if (!bookingId || !userId) {
      throw new ApiError(400, "Booking ID and User ID are required");
    }

    const booking = await prisma.datsan.findUnique({
      where: { ma_dat_san: bookingId },
      include: { datsanchitiet: true }
    });

    if (!booking) {
      throw new ApiError(404, "Không tìm thấy đơn đặt sân");
    }

    if (booking.ma_nguoi_dung !== userId) {
      throw new ApiError(403, "Bạn không có quyền hủy đơn đặt sân này");
    }

    const isAlreadyCancelled = booking.datsanchitiet.every(d => d.trang_thai_dat === "Đã hủy");
    if (isAlreadyCancelled) {
      throw new ApiError(400, "Đơn đặt sân này đã được hủy trước đó");
    }

    // Calculate time difference in minutes
    const now = new Date();
    const createdAt = booking.ngay_tao ? new Date(booking.ngay_tao) : now;
    const diffMs = now.getTime() - createdAt.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    let refundPercentage = 0;
    if (diffMins <= 30) {
      refundPercentage = 1; // 100%
    } else if (diffMins > 30 && diffMins <= 60) {
      refundPercentage = 0.5; // 50%
    } else {
      refundPercentage = 0; // 0%
    }

    const tongTien = Number(booking.tong_tien);
    const refundAmount = tongTien * refundPercentage;

    await bookingRepository.cancelBookingWithRefund(bookingId, userId, refundAmount);

    let message = "Hủy đặt sân thành công.";
    if (refundAmount > 0) {
      message += ` Bạn được hoàn lại ${refundPercentage * 100}% số tiền (${refundAmount} VNĐ) vào ví nội bộ.`;
    } else {
      message += " Đã quá thời gian quy định nên không được hoàn tiền.";
    }

    return {
      message,
      refundAmount,
      refundPercentage
    };
  }
}

export const bookingService = new BookingService();
