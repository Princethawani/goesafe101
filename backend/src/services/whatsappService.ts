import twilio from 'twilio';

export async function sendWhatsApp(
  toPhone: string,
  message: string
) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;

  if (!accountSid || !authToken || !from) {
    console.error('Twilio WhatsApp credentials missing');
    return;
  }

  const client = twilio(accountSid, authToken);

  return client.messages.create({
    from,
    to: `whatsapp:${toPhone}`,
    body: message
  });
}
