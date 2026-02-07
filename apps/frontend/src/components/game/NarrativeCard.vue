<script setup lang="ts">
import NotebookCard from '@/components/ui/NotebookCard.vue';

/**
 * NarrativeCard — Carte narrative pour intros de chapitres
 *
 * @description Composant pour les introductions narratives avec style narratif.
 * Utilise NotebookCard en interne avec animation de déroulement.
 *
 * @usage
 * - Utiliser pour les introductions de chapitres
 * - Remplacer les divs avec texte narratif
 * - Animation slide-down automatique
 * - Voir docs/component-patterns.md pour plus d'exemples
 *
 * @example
 * <NarrativeCard title="Le Jardin des Mots" text="Bienvenue..." biome="jardin" />
 */
defineProps<{
  title: string;
  text: string;
  biome?: string;
}>();
</script>

<template>
  <NotebookCard
    variant="light"
    padding="lg"
    rounded="lg"
    class="narrative-card animate-slide-down max-w-2xl mx-auto"
  >
    <h2 class="text-3xl md:text-4xl font-bold text-sky-600 mb-6 text-center font-learning">
      {{ title }}
    </h2>
    <p class="text-lg md:text-xl text-stone-700 leading-relaxed text-center">
      {{ text }}
    </p>
  </NotebookCard>
</template>
