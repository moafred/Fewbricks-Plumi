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
    <!-- Main sparkle -->
    <path
      d="M12 2L13.5 9L20 8L14.5 12L18 19L12 14.5L6 19L9.5 12L4 8L10.5 9L12 2Z"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Small accent sparkle -->
    <path
      d="M19 2L19.5 4L21.5 3.5L20 5L21.5 6.5L19.5 6L19 8L18.5 6L16.5 6.5L18 5L16.5 3.5L18.5 4L19 2Z"
      fill="currentColor"
      opacity="0.6"
    />
  </svg>
</template>
