<script setup lang="ts">
import { computed } from 'vue';

/**
 * ProgressPath — Chemin illustré de progression
 *
 * @description Composant pour afficher un chemin de progression avec points de contrôle.
 * Remplace les lignes simples dans BookView par un chemin illustré animé.
 *
 * @usage
 * - Utiliser pour afficher la progression des chapitres/étapes
 * - Points de contrôle avec états (completed, current)
 * - Animation de progression automatique
 * - Voir docs/component-patterns.md pour plus d'exemples
 *
 * @example
 * <ProgressPath :steps="steps" color="sky-400" />
 */
export interface ProgressStep {
  id: number;
  completed: boolean;
  current: boolean;
}

const props = withDefaults(
  defineProps<{
    steps: ProgressStep[];
    color?: 'sky-400' | 'meadow-400' | 'gold-400' | 'coral-400';
  }>(),
  { color: 'sky-400' }
);

const stepHeight = computed(() => 100 / Math.max(props.steps.length - 1, 1));

const colorClasses = {
  'sky-400': {
    bg: 'bg-sky-400',
    border: 'border-sky-400',
    line: 'bg-sky-400',
  },
  'meadow-400': {
    bg: 'bg-meadow-400',
    border: 'border-meadow-400',
    line: 'bg-meadow-400',
  },
  'gold-400': {
    bg: 'bg-gold-400',
    border: 'border-gold-400',
    line: 'bg-gold-400',
  },
  'coral-400': {
    bg: 'bg-coral-400',
    border: 'border-coral-400',
    line: 'bg-coral-400',
  },
};

const colors = computed(() => colorClasses[props.color]);
</script>

<template>
  <div class="progress-path flex flex-col items-center relative">
    <template v-for="(step, index) in steps" :key="step.id">
      <!-- Point de contrôle -->
      <div
        class="relative z-10 rounded-full border-4 transition-all w-6 h-6"
        :class="[
          step.completed || step.current
            ? `${colors.bg} ${colors.border}`
            : 'bg-stone-300 border-stone-400',
          step.current ? 'ring-4 ring-gold-300/50 animate-pulse-slow' : '',
        ]"
      />

      <!-- Ligne de connexion (sauf pour le dernier) -->
      <div
        v-if="index < steps.length - 1"
        class="w-1 transition-all"
        :style="{ height: `${stepHeight}%` }"
        :class="step.completed ? colors.line : 'bg-stone-200'"
      />
    </template>
  </div>
</template>
