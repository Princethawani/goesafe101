<script lang="ts">
  import { alerts, loadAlerts } from '../store/alertStore';
  loadAlerts();
</script>

<h1 class="text-2xl font-bold mb-4">GeoSafe Dashboard</h1>

<div class="grid grid-cols-3 gap-4">
  <div class="p-4 bg-green-100 rounded">System: ONLINE</div>
  <div class="p-4 bg-blue-100 rounded">
    Active Alerts: {$alerts.length}
  </div>
  <div class="p-4 bg-yellow-100 rounded">Country: Malawi</div>
</div>
