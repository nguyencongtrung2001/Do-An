import { Router } from "express";
import { TaoDonDatSan, LayDatSanNguoiDung, VNPayTraVe, VNPayThongBao, XuLyCallbackVNPay, HuyDatSan } from "../controllers/booking.controller.js";

const router = Router();

router.post("/", TaoDonDatSan);
router.get("/user/:userId", LayDatSanNguoiDung);
router.post("/cancel/:bookingId", HuyDatSan);

router.get("/vnpay-return", VNPayTraVe);
router.get("/vnpay-callback", XuLyCallbackVNPay);
router.get("/vnpay-ipn", VNPayThongBao);
router.post("/vnpay-ipn", VNPayThongBao);

export default router;
