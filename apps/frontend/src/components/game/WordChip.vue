<script setup lang="ts">
export type WordChipState = 'idle' | 'focused' | 'correct' | 'incorrect' | 'dimmed' | 'target';

const props = defineProps<{
  word: string;
  state: WordChipState;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  tap: [];
}>();

function handleTap() {
  if (!props.disabled) {
    emit('tap');
  }
}
</script>

<template>
  <button
    class="word-chip inline-flex items-center justify-center min-h-12 px-4 py-2 rounded-xl font-learning text-xl md:text-2xl transition-all duration-200 select-none border-2"
    :class="{
      'bg-white/90 border-stone-200 text-stone-800 hover:bg-sky-50 hover:border-sky-300 cursor-pointer active:scale-95': state === 'idle',
      'bg-sky-100 border-sky-400 text-stone-800 ring-2 ring-sky-300 scale-105 cursor-pointer': state === 'focused',
      'bg-meadow-100 border-meadow-400 text-meadow-800 ring-2 ring-meadow-300 scale-105': state === 'correct',
      'bg-coral-100 border-coral-400 text-coral-800 scale-95': state === 'incorrect',
      'bg-stone-100 border-stone-200 text-stone-400 cursor-default': state === 'dimmed',
      'bg-meadow-200 border-meadow-500 text-meadow-900 ring-2 ring-meadow-400 scale-105 font-bold': state === 'target',
    }"
    :disabled="disabled"
    @click="handleTap"
  >
    {{ word }}
  </button>
</template>
