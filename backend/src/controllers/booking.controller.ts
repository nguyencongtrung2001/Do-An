import type { Request, Response, NextFunction } from 'express';
import { bookingService } from '../services/booking.service.js';
import { ApiError } from '../utils/ApiError.js';

export const createBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookingData = req.body;
    const booking = await bookingService.createBooking(bookingData);
    
    res.status(201).json({
      message: "Đặt sân thành công",
      data: booking
    });
  } catch (error: any) {
    next(error);
  }
};

export const getUserBookingsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const bookings = await bookingService.getUserBookings(userId);
    
    res.status(200).json({
      status: "success",
      data: bookings
    });
  } catch (error: any) {
    next(error);
  }
};
