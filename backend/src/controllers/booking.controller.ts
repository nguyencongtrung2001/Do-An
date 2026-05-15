import type { Request, Response, NextFunction } from 'express';
import { bookingService } from '../services/booking.service.js';
import { ApiError } from '../utils/ApiError.js';
import { VNPayUtil } from '../utils/vnpay.util.js';
import prisma from '../config/prisma.js';

export const createBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ipAddr = Array.isArray(req.headers['x-forwarded-for']) 
      ? req.headers['x-forwarded-for'][0] 
      : req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    console.log("📦 Booking Payload:", req.body);
    const bookingData = req.body;
    const result = await bookingService.createBooking(bookingData, ipAddr);
    
    res.status(201).json({
      message: result.message || "Đặt sân thành công",
      data: result.booking,
      paymentUrl: result.paymentUrl
    });
  } catch (error: any) {
    console.error("❌ Booking Error Detail:", error);
    next(error);
  }
};

export const getUserBookingsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    if (typeof userId !== 'string') {
      throw new ApiError(400, "User ID is invalid");
    }
    const bookings = await bookingService.getUserBookings(userId);
    
    res.status(200).json({
      status: "success",
      data: bookings
    });
  } catch (error: any) {
    next(error);
  }
};

export const vnpayReturn = async (req: Request, res: Response) => {
  // req.query đã được Express decode sẵn
  const vnp_Params = req.query as Record<string, string>;
 
  console.log('[VNPay Return] params:', vnp_Params);
  console.log('[VNPay Return] responseCode:', vnp_Params['vnp_ResponseCode']);
 
  const isValid = VNPayUtil.verifyChecksum({ ...vnp_Params });
 
  if (!isValid) {
    console.error('[VNPay Return] Checksum INVALID!');
    return res.redirect(
      `${process.env.FRONTEND_URL}/payment-status?status=error&message=invalid_checksum`,
    );
  }
 
  const responseCode = vnp_Params['vnp_ResponseCode'];
  const txnRef       = vnp_Params['vnp_TxnRef'];
 
  if (responseCode === '00') {
    return res.redirect(
      `${process.env.FRONTEND_URL}/payment-status?status=success&vnp_TxnRef=${txnRef}`,
    );
  }
 
  // Trả về responseCode để frontend/debug biết lý do thất bại
  return res.redirect(
    `${process.env.FRONTEND_URL}/payment-status?status=failed&code=${responseCode}&vnp_TxnRef=${txnRef}`,
  );
};

export const vnpayIPN = async (req: Request, res: Response) => {
  const vnp_Params = req.body || req.query;

  try {
    const isValid = VNPayUtil.verifyChecksum(vnp_Params);
    if (!isValid) return res.json({ RspCode: '97', Message: 'Invalid checksum' });

    const txnRef = vnp_Params['vnp_TxnRef'];
    const amount = parseInt(vnp_Params['vnp_Amount']) / 100;
    const responseCode = vnp_Params['vnp_ResponseCode'];

    if (responseCode !== '00') {
      return res.json({ RspCode: '00', Message: 'Confirm received' });
    }

    await prisma.$transaction(async (tx) => {
      const booking = await tx.datsan.findUnique({
        where: { ma_dat_san: txnRef },
        include: { datsanchitiet: true },
      });

      if (!booking) {
        return res.json({ RspCode: '01', Message: 'Order not found' });
      }

      const isAlreadyPaid = booking.datsanchitiet.every(detail => detail.trang_thai_dat === 'Đã xác nhận');
      if (isAlreadyPaid) {
        return res.json({ RspCode: '02', Message: 'Order already processed' });
      }

      await tx.datsanchitiet.updateMany({
        where: { ma_dat_san: txnRef },
        data: { trang_thai_dat: 'Đã xác nhận' },
      });

      await tx.giaodich.create({
        data: {
          ma_giao_dich: `GD_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
          ma_dat_san: txnRef,
          ma_nguoi_dung: booking.ma_nguoi_dung,
          ma_gd_vnpay: vnp_Params['vnp_TransactionNo'],
          so_tien_tt: amount,
          noi_dung_thanh_toan: vnp_Params['vnp_OrderInfo'],
          ngay_tao: new Date(),
          trang_thai_giao_dich: 'Thành công',
          ma_ngan_hang: vnp_Params['vnp_BankCode'],
          thoi_gian_tt_vnpay: vnp_Params['vnp_PayDate'],
          ma_phan_hoi: vnp_Params['vnp_ResponseCode']
        },
      });
    });

    res.json({ RspCode: '00', Message: 'Success' });
  } catch (error) {
    console.error(error);
    res.json({ RspCode: '99', Message: 'Unknown error' });
  }
};
