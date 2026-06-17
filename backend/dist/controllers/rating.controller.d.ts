import type { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
export declare const createRating: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getAverageRatingForLocation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAverageRatingForCourt: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getMyRatingForBooking: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=rating.controller.d.ts.map