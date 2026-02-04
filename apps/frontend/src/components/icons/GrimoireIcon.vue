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
    <!-- Open book -->
    <path
      d="M2 4C2 4 5 3 8 3C11 3 12 4 12 4V20C12 20 11 19 8 19C5 19 2 20 2 20V4Z"
      fill="currentColor"
      opacity="0.15"
    />
    <path
      d="M22 4C22 4 19 3 16 3C13 3 12 4 12 4V20C12 20 13 19 16 19C19 19 22 20 22 20V4Z"
      fill="currentColor"
      opacity="0.15"
    />
    <path
      d="M2 4C2 4 5 3 8 3C11 3 12 4 12 4V20C12 20 11 19 8 19C5 19 2 20 2 20V4Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M22 4C22 4 19 3 16 3C13 3 12 4 12 4V20C12 20 13 19 16 19C19 19 22 20 22 20V4Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Page lines -->
    <path
      d="M5 8H9"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
    />
    <path
      d="M5 11H9"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
    />
    <path
      d="M15 8H19"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
    />
    <path
      d="M15 11H19"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
    />
  </svg>
</template>
