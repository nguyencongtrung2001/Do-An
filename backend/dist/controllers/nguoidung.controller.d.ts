import type { Request, Response, NextFunction } from 'express';
import type * as User from '../types/user.type.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';
export declare const DangKyNguoiDung: (req: Request<{}, any, User.UserClient>, res: Response) => Promise<void>;
export declare const DangNhapNguoiDung: (req: Request<{}, any, User.LoginUserClient>, res: Response) => Promise<void>;
export declare const LayThongTinCaNhan: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const CapNhatAnhDaiDien: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=nguoidung.controller.d.ts.map