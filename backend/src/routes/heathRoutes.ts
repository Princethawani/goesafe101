import { Router } from 'express';
import { AppDataSource } from '../config/db';

const router = Router();

router.get('/', async (_req, res) => {
  let dbStatus = 'DOWN';

  try {
    if (AppDataSource.isInitialized) {
      await AppDataSource.query('SELECT 1');
      dbStatus = 'UP';
    }
  } catch {
    dbStatus = 'DOWN';
  }

  res.json({
    status: 'OK',
    service: 'GeoSafe Backend',
    timestamp: new Date(),
    database: dbStatus,
    uptimeSeconds: process.uptime()
  });
});

export default router;
