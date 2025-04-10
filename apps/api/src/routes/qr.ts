import { Router } from 'express';
import { verifyToken } from '../middleware/auth.js';
import { generateQR } from '../controllers/qr.js';

const router = Router();


router.get('/:shortCode', verifyToken, generateQR);

export default router;