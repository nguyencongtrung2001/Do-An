import express from "express";
import { createRating, getAverageRatingForLocation, getAverageRatingForCourt, getMyRatingForBooking } from "../controllers/rating.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.get("/location/:ma_dia_diem", getAverageRatingForLocation);
router.get("/court/:ma_san", getAverageRatingForCourt);
router.post("/", authenticate, createRating);
router.get("/my-rating/:ma_dat_san_chi_tiet", authenticate, getMyRatingForBooking);
export default router;
//# sourceMappingURL=rating.routes.js.map