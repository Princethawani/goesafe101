<script lang="ts">
  import { routes } from './routes';

  let path = location.hash.replace('#', '') || '/';
  const Component = routes[path] || routes['/'];

  window.addEventListener('hashchange', () => {
    path = location.hash.replace('#', '') || '/';
  });
</script>

<svelte:component this={Component} />
