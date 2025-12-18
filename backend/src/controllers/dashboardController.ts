import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { Alert } from '../entities/Alert';

export const getDashboardStats = async (_: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Alert);

  const total = await repo.count();

  const severe = await repo.count({
    where: { level: 'DANGER' }
  });

  const warning = await repo.count({
    where: { level: 'WARNING' }
  });

  const areas = await repo
    .createQueryBuilder('alert')
    .select('DISTINCT alert.area', 'area')
    .getRawMany();

  res.json({
    totalAlerts: total,
    severeAlerts: severe,
    warningAlerts: warning,
    affectedAreas: areas.length,
    systemStatus: 'OK'
  });
};
