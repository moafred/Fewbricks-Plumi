<script setup lang="ts">
/**
 * NotebookIcon — Icône de cahier d'école
 *
 * @description Icône représentant un cahier d'école pour le thème scolaire.
 * Utilisé pour les livres/chapitres dans l'interface.
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
      d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z"
      fill="currentColor"
    />
  </svg>
</template>
