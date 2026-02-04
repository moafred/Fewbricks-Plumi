<script setup lang="ts">
import type { Tense } from '@plumi/shared';
import { BookIcon, HatIcon, GrimoireIcon, PotionIcon } from '@/components/icons';

export interface BookInfo {
  id: number;
  title: string;
  subtitle: string;
  tense: Tense;
  color: 'royal' | 'enchant' | 'magic' | 'gentle';
  isBonus?: boolean;
}

const props = defineProps<{
  book: BookInfo;
}>();

defineEmits<{
  play: [tense: Tense, game: 'tri-sorcier' | 'grimoire' | 'potion'];
}>();

const colorClasses = {
  royal: {
    icon: 'text-royal-400',
    bg: 'bg-royal-500/20',
    border: 'border-royal-400/30',
    hover: 'hover:bg-royal-500/30',
  },
  enchant: {
    icon: 'text-enchant-400',
    bg: 'bg-enchant-500/20',
    border: 'border-enchant-400/30',
    hover: 'hover:bg-enchant-500/30',
  },
  magic: {
    icon: 'text-magic-400',
    bg: 'bg-magic-500/20',
    border: 'border-magic-400/30',
    hover: 'hover:bg-magic-500/30',
  },
  gentle: {
    icon: 'text-gentle-400',
    bg: 'bg-gentle-500/20',
    border: 'border-gentle-400/30',
    hover: 'hover:bg-gentle-500/30',
  },
};

const colors = colorClasses[props.book.color];
</script>

<template>
  <div
    class="book-card flex flex-col items-center gap-3 p-6 rounded-2xl border backdrop-blur transition-all"
    :class="[colors.bg, colors.border]"
  >
    <!-- Book icon + badge bonus -->
    <div class="relative">
      <BookIcon
        :size="56"
        :class="colors.icon"
      />
      <span
        v-if="book.isBonus"
        class="absolute -top-1 -right-2 text-lg"
        aria-label="Bonus"
      >
        ⭐
      </span>
    </div>

    <!-- Title -->
    <h3
      class="text-lg font-bold text-center"
      :class="colors.icon"
    >
      {{ book.title }}
    </h3>

    <!-- Subtitle (tense) -->
    <p class="text-sm text-purple-200 text-center">
      {{ book.subtitle }}
    </p>

    <!-- Mini-game buttons -->
    <div class="flex gap-3 mt-2">
      <button
        class="mini-game-btn flex flex-col items-center gap-1.5 p-4 md:p-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all min-h-20 md:min-h-0"
        :class="colors.hover"
        :aria-label="`Jouer au Tri du Sorcier - ${book.subtitle}`"
        @click="$emit('play', book.tense, 'tri-sorcier')"
      >
        <HatIcon
          :size="36"
          class="text-magic-300"
        />
        <span class="text-xs font-bold text-purple-100">Tri</span>
      </button>

      <button
        class="mini-game-btn flex flex-col items-center gap-1.5 p-4 md:p-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all min-h-20 md:min-h-0"
        :class="colors.hover"
        :aria-label="`Jouer au Grimoire - ${book.subtitle}`"
        @click="$emit('play', book.tense, 'grimoire')"
      >
        <GrimoireIcon
          :size="36"
          class="text-royal-300"
        />
        <span class="text-xs font-bold text-purple-100">Grimoire</span>
      </button>

      <button
        class="mini-game-btn flex flex-col items-center gap-1.5 p-4 md:p-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all min-h-20 md:min-h-0"
        :class="colors.hover"
        :aria-label="`Jouer à la Potion Magique - ${book.subtitle}`"
        @click="$emit('play', book.tense, 'potion')"
      >
        <PotionIcon
          :size="36"
          class="text-enchant-300"
        />
        <span class="text-xs font-bold text-purple-100">Potion</span>
      </button>
    </div>
  </div>
</template>
