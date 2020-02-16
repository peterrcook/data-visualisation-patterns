<template>
  <g
    class="country"
    :transform="`translate(${d.x},${d.y})`"
    :style="{opacity: d.opacity}"
  >
    <circle class="oilgascoal" :r="d.oilGasCoalRadius" />
    <circle class="renewable" :r="d.renewableRadius" />
    <circle class="hydroelectric" :r="d.hydroelectricRadius" />
    <circle class="nuclear" :r="d.nuclearRadius" />
  </g>
</template>

<script>

export default {
  name: 'CircleGroup',
  props: ['d']
}
</script>

<style>

</style>
