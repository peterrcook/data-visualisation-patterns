import { writable } from 'svelte/store';

export const selectedSortBy = writable('country');
export const hoveredMeta = writable(null);
