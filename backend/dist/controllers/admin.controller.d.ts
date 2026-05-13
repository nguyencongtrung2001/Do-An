import type { Request, Response, NextFunction } from 'express';
export declare const getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUserById: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<void>;
export declare const toggleUserStatus: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteUser: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<void>;
export declare const getPendingOwners: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const approveOwner: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllLocations: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPendingLocations: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const approveLocation: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<void>;
export declare const rejectLocation: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=admin.controller.d.ts.map