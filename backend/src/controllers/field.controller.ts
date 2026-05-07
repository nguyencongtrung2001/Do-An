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