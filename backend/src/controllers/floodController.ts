//src/controllers/floodController.ts
import { Request, Response } from 'express';
import { assessFloodRisk } from '../services/floodGisService';
import { generateFloodAlert } from '../services/floodAlertService';

export const getFloodRisk = async (req: Request, res: Response) => {
  const { area, rainfall } = req.query;

  if (!area || !rainfall) {
    return res.status(400).json({ message: 'area and rainfall required' });
  }

  const result = assessFloodRisk(area.toString(), Number(rainfall));
  const alert = await generateFloodAlert(result.area, result.riskLevel);

  res.json({ risk: result, alert });
};
