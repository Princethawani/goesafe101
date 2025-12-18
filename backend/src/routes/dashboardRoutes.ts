// backend/src/routes/dashboardRoutes.ts
import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController';
// import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get('/dashboard', getDashboardStats);

export default router;
