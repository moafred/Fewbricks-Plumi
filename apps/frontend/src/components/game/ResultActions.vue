<script setup lang="ts">
/**
 * ResultActions — Barre d'actions des écrans de résultat
 *
 * @description Conteneur flex pour les boutons de fin de partie (Rejouer, Continuer, Accueil).
 * Remplace le pattern dupliqué : `flex gap-4 mt-4` wrapping ActionButton.
 */
</script>

<template>
  <div class="flex flex-wrap justify-center gap-3 mt-4">
    <slot />
  </div>
</template>
