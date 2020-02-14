<script>
import { beforeUpdate } from 'svelte';
import CircleGroup from './CircleGroup.svelte';

import { scaleSqrt } from 'd3-scale';

import getLayout from './layout';

export let data, width = 1200, numColumns = 14;


let radiusScale = scaleSqrt().domain([0, 100]);
let layout;

beforeUpdate(() => {
  radiusScale.range([0, 0.35 * width / numColumns]);

  layout = getLayout(data, {
    width,
    numColumns,
    radiusScale
  });
});
</script>


<div id="chart-wrapper">
  <svg width="1200" height="1150">
    <g id="chart">
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
    </g>
  </svg>
</div>

