<template>
  <g>
    <circle :cx="tweenD.x" :cy="tweenD.y" :r="tweenD.r" :style="{opacity: tweenD.opacity}" />
  </g>
</template>

<script>
import { spring, chain, delay } from 'popmotion';
/* import { tween, easing, chain, delay } from 'popmotion'; */

export default {
  name: 'MyCircle',
  props: {
    d: Object
  },
  data: () => {
    return {
      tweenD: {
        x: 0,
        y: 0,
        r: 0,
        opacity: 0
      },
      tween: null
    }
  },
  mounted: function() {
    this.tweenD.x = this.d.x;
    this.tweenD.y = this.d.y;
    this.doTransition();
  },
  watch: {
    d: function() {
      this.doTransition()
    }
  },
  methods: {
    doTransition: function() {
      if(this.tween !== null) {
        this.tween.stop();
      }
      
      /* this.tween = chain(
       *   delay(this.d.delay),
       *   tween({
       *     from: this.tweenD,
       *     to: this.d,
       *     duration: 500,
       *     ease: easing.easeInOut
       *   })
       * ).start(v => {
       *   this.tweenD = v;
       * }); */
      
      this.tween = chain(
        delay(this.d.delay),
        spring({
          from: this.tweenD,
          to: this.d,
          stiffness: 300,
          damping: 20
        })
      ).start(v => {
        this.tweenD = v;
      });
    }
  }
}
</script>

<style scoped>
  circle {
  fill: none;
  stroke: #aaa;
  }
</style>
