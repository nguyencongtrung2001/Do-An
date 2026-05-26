import { Router } from "express";
import { postUserClient, loginUserClient, getProfile, updateAvatar } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { uploadAvatar } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/register", postUserClient);
router.post("/login", loginUserClient);
router.get("/profile", authenticate, getProfile);
router.patch("/update-avatar", authenticate, uploadAvatar, updateAvatar);

export default router;