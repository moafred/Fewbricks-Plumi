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
    class="word-card flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur px-8 py-6"
    :class="{
      'animate-celebrate': phase === 'discovery',
    }"
  >
    <span class="text-3xl md:text-5xl font-bold text-amber-200 font-learning">{{ display }}</span>
  </div>
</template>
