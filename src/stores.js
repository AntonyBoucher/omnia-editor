import { writable } from 'svelte/store';

export const hasFocus = writable(false);
export const isActive = writable(true);