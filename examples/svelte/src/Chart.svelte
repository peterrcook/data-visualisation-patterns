<script>
import { scaleSqrt } from 'd3-scale';

import CircleGroup from './CircleGroup.svelte';

import { selectedSortBy } from './store.js';
import { sortData } from './utility';
import getLayout from './layout';

export let data, width = 1200, numColumns = 14;

let sortByValue;

$: radiusScale = scaleSqrt().domain([0, 100]).range([0, 0.35 * width / numColumns]);
$: sortedData = sortData(data, sortByValue);
$: layout = getLayout(sortedData, {
  width,
  numColumns,
  radiusScale
});

const unsubscribe = selectedSortBy.subscribe(value => {
  sortByValue = value;
});
</script>


<div id="chart-wrapper">
  <svg width="1200" height="1150">
    <g id="chart">
      {#each layout as d, i (d.id)}
        <CircleGroup
          x={d.x}
          y={d.y}
          oilGasCoalRadius={d.oilGasCoalRadius}
          renewableRadius={d.renewableRadius}
          hydroelectricRadius={d.hydroelectricRadius}
          nuclearRadius={d.nuclearRadius}
          labelYOffset={d.labelYOffset}
          label={d.label}
          delay={i * 10} />
      {/each}
    </g>
  </svg>
</div>

