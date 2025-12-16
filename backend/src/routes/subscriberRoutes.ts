import { Router } from 'express';
import {
  subscribe,
  unsubscribe,
} from '../controllers/subscriberController';

const router = Router();

router.post('/', subscribe);
router.delete('/', unsubscribe);

export default router;
