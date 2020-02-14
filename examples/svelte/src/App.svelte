<script>
import Chart from './Chart.svelte';
export let data;

</script>

<main>
  <div id="wrapper">
    <div id="header">Energy mix by country (2015)</div>
    <div id="controls">
      <div class="left menu">
        <div>Sort by:</div>
        <div class="items"></div>
      </div>
      <div class="right legend">
        <svg width="70" height="70">
          <g transform="translate(35,35)">
            <circle r="30" />
            <text dy="0.33rem">100%</text>
          </g>
        </svg>
      </div>
    </div>
    <Chart data="{data}"></Chart>
    <div id="footer">
      <div>Data: <a href="https://datacatalog.worldbank.org/dataset/world-development-indicators">World Bank</a></div>
      <div><a href="https://github.com/peterrcook/data-visualisation-patterns">Source code</a></div>
    </div>
  </div>
</main>

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
  font-family: 'Open Sans', sans-serif;
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
