<script lang="ts">
  import AdminLayout from '../components/layout/AdminLayout.svelte';
  import MapView from '../components/MapView.svelte';
</script>

<AdminLayout page="map">
  <h1 class="text-2xl font-bold mb-4">Flood Risk Map</h1>
  <MapView />
</AdminLayout>
