<script setup lang="ts">
import { computed } from 'vue';
import { elide, type GamePhase } from '@plumi/shared';
import NotebookCard from '@/components/ui/NotebookCard.vue';

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
  <NotebookCard
    variant="light"
    padding="lg"
    rounded="lg"
    class="word-card flex items-center justify-center px-10 md:px-14 py-8 md:py-10"
    :class="{
      'animate-celebrate': phase === 'discovery',
    }"
  >
    <span class="text-4xl md:text-6xl font-bold text-gold-300 font-learning drop-shadow-md">{{ display }}</span>
  </NotebookCard>
</template>
