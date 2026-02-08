<script setup lang="ts">
import { CategoryIcon } from '@/components/icons';

export type CategoryButtonState = 'idle' | 'waiting' | 'correct' | 'incorrect' | 'reveal';

export type CategoryColorScheme = 'meadow' | 'gold' | 'sky' | 'coral';

const props = defineProps<{
  categoryId: string;
  label: string;
  state: CategoryButtonState;
  focused?: boolean;
  /** Schéma de couleurs (défaut: meadow pour index pair, gold pour impair) */
  colorScheme?: CategoryColorScheme;
}>();

const emit = defineEmits<{
  tap: [categoryId: string];
}>();

function handleTap() {
  if (props.state === 'waiting') {
    emit('tap', props.categoryId);
  }
}
</script>

<template>
  <button
    class="category-button flex flex-col items-center justify-center rounded-full w-32 h-32 md:w-36 md:h-36 text-xl md:text-2xl font-bold transition-all duration-200 select-none border-4"
    :class="[
      // Base color per scheme
      colorScheme === 'gold'
        ? 'bg-gold-300 border-gold-500 text-gold-900'
        : colorScheme === 'sky'
          ? 'bg-sky-300 border-sky-500 text-sky-900'
          : colorScheme === 'coral'
            ? 'bg-coral-300 border-coral-500 text-coral-900'
            : 'bg-meadow-300 border-meadow-500 text-meadow-900',
      // State modifiers
      {
        'opacity-50 cursor-default': state === 'idle',
        'cursor-pointer shadow-lg shadow-stone-300/30 hover:scale-105 active:scale-95':
          state === 'waiting' && !focused,
        'cursor-pointer shadow-xl scale-115 ring-4 ring-gold-400':
          state === 'waiting' && focused,
        'ring-4 ring-meadow-400 scale-110 animate-celebrate': state === 'correct',
        'opacity-60 scale-95': state === 'incorrect',
        'ring-4 ring-stone-400/60': state === 'reveal',
      },
    ]"
    :disabled="state !== 'waiting'"
    @click="handleTap"
  >
    <CategoryIcon :size="40" class="mb-1" />
    <span>{{ label }}</span>
  </button>
</template>
