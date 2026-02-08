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
    <!-- Étiquettes / dossiers de classement -->
    <!-- Dossier arrière -->
    <path
      d="M4 7H10L11 5H20V17H4V7Z"
      fill="currentColor"
      opacity="0.1"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <!-- Dossier avant -->
    <path
      d="M4 10H8L9 8H20V19H4V10Z"
      fill="currentColor"
      opacity="0.15"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <!-- Étiquette -->
    <rect
      x="12"
      y="13"
      width="5"
      height="2.5"
      rx="0.5"
      stroke="currentColor"
      stroke-width="1"
    />
  </svg>
</template>
