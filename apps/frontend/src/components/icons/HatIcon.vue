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
    <!-- Chapeau de tri : pointe et large bord -->
    <path
      d="M12 2L8 14H4L3 18C3 18 7 20 12 20C17 20 21 18 21 18L20 14H16L12 2Z"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M12 2L8 14H4L3 18C3 18 7 20 12 20C17 20 21 18 21 18L20 14H16L12 2Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3 18C3 18 7 20 12 20C17 20 21 18 21 18"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <!-- Hat band -->
    <path
      d="M8 14H16"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <!-- Star on hat -->
    <path
      d="M12 7L12.5 8.5L14 9L12.5 9.5L12 11L11.5 9.5L10 9L11.5 8.5L12 7Z"
      fill="currentColor"
    />
  </svg>
</template>
