import { Subscriber } from '../types/subscriber';

const subscribers: Subscriber[] = [
  { phone: '+265991682966', area: 'Nsanje', channel: 'WHATSAPP' },
  { phone: '+265991682966', area: 'Chikwawa', channel: 'WHATSAPP' }
];

export const getSubscribersByArea = (area: string): Subscriber[] =>
  subscribers.filter(s => s.area === area);
