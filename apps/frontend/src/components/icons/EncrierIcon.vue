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
    <!-- Encrier : pot d'encre trapézoïdal -->
    <path
      d="M6 10H18L17 20H7L6 10Z"
      fill="currentColor"
      opacity="0.15"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <!-- Bord supérieur évasé -->
    <path
      d="M5 10C5 9 6 8 8 8H16C18 8 19 9 19 10"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Surface d'encre -->
    <path
      d="M8 12H16"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
    />
    <!-- Plume posée en travers -->
    <line
      x1="14"
      y1="4"
      x2="10"
      y2="9"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>
