<script setup lang="ts">
/**
 * GameLayout — Conteneur principal pour tous les mini-jeux
 *
 * Gère le layout responsive embedded/standalone de manière centralisée.
 * Remplace les classes dupliquées dans chaque *Game.vue.
 */
withDefaults(defineProps<{
  embedded?: boolean;
}>(), {
  embedded: false,
});
</script>

<template>
  <div
    class="flex flex-col items-center w-full max-w-4xl mx-auto"
    :class="embedded ? 'h-full min-h-0 justify-center p-3 gap-4' : 'justify-center min-h-[80vh] p-4 gap-6'"
  >
    <slot />
  </div>
</template>
