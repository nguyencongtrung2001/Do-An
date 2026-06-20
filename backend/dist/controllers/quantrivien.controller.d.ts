import type { Request, Response, NextFunction } from 'express';
export declare const LayTatCaNguoiDung: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const LayNguoiDungTheoId: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<void>;
export declare const DoiTrangThaiNguoiDung: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<void>;
export declare const XoaNguoiDung: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<void>;
export declare const LayChuSanChoDuyet: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const DuyetChuSan: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<void>;
export declare const LayTatCaDiaDiem: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const LayDiaDiemChoDuyet: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const DuyetDiaDiem: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<void>;
export declare const TuChoiDiaDiem: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=quantrivien.controller.d.ts.map