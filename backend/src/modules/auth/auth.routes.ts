import express from 'express';
import { googleLoginController } from './google-login.controller.js';

const router = express.Router();

router.post('/google', googleLoginController);

export default router;
