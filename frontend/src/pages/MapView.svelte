<script lang="ts">
  // nothing needed here — purely embed the story link
  const storyUrl =
    "https://storymaps.arcgis.com/stories/6bfa1b9276fc4226a094eb0e34ea82aa?embed"; // ?embed hides some headers
</script>

<style>
  .storymap-frame {
    width: 100%;
    height: 100vh; /* full viewport height */
    border: none;
  }
</style>

<div class="w-full h-full">
  <iframe
    class="storymap-frame"
    src={storyUrl}
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>
