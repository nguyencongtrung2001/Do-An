import type { Request, Response, NextFunction } from 'express';
import { ownerService } from '../services/owner.service.js';
import { ApiError } from '../utils/ApiError.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';
import cloudinary from '../config/cloudinary.config.js';

export const registerOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ho_ten, email, so_dien_thoai, mat_khau, ten_dia_diem, dia_chi, kinh_do, vi_do } = req.body;

    // Extract files from Multer
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const cccdTruocFile = files?.['anh_cccd_truoc']?.[0];
    const cccdSauFile = files?.['anh_cccd_sau']?.[0];
    const avatarFile = files?.['anh_dai_dien']?.[0];

    if (!cccdTruocFile || !cccdSauFile) {
      throw new ApiError(400, "Thiếu ảnh CCCD");
    }

    // Upload CCCD images to Cloudinary
    const [cccdTruocResult, cccdSauResult] = await Promise.all([
      cloudinary.uploader.upload(cccdTruocFile.path, { folder: 'bookingsport/cccd' }),
      cloudinary.uploader.upload(cccdSauFile.path, { folder: 'bookingsport/cccd' }),
    ]);

    // Upload avatar if provided
    let anh_dai_dien: string | undefined;
    if (avatarFile) {
      const avatarResult = await cloudinary.uploader.upload(avatarFile.path, { folder: 'bookingsport/avatars' });
      anh_dai_dien = avatarResult.secure_url;
    }

    const result = await ownerService.registerOwner({
      ho_ten,
      email,
      so_dien_thoai,
      mat_khau,
      ten_dia_diem,
      dia_chi,
      kinh_do: parseFloat(kinh_do),
      vi_do: parseFloat(vi_do),
      anh_cccd_truoc: cccdTruocResult.secure_url,
      anh_cccd_sau: cccdSauResult.secure_url,
      anh_dai_dien,
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

    // Extract uploaded images (if any). Undefined if no files uploaded.
    const files = req.files as Express.Multer.File[] | undefined;
    const images = files && files.length > 0
      ? files.map(f => ({ url: (f as any).path, public_id: (f as any).filename }))
      : undefined;

    const court = await ownerService.updateCourt(userId, ma_san, data, images);
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

export const getPendingCount = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const count = await ownerService.getPendingCount(userId);
    res.json({ success: true, count });
  } catch (error) {
    next(error);
  }
};
