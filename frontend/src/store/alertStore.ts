// frontend/src/store/alertStore.ts
import { writable } from 'svelte/store';

const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const alerts = writable<any[]>([]);
export const loadingAlerts = writable(false);
export const alertError = writable<string | null>(null);

export async function loadAlerts() {
  loadingAlerts.set(true);
  alertError.set(null);

  try {
    const res = await fetch(`${API_BASE}/api/alerts`);

    if (!res.ok) {
      throw new Error('Failed to fetch alerts');
    }

    const data = await res.json();
    alerts.set(data);
  } catch (err: any) {
    alertError.set(err.message);
  } finally {
    loadingAlerts.set(false);
  }
}
