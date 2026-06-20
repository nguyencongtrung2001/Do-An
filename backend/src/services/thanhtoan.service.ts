import { thanhToanRepository } from '../repositories/thanhtoan.repository.js';
import { ApiError } from '../utils/ApiError.js';
import { VNPayUtil } from '../utils/vnpay.util.js';
import prisma from '../config/prisma.js';

export class ThanhToanService {
  TaoUrlThanhToanVNPay(ma_dat_san: string, amount: number, orderInfo: string, ipAddr: string) {
    try {
      return VNPayUtil.createPaymentUrl(ma_dat_san, amount, orderInfo, ipAddr);
    } catch (vnpayError: any) {
      throw new ApiError(500, `Lỗi khởi tạo thanh toán VNPAY: ${vnpayError.message}`);
    }
  }

  async XuLyCallbackVNPay(vnp_Params: Record<string, string>) {
    const isValid = VNPayUtil.verifyChecksum(vnp_Params);
    if (!isValid) {
      throw new ApiError(400, 'Chữ ký giao dịch không hợp lệ (Invalid Checksum)');
    }

    const orderId = vnp_Params['vnp_TxnRef'] || ''; 
    const responseCode = vnp_Params['vnp_ResponseCode'] || ''; 
    const vnpayTranNo = vnp_Params['vnp_TransactionNo'] || ''; 
    const amount = Number(vnp_Params['vnp_Amount']) / 100; 

    const booking = await prisma.datsan.findUnique({
      where: { ma_dat_san: orderId },
      include: { datsanchitiet: true },
    });

    if (!booking) {
      throw new ApiError(404, 'Không tìm thấy đơn đặt sân tương ứng');
    }

    const isAlreadyPaid = booking.datsanchitiet.every((detail: any) => detail.trang_thai_dat === 'Đã xác nhận');
    if (isAlreadyPaid) {
      return { success: true, message: 'Đơn hàng đã được xử lý trước đó', status: 'SUCCESS' };
    }

    if (responseCode === '00') {
      const existingTx = await thanhToanRepository.TimGiaoDichThanhCongTheoDatSan(orderId);

      if (!existingTx) {
        await thanhToanRepository.TaoGiaoDichThanhCong({
          ma_dat_san: orderId,
          ma_nguoi_dung: booking.ma_nguoi_dung || '',
          ma_gd_vnpay: vnpayTranNo,
          so_tien_tt: amount,
          noi_dung_thanh_toan: vnp_Params['vnp_OrderInfo'] || '',
          ma_ngan_hang: vnp_Params['vnp_BankCode'] || '',
          ma_phan_hoi: vnp_Params['vnp_ResponseCode'] || '',
          thoi_gian_tt_vnpay: vnp_Params['vnp_PayDate'] || '',
        });
      }

      return { success: true, status: 'SUCCESS' };
    } else {
      await thanhToanRepository.CapNhatTrangThaiHuy(orderId);
      return { success: false, status: 'FAILED' };
    }
  }

  async XuLyThongBaoVNPay(vnp_Params: Record<string, string>) {
    const isValid = VNPayUtil.verifyChecksum(vnp_Params);
    if (!isValid) return { RspCode: '97', Message: 'Invalid checksum' };

    const txnRef = vnp_Params['vnp_TxnRef'] || '';
    const amount = parseInt(vnp_Params['vnp_Amount'] || '0') / 100;
    const responseCode = vnp_Params['vnp_ResponseCode'] || '';

    if (responseCode !== '00') {
      return { RspCode: '00', Message: 'Confirm received' };
    }

    const booking = await prisma.datsan.findUnique({
      where: { ma_dat_san: txnRef },
      include: { datsanchitiet: true },
    });

    if (!booking) {
      return { RspCode: '01', Message: 'Order not found' };
    }

    const isAlreadyPaid = booking.datsanchitiet.every(detail => detail.trang_thai_dat === 'Đã xác nhận');
    if (isAlreadyPaid) {
      return { RspCode: '02', Message: 'Order already processed' };
    }

    await thanhToanRepository.TaoGiaoDichThanhCong({
      ma_dat_san: txnRef,
      ma_nguoi_dung: booking.ma_nguoi_dung || '',
      ma_gd_vnpay: vnp_Params['vnp_TransactionNo'] || '',
      so_tien_tt: amount,
      noi_dung_thanh_toan: vnp_Params['vnp_OrderInfo'] || '',
      ma_ngan_hang: vnp_Params['vnp_BankCode'] || '',
      ma_phan_hoi: vnp_Params['vnp_ResponseCode'] || '',
      thoi_gian_tt_vnpay: vnp_Params['vnp_PayDate'] || '',
    });

    return { RspCode: '00', Message: 'Success' };
  }
}

export const thanhToanService = new ThanhToanService();
