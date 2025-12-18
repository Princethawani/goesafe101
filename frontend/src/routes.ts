import Dashboard from './pages/Dashboard.svelte';
import MapView from './pages/MapView.svelte';
import Alerts from './pages/Alerts.svelte';

export const routes: Record<string, any> = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/map': MapView,
  '/alerts': Alerts
};
