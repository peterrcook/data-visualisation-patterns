<template>
  <div id="wrapper">
    <Sunburst />
  </div>
</template>

<script>
import Sunburst from './components/Sunburst.vue'

export default {
  name: 'App',
  components: {
    Sunburst
  }
}
</script>

<style>
body {
  background-color: #036;
}

#wrapper {
  margin: 0 auto;
  width: 800px;
}
</style>
