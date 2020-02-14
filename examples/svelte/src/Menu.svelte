<script>
let menuItems = [
  {
    id: 'country',
    label: 'Country'
  },
  {
    id: 'renewable',
    label: 'Renewable'
  },
  {
    id: 'hydroelectric',
    label: 'Hydroelectric'
  },
  {
    id: 'oilgascoal',
    label: 'Oil, Gas & Coal'
  },
  {
    id: 'nuclear',
    label: 'Nuclear'
  }
];
</script>

<div class="menu">
  <div>Sort by:</div>
  <div class="items">
    {#each menuItems as item}
      <div class="item">
        <svg width="18" height="18">
          <circle class={item.id} cx="9" cy="9" r="8" />
        </svg>
        <div class="label">{item.label}</div>
      </div>
    {/each}
  </div>
</div>

<style>
.menu {
  display: flex;
  align-items: center;
}

.items {
  display: flex;
}

.item {
  padding: 0 1rem;
  font-size: 1.25rem;
  color: #ddd;
  cursor: default;
  display: flex;
  align-items: center;
}

.item:first-child svg {
  display: none;
}

.item .label {
  opacity: 0.5;
  transition: opacity 0.3s;
}

.item.selected .label, .item:hover .label {
  opacity: 1;
}

.item svg {
  margin-right: 0.25rem;
}
</style>
