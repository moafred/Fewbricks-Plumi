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
    <!-- Arche du pont -->
    <path
      d="M3 18C3 18 3 12 12 12C21 12 21 18 21 18"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M3 18C3 18 3 12 12 12C21 12 21 18 21 18"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <!-- Tablier du pont -->
    <path
      d="M2 18H22"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <!-- Piliers -->
    <path d="M5 18V20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M19 18V20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <!-- Étoile au sommet -->
    <path
      d="M12 7L12.5 8.5L14 9L12.5 9.5L12 11L11.5 9.5L10 9L11.5 8.5L12 7Z"
      fill="currentColor"
    />
  </svg>
</template>
