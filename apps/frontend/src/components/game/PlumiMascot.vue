<script setup lang="ts">
import { computed } from 'vue';
import CelebrationParticles from '@/components/ui/CelebrationParticles.vue';

/**
 * PlumiMascot — Mascotte animée Plumi
 *
 * @description Composant de la mascotte Plumi avec 4 états animés différents.
 * Affiche l'image `/plumi-landing.png` avec animations selon l'état.
 *
 * @usage
 * - Utiliser sur l'écran d'accueil
 * - Intégrer dans ChapterRunner pour feedback visuel
 * - États : 'idle', 'challenge', 'celebration', 'encouragement'
 * - Voir docs/component-patterns.md pour plus d'exemples
 *
 * @example
 * <PlumiMascot state="idle" size="md" />
 */
export type PlumiState = 'idle' | 'challenge' | 'celebration' | 'encouragement';

const props = withDefaults(
  defineProps<{
    state?: PlumiState;
    size?: 'sm' | 'md' | 'lg';
  }>(),
  { state: 'idle', size: 'md' }
);

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-32 h-32';
    case 'lg':
      return 'w-64 h-64';
    default:
      return 'w-48 h-48';
  }
});

const animationClass = computed(() => {
  switch (props.state) {
    case 'idle':
      return 'animate-float';
    case 'challenge':
      return 'animate-pulse-slow';
    case 'celebration':
      return 'animate-celebrate';
    case 'encouragement':
      return 'animate-wobble';
    default:
      return '';
  }
});

</script>

<template>
  <div class="relative inline-flex items-center justify-center" :class="sizeClasses">
    <img
      src="/plumi-landing.png"
      alt="Plumi"
      class="w-full h-full object-contain"
      :class="animationClass"
    >

    <!-- Particules de célébration (état celebration uniquement) -->
    <CelebrationParticles
      v-if="state === 'celebration'"
      :count="12"
      color="sky-400"
      class="absolute inset-0 pointer-events-none"
    />
  </div>
</template>
