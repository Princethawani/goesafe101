<script lang="ts">
  import Dashboard from './pages/Dashboard.svelte';
  import AlertHistory from './pages/AlertHistory.svelte';
  import RiskMap from './pages/RiskMap.svelte';

  let page: 'dashboard' | 'alerts' | 'map' = 'dashboard';
</script>

<nav class="p-4 bg-gray-900 text-white flex gap-4">
  <button on:click={() => page='dashboard'}>Dashboard</button>
  <button on:click={() => page='map'}>Map</button>
  <button on:click={() => page='alerts'}>Alerts</button>
</nav>

<main class="p-6">
  {#if page === 'dashboard'}
    <Dashboard />
  {:else if page === 'map'}
    <RiskMap />
  {:else}
    <AlertHistory />
  {/if}
</main>
