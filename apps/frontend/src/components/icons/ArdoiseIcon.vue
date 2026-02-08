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
    <!-- Ardoise : rectangle avec cadre en bois -->
    <rect
      x="3"
      y="4"
      width="18"
      height="14"
      rx="1.5"
      fill="currentColor"
      opacity="0.15"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <!-- Cadre intérieur (surface d'écriture) -->
    <rect
      x="5.5"
      y="6.5"
      width="13"
      height="9"
      rx="0.5"
      stroke="currentColor"
      stroke-width="1"
    />
    <!-- Craie posée en bas -->
    <line
      x1="8"
      y1="20"
      x2="16"
      y2="20"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>
