<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    sentence: string; // e.g. "Je _____ content."
    filledWord?: string; // The word to display in the gap (if any)
    isCorrect?: boolean; // True if the filled word is correct
    isWrong?: boolean; // True if the filled word is wrong (user made a mistake)
    showSolution?: boolean; // If true, force display as correct style (for correction phase)
  }>(),
  {
    filledWord: '',
    isCorrect: false,
    isWrong: false,
    showSolution: false,
  }
);

// Split sentence by the gap placeholder
const parts = computed(() => {
  return props.sentence.split('_____');
});

const isIdle = computed(() => !props.filledWord && !props.showSolution);
</script>

<template>
  <div
    class="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-4 text-2xl md:text-4xl font-learning text-stone-800 leading-normal text-center select-none"
  >
    <!-- Before Gap -->
    <span class="whitespace-pre-wrap">{{ parts[0] }}</span>

    <!-- The Gap -->
    <span
      class="inline-flex items-baseline justify-center min-w-16 md:min-w-24 px-1 transition-all duration-500"
      :class="[
        // Correct state
        (isCorrect || showSolution) && !isWrong
          ? 'text-meadow-600 font-bold'
          : '',

        // Wrong state
        isWrong
          ? 'text-coral-500 line-through decoration-4 decoration-coral-400'
          : ''
      ]"
    >
      <span v-if="filledWord || showSolution">{{ filledWord }}</span>
      <span v-else class="text-sky-300 font-bold text-base md:text-2xl">_ _ _ _ _ _</span>
    </span>

    <!-- After Gap -->
    <span class="whitespace-pre-wrap">{{ parts[1] }}</span>
  </div>
</template>
