<script>
import Menu from './Menu.svelte';
</script>

<div id="controls">
  <Menu />
  <div class="legend">
    <svg width="70" height="70">
      <g transform="translate(35,35)">
        <circle r="30" />
        <text dy="0.33rem">100%</text>
      </g>
    </svg>
  </div>
</div>

<style>
#controls {
  font-size: 0.9rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.legend {
  display: flex;
  align-items: center;
}

.legend circle {
  stroke: #aaa;
  fill: none;
}

.legend text {
  fill: #ddd;
  text-anchor: middle;
  font-size: 0.9rem;
}
</style>
