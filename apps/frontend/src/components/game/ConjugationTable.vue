<script setup lang="ts">
import type { VerbId, Tense } from '@plumi/shared';
import { getConjugation, getInfinitive } from '@plumi/shared';
import { computed } from 'vue';

const props = defineProps<{
  verbId: VerbId;
  tense: Tense;
}>();

const conjugation = computed(() => getConjugation(props.verbId, props.tense));
const infinitive = computed(() => getInfinitive(props.verbId));

/** Couleur par pronom — palette Plumi */
const pronounColors: Record<string, string> = {
  je: 'text-sky-600',
  tu: 'text-meadow-600',
  'il/elle/on': 'text-gold-500',
  nous: 'text-coral-500',
  vous: 'text-moss-600',
  'ils/elles': 'text-stone-600',
};

const tenseLabels: Record<Tense, string> = {
  present: 'au présent',
  futur: 'au futur',
  imparfait: 'à l\'imparfait',
  passe_compose: 'au passé composé',
};
</script>

<template>
  <div
    v-if="conjugation"
    class="conjugation-table bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-sky-200 p-4 md:p-6"
  >
    <!-- Titre du tableau -->
    <h4 class="text-center text-lg font-bold text-sky-600 mb-4 font-learning">
      {{ infinitive }} {{ tenseLabels[tense] }}
    </h4>

    <!-- Lignes pronom → forme -->
    <div class="flex flex-col gap-2">
      <div
        v-for="form in conjugation.forms"
        :key="form.pronoun"
        class="flex items-center justify-between px-4 py-3 rounded-xl bg-sky-50/60 min-h-[52px]"
      >
        <span
          class="font-bold text-base md:text-lg"
          :class="pronounColors[form.pronoun] ?? 'text-stone-600'"
        >
          {{ form.pronoun }}
        </span>
        <span class="font-learning text-lg md:text-xl text-stone-800 font-semibold">
          {{ form.form }}
        </span>
      </div>
    </div>
  </div>
</template>
