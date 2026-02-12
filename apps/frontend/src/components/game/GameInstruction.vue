<script setup lang="ts">
/**
 * GameInstruction — Texte d'instruction unifié avec gestion des phases
 */
defineProps<{
  phase: string;
  lastResult?: string | null;
  discovery?: string;
  challenge: string;
  correctAnswer?: string;
}>();
</script>

<template>
  <p class="text-xl md:text-2xl font-bold text-stone-700 text-center drop-shadow-sm min-h-[2rem] flex items-center justify-center">
    <template v-if="phase === 'discovery'">{{ discovery ?? 'Regarde bien...' }}</template>
    <template v-else-if="phase === 'challenge'">{{ challenge }}</template>
    <template v-else-if="lastResult === 'correct'">Bien joué !</template>
    <template v-else>
      <slot name="incorrect">
        C'était <strong class="text-meadow-600 ml-2">{{ correctAnswer }}</strong>
      </slot>
    </template>
  </p>
</template>
