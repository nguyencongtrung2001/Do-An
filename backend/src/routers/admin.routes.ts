import { Router } from 'express';
import {
  LayTatCaNguoiDung,
  LayNguoiDungTheoId,
  DoiTrangThaiNguoiDung,
  LayChuSanChoDuyet,
  DuyetChuSan,
  LayTatCaDiaDiem,
  LayDiaDiemChoDuyet,
  DuyetDiaDiem,
  TuChoiDiaDiem,
  XoaNguoiDung,
} from '../controllers/admin.controller.js';

const router = Router();


router.get('/users', LayTatCaNguoiDung);
router.get('/users/:id', LayNguoiDungTheoId);
router.put('/users/:id/toggle-status', DoiTrangThaiNguoiDung);
router.delete('/users/:id', XoaNguoiDung);


router.get('/owners/pending', LayChuSanChoDuyet);
router.put('/owners/:id/approve', DuyetChuSan);


router.get('/locations', LayTatCaDiaDiem);
router.get('/locations/pending', LayDiaDiemChoDuyet);
router.put('/locations/:id/approve', DuyetDiaDiem);
router.put('/locations/:id/reject', TuChoiDiaDiem);

export default router;