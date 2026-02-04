<script setup lang="ts">
export type SpellState = 'idle' | 'waiting' | 'correct' | 'incorrect' | 'reveal';

const props = defineProps<{
  label: string;
  state: SpellState;
}>();

const emit = defineEmits<{
  tap: [label: string];
}>();

function handleTap() {
  if (props.state === 'waiting') {
    emit('tap', props.label);
  }
}
</script>

<template>
  <button
    class="spell-choice flex items-center justify-center rounded-2xl min-h-16 w-full text-xl md:text-2xl font-bold transition-all duration-200 select-none border-3"
    :class="[
      {
        'bg-royal-700/40 border-royal-500/30 text-royal-200 opacity-50 cursor-default': state === 'idle',
        'bg-royal-600 border-royal-400 text-white cursor-pointer animate-bounce-gentle shadow-lg shadow-royal-500/20 hover:scale-105 active:scale-95':
          state === 'waiting',
        'bg-enchant-600 border-enchant-300 text-white ring-4 ring-enchant-300 scale-105 animate-celebrate':
          state === 'correct',
        'bg-royal-800/30 border-royal-600/20 text-royal-400 opacity-50 scale-95':
          state === 'incorrect',
        'bg-enchant-600/80 border-enchant-400 text-white ring-4 ring-white/60 animate-bounce-gentle':
          state === 'reveal',
      },
    ]"
    :disabled="state !== 'waiting'"
    @click="handleTap"
  >
    {{ label }}
  </button>
</template>
