<template>
  <div id="chart-wrapper">
    <svg :width="1200" height="1150">
      <g id="chart">
        <CircleGroup v-for="d in layout" :key="d.datum.id" :d="d" />
      </g>
    </svg>
  </div>
</template>

<script>
import { scaleSqrt } from 'd3-scale';

import CircleGroup from './CircleGroup';

import store from '../store';
import getLayout from '../layout';

export default {
  name: 'Chart',
  components: {
    CircleGroup
  },
  data: () => {
    return {
      storeState: store.state,
      width: 1200,
      numColumns: 14
    }
  },
  computed: {
    radiusScale: function() {
      return scaleSqrt().domain([0, 100]).range([0, 0.35 * this.width / this.numColumns]);
    },
    layout: function() {
      return getLayout(this.storeState.data, {
        width: this.width,
        numColumns: this.numColumns,
        radiusScale: this.radiusScale,
        sortBy: 'country'
      });
    }
  }
}
</script>

<style>

</style>
