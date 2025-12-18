<script lang="ts">
  import { alerts, loadAlerts, loadingAlerts, alertError } from '../store/alertStore';
  import { onMount } from 'svelte';

  onMount(() => {
    loadAlerts();
  });
</script>

<h1 class="text-xl font-semibold mb-4">Alert History</h1>

{#if $loadingAlerts}
  <p>Loading alerts...</p>
{:else if $alertError}
  <p class="text-red-600">{$alertError}</p>
{:else if $alerts.length === 0}
  <p>No alerts found.</p>
{:else}
  <ul class="space-y-2">
    {#each $alerts as alert}
      <li class="p-3 border rounded">
        <strong class="{alert.level === 'DANGER' ? 'text-red-600' : 'text-yellow-600'}">
          {alert.level}
        </strong> — {alert.area}
        <div class="text-sm text-gray-500">
          {new Date(alert.createdAt).toLocaleString()}
        </div>
      </li>
    {/each}
  </ul>
{/if}
