import { Router } from "express";
import { createBookingHandler, getUserBookingsHandler } from "../controllers/booking.controller.js";

const router = Router();

router.post("/", createBookingHandler);
router.get("/user/:userId", getUserBookingsHandler);

export default router;
