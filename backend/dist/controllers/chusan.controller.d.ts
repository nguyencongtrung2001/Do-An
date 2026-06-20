import type { Request, Response, NextFunction } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware.js';
export declare const DangKyChuSan: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const LaySanCuaToi: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const ThemSan: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const CapNhatSan: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const XoaSan: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const LayLichDatCuaToi: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const CapNhatTrangThaiDatSan: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const LaySoLuongChoXuLy: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=chusan.controller.d.ts.map