import express from "express";
import { 
    TaoDanhGia, 
    LayDiemDanhGiaDiaDiem, 
    LayDiemDanhGiaSan,
    LayDanhGiaCuaToi
} from "../controllers/danhgia.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get("/location/:ma_dia_diem", LayDiemDanhGiaDiaDiem);
router.get("/court/:ma_san", LayDiemDanhGiaSan);


router.post("/", authenticate, TaoDanhGia);
router.get("/my-rating/:ma_dat_san_chi_tiet", authenticate, LayDanhGiaCuaToi);

export default router;
