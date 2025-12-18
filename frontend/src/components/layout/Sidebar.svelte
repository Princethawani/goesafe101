<script lang="ts">
  export let current = 'dashboard';
</script>

<aside class="w-64 bg-slate-900 text-white min-h-screen p-4">
  <h1 class="text-xl font-bold mb-6">GeoSafe</h1>

  <nav class="space-y-2">
    <a href="/#/dashboard"
       class="block px-3 py-2 rounded hover:bg-slate-700"
       class:bg-slate-700={current === 'dashboard'}>
      Dashboard
    </a>

    <a href="/#/map"
       class="block px-3 py-2 rounded hover:bg-slate-700"
       class:bg-slate-700={current === 'map'}>
      Flood Map
    </a>

    <a href="/#/alerts"
       class="block px-3 py-2 rounded hover:bg-slate-700"
       class:bg-slate-700={current === 'alerts'}>
      Alerts
    </a>
  </nav>
</aside>
