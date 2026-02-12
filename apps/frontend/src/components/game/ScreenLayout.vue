<script setup lang="ts">
/**
 * ScreenLayout — Conteneur principal pour les écrans de navigation
 *
 * Gère le padding responsive et les gaps pour tous les écrans hors mini-jeux.
 * Remplace le pattern dupliqué : `flex flex-col flex-1 p-4 md:p-6 gap-* md:gap-*`
 */
withDefaults(defineProps<{
  gap?: 'none' | 'sm' | 'md';
}>(), {
  gap: 'sm',
});
</script>

<template>
  <div
    class="flex flex-col flex-1 p-4 md:p-6"
    :class="{
      'gap-4 md:gap-6': gap === 'sm',
      'gap-6 md:gap-8': gap === 'md',
    }"
  >
    <slot />
  </div>
</template>
