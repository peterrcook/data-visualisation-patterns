<template>
  <g
    class="country"
    :transform="`translate(${tweenD.x},${tweenD.y})`"
    :style="{opacity: tweenD.opacity}"
    v-on:mouseover="handleMouseenter"
    v-on:mouseout="handleMouseout"
  >
    <circle class="pick-area" :r="d.pickRadius" />
    <circle class="oilgascoal" :r="tweenD.oilGasCoalRadius" />
    <circle class="renewable" :r="tweenD.renewableRadius" />
    <circle class="hydroelectric" :r="tweenD.hydroelectricRadius" />
    <circle class="nuclear" :r="tweenD.nuclearRadius" />
    <text class="label" :y="d.labelYOffset">{{d.label}}</text>
    <circle class="popup-anchor" :cy="d.popupOffset" r="1" ref="popupAnchor" />
  </g>
</template>

<script>
import { tween, easing, chain, delay } from 'popmotion';

import store from '../store';

export default {
  name: 'CircleGroup',
  props: ['d', 'delay'],
  data: () => {
    return {
      tweenD: {
        x: 0,
        y: 0,
        oilGasCoalRadius: 0,
        renewableRadius: 0,
        hydroelectricRadius: 0,
        nuclearRadius: 0,
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
      this.doTransition();
    }
  },
  methods: {
    doTransition: function() {
      if(this.tween !== null) {
        this.tween.stop();
      }
      
      this.tween = chain(
        delay(this.delay),
        tween({
          from: this.tweenD,
          to: this.d,
          duration: 500,
          ease: easing.easeInOut
        })
      ).start(v => {
        this.tweenD = v;
      });
    },
    handleMouseenter: function() {
      store.setHoveredCountry({
        d: this.d,
        el: this.$refs.popupAnchor
      });
    },
    handleMouseout: () => {
      store.setHoveredCountry(null);
    }
  }
}

</script>

<style>
text.label {
  text-anchor: middle;
  font-size: 0.75rem;
  fill: #777;
  font-weight: bold;
  transition: fill 0.3s;
}

.country:hover text.label {
  fill: #fff;
}

.popup-anchor {
  opacity: 0;
}

.pick-area {
  opacity: 0;
}
</style>
