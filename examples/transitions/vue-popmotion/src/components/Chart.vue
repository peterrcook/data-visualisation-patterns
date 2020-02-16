<template>
  <div>
    <svg width="800" height="600">
      <MyCircle v-for="d in data" :key="d.id" :d="d" />
    </svg>
    <button v-on:click="update">Update</button>
  </div>
</template>

<script>
import MyCircle from './MyCircle.vue';

function getData() {
  let data = [];
  for(let i=0; i<2500; i++) {
    data.push({
      id: i,
      x: Math.random() * 800,
      y: Math.random() * 600,
      r: Math.random() * 20,
      opacity: Math.random() > 0.5 ? 1 : 0,
      delay: i * 0.5
    });
  }
  return data;
}

export default {
  name: 'Chart',
  components: {
    MyCircle
  },
  data: () => {
    return {
      data: null
    }
  },
  mounted: function() {
    this.data = getData();
  },
  methods: {
    update: function() {
      this.data = getData();
    }
  }
}
</script>
