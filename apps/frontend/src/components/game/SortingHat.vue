<script setup lang="ts">
import type { VerbId } from '@plumi/shared';
import { HatIcon } from '@/components/icons';

export type HatState = 'idle' | 'waiting' | 'correct' | 'incorrect' | 'reveal';

const props = defineProps<{
  verbId: VerbId;
  label: string;
  state: HatState;
}>();

const emit = defineEmits<{
  tap: [verbId: VerbId];
}>();

function handleTap() {
  if (props.state === 'waiting') {
    emit('tap', props.verbId);
  }
}
</script>

<template>
  <button
    class="sorting-hat flex flex-col items-center justify-center rounded-full w-32 h-32 md:w-36 md:h-36 text-xl md:text-2xl font-bold transition-all duration-200 select-none border-4"
    :class="[
      // Base color per verb
      verbId === 'etre'
        ? 'bg-enchant-600 border-enchant-400 text-white'
        : 'bg-magic-500 border-magic-300 text-night-900',
      // State modifiers
      {
        'opacity-50 cursor-default': state === 'idle',
        'cursor-pointer animate-bounce-gentle shadow-lg shadow-white/20 hover:scale-105 active:scale-95':
          state === 'waiting',
        'ring-4 ring-enchant-300 scale-110 animate-celebrate': state === 'correct',
        'opacity-60 scale-95': state === 'incorrect',
        'ring-4 ring-white/60 animate-bounce-gentle': state === 'reveal',
      },
    ]"
    :disabled="state !== 'waiting'"
    @click="handleTap"
  >
    <HatIcon :size="40" class="mb-1" />
    <span>{{ label }}</span>
  </button>
</template>
