import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';
export declare const errorHandler: (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map