import { Router } from 'express';
import { fetchAlerts } from '../controllers/alertController';
// import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', fetchAlerts);

export default router;
