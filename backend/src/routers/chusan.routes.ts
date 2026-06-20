import { Router } from 'express';
import { uploadOwnerFiles, uploadCourt } from '../middlewares/upload.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  DangKyChuSan,
  LaySanCuaToi,
  ThemSan,
  CapNhatSan,
  LayLichDatCuaToi,
  CapNhatTrangThaiDatSan,
  LaySoLuongChoXuLy,
  XoaSan
} from '../controllers/chusan.controller.js';

const router = Router();

router.post('/register', uploadOwnerFiles, DangKyChuSan);
router.get('/my-courts', authenticate, LaySanCuaToi);
router.post('/add-court', authenticate, uploadCourt, ThemSan);
router.put('/update-court/:ma_san', authenticate, uploadCourt, CapNhatSan);
router.delete('/delete-court/:ma_san', authenticate, XoaSan);
router.get('/my-bookings', authenticate, LayLichDatCuaToi);
router.patch('/update-booking-status/:id', authenticate, CapNhatTrangThaiDatSan);
router.get('/pending-count', authenticate, LaySoLuongChoXuLy);

export default router;
