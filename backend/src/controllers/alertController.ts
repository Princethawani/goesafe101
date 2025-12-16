import { Request, Response } from 'express';
import { getAllAlerts } from '../services/floodAlertService';

export const fetchAlerts = (req: Request, res: Response) => {
  res.json(getAllAlerts());
};
