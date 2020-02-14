<script>
import { tweened } from 'svelte/motion';
import { beforeUpdate } from 'svelte';

export let x, y, oilGasCoalRadius, renewableRadius, hydroelectricRadius, nuclearRadius, delay;

let t = tweened({
  x: x,
  y: y,
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
    x,
    y,
    oilGasCoalRadius: oilGasCoalRadius || 0,
    renewableRadius: renewableRadius || 0,
    hydroelectricRadius: hydroelectricRadius || 0,
    nuclearRadius: nuclearRadius || 0
  });
});

</script>

<g transform={`translate(${$t.x},${$t.y})`}>
  <circle class="oilgascoal" r={$t.oilGasCoalRadius}></circle>
  <circle class="renewable" r={$t.renewableRadius}></circle>
  <circle class="hydroelectric" r={$t.hydroelectricRadius}></circle>
  <circle class="nuclear" r={$t.nuclearRadius}></circle>
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
