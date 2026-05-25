import { fieldService } from "../services/field.service.js";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export const getFields = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fields = await fieldService.getFields();
        res.status(200).json(fields);
    } catch (error) {
        next(error);
    }
}

export const getMapLocations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sportType = req.query.sport as string || 'all';
        const locations = await fieldService.getMapLocations(sportType);
        res.status(200).json(locations);
    } catch (error) {
        next(error);
    }
}

export const getLocationBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const slug = req.params.slug as string;
        const location = await fieldService.getLocationBySlug(slug);
        if (!location) {
            throw new ApiError(404, "Không tìm thấy địa điểm");
        }
        res.status(200).json(location);
    } catch (error) {
        next(error);
    }
}

export const getBookedSlots = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ma_san = req.params.ma_san as string;
        const ngay_dat = req.query.ngay_dat as string;

        if (!ngay_dat) {
            throw new ApiError(400, "Thiếu tham số ngay_dat");
        }

        const bookedSlots = await fieldService.getBookedSlots(ma_san, ngay_dat);
        res.status(200).json({ success: true, data: bookedSlots });
    } catch (error) {
        next(error);
    }
}