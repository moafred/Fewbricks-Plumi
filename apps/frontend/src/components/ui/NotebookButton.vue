<script setup lang="ts">
/**
 * NotebookButton — Bouton avec texture cahier
 *
 * @description Composant réutilisable pour les boutons de navigation avec texture cahier Seyes.
 * Remplace les boutons avec pattern : `bg-white/90 hover:bg-sky-50/95 texture-notebook`
 *
 * @usage
 * - Utiliser pour les boutons de navigation, retour, fermeture
 * - Variant 'icon' pour boutons avec icône uniquement
 * - Variant 'text' pour boutons avec texte
 * - Voir docs/component-patterns.md pour plus d'exemples
 *
 * @example
 * <NotebookButton variant="icon" @click="goBack">
 *   <HomeIcon :size="28" class="text-sky-600" />
 * </NotebookButton>
 */
withDefaults(
  defineProps<{
    variant?: 'icon' | 'text';
    size?: 'sm' | 'md' | 'lg';
  }>(),
  { variant: 'icon', size: 'md' }
);

defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    class="notebook-button bg-white/90 hover:bg-sky-50/95 active:scale-95 transition-all shadow-sm border-2 border-sky-200 texture-notebook backdrop-blur-md"
    :class="[
      variant === 'icon' ? 'p-3 rounded-xl' : 'px-4 py-2 rounded-full',
      size === 'sm' ? 'p-2' : size === 'lg' ? 'p-4' : '',
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
