<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchFloodForecast, type Forecast } from '../services/aiService';

  let forecast: Forecast[] = [];
  let loading = true;
  let error = '';
  const area = 'Chikwawa';
  const lat = -16.8014;
  const lon = 35.0335;

  onMount(async () => {
    try {
      const data = await fetchFloodForecast(lat, lon, area);
      forecast = data.forecast;
    } catch (e: any) {
      error = e.message;
    } finally {
      loading = false;
    }
  });
</script>

<h1 class="text-2xl font-bold mb-4">Flood Forecast - {area}</h1>

{#if loading}
  <p>Loading forecast...</p>
{:else if error}
  <p class="text-red-600">{error}</p>
{:else}
  <table class="table-auto w-full border">
    <thead class="bg-gray-100">
      <tr>
        <th class="p-2 border">Date</th>
        <th class="p-2 border">Flood Risk (%)</th>
        <th class="p-2 border">Rain (mm)</th>
        <th class="p-2 border">Wind (kph)</th>
      </tr>
    </thead>
    <tbody>
      {#each forecast as f}
        <tr class="border-t">
          <td class="p-2 border">{f.date}</td>
          <td class="p-2 border">{(f.flood_risk * 100).toFixed(1)}%</td>
          <td class="p-2 border">{f.rain_mm}</td>
          <td class="p-2 border">{f.wind_kph}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
