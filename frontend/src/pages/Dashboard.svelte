<script lang="ts">
  import AdminLayout from '../components/layout/AdminLayout.svelte';
  import { onMount, onDestroy, tick } from 'svelte';
  import { fetchDashboard } from '../services/api';
  import { Chart, registerables, type ChartDataset } from 'chart.js';

  Chart.register(...registerables);

  let stats: any = null;
  let loading = true;

  let chart: Chart | null = null;
  let chartCanvas: HTMLCanvasElement;
  let intervalId: ReturnType<typeof setInterval>;
  let simulationStarted = false;

  // Preload warning sound from /public folder
  const warningSound = new Audio('/warning.mp3');

  // Generate dummy alert frequency 0-3, biased to rise occasionally
  function generateAlertFrequency(prev: number): number {
    let next = prev + (Math.random() < 0.5 ? 1 : Math.random() < 0.5 ? 0 : -1);
    if (next < 0) next = 0;
    if (next > 3) next = 3;
    return next;
  }

  function getColor(value: number) {
    if (value < 2) return '#34d399'; // green
    if (value === 2) return '#facc15'; // yellow (warning threshold)
    return '#f87171'; // red for severe (3)
  }

  async function startSimulation() {
    simulationStarted = true;

    // Unlock audio for autoplay
    await warningSound.play().catch(() => {
      warningSound.pause();
      warningSound.currentTime = 0;
    });

    await tick();

    if (chartCanvas) {
      const ctx = chartCanvas.getContext('2d');
      if (!ctx) return;

      const labels: string[] = ['10:00', '10:10', '10:20', '10:30', '10:40'];
      const data: number[] = [0, 1, 1, 2, 1];
      const borderColors = data.map(getColor);
      const backgroundColors = data.map(v => getColor(v) + '33');

      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Alert Frequency (per 10 min)',
              data,
              borderColor: borderColors,
              backgroundColor: backgroundColors,
              tension: 0.4,
              fill: true,
              pointBackgroundColor: borderColors,
            } as ChartDataset<'line', number[]>,
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: true } },
          scales: {
            y: { beginAtZero: true, max: 3, ticks: { stepSize: 1 } },
          },
        },
      });

      // Update chart every 5 seconds (simulate 10-min frequency)
      intervalId = setInterval(() => {
        if (!chart) return;

        const lastLabel = chart.data.labels![chart.data.labels!.length - 1] as string;
        const [hours, minutes] = lastLabel.split(':').map(Number);
        const newMinutes = (minutes + 10) % 60;
        const newHours = (hours + Math.floor((minutes + 10) / 60)) % 24;
        const newLabel = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;

        const prevValue = chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1] as number;
        const newValue = generateAlertFrequency(prevValue);

        // Play warning if frequency hits 3
        if (prevValue < 3 && newValue === 3) {
          warningSound.play().catch(err => console.warn('Audio play failed:', err));
        }

        chart.data.labels!.push(newLabel);
        chart.data.datasets[0].data.push(newValue);
        (chart.data.datasets[0] as any).borderColor.push(getColor(newValue));
        (chart.data.datasets[0] as any).backgroundColor.push(getColor(newValue) + '33');
        (chart.data.datasets[0] as any).pointBackgroundColor.push(getColor(newValue));

        // Keep last 10 points
        if (chart.data.labels!.length > 10) {
          chart.data.labels!.shift();
          (chart.data.datasets[0] as any).data.shift();
          (chart.data.datasets[0] as any).borderColor.shift();
          (chart.data.datasets[0] as any).backgroundColor.shift();
          (chart.data.datasets[0] as any).pointBackgroundColor.shift();
        }

        chart.update();
      }, 5000);
    }
  }

  onMount(async () => {
    try {
      stats = await fetchDashboard();
    } catch (err: any) {
      console.error(err);
      stats = {
        totalAlerts: 2,
        severeAlerts: 1,
        warningAlerts: 1,
        affectedAreas: 1,
        systemStatus: 'OK',
      };
    } finally {
      loading = false;
    }
  });

  onDestroy(() => {
    chart?.destroy();
    clearInterval(intervalId);
  });
</script>

<AdminLayout page="dashboard">
  <h1 class="text-2xl font-bold mb-6">GeoSafe Dashboard Chikwawa</h1>

  {#if loading}
    <p>Loading...</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="card">Total Alerts<br><b>{stats.totalAlerts}</b></div>
      <div class="card text-red-600">Severe Alerts<br><b>{stats.severeAlerts}</b></div>
      <div class="card text-yellow-600">Warnings<br><b>{stats.warningAlerts}</b></div>
      <div class="card">Affected Areas<br><b>{stats.affectedAreas}</b></div>
    </div>

    <div class="mt-6 text-sm">
      System Status:
      <span class="text-green-600 font-bold">{stats.systemStatus}</span>
    </div>

    <div class="mt-6">
      {#if !simulationStarted}
        <button
          class="bg-red-500 text-white px-4 py-2 rounded"
          on:click={startSimulation}
        >
          Start Simulation
        </button>
      {/if}
    </div>

    {#if simulationStarted}
      <div class="mt-8 bg-white p-4 rounded shadow h-64">
        <h2 class="text-xl font-semibold mb-2">Alert Frequency</h2>
        <canvas bind:this={chartCanvas} class="w-full h-full"></canvas>
      </div>
    {/if}
  {/if}
</AdminLayout>

<style>
  .card {
    @apply bg-white p-4 rounded shadow text-center;
  }
</style>
