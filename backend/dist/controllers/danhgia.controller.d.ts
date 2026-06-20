import type { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
export declare const TaoDanhGia: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const LayDiemDanhGiaDiaDiem: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const LayDiemDanhGiaSan: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const LayDanhGiaCuaToi: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=danhgia.controller.d.ts.map