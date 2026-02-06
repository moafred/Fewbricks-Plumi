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
      relative h-16 md:h-20 rounded-2xl text-2xl md:text-3xl font-learning
      transition-all duration-200 border-b-4 active:border-b-0 active:translate-y-1
      flex items-center justify-center overflow-visible
    "
    :class="[
      {
        'bg-night-700/80 text-royal-100 border-royal-500/40 hover:bg-night-600/80 cursor-pointer': state === 'idle',
        'bg-night-700/80 text-royal-100 border-royal-500/40 ring-4 ring-magic-300 z-10': state === 'focused',
        'bg-enchant-900/60 text-enchant-300 border-enchant-500 scale-105': state === 'correct',
        'bg-gentle-900/60 text-gentle-300 border-gentle-500': state === 'incorrect',
        'bg-night-800/40 text-royal-400/50 border-transparent': state === 'dimmed',
      },
      showWobble ? 'animate-wobble' : '',
    ]"
    @click="$emit('select', label)"
  >
    {{ label }}

    <!-- Spell Burst — anneau expansif + 8 particules -->
    <template v-if="showBurst">
      <span
        class="pointer-events-none absolute inset-0 rounded-2xl border-2 border-enchant-400"
        style="animation: spell-ring 0.6s ease-out forwards"
      />
      <span
        v-for="i in 8"
        :key="i"
        class="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-magic-400"
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
