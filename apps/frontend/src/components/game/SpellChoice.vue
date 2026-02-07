<script setup lang="ts">
export type SpellState = 'idle' | 'waiting' | 'correct' | 'incorrect' | 'reveal';

const props = defineProps<{
  label: string;
  state: SpellState;
  focused?: boolean;
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
    class="spell-choice flex items-center justify-center rounded-2xl h-20 md:h-24 w-full text-xl md:text-2xl font-bold transition-all duration-200 select-none border-3"
    :class="[
      {
        'bg-stone-100 border-stone-200 text-stone-400 opacity-50 cursor-default': state === 'idle',
        'bg-sky-500 border-sky-400 text-white cursor-pointer shadow-lg shadow-sky-500/20 hover:scale-105 active:scale-95':
          state === 'waiting' && !focused,
        'bg-sky-400 border-gold-300 text-white cursor-pointer shadow-lg shadow-gold-400/40 scale-110 ring-4 ring-gold-300':
          state === 'waiting' && focused,
        'bg-meadow-500 border-meadow-300 text-white ring-4 ring-meadow-300 scale-105 animate-celebrate':
          state === 'correct',
        'bg-stone-200 border-stone-300 text-stone-400 opacity-50 scale-95':
          state === 'incorrect',
        'bg-meadow-500/80 border-meadow-400 text-white ring-4 ring-white/60':
          state === 'reveal',
      },
    ]"
    :disabled="state !== 'waiting'"
    @click="handleTap"
  >
    {{ label }}
  </button>
</template>
