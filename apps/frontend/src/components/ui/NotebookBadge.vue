<script setup lang="ts">
/**
 * NotebookBadge — Badge avec texture cahier
 *
 * @description Composant réutilisable pour les badges d'information avec texture cahier Seyes.
 * Remplace les divs avec pattern : `bg-white/90 rounded-full border-2 border-sky-200`
 *
 * @usage
 * - Utiliser pour les badges d'information, compteurs, indicateurs
 * - Parfait pour les headers de jeu avec étape actuelle
 * - Voir docs/component-patterns.md pour plus d'exemples
 *
 * @example
 * <NotebookBadge>
 *   <span class="text-sky-600 font-bold">Étape 1 / 5</span>
 * </NotebookBadge>
 */
withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg';
  }>(),
  { size: 'md' }
);
</script>

<template>
  <div
    class="notebook-badge flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full border-2 border-sky-200 shadow-sm texture-notebook"
    :class="[
      size === 'sm' ? 'px-3 py-1' : size === 'lg' ? 'px-6 py-3' : 'px-4 py-2',
    ]"
  >
    <slot />
  </div>
</template>
