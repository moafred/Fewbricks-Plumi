<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 24 });
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <!-- Bottle body -->
    <path
      d="M19 14C19 15.8565 18.2625 17.637 16.9497 18.9497C15.637 20.2625 13.8565 21 12 21C10.1435 21 8.36301 20.2625 7.05025 18.9497C5.7375 17.637 5 15.8565 5 14C5 12.35 6 11 7 10V6H17V10C18 11 19 12.35 19 14Z"
      fill="currentColor"
      fill-opacity="0.15"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Cork -->
    <path
      d="M9 3H15"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10 3V6"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14 3V6"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Liquid/Bubbles -->
    <path
      d="M9 13C9 13 10 12 12 12C14 12 15 13 15 13"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <circle cx="14" cy="16" r="1" fill="currentColor" />
    <circle cx="10" cy="17" r="1" fill="currentColor" />
  </svg>
</template>
