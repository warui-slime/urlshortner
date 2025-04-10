import { Router } from 'express';
import { AuthController } from '../controllers/auth.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();
const authController = new AuthController();

router.post('/signup',authController.signup)
router.post('/login',authController.login);
router.post('/logout',verifyToken,authController.logout);
router.get('/me', verifyToken,authController.me);

export default router;