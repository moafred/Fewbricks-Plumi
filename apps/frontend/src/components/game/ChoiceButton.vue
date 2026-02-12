<script setup lang="ts">
import { useGameFeedback } from '@/composables/useGameFeedback';
import ChoiceFeedback from '@/components/game/ChoiceFeedback.vue';

export type ChoiceState = 'idle' | 'focused' | 'correct' | 'incorrect' | 'dimmed';

const props = defineProps<{
  label: string;
  state: ChoiceState;
  disabled?: boolean;
}>();

defineEmits<{
  select: [label: string];
}>();

const { showBurst, showWobble } = useGameFeedback(() => props.state);
</script>

<template>
  <button
    :disabled="disabled"
    class="
      relative h-20 md:h-24 rounded-2xl text-xl md:text-2xl font-learning
      transition-all duration-200 border-b-4 active:border-b-0 active:translate-y-1
      flex items-center justify-center overflow-visible px-2
    "
    :class="[
      {
        'bg-white text-stone-700 border-stone-300 hover:bg-sky-50 cursor-pointer shadow-sm': state === 'idle',
        'bg-white text-stone-700 border-stone-300 ring-4 ring-gold-300 z-10 shadow-sm': state === 'focused',
        'bg-meadow-100 text-meadow-700 border-meadow-500 scale-105': state === 'correct',
        'bg-coral-100 text-coral-600 border-coral-400': state === 'incorrect',
        'bg-stone-100 text-stone-400 border-transparent': state === 'dimmed',
      },
      showWobble ? 'animate-wobble' : '',
    ]"
    @click="$emit('select', label)"
  >
    {{ label }}

    <ChoiceFeedback :active="showBurst" />
  </button>
</template>
