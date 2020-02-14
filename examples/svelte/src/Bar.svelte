<script>
import { tweened } from 'svelte/motion';
import { beforeUpdate } from 'svelte';
import { scaleLinear } from "d3-scale";

export let value;
export let y;
export let height;
export let delay;

let xScale = scaleLinear().domain([0, 100]).range([0, 800]);

let w = tweened(0, {
  duration: 200,
  delay: delay
});

beforeUpdate(() => {
  w.set(value);
});
</script>

<rect y={y} width={$w} height={height}></rect>
<text y={y + height} x={$w + 5}>{Math.round($w)}</text>
