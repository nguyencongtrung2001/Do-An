import type { Request, Response } from 'express';
import { googleAuthService } from './google-auth.service.js';

export const DangNhapGoogle = async (req: Request, res: Response) => {
  const { idToken } = req.body;
  const result = await googleAuthService.DangNhapBangGoogle(idToken);
  res.status(200).json({
    success: true,
    data: result
  });
};
