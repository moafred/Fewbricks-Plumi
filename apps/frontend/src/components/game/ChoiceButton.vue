<script setup lang="ts">
import { ref, watch } from 'vue';

export type ChoiceState = 'idle' | 'focused' | 'correct' | 'incorrect' | 'dimmed';

const props = defineProps<{
  label: string;
  state: ChoiceState;
  disabled?: boolean;
}>();

defineEmits<{
  select: [label: string];
}>();

// Spell Burst : anneau + particules sur bonne réponse
const showBurst = ref(false);
// Wobble : secousse douce sur mauvaise réponse
const showWobble = ref(false);

watch(
  () => props.state,
  (newState) => {
    if (newState === 'correct') {
      showBurst.value = true;
      setTimeout(() => (showBurst.value = false), 600);
    }
    if (newState === 'incorrect') {
      showWobble.value = true;
      setTimeout(() => (showWobble.value = false), 500);
    }
  },
);
</script>

<template>
  <button
    :disabled="disabled"
    class="
      relative h-20 md:h-24 rounded-2xl text-2xl md:text-3xl font-learning
      transition-all duration-200 border-b-4 active:border-b-0 active:translate-y-1
      flex items-center justify-center overflow-visible
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

    <!-- Spell Burst — anneau expansif + 8 particules -->
    <template v-if="showBurst">
      <span
        class="pointer-events-none absolute inset-0 rounded-2xl border-2 border-meadow-400"
        style="animation: spell-ring 0.6s ease-out forwards"
      />
      <span
        v-for="i in 8"
        :key="i"
        class="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-gold-400"
        :style="{
          '--dx': `${Math.cos((i * Math.PI) / 4) * 48}px`,
          '--dy': `${Math.sin((i * Math.PI) / 4) * 48}px`,
          animation: 'spell-particle 0.5s ease-out forwards',
          animationDelay: `${i * 25}ms`,
        }"
      />
    </template>
  </button>
</template>
