import { Router } from 'express';
import { VNPayTraVe, VNPayThongBao, XuLyCallbackVNPay } from '../controllers/thanhtoan.controller.js';

const router = Router();

router.get('/vnpay-return', VNPayTraVe);
router.get('/vnpay-callback', XuLyCallbackVNPay);
router.get('/vnpay-ipn', VNPayThongBao);
router.post('/vnpay-ipn', VNPayThongBao);

export default router;
