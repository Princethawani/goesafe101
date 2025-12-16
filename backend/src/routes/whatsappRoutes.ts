import { Router } from 'express';
import { whatsappWebhook } from '../controllers/whatsappController';

const router = Router();

// Twilio webhook endpoint
router.post('/webhook', whatsappWebhook);

export default router;
