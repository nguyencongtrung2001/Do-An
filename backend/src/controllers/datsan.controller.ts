import type { Request, Response, NextFunction } from 'express';
import { bookingService } from '../services/datsan.service.js';
import { ApiError } from '../utils/ApiError.js';
import prisma from '../config/prisma.js';

export const TaoDonDatSan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ipAddr = Array.isArray(req.headers['x-forwarded-for']) 
      ? req.headers['x-forwarded-for'][0] 
      : req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    console.log("Booking Payload:", req.body);
    const bookingData = req.body;
    const result = await bookingService.TaoDonDatSan(bookingData, ipAddr as string);
    
    res.status(201).json({
      message: result.message || "Đặt sân thành công",
      data: result.booking,
      paymentUrl: result.paymentUrl
    });
  } catch (error: any) {
    console.error(" Booking Error Detail:", error);
    next(error);
  }
};

export const LayDatSanNguoiDung = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    if (typeof userId !== 'string') {
      throw new ApiError(400, "User ID is invalid");
    }
    const bookings = await bookingService.LayDatSanNguoiDung(userId);
    
    res.status(200).json({
      status: "success",
      data: bookings
    });
  } catch (error: any) {
    next(error);
  }
};

export const HuyDatSan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      throw new ApiError(401, "User ID is required to cancel booking");
    }

    const result = await bookingService.HuyDatSan(String(bookingId), String(userId));
    
    res.status(200).json({
      status: "success",
      message: result.message,
      data: result
    });
  } catch (error: any) {
    next(error);
  }
};

