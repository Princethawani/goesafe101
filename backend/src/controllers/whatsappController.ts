import { Request, Response } from 'express';
import { addSubscriber, removeSubscriber } from '../services/subscriberService';

export const whatsappWebhook = async (req: Request, res: Response) => {
  try {
    const from = req.body.From; // whatsapp:+265991682966
    const body = (req.body.Body || '').trim().toUpperCase();

    const phone = from.replace('whatsapp:', '');

    let reply = `Unknown command.\n\nSend:\nSUBSCRIBE <AREA>\nSTOP <AREA>\nHELP`;

    if (body.startsWith('SUBSCRIBE')) {
      const area = body.replace('SUBSCRIBE', '').trim();

      if (!area) {
        reply = 'Please specify an area.\nExample: SUBSCRIBE NSANJE';
      } else {
        await addSubscriber(phone, area);
        reply = `You are now subscribed to flood alerts for ${area}`;
      }
    }

    else if (body.startsWith('STOP')) {
      const area = body.replace('STOP', '').trim();

      if (!area) {
        reply = 'Please specify an area.\nExample: STOP NSANJE';
      } else {
        await removeSubscriber(phone, area);
        reply = `You have been unsubscribed from ${area}`;
      }
    }

    else if (body === 'HELP') {
      reply = `GeoSafe Flood Alerts\n\nCommands:\nSUBSCRIBE <AREA>\nSTOP <AREA>\nHELP`;
    }

    // Twilio requires XML (TwiML)
    res.set('Content-Type', 'text/xml');
    res.send(`
      <Response>
        <Message>${reply}</Message>
      </Response>
    `);
  } catch (error) {
    console.error('WhatsApp webhook error', error);
    res.status(500).send('Error');
  }
};
