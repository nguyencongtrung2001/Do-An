import { Router } from "express";
import { TaoDonDatSan, LayDatSanNguoiDung, HuyDatSan } from "../controllers/datsan.controller.js";

const router = Router();

router.post("/", TaoDonDatSan);
router.get("/user/:userId", LayDatSanNguoiDung);
router.post("/cancel/:bookingId", HuyDatSan);



export default router;
