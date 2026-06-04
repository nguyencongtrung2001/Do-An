import type { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { ratingService } from "../services/rating.service.js";
import { ApiError } from "../utils/ApiError.js";

export const createRating = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const ma_nguoi_dung = req.user?.id; // Lấy từ auth middleware
        const { ma_dat_san_chi_tiet, so_sao } = req.body;

        if (!ma_nguoi_dung) {
            throw new ApiError(401, "Chưa đăng nhập");
        }

        if (!ma_dat_san_chi_tiet || so_sao === undefined) {
            throw new ApiError(400, "Thiếu thông tin đánh giá");
        }

        if (so_sao < 1 || so_sao > 5) {
            throw new ApiError(400, "Số sao phải từ 1 đến 5");
        }

        const rating = await ratingService.createRating({
            ma_nguoi_dung,
            ma_dat_san_chi_tiet,
            so_sao
        });

        res.status(200).json({ success: true, data: rating, message: "Đánh giá thành công" });
    } catch (error) {
        if (error instanceof Error && (error.message.includes("không tồn tại") || error.message.includes("quyền"))) {
            next(new ApiError(400, error.message));
        } else {
            next(error);
        }
    }
}

export const getAverageRatingForLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ma_dia_diem = req.params.ma_dia_diem as string;
        
        if (!ma_dia_diem) {
            throw new ApiError(400, "Thiếu mã địa điểm");
        }

        const stats = await ratingService.getAverageRatingForLocation(ma_dia_diem);
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
}

export const getAverageRatingForCourt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ma_san = req.params.ma_san as string;
        
        if (!ma_san) {
            throw new ApiError(400, "Thiếu mã sân");
        }

        const stats = await ratingService.getAverageRatingForCourt(ma_san);
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
}

export const getMyRatingForBooking = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const ma_nguoi_dung = req.user?.id;
        const ma_dat_san_chi_tiet = req.params.ma_dat_san_chi_tiet as string;
        
        if (!ma_nguoi_dung) {
            throw new ApiError(401, "Chưa đăng nhập");
        }

        const rating = await ratingService.getRatingByUserAndBooking(ma_nguoi_dung, ma_dat_san_chi_tiet);
        res.status(200).json({ success: true, data: rating });
    } catch (error) {
        next(error);
    }
}
