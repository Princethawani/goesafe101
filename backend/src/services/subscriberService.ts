import { AppDataSource } from '../config/db';
import { Subscriber } from '../entities/Subscriber';
import { ILike } from 'typeorm';

// Add a new subscriber
export const addSubscriber = async (phone: string, area: string) => {
  const repo = AppDataSource.getRepository(Subscriber);

  // Normalize area to uppercase
  const normalizedArea = area.toUpperCase();

  // Check if subscriber already exists
  const existing = await repo.findOne({ 
    where: { phone, area: normalizedArea } 
  });
  if (existing) return existing;

  const subscriber = repo.create({ phone, area: normalizedArea, channel: 'WHATSAPP' });
  return await repo.save(subscriber);
};

// Remove a subscriber
export const removeSubscriber = async (phone: string, area: string) => {
  const repo = AppDataSource.getRepository(Subscriber);
  return await repo.delete({ phone, area: area.toUpperCase() });
};

// Get all subscribers by area (case-insensitive)
export const getSubscribersByArea = async (area: string) => {
  const repo = AppDataSource.getRepository(Subscriber);

  // Normalize input to uppercase for consistency
  const normalizedArea = area.toUpperCase();

  // Use QueryBuilder for a reliable case-insensitive match
  return await repo
    .createQueryBuilder('subscriber')
    .where('UPPER(subscriber.area) = :area', { area: normalizedArea })
    .getMany();
};
