<script lang="ts">
  import Sidebar from './Sidebar.svelte';
  import Topbar from './Topbar.svelte';

  export let page: 'dashboard' | 'map' | 'alerts';
</script>

<div class="flex">
  <Sidebar current={page} />

  <div class="flex-1 bg-gray-100 min-h-screen">
    <Topbar />
    <main class="p-6">
      <slot />
    </main>
  </div>
</div>
