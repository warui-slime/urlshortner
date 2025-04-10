import { Router } from 'express';
import { verifyToken } from '../middleware/auth.js';
import { createLink } from '../controllers/link.js';
import { getDashboardData } from '../controllers/analytics.js';

const router = Router();

router.post('/links', verifyToken, createLink);
router.get('/analytics', verifyToken, getDashboardData);

export default router;