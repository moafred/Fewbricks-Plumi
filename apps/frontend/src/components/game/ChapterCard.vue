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
import { StarFilledIcon, StarEmptyIcon } from '@/components/icons';

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

const colorClasses: Record<string, { bg: string; border: string; glow: string }> = {
  sky: { bg: 'bg-sky-100/95', border: 'border-sky-400/40', glow: 'shadow-sky-400/40' },
  meadow: { bg: 'bg-meadow-100/95', border: 'border-meadow-400/40', glow: 'shadow-meadow-400/40' },
  gold: { bg: 'bg-gold-100/95', border: 'border-gold-400/40', glow: 'shadow-gold-400/40' },
  coral: { bg: 'bg-coral-100/95', border: 'border-coral-400/40', glow: 'shadow-coral-400/40' },
  moss: { bg: 'bg-moss-100/95', border: 'border-moss-400/40', glow: 'shadow-moss-400/40' },
  dawn: { bg: 'bg-gold-100/95', border: 'border-gold-400/40', glow: 'shadow-gold-400/40' },
};

const colors = colorClasses[props.colorVariant] ?? colorClasses.sky;
</script>

<template>
  <button
    class="chapter-card w-full p-6 rounded-2xl border-2 shadow-[0_8px_16px_rgba(0,0,0,0.3)] transition-all active:scale-[0.98] texture-notebook"
    :class="[
      colors.bg,
      colors.border,
      isRecommended ? `shadow-lg ${colors.glow} ring-2 ring-gold-400/50` : '',
    ]"
    @click="$emit('click')"
  >
    <div class="flex items-center justify-between gap-4">
      <div class="flex-1 text-left">
        <h3 class="text-lg font-bold text-gold-200 drop-shadow-md">{{ title }}</h3>
        <p class="text-sm text-gold-100 mt-1 drop-shadow-md">{{ narrative }}</p>
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
