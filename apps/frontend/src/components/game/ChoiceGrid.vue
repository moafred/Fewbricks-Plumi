<script setup lang="ts">
/**
 * ChoiceGrid — Grille 2×2 pour les choix de mini-jeux
 *
 * @description Conteneur réutilisable pour les grilles de ChoiceButton / FormChoice.
 * Remplace le pattern dupliqué : `grid grid-cols-2 gap-6 w-full max-w-Xxl px-6`
 */
withDefaults(
  defineProps<{
    maxWidth?: 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  }>(),
  { maxWidth: '3xl' }
);

const maxWidthClasses: Record<string, string> = {
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
};
</script>

<template>
  <div class="grid grid-cols-2 gap-6 w-full px-6" :class="maxWidthClasses[maxWidth]">
    <slot />
  </div>
</template>
