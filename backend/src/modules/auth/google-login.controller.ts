import type { Request, Response } from 'express';
import { googleAuthService } from './google-auth.service.js';

export const googleLoginController = async (req: Request, res: Response) => {
  const { idToken } = req.body;
  const result = await googleAuthService.loginWithGoogle(idToken);
  res.status(200).json({
    success: true,
    data: result
  });
};
