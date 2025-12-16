// backend/src/services/whatsappService.ts
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_WHATSAPP_FROM;

if (!accountSid || !authToken || !from) {
  throw new Error('Twilio WhatsApp credentials are missing in environment variables');
}

const client = twilio(accountSid, authToken);

/**
 * Send WhatsApp message using Twilio
 */
export async function sendWhatsApp(
  toPhone: string,
  message: string
): Promise<void> {
  if (!toPhone) {
    throw new Error('Recipient phone number is required');
  }

  // Normalize phone number (Malawi-friendly)
  const formattedTo = toPhone.startsWith('whatsapp:')
    ? toPhone
    : `whatsapp:${toPhone}`;

  try {
    await client.messages.create({
      from,
      to: formattedTo,
      body: message
    });

    console.log(`WhatsApp sent to ${formattedTo}`);
  } catch (error: any) {
    console.error('Twilio WhatsApp send error:', error?.message);
    throw error;
  }
}
