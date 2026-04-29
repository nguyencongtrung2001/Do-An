import { Router } from 'express';
import { uploadCCCD, uploadCourt } from '../middlewares/upload.middleware.js';
import { ownerService } from '../services/owner.service.js';
import { authenticate, type AuthRequest } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', uploadCCCD, async (req, res, next) => {
  try {
    const { ho_ten, email, so_dien_thoai, mat_khau, ten_dia_diem, dia_chi } = req.body;
    
    // Lấy URL ảnh từ Cloudinary qua Multer
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const anh_cccd_truoc = files?.['anh_cccd_truoc']?.[0]?.path || '';
    const anh_cccd_sau = files?.['anh_cccd_sau']?.[0]?.path || '';

    if (!anh_cccd_truoc || !anh_cccd_sau) {
      return res.status(400).json({ success: false, message: "Thiếu ảnh CCCD" });
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
});

router.get('/my-courts', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user.id;
    const courts = await ownerService.getMyCourts(userId);
    res.json({ success: true, courts });
  } catch (error) {
    next(error);
  }
});

router.post('/add-court', authenticate, uploadCourt, async (req: AuthRequest, res, next) => {
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
});

router.put('/update-court/:ma_san', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user.id;
    const { ma_san } = req.params;
    const data = req.body;

    const court = await ownerService.updateCourt(userId, ma_san, data);
    res.json({ success: true, message: "Cập nhật sân thành công", court });
  } catch (error) {
    next(error);
  }
});

router.get('/my-bookings', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user.id;
    const bookings = await ownerService.getMyBookings(userId);
    res.json({ success: true, bookings });
  } catch (error) {
    next(error);
  }
});

router.patch('/update-booking-status/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { status } = req.body;

    const booking = await ownerService.updateBookingStatus(userId, id, status);
    res.json({ success: true, message: `Đã ${status.toLowerCase()} lịch đặt`, booking });
  } catch (error) {
    next(error);
  }
});

export default router;
