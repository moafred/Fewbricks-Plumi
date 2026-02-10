<script setup lang="ts">
/**
 * NotebookCard — Carte avec texture cahier d'école
 *
 * @description Composant réutilisable pour toutes les cartes avec fond clair et texture cahier Seyes.
 * Remplace les divs avec pattern : `bg-white/90 backdrop-blur-md border-2 border-sky-200 shadow-sm`
 *
 * @usage
 * - Utiliser pour les cartes principales, conteneurs, modals
 * - Préférer ce composant plutôt qu'une div avec classes répétitives
 * - Voir docs/component-patterns.md pour plus d'exemples
 *
 * @example
 * <NotebookCard variant="light" hint="Défi" padding="lg">
 *   <h2>Titre</h2>
 *   <p>Contenu</p>
 * </NotebookCard>
 */
withDefaults(
  defineProps<{
    variant?: 'light' | 'primary';
    hint?: string;
    padding?: 'sm' | 'md' | 'lg';
    rounded?: 'sm' | 'md' | 'lg';
  }>(),
  { variant: 'light', padding: 'md', rounded: 'lg' }
);
</script>

<template>
  <div
    class="notebook-card w-full shadow-sm flex flex-col items-center justify-center relative overflow-hidden texture-notebook"
    :class="[
      variant === 'light'
        ? 'bg-white/90 backdrop-blur-md border-2 border-sky-200'
        : 'bg-sky-50/95 backdrop-blur-md border-2 border-sky-300',
      padding === 'sm' ? 'p-4' : padding === 'lg' ? 'p-12' : 'p-8',
      rounded === 'sm' ? 'rounded-xl' : rounded === 'lg' ? 'rounded-3xl' : 'rounded-2xl',
    ]"
  >
    <div
      v-if="hint"
      class="w-full text-center font-bold uppercase tracking-widest drop-shadow-sm"
      :class="variant === 'light' ? 'text-sky-600' : 'text-sky-700'"
    >
      {{ hint }}
    </div>

    <div class="w-full text-center" :class="hint ? 'mt-3 mb-4' : 'my-4'">
      <slot />
    </div>

    <slot name="footer" />
  </div>
</template>
