<script setup lang="ts">
import { computed } from 'vue';
import { elide, type GamePhase } from '@plumi/shared';
import NotebookCard from '@/components/ui/NotebookCard.vue';

const props = defineProps<{
  pronoun: string;
  form: string;
  phase: GamePhase;
  separator?: string;
  compact?: boolean;
}>();

const display = computed(() =>
  props.separator !== undefined
    ? `${props.pronoun} ${props.separator} ${props.form}`
    : elide(props.pronoun, props.form),
);
</script>

<template>
  <NotebookCard
    variant="light"
    :padding="compact ? 'sm' : 'lg'"
    rounded="lg"
    class="word-card flex items-center justify-center"
    :class="[
      compact ? 'px-6 py-3' : 'px-10 md:px-14 py-8 md:py-10',
      { 'animate-celebrate': phase === 'discovery' },
    ]"
  >
    <span
      class="font-bold text-stone-800 font-learning"
      :class="compact ? 'text-2xl md:text-4xl' : 'text-4xl md:text-6xl'"
      :data-animate="phase === 'discovery'"
    >{{ display }}</span>
  </NotebookCard>
</template>
