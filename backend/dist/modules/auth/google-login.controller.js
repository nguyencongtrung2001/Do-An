import { googleAuthService } from './google-auth.service.js';
export const DangNhapGoogle = async (req, res) => {
    const { idToken } = req.body;
    const result = await googleAuthService.DangNhapBangGoogle(idToken);
    res.status(200).json({
        success: true,
        data: result
    });
};
//# sourceMappingURL=google-login.controller.js.map