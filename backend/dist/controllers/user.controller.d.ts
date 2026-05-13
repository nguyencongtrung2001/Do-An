import type { Request, Response } from 'express';
import type * as User from '../types/user.type.js';
export declare const postUserClient: (req: Request<{}, any, User.UserClient>, res: Response) => Promise<void>;
export declare const loginUserClient: (req: Request<{}, any, User.LoginUserClient>, res: Response) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map