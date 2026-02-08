<script setup lang="ts">
/**
 * ShelfSection — Section d'étagère regroupant des livres par thématique
 *
 * Affiche un titre coloré avec un compteur d'étoiles agrégé,
 * et un slot pour les BookCards.
 */
import { StarFilledIcon } from '@/components/icons';

defineProps<{
  title: string;
  color: 'sky' | 'meadow' | 'gold' | 'coral' | 'moss' | 'dawn';
  stars: number;
  maxStars: number;
}>();

const colorClasses: Record<string, { text: string; border: string; star: string }> = {
  sky: { text: 'text-sky-600', border: 'border-sky-300', star: 'text-sky-400' },
  meadow: { text: 'text-meadow-600', border: 'border-meadow-300', star: 'text-meadow-400' },
  gold: { text: 'text-gold-600', border: 'border-gold-300', star: 'text-gold-400' },
  coral: { text: 'text-coral-600', border: 'border-coral-300', star: 'text-coral-400' },
  moss: { text: 'text-moss-600', border: 'border-moss-300', star: 'text-moss-400' },
  dawn: { text: 'text-gold-600', border: 'border-gold-300', star: 'text-gold-400' },
};
</script>

<template>
  <section class="flex flex-col gap-4">
    <!-- Header étagère -->
    <div class="flex items-center gap-3">
      <div class="h-px flex-1 border-t" :class="colorClasses[color].border" />
      <h2 class="text-lg font-bold whitespace-nowrap" :class="colorClasses[color].text">
        {{ title }}
      </h2>
      <div class="flex items-center gap-1 shrink-0">
        <StarFilledIcon :size="14" :class="colorClasses[color].star" />
        <span class="text-sm font-semibold" :class="colorClasses[color].text">
          {{ stars }}/{{ maxStars }}
        </span>
      </div>
      <div class="h-px flex-1 border-t" :class="colorClasses[color].border" />
    </div>

    <!-- Grille de livres -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      <slot />
    </div>
  </section>
</template>
