import { Router } from 'express';
import { LayDanhSachSan, LayDiaDiemTrenBanDo, LayDiaDiemTheoSlug, LayKhungGioDaDat } from '../controllers/san.controller.js';
const router = Router();
router.get('/', LayDanhSachSan);
router.get('/map-locations', LayDiaDiemTrenBanDo);
router.get('/slug/:slug', LayDiaDiemTheoSlug);
router.get('/courts/:ma_san/booked-slots', LayKhungGioDaDat);
export default router;
//# sourceMappingURL=field.routes.js.map