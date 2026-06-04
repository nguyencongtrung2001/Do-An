import express from "express";
import { 
    createRating, 
    getAverageRatingForLocation, 
    getAverageRatingForCourt,
    getMyRatingForBooking
} from "../controllers/rating.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes (không cần đăng nhập)
router.get("/location/:ma_dia_diem", getAverageRatingForLocation);
router.get("/court/:ma_san", getAverageRatingForCourt);

// Protected routes (cần đăng nhập)
router.post("/", authenticate, createRating);
router.get("/my-rating/:ma_dat_san_chi_tiet", authenticate, getMyRatingForBooking);

export default router;
