import { googleAuthService } from './google-auth.service.js';
export const googleLoginController = async (req, res) => {
    const { idToken } = req.body;
    const result = await googleAuthService.loginWithGoogle(idToken);
    res.status(200).json({
        success: true,
        data: result
    });
};
//# sourceMappingURL=google-login.controller.js.map