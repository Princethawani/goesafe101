import { FloodAlert, AlertLevel } from '../types/alert';
import { FloodRiskLevel } from '../types/flood';
import { v4 as uuidv4 } from 'uuid';
import { getSubscribersByArea } from './subscriberService';
import { sendWhatsApp } from './whatsappService';

const alerts: FloodAlert[] = [];

export const generateFloodAlert = async (
  area: string,
  riskLevel: FloodRiskLevel
): Promise<FloodAlert | null> => {

  let level: AlertLevel;
  let message: string;

  if (riskLevel === 'HIGH') {
    level = 'WARNING';
    message = `Flood Warning\n\nArea: ${area}\n\nHeavy rainfall detected. Prepare to move to higher ground.`;
  } 
  else if (riskLevel === 'SEVERE') {
    level = 'DANGER';
    message = `SEVERE FLOOD ALERT \n\nArea: ${area}\n\nEvacuate immediately and follow official guidance.`;
  } 
  else {
    return null;
  }

  const alert: FloodAlert = {
    id: uuidv4(),
    area,
    level,
    message,
    createdAt: new Date()
  };

  alerts.push(alert);

  // Send WhatsApp alerts
  const subscribers = getSubscribersByArea(area);
  for (const sub of subscribers) {
    try {
      await sendWhatsApp(sub.phone, message);
    } catch (error) {
      console.error(`Failed to send WhatsApp to ${sub.phone}`, error);
    }
  }

  return alert;
};

export const getAllAlerts = () => alerts;
