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
import { spring } from 'popmotion';

import store from '../store';
import { getRoot } from '../utility';

import Segment from './Segment';

let radius = 350;

var partitionLayout = d3_partition();

export default {
  name: 'Sunburst',
  components: {
    Segment
  },
  data: () => {
    return {
      storeState: store.state,
      tweenD: {
        x0: 0,
        x1: 1,
        y0: 0,
        y1: 3
      },
      tween: null
    }
  },
  watch: {
    selectedSegment: function() {
      this.doTransition();
    }
  },
  computed: {
    selectedSegment: function() {
      return this.storeState.selectedSegment;
    },
    sunburstData: function() {
      let root = getRoot(this.storeState.data, ['Region', 'Location', 'Grant Programme', 'Title'], 'Amount Awarded');
      partitionLayout.size([1, root.height + 1]);
      partitionLayout(root);
      console.log(root);
      return root;
    },
    sunburstNodes: function() {
      return this.sunburstData.descendants();
    },
    xToAngle: function() {
      return scaleLinear().domain([this.tweenD.x0, this.tweenD.x1]).range([0, 2 * Math.PI]).clamp(true);
    },
    yToRadius: function() {
      return scaleLinear().domain([this.tweenD.y0, this.tweenD.y1]).range([0, radius]).clamp(true);
    }
  },
  methods: {
    doTransition: function() {
      if(this.tween !== null) {
        this.tween.stop();
      }

      let s = this.selectedSegment;
      this.tween = spring({
        from: this.tweenD,
        to: {
          x0: s ? s.x0 : 0,
          x1: s ? s.x1 : 1,
          y0: s ? s.y0 : 0,
          y1: s ? s.y0 + 3 : 3
        },
        /* stiffness: 500,
         * damping: 5 */
        /* duration: 1000 */
      }).start(v => {
        this.tweenD = v;
      });
    }
  }
}
</script>

<style>
svg {
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
}
</style>
