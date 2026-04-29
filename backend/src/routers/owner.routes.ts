import { Router } from 'express';
import { uploadCCCD } from '../middlewares/upload.middleware.js';
import { ownerService } from '../services/owner.service.js';

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

export default router;
