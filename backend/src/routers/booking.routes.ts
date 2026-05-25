import { Router } from "express";
import { createBookingHandler, getUserBookingsHandler, vnpayReturn, vnpayIPN, handleVNPayCallback } from "../controllers/booking.controller.js";

const router = Router();

router.post("/", createBookingHandler);
router.get("/user/:userId", getUserBookingsHandler);

router.get("/vnpay-return", vnpayReturn);
router.get("/vnpay-callback", handleVNPayCallback);
router.get("/vnpay-ipn", vnpayIPN);
router.post("/vnpay-ipn", vnpayIPN);

export default router;
