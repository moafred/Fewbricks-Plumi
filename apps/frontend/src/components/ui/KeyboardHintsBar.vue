<script setup lang="ts">
/**
 * KeyboardHintsBar — Barre d'indices clavier (desktop uniquement)
 *
 * @description Conteneur pour les KeyboardGuide, masqué sur mobile/tablette.
 * Remplace le pattern dupliqué : `hidden lg:flex gap-8 opacity-60`
 */
</script>

<template>
  <div class="hidden lg:flex gap-8 opacity-60">
    <slot />
  </div>
</template>
