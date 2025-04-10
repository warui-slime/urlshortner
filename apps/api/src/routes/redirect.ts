import { RequestHandler, Router } from 'express';
import { redirect } from '../controllers/redirect.js';

const router = Router();

router.get('/:shortCode', redirect as RequestHandler);

export default router;