import type { Request, Response, NextFunction } from 'express';
import { thanhToanService } from '../services/thanhtoan.service.js';
import { VNPayUtil } from '../utils/vnpay.util.js';

export const VNPayTraVe = async (req: Request, res: Response) => {
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
 
  return res.redirect(
    `${process.env.FRONTEND_URL}/payment-status?status=failed&code=${responseCode}&vnp_TxnRef=${txnRef}`,
  );
};

export const XuLyCallbackVNPay = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.query as Record<string, string>;
    const result = await thanhToanService.XuLyCallbackVNPay(params);
    
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const VNPayThongBao = async (req: Request, res: Response) => {
  try {
    const vnp_Params = req.body || req.query;
    const result = await thanhToanService.XuLyThongBaoVNPay(vnp_Params);
    
    res.json(result);
  } catch (error) {
    console.error(error);
    res.json({ RspCode: '99', Message: 'Không xác định lỗi' });
  }
};
