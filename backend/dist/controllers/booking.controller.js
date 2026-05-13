import { bookingService } from '../services/booking.service.js';
import { ApiError } from '../utils/ApiError.js';
export const createBookingHandler = async (req, res, next) => {
    try {
        console.log("📦 Booking Payload:", req.body);
        const bookingData = req.body;
        const booking = await bookingService.createBooking(bookingData);
        res.status(201).json({
            message: "Đặt sân thành công",
            data: booking
        });
    }
    catch (error) {
        console.error("❌ Booking Error Detail:", error);
        next(error);
    }
};
export const getUserBookingsHandler = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (typeof userId !== 'string') {
            throw new ApiError(400, "User ID is invalid");
        }
        const bookings = await bookingService.getUserBookings(userId);
        res.status(200).json({
            status: "success",
            data: bookings
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=booking.controller.js.map