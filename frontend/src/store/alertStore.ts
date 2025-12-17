import { writable } from 'svelte/store';
import { getAlerts } from '../services/alertService';

export const alerts = writable<any[]>([]);

export async function loadAlerts() {
  const data = await getAlerts();
  alerts.set(data as any[]);
}
