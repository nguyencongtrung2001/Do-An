import express from 'express';
import { DangNhapGoogle } from './google-login.controller.js';
const router = express.Router();
router.post('/google', DangNhapGoogle);
export default router;
//# sourceMappingURL=auth.routes.js.map