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
    <!-- Livre fermé -->
    <path
      d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z"
      fill="currentColor"
      opacity="0.15"
    />
    <path
      d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- Décoration sur la couverture -->
    <path
      d="M12 8L12.5 9.5L14 10L12.5 10.5L12 12L11.5 10.5L10 10L11.5 9.5L12 8Z"
      fill="currentColor"
    />
  </svg>
</template>
