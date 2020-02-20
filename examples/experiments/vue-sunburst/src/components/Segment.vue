<template>
  <path :d="pathString" v-on:click="handleClick" />
</template>

<script>
import { arc as d3_arc } from 'd3-shape';
import store from '../store';

let arcGenerator = d3_arc();

export default {
  name: 'Segment',
  props: ['d', 'xToAngle', 'yToRadius'],
  methods: {
    handleClick: function() {
      console.log(this.d);
      store.setSelectedSegment(this.d);
    }
  },
  computed: {
    pathString: function() {
      return arcGenerator({
        startAngle: this.xToAngle(this.d.x0),
        endAngle: this.xToAngle(this.d.x1),
        innerRadius: this.yToRadius(this.d.y0),
        outerRadius: this.yToRadius(this.d.y1)
      });
    }
  }
}
</script>

<style scoped>
path {
  fill: #eee;
  stroke: #aaa;
}
</style>
