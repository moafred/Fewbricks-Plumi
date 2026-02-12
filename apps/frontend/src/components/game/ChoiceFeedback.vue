<script setup lang="ts">
import CelebrationParticles from '@/components/ui/CelebrationParticles.vue';

/**
 * ChoiceFeedback — Feedback visuel superposé pour les boutons de choix
 */
defineProps<{
  active: boolean;
  variant?: 'rounded' | 'full';
}>();
</script>

<template>
  <template v-if="active">
    <span
      class="pointer-events-none absolute inset-0 border-2 border-meadow-400 z-20"
      :class="variant === 'full' ? 'rounded-full' : 'rounded-2xl'"
      style="animation: celebration-ring 0.6s ease-out forwards"
    />
    <CelebrationParticles :count="10" color="gold-400" />
  </template>
</template>
