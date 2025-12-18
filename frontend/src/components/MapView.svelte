<script lang="ts">
  import { onMount } from 'svelte';
  import L from 'leaflet';
  import { fetchAlerts } from '../services/api';

  let map: L.Map;
  let alerts: any[] = [];

  onMount(async () => {
    // Initialize map
    map = L.map('map').setView([-13.2543, 34.3015], 6); // Center on Malawi

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Fetch alerts
    alerts = await fetchAlerts();

    // Add markers
    alerts.forEach((alert) => {
      const coords = getCoordinates(alert.area);
      if (coords) {
        L.marker(coords)
          .addTo(map)
          .bindPopup(`<b>${alert.area}</b><br>${alert.level}<br>${alert.message}`);
      }
    });
  });

  // Simple mapping of district to lat/lng
  const districtCoordinates: Record<string, [number, number]> = {
    Nsanje: [-16.9167, 35.2667],
    Chikwawa: [-16.0833, 34.8000],
    Phalombe: [-15.7833, 35.6500],
    Mangochi: [-14.4800, 35.2667],
    Balaka: [-15.7667, 35.2583],
    Karonga: [-9.9333, 33.9333],
  };

  function getCoordinates(district: string): [number, number] | null {
    return districtCoordinates[district] || null;
  }
</script>

<div id="map" class="w-full h-[500px] rounded shadow"></div>
