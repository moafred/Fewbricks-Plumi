<script setup lang="ts">
/**
 * TenseBadge — Badge affichant le temps de conjugaison
 *
 * @description Pastille arrondie affichant le nom du temps grammatical.
 * Remplace le pattern dupliqué : `px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm font-medium`
 */
import type { Tense } from '@plumi/shared';

defineProps<{
  tense: Tense;
}>();

const tenseLabels: Record<Tense, string> = {
  present: 'Présent',
  futur: 'Futur',
  imparfait: 'Imparfait',
  passe_compose: 'Passé composé',
};
</script>

<template>
  <span class="shrink-0 self-center px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm font-medium">
    {{ tenseLabels[tense] }}
  </span>
</template>
