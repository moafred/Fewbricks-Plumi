<script setup lang="ts">
import type { Tense } from '@plumi/shared';
import { type Component } from 'vue';
import { BookIcon, HatIcon, GrimoireIcon, PotionIcon, BridgeIcon, StarFilledIcon } from '@/components/icons';

export type MiniGame = 'tri-sorcier' | 'grimoire' | 'potion' | 'pont-accords' | 'potion-gn';

export interface GameButton {
  game: MiniGame;
  label: string;
}

export interface BookInfo {
  id: number;
  title: string;
  subtitle: string;
  tense?: Tense;
  color: 'royal' | 'enchant' | 'magic' | 'gentle' | 'forest';
  isBonus?: boolean;
  games: GameButton[];
}

const props = defineProps<{
  book: BookInfo;
}>();

defineEmits<{
  play: [tense: Tense | undefined, game: MiniGame];
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
  forest: {
    icon: 'text-forest-400',
    bg: 'bg-forest-500/20',
    border: 'border-forest-400/30',
    hover: 'hover:bg-forest-500/30',
  },
};

const gameIcons: Record<MiniGame, { component: Component; colorClass: string }> = {
  'tri-sorcier': { component: HatIcon, colorClass: 'text-magic-300' },
  'grimoire': { component: GrimoireIcon, colorClass: 'text-royal-300' },
  'potion': { component: PotionIcon, colorClass: 'text-enchant-300' },
  'pont-accords': { component: BridgeIcon, colorClass: 'text-forest-300' },
  'potion-gn': { component: PotionIcon, colorClass: 'text-forest-300' },
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
      <StarFilledIcon
        v-if="book.isBonus"
        :size="20"
        class="absolute -top-1 -right-2 text-magic-400"
        aria-label="Bonus"
      />
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

    <!-- Mini-game buttons — rendu dynamique à partir de book.games -->
    <div class="flex gap-3 mt-2">
      <button
        v-for="gameBtn in book.games"
        :key="gameBtn.game"
        class="mini-game-btn flex flex-col items-center gap-1.5 p-4 md:p-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all min-h-20 md:min-h-0"
        :class="colors.hover"
        :aria-label="`Jouer à ${gameBtn.label} - ${book.subtitle}`"
        @click="$emit('play', book.tense, gameBtn.game)"
      >
        <component
          :is="gameIcons[gameBtn.game].component"
          :size="36"
          :class="gameIcons[gameBtn.game].colorClass"
        />
        <span class="text-xs font-bold text-purple-100">{{ gameBtn.label }}</span>
      </button>
    </div>
  </div>
</template>
