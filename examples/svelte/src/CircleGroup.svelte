<script>
import { tweened } from 'svelte/motion';
import { beforeUpdate } from 'svelte';

export let opacity;
export let x;
export let y;
export let oilGasCoalRadius;
export let renewableRadius;
export let hydroelectricRadius;
export let nuclearRadius;
export let delay;
export let labelYOffset;
export let label;

let t = tweened({
  opacity,
  x,
  y,
  oilGasCoalRadius: 0,
  renewableRadius: 0,
  hydroelectricRadius: 0,
  nuclearRadius: 0
}, {
  duration: 500,
  delay: delay
});


beforeUpdate(() => {
  t.set({
    opacity,
    x,
    y,
    oilGasCoalRadius: oilGasCoalRadius || 0,
    renewableRadius: renewableRadius || 0,
    hydroelectricRadius: hydroelectricRadius || 0,
    nuclearRadius: nuclearRadius || 0
  });
});

</script>

<g transform={`translate(${$t.x},${$t.y})`} style="opacity: {$t.opacity}">
  <circle class="oilgascoal" r={$t.oilGasCoalRadius}></circle>
  <circle class="renewable" r={$t.renewableRadius}></circle>
  <circle class="hydroelectric" r={$t.hydroelectricRadius}></circle>
  <circle class="nuclear" r={$t.nuclearRadius}></circle>
  <text class="label" y={labelYOffset}>{label}</text>
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
</style>
