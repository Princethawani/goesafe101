import cron from 'node-cron';
import { getRainfallMm } from './weatherService';
import { assessFloodRisk } from './floodGisService';
import { generateFloodAlert } from './floodAlertService';

const MONITORED_DISTRICTS = [
  'NSANJE',
  'CHIKWAWA',
  'PHALOMBE',
  'MANGOCHI',
  'BALAKA',
  'KARONGA'
];

export const startFloodMonitoring = () => {
  console.log('Flood monitoring started');

  // Every 30 minutes
  cron.schedule('*/30 * * * *', async () => {
    console.log('Running flood risk check');

    for (const area of MONITORED_DISTRICTS) {
      const rainfall = await getRainfallMm(area);
      const risk = assessFloodRisk(area, rainfall);

      if (risk.riskLevel === 'HIGH' || risk.riskLevel === 'SEVERE') {
        await generateFloodAlert(area, risk.riskLevel);
      }
    }
  });
};
