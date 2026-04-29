import { Router } from "express";

import { postUserClient, loginUserClient } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", postUserClient);
router.post("/login", loginUserClient);

export default router;