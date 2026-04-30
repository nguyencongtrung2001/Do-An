import type { Request, Response, NextFunction } from 'express';
import { ownerService } from '../services/owner.service.js';
import { ApiError } from '../utils/ApiError.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

export const registerOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ho_ten, email, so_dien_thoai, mat_khau, ten_dia_diem, dia_chi } = req.body;

    // Extract CCCD image URLs from Cloudinary via Multer
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const anh_cccd_truoc = files?.['anh_cccd_truoc']?.[0]?.path || '';
    const anh_cccd_sau = files?.['anh_cccd_sau']?.[0]?.path || '';

    if (!anh_cccd_truoc || !anh_cccd_sau) {
      throw new ApiError(400, "Thiếu ảnh CCCD");
    }

    const result = await ownerService.registerOwner({
      ho_ten,
      email,
      so_dien_thoai,
      mat_khau,
      ten_dia_diem,
      dia_chi,
      anh_cccd_truoc,
      anh_cccd_sau
    });

    res.status(201).json({
      success: true,
      message: "Đăng ký thành công. Vui lòng chờ admin duyệt tài khoản.",
      user: result.user,
      location: result.location,
      token: result.token
    });
  } catch (error) {
    next(error);
  }
};

export const getMyCourts = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const courts = await ownerService.getMyCourts(userId);
    res.json({ success: true, courts });
  } catch (error) {
    next(error);
  }
};

export const addCourt = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    const files = req.files as any[];
    const images = files?.map(f => ({ url: f.path, public_id: f.filename })) || [];

    const court = await ownerService.addCourt(userId, data, images);
    res.status(201).json({ success: true, message: "Thêm sân thành công", court });
  } catch (error) {
    next(error);
  }
};

export const updateCourt = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const ma_san = req.params.ma_san as string;
    const data = req.body;

    if (!ma_san) {
      throw new ApiError(400, "Thiếu mã sân");
    }

    const court = await ownerService.updateCourt(userId, ma_san, data);
    res.json({ success: true, message: "Cập nhật sân thành công", court });
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const bookings = await ownerService.getMyBookings(userId);
    res.json({ success: true, bookings });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const id = req.params.id as string;
    const { status } = req.body;

    if (!id || !status) {
      throw new ApiError(400, "Thiếu thông tin cập nhật");
    }

    const booking = await ownerService.updateBookingStatus(userId, id, status);
    res.json({ success: true, message: `Đã ${status.toLowerCase()} lịch đặt`, booking });
  } catch (error) {
    next(error);
  }
};
