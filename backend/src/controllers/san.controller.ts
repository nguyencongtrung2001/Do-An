import { sanService } from "../services/san.service.js";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export const LayDanhSachSan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fields = await sanService.LayDanhSachSan();
        res.status(200).json(fields);
    } catch (error) {
        next(error);
    }
}

export const LayDiaDiemTrenBanDo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sportType = req.query.sport as string || 'all';
        const locations = await sanService.LayDiaDiemTrenBanDo(sportType);
        res.status(200).json(locations);
    } catch (error) {
        next(error);
    }
}

export const LayDiaDiemTheoSlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const slug = req.params.slug as string;
        const location = await sanService.LayDiaDiemTheoSlug(slug);
        if (!location) {
            throw new ApiError(404, "Không tìm thấy địa điểm");
        }
        res.status(200).json(location);
    } catch (error) {
        next(error);
    }
}

export const LayKhungGioDaDat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ma_san = req.params.ma_san as string;
        const ngay_dat = req.query.ngay_dat as string;

        if (!ngay_dat) {
            throw new ApiError(400, "Thiếu tham số ngay_dat");
        }

        const bookedSlots = await sanService.LayKhungGioDaDat(ma_san, ngay_dat);
        res.status(200).json({ success: true, data: bookedSlots });
    } catch (error) {
        next(error);
    }
}