import { Router } from "express";
import { DangKyNguoiDung, DangNhapNguoiDung, LayThongTinCaNhan, CapNhatAnhDaiDien } from "../controllers/nguoidung.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { uploadAvatar } from "../middlewares/upload.middleware.js";
const router = Router();
router.post("/register", DangKyNguoiDung);
router.post("/login", DangNhapNguoiDung);
router.get("/profile", authenticate, LayThongTinCaNhan);
router.patch("/update-avatar", authenticate, uploadAvatar, CapNhatAnhDaiDien);
export default router;
//# sourceMappingURL=nguoidung.routes.js.map