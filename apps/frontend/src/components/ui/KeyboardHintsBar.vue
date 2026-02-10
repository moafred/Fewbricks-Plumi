<script setup lang="ts">
/**
 * KeyboardHintsBar — Barre d'indices clavier (desktop uniquement)
 *
 * @description Conteneur pour les KeyboardGuide, masqué sur mobile/tablette.
 * Remplace le pattern dupliqué : `hidden lg:flex gap-8 opacity-60`
 *
 * @prop visible — Contrôle la visibilité sans retirer du flux layout.
 * `invisible` (visibility: hidden) garde l'espace réservé, évitant les sauts de layout entre phases.
 */
withDefaults(defineProps<{ visible?: boolean }>(), { visible: true });
</script>

<template>
  <div class="hidden lg:flex gap-8 opacity-60" :class="{ invisible: !visible }">
    <slot />
  </div>
</template>
