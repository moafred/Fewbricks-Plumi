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
    <circle
      cx="12"
      cy="8"
      r="4"
      fill="currentColor"
      opacity="0.15"
    />
    <circle
      cx="12"
      cy="8"
      r="4"
      stroke="currentColor"
      stroke-width="1.5"
    />
    <path
      d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20V21H4V20Z"
      fill="currentColor"
      opacity="0.15"
    />
    <path
      d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20V21H4V20Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
