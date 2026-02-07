<script setup lang="ts">
import { computed } from 'vue';
import { SparkleIcon } from '@/components/icons';

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
    class="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-4 text-3xl md:text-5xl font-learning text-stone-800 leading-normal text-center select-none"
  >
    <!-- Before Gap -->
    <span class="whitespace-pre-wrap">{{ parts[0] }}</span>

    <!-- The Gap -->
    <div
      class="relative inline-flex items-center justify-center min-w-[80px] md:min-w-[120px] px-3 py-1 transition-all duration-500"
      :class="[
        // Idle state: Gold hole
        isIdle
          ? 'border-b-4 border-gold-400 bg-gold-100/40 rounded-t-lg animate-sparkle'
          : '',

        // Correct state: Green and bold
        (isCorrect || showSolution) && !isWrong
          ? 'text-meadow-600 font-bold scale-110 transform'
          : '',

        // Wrong state: Red and crossed out
        isWrong
          ? 'text-coral-500 line-through decoration-4 decoration-coral-400'
          : ''
      ]"
    >
      <!-- Content -->
      <span v-if="filledWord || showSolution" class="relative z-10">
        {{ filledWord }}
      </span>
      <span v-else class="opacity-0">mot</span>

      <!-- Magic Particles (Idle) -->
      <template v-if="isIdle">
        <SparkleIcon :size="16" class="absolute -top-2 -right-2 text-gold-300 animate-sparkle" />
        <SparkleIcon :size="16" class="absolute -bottom-2 -left-2 text-gold-300 animate-sparkle" />
      </template>
    </div>

    <!-- After Gap -->
    <span class="whitespace-pre-wrap">{{ parts[1] }}</span>
  </div>
</template>
