<script setup lang="ts">
import { computed } from 'vue';
import CelebrationParticles from '@/components/ui/CelebrationParticles.vue';

/**
 * PlumiMascot — Mascotte animée Plumi
 *
 * @description Composant de la mascotte Plumi avec 4 états animés différents.
 * Remplace l'image statique `/plumi-landing.png` par une version animée et interactive.
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

const glowClass = computed(() => {
  switch (props.state) {
    case 'challenge':
      return 'drop-shadow-[0_0_30px_rgba(78,171,197,0.5)]';
    case 'celebration':
      return 'drop-shadow-[0_0_40px_rgba(78,171,197,0.7)]';
    case 'encouragement':
      return 'drop-shadow-[0_0_25px_rgba(224,119,97,0.5)]';
    default:
      return 'drop-shadow-[0_0_30px_rgba(78,171,197,0.4)]';
  }
});
</script>

<template>
  <div class="relative inline-block" :class="sizeClasses">
    <!-- Plume Plumi SVG -->
    <svg
      viewBox="0 0 200 200"
      class="w-full h-full"
      :class="[animationClass, glowClass]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Corps de la plume -->
      <path
        d="M 100 20 Q 120 40 130 60 Q 140 80 135 100 Q 130 120 120 140 Q 110 160 100 180 L 100 20 Z"
        fill="url(#plumeGradient)"
        stroke="#5bbfad"
        stroke-width="2"
      />
      <!-- Tige -->
      <line
        x1="100"
        y1="20"
        x2="100"
        y2="180"
        stroke="#2e5a6e"
        stroke-width="3"
        stroke-linecap="round"
      />
      <!-- Barbes de la plume -->
      <path
        d="M 100 40 Q 115 50 120 70"
        stroke="#5bbfad"
        stroke-width="1.5"
        fill="none"
      />
      <path
        d="M 100 60 Q 110 70 115 90"
        stroke="#5bbfad"
        stroke-width="1.5"
        fill="none"
      />
      <path
        d="M 100 80 Q 108 88 110 110"
        stroke="#5bbfad"
        stroke-width="1.5"
        fill="none"
      />
      <!-- Particules lumineuses (pour états challenge/celebration) -->
      <template v-if="state === 'challenge' || state === 'celebration'">
        <circle cx="80" cy="50" r="3" fill="#6dd8c0" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.8;0.2;0.8"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="120" cy="60" r="2" fill="#4eabc5" opacity="0.7">
          <animate
            attributeName="opacity"
            values="0.7;0.1;0.7"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="90" cy="80" r="2.5" fill="#6dd8c0" opacity="0.6">
          <animate
            attributeName="opacity"
            values="0.6;0.2;0.6"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
      </template>
      <!-- Gradient pour la plume — turquoise vers menthe (logo Plumi) -->
      <defs>
        <linearGradient id="plumeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#4eabc5;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#5bbfad;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8fd9b6;stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>

    <!-- Particules de célébration (état celebration uniquement) -->
    <CelebrationParticles
      v-if="state === 'celebration'"
      :count="12"
      color="sky-400"
      class="absolute inset-0 pointer-events-none"
    />
  </div>
</template>
