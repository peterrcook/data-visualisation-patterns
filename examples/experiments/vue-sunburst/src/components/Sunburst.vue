<template>
  <div id="chart-wrapper">
    <svg width="800" height="800">
      <g transform="translate(400, 400)">
        <Segment v-for="d in sunburstNodes" :key="d.id" :d="d" :xToAngle="xToAngle" :yToRadius="yToRadius" />
      </g>
    </svg>
  </div>
</template>

<script>
import { scaleLinear } from 'd3-scale';
import { partition as d3_partition } from 'd3-hierarchy';

import store from '../store';
import { getRoot } from '../utility';

import Segment from './Segment';

let radius = 350;

var partitionLayout = d3_partition()
  .size([1, 4]);

export default {
  name: 'Sunburst',
  components: {
    Segment
  },
  data: () => {
    return {
      storeState: store.state
    }
  },
  computed: {
    sunburstData: function() {
      let root = getRoot(this.storeState.data, ['Genre', 'Lead Studio', 'Film'], 'Worldwide Gross ($m)');
      partitionLayout(root);
      console.log(root);
      return root;
    },
    sunburstNodes: function() {
      return this.sunburstData.descendants();
    },
    xToAngle: function() {
      let x0 = this.storeState.selectedSegment ? this.storeState.selectedSegment.x0 : 0;
      let x1 = this.storeState.selectedSegment ? this.storeState.selectedSegment.x1 : 1;
      return scaleLinear().domain([x0, x1]).range([0, 2 * Math.PI]).clamp(true);
    },
    yToRadius: function() {
      let s = this.storeState.selectedSegment;
      let y0 = s ? s.y0 : 0;
      let y1 = y0 + 3;
      return scaleLinear().domain([y0, y1]).range([0, radius]).clamp(true);
    }
  }
}
</script>
