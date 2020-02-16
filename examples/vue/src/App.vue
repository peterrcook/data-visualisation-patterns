<template>
  <div id="wrapper">
    <div id="header">Energy mix by country (2015)</div>
    <!-- <Controls /> -->
    <Chart />
    <div id="footer">
      <div>Data: <a href="https://datacatalog.worldbank.org/dataset/world-development-indicators">World Bank</a></div>
      <div><a href="https://github.com/peterrcook/data-visualisation-patterns">Source code</a></div>
    </div>
  </div>
</template>

<script>
import Chart from './components/Chart.vue';

export default {
  name: 'App',
  components: {
    Chart
  }
}
</script>

<style>
a, a:visited {
  color: #888;
  transition: opacity 0.3s;
}

a:hover {
  opacity: 0.5
}

#wrapper {
  margin: 0 auto;
  width: 1200px;
  color: #aaa;
}

#header {
  padding: 1rem;
  font-size: 1.5rem;
  color: #ccc;
  text-align: right;
  letter-spacing: -0.03rem;
}
</style>
