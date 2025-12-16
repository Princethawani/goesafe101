import { Router } from 'express';
import { getFloodRisk } from '../controllers/floodController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// Protected flood risk endpoint
router.get('/risk', authenticateJWT, getFloodRisk);

export default router;
