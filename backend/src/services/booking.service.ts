import { bookingRepository } from '../repositories/booking.repository.js';
import { ApiError } from '../utils/ApiError.js';

export class BookingService {
  async createBooking(data: any) {
    const { ma_nguoi_dung, phuong_thuc_thanh_toan, selectedSlots } = data;

    if (!selectedSlots || selectedSlots.length === 0) {
      throw new ApiError(400, "Vui lòng chọn ít nhất 1 khung giờ.");
    }

    if (!ma_nguoi_dung) {
      throw new ApiError(401, "Bạn chưa đăng nhập.");
    }

    // 1. Prepare slots for Concurrency Check
    const formattedSlots = selectedSlots.map((s: any) => {
      const ngayDat = new Date(s.ngay_dat);
      
      const [startH, startM] = s.gio_bat_dau.split(':').map(Number);
      const gioBatDau = new Date(0, 0, 0, startH, startM);
      
      const [endH, endM] = s.gio_ket_thuc.split(':').map(Number);
      const gioKetThuc = new Date(0, 0, 0, endH, endM);

      return {
        ma_san: s.ma_san,
        ngay_dat: ngayDat,
        gio_bat_dau: gioBatDau,
        gio_ket_thuc: gioKetThuc,
        gia_thue: Number(s.gia_thue)
      };
    });

    // 2. Concurrency Check
    const overlaps = await bookingRepository.checkSlotsAvailability(formattedSlots);
    if (overlaps && overlaps.length > 0) {
      throw new ApiError(409, "Một số khung giờ bạn chọn đã có người đặt hoặc đang chờ xử lý. Vui lòng tải lại trang và chọn giờ khác.");
    }

    // 3. Calculate Deposit & Total
    const tongTien = formattedSlots.reduce((sum: number, slot: any) => sum + slot.gia_thue, 0);

    // 4. Set Status based on Payment Method
    const status = phuong_thuc_thanh_toan === "wallet" ? "Đã thanh toán" : "Chờ nhận cọc";
    
    // Mapping for Database Check Constraint
    const paymentMap: Record<string, string> = {
      cash: "Tiền mặt",
      wallet: "Ví hệ thống",
      vnpay: "VNPAY"
    };
    const mappedPayment = paymentMap[phuong_thuc_thanh_toan] || phuong_thuc_thanh_toan;

    const ma_dat_san = `DS_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const bookingData = {
      ma_dat_san,
      ma_nguoi_dung,
      tong_tien: tongTien,
      phuong_thuc_thanh_toan: mappedPayment
    };

    const detailsData = formattedSlots.map((s: any, idx: number) => {
      const tienCoc = s.gia_thue * 0.3;
      const tienConLai = s.gia_thue - tienCoc;
      
      return {
        ma_dat_san_chi_tiet: `CTDS_${Date.now()}_${idx}`,
        ma_san: s.ma_san,
        ngay_dat: s.ngay_dat,
        gio_bat_dau: s.gio_bat_dau,
        gio_ket_thuc: s.gio_ket_thuc,
        tien_coc: tienCoc,
        tien_con_lai: tienConLai,
        trang_thai_dat: status
      };
    });

    // 5. Call Repository to save
    try {
      let walletDeduction;
      if (phuong_thuc_thanh_toan === "wallet") {
        walletDeduction = { userId: ma_nguoi_dung, amount: tongTien };
      }

      const booking = await bookingRepository.createBooking(bookingData, detailsData, walletDeduction);
      return booking;
    } catch (error: any) {
      if (error.message === "Số dư ví không đủ để thực hiện giao dịch này") {
        throw new ApiError(400, error.message);
      }
      throw error;
    }
  }

  async getUserBookings(userId: string) {
    if (!userId) {
      throw new ApiError(400, "User ID is required");
    }
    return await bookingRepository.findByUserId(userId);
  }
}

export const bookingService = new BookingService();
