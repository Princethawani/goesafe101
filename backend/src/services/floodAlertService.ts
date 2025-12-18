import { AppDataSource } from '../config/db';
import { Alert } from '../entities/Alert';
import { AlertDelivery } from '../entities/AlertDelivery';
import { getSubscribersByArea } from './subscriberService';
import { sendWhatsApp } from './whatsappService';
import { v4 as uuidv4 } from 'uuid';

export const generateFloodAlert = async (
  area: string,
  riskLevel: 'HIGH' | 'SEVERE'
) => {
  const alertRepo = AppDataSource.getRepository(Alert);
  const deliveryRepo = AppDataSource.getRepository(AlertDelivery);

  const level = riskLevel === 'SEVERE' ? 'DANGER' : 'WARNING';

  const message =
    level === 'DANGER'
      ? `SEVERE FLOOD ALERT\nArea: ${area}\nEvacuate immediately.`
      : `FLOOD WARNING\nArea: ${area}\nPrepare to move to higher ground.`;

  const alert = alertRepo.create({
    id: uuidv4(),
    area,
    level,
    message
  });

  await alertRepo.save(alert);

  const subscribers = await getSubscribersByArea(area);

  for (const sub of subscribers) {
    const delivery = deliveryRepo.create({
      alert,
      subscriber: sub,
      channel: 'WHATSAPP',
      status: 'SENT'
    });

    try {
      await sendWhatsApp(sub.phone, message);
    } catch (error: any) {
      delivery.status = 'FAILED';
      delivery.errorMessage = error?.message;
    }

    await deliveryRepo.save(delivery);
  }

  return alert;
};

/**
 * ✅ ADD THIS
 * Fetch alert history
 */
export const getAllAlerts = async () => {
  const alertRepo = AppDataSource.getRepository(Alert);

  return alertRepo.find({
    order: { createdAt: 'DESC' }
  });
};
