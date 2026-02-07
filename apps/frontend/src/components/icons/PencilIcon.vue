<script setup lang="ts">
/**
 * PencilIcon — Icône de crayon/stylo
 *
 * @description Icône représentant un crayon d'école pour le thème scolaire.
 * Utilisé pour remplacer les références magiques (baguette, plume enchantée).
 *
 * @usage
 * - Taille par défaut : 24px
 * - Couleur contrôlée par classe text-* parente
 * - Ne pas utiliser fill inline (utiliser classes Tailwind)
 */
withDefaults(
  defineProps<{
    size?: number;
  }>(),
  { size: 24 }
);
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="inline-block"
  >
    <path
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
      fill="currentColor"
    />
  </svg>
</template>
