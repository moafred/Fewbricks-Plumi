<script setup lang="ts">
import { computed } from 'vue';
import { elide, type GamePhase } from '@plumi/shared';
import NotebookCard from '@/components/ui/NotebookCard.vue';

const props = defineProps<{
  pronoun: string;
  form: string;
  phase: GamePhase;
  /** Présence déclenche le mode empilé : pronom en grand + infinitif en indice */
  separator?: string;
  compact?: boolean;
}>();

const stacked = computed(() => props.separator !== undefined);

const display = computed(() => elide(props.pronoun, props.form));
</script>

<template>
  <NotebookCard
    variant="light"
    :padding="compact ? 'sm' : 'lg'"
    rounded="lg"
    class="word-card flex items-center justify-center"
    :class="[
      compact
        ? 'px-6 py-3'
        : stacked
          ? 'px-8 md:px-12 py-10 md:py-14'
          : 'px-10 md:px-14 py-8 md:py-10',
      { 'animate-celebrate': phase === 'discovery' },
    ]"
  >
    <!-- Mode indice (Ardoise) : étiquette verbe + pronom suivi de tirets -->
    <div
      v-if="stacked"
      class="flex flex-col items-center"
      :class="compact ? 'gap-3' : 'gap-12'"
      :data-animate="phase === 'discovery'"
    >
      <!-- Infinitif en pastille — l'enfant identifie le verbe à conjuguer -->
      <span
        class="rounded-full bg-sky-100 border border-sky-200 text-sky-700 font-semibold"
        :class="compact ? 'text-sm px-3 py-0.5' : 'text-lg md:text-xl px-5 py-1'"
      >Verbe : {{ form }}</span>
      <!-- Pronom + tirets à droite : "je _ _ _" → trouve la suite -->
      <span
        class="font-bold font-learning"
        :class="compact ? 'text-2xl md:text-4xl' : 'text-4xl md:text-6xl'"
      ><span class="text-stone-800">{{ pronoun }}</span>
        <span class="text-sky-300"> _ _ _</span></span>
    </div>
    <!-- Mode élision (TriVerbes) : "je suis", "j'ai" -->
    <span
      v-else
      class="font-bold text-stone-800 font-learning"
      :class="compact ? 'text-2xl md:text-4xl' : 'text-4xl md:text-6xl'"
      :data-animate="phase === 'discovery'"
    >{{ display }}</span>
  </NotebookCard>
</template>
