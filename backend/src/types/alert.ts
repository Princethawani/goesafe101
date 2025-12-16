export type AlertLevel = 'INFO' | 'WARNING' | 'DANGER';

export interface FloodAlert {
  id: string;
  area: string;
  level: AlertLevel;
  message: string;
  createdAt: Date;
}
