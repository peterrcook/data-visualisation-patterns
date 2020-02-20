<template>
  <g v-if="visible" v-on:click="handleClick">
    <path :d="pathString" />
    <text v-if="labelVisible" :transform="labelTransform" dy="0.33em">{{label}}</text>
  </g>
</template>

<script>
import { arc as d3_arc } from 'd3-shape';
import store from '../store';
import { radToDeg } from '../utility';

let arcGenerator = d3_arc();

export default {
  name: 'Segment',
  props: ['d', 'xToAngle', 'yToRadius'],
  methods: {
    handleClick: function() {
      store.setSelectedSegment(this.d);
    }
  },
  computed: {
    pathString: function() {
      return arcGenerator({
        startAngle: this.startAngle,
        endAngle: this.endAngle,
        innerRadius: this.innerRadius,
        outerRadius: this.outerRadius
      });
    },
    startAngle: function() {
      return this.xToAngle(this.d.x0);
    },
    endAngle: function() {
      return this.xToAngle(this.d.x1);
    },
    innerRadius: function() {
      return this.yToRadius(this.d.y0);
    },
    outerRadius: function() {
      return this.yToRadius(this.d.y1);
    },
    visible: function() {
      if(this.startAngle === 0 && this.endAngle === 0) {
        return false;
      }
      if(this.startAngle === 2 * Math.PI && this.endAngle === 2 * Math.PI) {
        return false;
      }
      if(this.innerRadius === 350) {
        return false;
      }
      if(this.outerRadius === 0) {
        return false;
      }
      return true;
    },
    label: function() {
      let availableLength = this.outerRadius - this.innerRadius;
      let label = this.d.data.key;
      let numChars = Math.floor(availableLength / 7); // magic number dependent on font-size
      return numChars === 0 ? '' : label.length <= numChars ? label : label.slice(0, availableLength / 10) + '...';
    },
    labelTransform: function() {
      if(this.innerRadius === 0) return '';
      let angle = radToDeg(0.5 * (this.startAngle + this.endAngle)) - 90;
      let r = 0.5 * (this.innerRadius + this.outerRadius);
      return `rotate(${angle})translate(${r}, 0)`;
    },
    labelVisible: function() {
      return this.d.depth > 0 && this.endAngle - this.startAngle > 0.07;
    }
  }
}
</script>

<style scoped>
path {
  fill: #eee;
  fill-opacity: 0.05;
  stroke: #ccc;
  stroke-width: 0.25;
}
text {
  fill: #fff;
  text-anchor: middle;
  font-size: 14px;
  user-select: none;
}
</style>
