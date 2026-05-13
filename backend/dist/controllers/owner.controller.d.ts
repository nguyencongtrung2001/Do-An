import type { Request, Response, NextFunction } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware.js';
export declare const registerOwner: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getMyCourts: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const addCourt: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateCourt: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getMyBookings: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateBookingStatus: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getPendingCount: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=owner.controller.d.ts.map