<script>
import { tweened } from 'svelte/motion';
/* import { cubicInOut } from 'svelte/easing'; */
import { beforeUpdate } from 'svelte';

import { hoveredMeta } from './store.js';

export let d;
export let delay;

let popupAnchor;

let t = tweened({
  opacity: 0,
  x: d.x,
  y: d.y,
  oilGasCoalRadius: 0,
  renewableRadius: 0,
  hydroelectricRadius: 0,
  nuclearRadius: 0
}, {
  duration: 500,
  delay: delay,
  /* easing: cubicInOut */
});


beforeUpdate(() => {
  t.set({
    opacity: d.opacity,
    x: d.x,
    y: d.y,
    oilGasCoalRadius: d.oilGasCoalRadius || 0,
    renewableRadius: d.renewableRadius || 0,
    hydroelectricRadius: d.hydroelectricRadius || 0,
    nuclearRadius: d.nuclearRadius || 0
  });
});

function handleMouseover() {
  hoveredMeta.update(() => {
    return {
      d: d,
      el: popupAnchor
    };
  });
}

function handleMouseout() {
  hoveredMeta.update(() => null);
}
</script>

<g class="country" transform={`translate(${$t.x},${$t.y})`} style="opacity: {$t.opacity}" on:mouseover={handleMouseover} on:mouseout={handleMouseout} >
  <circle class="pick-area" r={d.pickRadius} />
  <circle class="oilgascoal" r={$t.oilGasCoalRadius} />
  <circle class="renewable" r={$t.renewableRadius} />
  <circle class="hydroelectric" r={$t.hydroelectricRadius} />
  <circle class="nuclear" r={$t.nuclearRadius} />
  <text class="label" y={d.labelYOffset}>{d.label}</text>
  <circle class="popup-anchor" cy={d.popupOffset} r="1" bind:this={popupAnchor} />
</g>

<style>
text.label {
  text-anchor: middle;
  font-size: 0.75rem;
  fill: #777;
  font-weight: bold;
  transition: fill 0.3s;
}

.country:hover text.label {
  fill: #fff;
}

.popup-anchor {
  opacity: 0;
}

.pick-area {
  opacity: 0;
}
</style>
