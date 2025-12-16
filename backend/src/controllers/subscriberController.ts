import { Request, Response } from 'express';
import {
  addSubscriber,
  removeSubscriber,
} from '../services/subscriberService';

// POST /api/subscribers
export const subscribe = async (req: Request, res: Response) => {
  try {
    const { phone, area } = req.body;

    if (!phone || !area) {
      return res.status(400).json({ message: 'phone and area are required' });
    }

    const subscriber = await addSubscriber(phone, area);

    return res.status(201).json({
      message: 'Subscribed successfully',
      subscriber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to subscribe' });
  }
};

// DELETE /api/subscribers
export const unsubscribe = async (req: Request, res: Response) => {
  try {
    const { phone, area } = req.body;

    if (!phone || !area) {
      return res.status(400).json({ message: 'phone and area are required' });
    }

    await removeSubscriber(phone, area);

    return res.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to unsubscribe' });
  }
};
