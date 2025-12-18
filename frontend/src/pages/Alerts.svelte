<script lang="ts">
  import AdminLayout from '../components/layout/AdminLayout.svelte';
  import { alerts, loadingAlerts, alertError } from '../store/alertStore';
  import { onMount } from 'svelte';

  onMount(() => {
    loadingAlerts.set(true);
    alertError.set(null);

    // Dummy alert data
    const dummyAlerts = [
      {
        id: '1',
        area: 'CHIKWAWA',
        level: 'WARNING',
        message: 'Flood warning: Heavy rain expected',
        createdAt: '2025-12-17T20:14:58.433Z'
      },
      {
        id: '2',
        area: 'CHIKWAWA',
        level: 'DANGER',
        message: 'Severe flood alert: Evacuate immediately',
        createdAt: '2025-12-16T16:05:22.763Z'
      }
    ];

    alerts.set(dummyAlerts);
    loadingAlerts.set(false);
  });
</script>

<AdminLayout page="alerts">
  <h1 class="text-2xl font-bold mb-4">Alert History</h1>

  {#if $loadingAlerts}
    <p>Loading alerts...</p>
  {:else if $alertError}
    <p class="text-red-600">{$alertError}</p>
  {:else if $alerts.length === 0}
    <p>No alerts found.</p>
  {:else}
    <div class="bg-white rounded shadow overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left">Area</th>
            <th class="p-3">Level</th>
            <th class="p-3">Message</th>
            <th class="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {#each $alerts as alert}
            <tr class="border-t">
              <td class="p-3">{alert.area}</td>
              <td class="p-3 font-semibold
                {alert.level === 'DANGER' ? 'text-red-600' : 'text-yellow-600'}">
                {alert.level}
              </td>
              <td class="p-3">{alert.message}</td>
              <td class="p-3">{new Date(alert.createdAt).toLocaleString()}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</AdminLayout>
