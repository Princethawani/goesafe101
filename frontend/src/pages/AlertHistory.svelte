<script lang="ts">
  import { alerts, loadAlerts } from '../store/alertStore';
  loadAlerts();
</script>

<h1 class="text-xl font-semibold mb-4">Alert History</h1>

<ul class="space-y-2">
  {#each $alerts as alert}
    <li class="p-3 border rounded">
      <strong>{alert.level}</strong> — {alert.area}
      <div class="text-sm text-gray-500">
        {new Date(alert.createdAt).toLocaleString()}
      </div>
    </li>
  {/each}
</ul>
