<script setup lang="ts">
import type { BookLessonExample } from '@plumi/shared';

defineProps<{
  examples: BookLessonExample[];
}>();

/**
 * Découpe la phrase autour du mot highlight pour l'afficher en gras/couleur.
 * Retourne { before, highlight, after } ou null si highlight absent.
 */
function splitSentence(sentence: string, highlight: string): { before: string; match: string; after: string } | null {
  const index = sentence.indexOf(highlight);
  if (index === -1) return null;
  return {
    before: sentence.slice(0, index),
    match: sentence.slice(index, index + highlight.length),
    after: sentence.slice(index + highlight.length),
  };
}
</script>

<template>
  <div class="lesson-examples flex flex-col gap-3">
    <div
      v-for="(example, i) in examples"
      :key="i"
      class="flex items-start gap-3 px-4 py-3 rounded-xl bg-sky-50/60"
    >
      <span class="text-sky-400 font-bold text-lg shrink-0" aria-hidden="true">*</span>
      <p class="text-base md:text-lg text-stone-700 leading-relaxed">
        <template v-if="splitSentence(example.sentence, example.highlight)">
          {{ splitSentence(example.sentence, example.highlight)!.before }}<strong class="text-sky-600 font-bold font-learning">{{ splitSentence(example.sentence, example.highlight)!.match }}</strong>{{ splitSentence(example.sentence, example.highlight)!.after }}
        </template>
        <template v-else>
          {{ example.sentence }}
        </template>
      </p>
    </div>
  </div>
</template>
