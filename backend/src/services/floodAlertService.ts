// backend/src/services/floodAlertService.ts
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

  // Normalize area
  const normalizedArea = area.toUpperCase();

  // Map risk → alert level
  const level = riskLevel === 'SEVERE' ? 'DANGER' : 'WARNING';

  const message =
    level === 'DANGER'
      ? `🚨 SEVERE FLOOD ALERT 🚨\nArea: ${normalizedArea}\nEvacuate immediately to higher ground.`
      : `⚠️ FLOOD WARNING ⚠️\nArea: ${normalizedArea}\nPrepare to move to higher ground.`;

  // 1️⃣ Create alert record
  const alert = alertRepo.create({
    id: uuidv4(),
    area: normalizedArea,
    level,
    message
  });

  await alertRepo.save(alert);

  // 2️⃣ Fetch subscribers
  const subscribers = await getSubscribersByArea(normalizedArea);

  if (!subscribers.length) {
    console.warn(`No subscribers found for area: ${normalizedArea}`);
    return alert;
  }

  // 3️⃣ Send alerts safely
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
      console.error(`WhatsApp send failed for ${sub.phone}`, error?.message);

      delivery.status = 'FAILED';
      delivery.errorMessage = error?.message || 'Unknown error';
    }

    await deliveryRepo.save(delivery);
  }

  return alert;
};
