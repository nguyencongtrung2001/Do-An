import { bookingRepository } from '../repositories/datsan.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { thanhToanService } from '../services/thanhtoan.service.js';
import prisma from '../config/prisma.js';




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





function mergeSlots(slots: FormattedSlot[]): MergedSlot[] {
  if (slots.length === 0) return [];

  
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
      
      current.gio_ket_thuc = slot.gio_ket_thuc;
      current.tong_gia += slot.gia_thue;
    } else {
      
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

  
  merged.push(current);

  return merged;
}


function parseTimeUTC(timeStr: string): Date {
  if (!timeStr || !/^\d{2}:\d{2}$/.test(timeStr)) {
    throw new ApiError(400, "Định dạng giờ không hợp lệ");
  }
  const [h, m] = timeStr.split(':').map(Number);
  return new Date(`1970-01-01T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00Z`);
}


export class DatsanService {
  async TaoDonDatSan(data: { ma_nguoi_dung: string; phuong_thuc_thanh_toan: string; selectedSlots: RawSlot[] }, ipAddr: string = '127.0.0.1') {
    const { ma_nguoi_dung, phuong_thuc_thanh_toan, selectedSlots } = data;

    if (!selectedSlots || selectedSlots.length === 0) {
      throw new ApiError(400, "Vui lòng chọn ít nhất 1 khung giờ.");
    }

    if (!ma_nguoi_dung) {
      throw new ApiError(401, "Bạn chưa đăng nhập.");
    }

    const formattedSlots: FormattedSlot[] = selectedSlots.map((s) => ({
      ma_san: s.ma_san,
      ngay_dat: new Date(s.ngay_dat),
      gio_bat_dau: parseTimeUTC(s.gio_bat_dau),
      gio_ket_thuc: parseTimeUTC(s.gio_ket_thuc),
      gia_thue: Number(s.gia_thue),
    }));

    const overlaps = await bookingRepository.KiemTraKhungGioTrong(formattedSlots);
    if (overlaps && overlaps.length > 0) {
      throw new ApiError(409, "Một số khung giờ bạn chọn đã có người đặt hoặc đang chờ xử lý. Vui lòng tải lại trang và chọn giờ khác.");
    }

    const mergedSlots = mergeSlots(formattedSlots);
    const tongTien = mergedSlots.reduce((sum, slot) => sum + slot.tong_gia, 0);

    const status = phuong_thuc_thanh_toan === "wallet" ? "Đã xác nhận" : "Chờ xử lý";

    const paymentMap: Record<string, string> = {
      cash: "Tiền mặt",
      wallet: "Ví nội bộ",
      vnpay: "VNPay",
    };
    
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

    try {
      const tongTienCoc = detailsData.reduce((sum, d) => sum + d.tien_coc, 0);

      let walletDeduction;
      if (phuong_thuc_thanh_toan === "wallet") {
        walletDeduction = { userId: ma_nguoi_dung, amount: tongTienCoc };
      }

      const booking = await bookingRepository.TaoDonDatSan(bookingData, detailsData, walletDeduction);
      
      if (mappedPayment === "VNPay") {
        try {
          const orderInfo = `Thanh toan tien coc dat san ${ma_dat_san}`;
          
          console.log('--- VNPAY Payment Debug ---');
          console.log('OrderId:', ma_dat_san);
          console.log('Amount (Cọc):', tongTienCoc);
          console.log('IpAddr:', ipAddr);
          console.log('OrderInfo:', orderInfo);

          const paymentUrl = thanhToanService.TaoUrlThanhToanVNPay(
            ma_dat_san,
            tongTienCoc,
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



  async LayDatSanNguoiDung(userId: string) {
    if (!userId) {
      throw new ApiError(400, "User ID is required");
    }
    return await bookingRepository.TimTheoNguoiDung(userId);
  }

  async HuyDatSan(bookingId: string, userId: string) {
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

    const now = new Date();
    const createdAt = booking.ngay_tao ? new Date(booking.ngay_tao) : now;
    const diffMs = now.getTime() - createdAt.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    let refundPercentage = 0;
    if (diffMins <= 30) {
      refundPercentage = 1; 
    } else if (diffMins > 30 && diffMins <= 60) {
      refundPercentage = 0.5; 
    } else {
      refundPercentage = 0; 
    }

    const tongTienCoc = booking.datsanchitiet.reduce(
      (sum, d) => sum + Number(d.tien_coc), 0
    );
    const refundAmount = tongTienCoc * refundPercentage;

    await bookingRepository.HuyDonVaHoanTien(bookingId, userId, refundAmount);

    let message = "Hủy đặt sân thành công.";
    if (refundAmount > 0) {
      message += ` Bạn được hoàn lại ${refundPercentage * 100}% tiền cọc (${refundAmount.toLocaleString()} VNĐ) vào ví nội bộ.`;
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

export const datsanService = new DatsanService();
