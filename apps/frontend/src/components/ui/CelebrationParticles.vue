<script setup lang="ts">
import { computed } from 'vue';

/**
 * CelebrationParticles — Particules animées pour célébrations
 *
 * @description Composant réutilisable pour les animations de particules lors des célébrations.
 * À utiliser pour feedback visuel positif (bonne réponse, succès).
 *
 * @usage
 * - Utiliser dans les mini-jeux pour célébrer les bonnes réponses
 * - Peut être intégré dans PlumiMascot ou utilisé indépendamment
 * - Voir docs/component-patterns.md pour plus d'exemples
 *
 * @example
 * <CelebrationParticles count="12" color="gold-400" />
 */
const props = withDefaults(
  defineProps<{
    count?: number;
    color?: string;
    duration?: number;
  }>(),
  { count: 8, color: 'gold-400', duration: 500 }
);

const particles = computed(() => Array.from({ length: props.count }, (_, i) => i));

const colorClassMap: Record<string, string> = {
  'gold-400': 'bg-gold-400',
  'meadow-400': 'bg-meadow-400',
  'coral-400': 'bg-coral-400',
  'sky-400': 'bg-sky-400',
};

const colorClass = computed(() => colorClassMap[props.color] ?? 'bg-gold-400');

function getParticleStyle(index: number, total: number): Record<string, string> {
  const angle = (index * 2 * Math.PI) / total;
  const distance = 60;
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance;

  return {
    '--dx': `${dx}px`,
    '--dy': `${dy}px`,
    animation: `celebration-particle ${props.duration}ms ease-out forwards`,
    animationDelay: `${index * 25}ms`,
  };
}
</script>

<template>
  <span
    v-for="i in particles"
    :key="i"
    class="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
    :class="colorClass"
    :style="getParticleStyle(i, props.count)"
  />
</template>
