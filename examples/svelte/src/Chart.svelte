<script>
import { scaleSqrt } from 'd3-scale';

import CircleGroup from './CircleGroup.svelte';

import { selectedSortBy } from './store.js';
import { sortData } from './utility';
import getLayout from './layout';

export let data, width = 1200, numColumns = 14;

$: radiusScale = scaleSqrt().domain([0, 100]).range([0, 0.35 * width / numColumns]);
$: sortedData = sortData(data, $selectedSortBy);
$: layout = getLayout(sortedData, {
  width,
  numColumns,
  radiusScale,
  sortBy: $selectedSortBy
});
</script>

<div id="chart-wrapper">
  <svg width={width} height="1150">
    <g id="chart">
      {#each layout as d, i (d.id)}
        <CircleGroup {d} delay={i * 8} />
      {/each}
    </g>
  </svg>
</div>

