<template>
  <div id="chart-wrapper">
    <svg :width="1200" height="1150">
      <g id="chart">
        <CircleGroup v-for="(d, i) in layout" :key="d.datum.id" :d="d" :delay="i * transitionDelay" />
      </g>
    </svg>
  </div>
</template>

<script>
import { scaleSqrt } from 'd3-scale';

import CircleGroup from './CircleGroup';

import store from '../store';
import getLayout from '../layout';
import { sortData } from '../utility';

export default {
  name: 'Chart',
  components: {
    CircleGroup
  },
  data: () => {
    return {
      storeState: store.state,
      width: 1200,
      numColumns: 14,
      transitionDelay: 8
    }
  },
  computed: {
    radiusScale: function() {
      return scaleSqrt().domain([0, 100]).range([0, 0.35 * this.width / this.numColumns]);
    },
    sortedData: function() {
      return sortData(this.storeState.data, this.storeState.selectedSortBy);
    },
    layout: function() {
      return getLayout(this.sortedData, {
        width: this.width,
        numColumns: this.numColumns,
        radiusScale: this.radiusScale,
        sortBy: this.storeState.selectedSortBy
      });
    }
  }
}
</script>
