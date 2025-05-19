import { Router } from 'express';
import authController from '../controllers/authController.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login',    authController.login);
router.post('/forgot',   authController.forgotPassword);
router.post('/reset/:token', authController.resetPassword);

export default router;
