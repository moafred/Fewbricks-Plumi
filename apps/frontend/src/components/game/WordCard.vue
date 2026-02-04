<script setup lang="ts">
import { computed } from 'vue';
import { elide, type GamePhase } from '@plumi/shared';

const props = defineProps<{
  pronoun: string;
  form: string;
  phase: GamePhase;
  separator?: string;
}>();

const display = computed(() =>
  props.separator !== undefined
    ? `${props.pronoun} ${props.separator} ${props.form}`
    : elide(props.pronoun, props.form),
);
</script>

<template>
  <div
    class="word-card flex items-center justify-center rounded-3xl bg-white/10 backdrop-blur px-10 md:px-14 py-8 md:py-10 border border-white/10 shadow-lg"
    :class="{
      'animate-celebrate': phase === 'discovery',
    }"
  >
    <span class="text-4xl md:text-6xl font-bold text-amber-200 font-learning drop-shadow-md">{{ display }}</span>
  </div>
</template>
