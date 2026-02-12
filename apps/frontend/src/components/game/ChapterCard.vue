<script setup lang="ts">
/**
 * ChapterCard — Carte de chapitre réutilisable
 *
 * @description Composant réutilisable pour les cartes de chapitre dans BookView.
 * Remplace les boutons avec pattern répétitif de classes Tailwind.
 *
 * @usage
 * - Utiliser dans BookView pour afficher les chapitres
 * - Gère les étoiles, le badge recommandé, et les couleurs selon le livre
 * - Voir docs/component-patterns.md pour plus d'exemples
 *
 * @example
 * <ChapterCard
 *   title="Chapitre 1"
 *   narrative="Introduction..."
 *   :stars="2"
 *   :max-stars="3"
 *   :is-recommended="true"
 *   color-variant="sky"
 *   @click="handleClick"
 * />
 */
import { StarFilledIcon, StarEmptyIcon, SparkleIcon } from '@/components/icons';

const props = defineProps<{
  title: string;
  narrative: string;
  stars: number;
  maxStars: number;
  isRecommended: boolean;
  colorVariant: 'sky' | 'meadow' | 'gold' | 'coral' | 'moss' | 'dawn';
}>();

defineEmits<{
  click: [];
}>();

const colorClasses: Record<string, { border: string; glow: string; title: string; narrative: string }> = {
  sky: { border: 'border-sky-400/40', glow: 'shadow-sky-400/40', title: 'text-sky-700', narrative: 'text-sky-600/80' },
  meadow: { border: 'border-meadow-400/40', glow: 'shadow-meadow-400/40', title: 'text-meadow-700', narrative: 'text-meadow-600/80' },
  gold: { border: 'border-gold-400/40', glow: 'shadow-gold-400/40', title: 'text-gold-600', narrative: 'text-gold-500/80' },
  coral: { border: 'border-coral-400/40', glow: 'shadow-coral-400/40', title: 'text-coral-700', narrative: 'text-coral-600/80' },
  moss: { border: 'border-moss-400/40', glow: 'shadow-moss-400/40', title: 'text-moss-700', narrative: 'text-moss-600/80' },
  dawn: { border: 'border-gold-400/40', glow: 'shadow-gold-400/40', title: 'text-gold-600', narrative: 'text-gold-500/80' },
};

const colors = colorClasses[props.colorVariant] ?? colorClasses.sky;
</script>

<template>
  <button
    class="chapter-card w-full p-6 rounded-2xl border-2 shadow-md transition-all texture-notebook"
    :class="[
      'bg-white/95',
      colors.border,
      isRecommended ? `shadow-lg ${colors.glow} ring-2 ring-gold-400/50` : '',
    ]"
    @click="$emit('click')"
  >
    <!-- Sticker débloqué (3 étoiles) -->
    <div 
      v-if="stars === 3"
      class="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center shadow-lg border-2 border-white rotate-12 z-10"
    >
      <SparkleIcon :size="20" class="text-white" />
    </div>

    <div class="flex items-center justify-between gap-4">
      <div class="flex-1 text-left">
        <h3 class="text-lg font-bold" :class="colors.title">{{ title }}</h3>
        <p class="text-sm mt-1" :class="colors.narrative">{{ narrative }}</p>
      </div>

      <!-- Étoiles -->
      <div class="flex items-center gap-0.5 shrink-0">
        <template v-for="i in maxStars" :key="i">
          <StarFilledIcon
            v-if="i <= stars"
            :size="24"
            class="text-gold-400"
          />
          <StarEmptyIcon
            v-else
            :size="24"
            class="text-stone-400"
          />
        </template>
      </div>
    </div>

    <!-- Badge recommandé -->
    <div
      v-if="isRecommended"
      class="mt-3 flex justify-center"
    >
      <span class="inline-block px-6 py-2 rounded-full bg-gold-400 text-stone-900 font-bold text-sm shadow-lg shadow-gold-400/30">
        Jouer
      </span>
    </div>
  </button>
</template>
