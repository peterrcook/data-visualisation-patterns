<script>
import { beforeUpdate } from 'svelte';
import { scaleSqrt } from 'd3-scale';

import CircleGroup from './CircleGroup.svelte';
import getLayout from './layout';

export let data;

let width = 1200;
let numColumns = 14;
var radiusScale = scaleSqrt().domain([0, 100])
let layout = [];


function update() {
}

beforeUpdate(() => {
  radiusScale.range([0, 0.35 * width / numColumns]);

  layout = getLayout(data, {
    width,
    numColumns,
    radiusScale
  });

  console.log('layout', layout);
});
</script>


<svg width="1200" height="1150">
  {#each layout as d, i}
    <CircleGroup
      x={d.x}
      y={d.y}
      oilGasCoalRadius={d.oilGasCoalRadius}
      renewableRadius={d.renewableRadius}
      hydroelectricRadius={d.hydroelectricRadius}
      nuclearRadius={d.nuclearRadius}
      delay={i * 10} />
  {/each}
</svg>

<button on:click={update}>Update</button>
