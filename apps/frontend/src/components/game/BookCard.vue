<script setup lang="ts">
import type { Book } from '@plumi/shared';
import { BookIcon, StarFilledIcon, StarEmptyIcon } from '@/components/icons';

const props = defineProps<{
  book: Book;
  stars: number;
  maxStars: number;
  isRecommended: boolean;
  isLocked: boolean;
}>();

defineEmits<{
  select: [bookId: number];
}>();

const colorClasses: Record<string, { icon: string; bg: string; border: string; glow: string }> = {
  royal: { icon: 'text-royal-400', bg: 'bg-royal-500/20', border: 'border-royal-400/30', glow: 'shadow-royal-400/40' },
  enchant: { icon: 'text-enchant-400', bg: 'bg-enchant-500/20', border: 'border-enchant-400/30', glow: 'shadow-enchant-400/40' },
  magic: { icon: 'text-magic-400', bg: 'bg-magic-500/20', border: 'border-magic-400/30', glow: 'shadow-magic-400/40' },
  gentle: { icon: 'text-gentle-400', bg: 'bg-gentle-500/20', border: 'border-gentle-400/30', glow: 'shadow-gentle-400/40' },
  forest: { icon: 'text-forest-400', bg: 'bg-forest-500/20', border: 'border-forest-400/30', glow: 'shadow-forest-400/40' },
  dawn: { icon: 'text-magic-400', bg: 'bg-magic-500/20', border: 'border-magic-400/30', glow: 'shadow-magic-400/40' },
};

const colors = colorClasses[props.book.color] ?? colorClasses.royal;
</script>

<template>
  <button
    class="book-card flex flex-col items-center gap-3 p-6 rounded-2xl border backdrop-blur transition-all active:scale-[0.98]"
    :class="[
      colors.bg,
      colors.border,
      isLocked ? 'opacity-50 grayscale' : 'cursor-pointer',
      isRecommended ? `shadow-lg ${colors.glow} ring-2 ring-magic-400/50 animate-pulse-slow` : '',
    ]"
    :disabled="isLocked"
    @click="$emit('select', book.id)"
  >
    <!-- Icône livre + badge bonus -->
    <div class="relative">
      <BookIcon :size="56" :class="colors.icon" />
      <StarFilledIcon
        v-if="book.isBonus"
        :size="20"
        class="absolute -top-1 -right-2 text-magic-400"
        aria-label="Bonus"
      />
    </div>

    <!-- Titre -->
    <h3 class="text-lg font-bold text-center" :class="colors.icon">
      {{ book.title }}
    </h3>

    <!-- Sous-titre -->
    <p class="text-sm text-purple-200 text-center">
      {{ book.subtitle }}
    </p>

    <!-- Étoiles de progression -->
    <div class="flex items-center gap-0.5">
      <template v-for="i in maxStars" :key="i">
        <StarFilledIcon
          v-if="i <= stars"
          :size="16"
          class="text-magic-400"
        />
        <StarEmptyIcon
          v-else
          :size="16"
          class="text-purple-400/30"
        />
      </template>
    </div>

    <!-- Badge état -->
    <span
      v-if="stars >= maxStars"
      class="text-xs px-2 py-0.5 rounded-full bg-enchant-500/30 text-enchant-300 font-bold"
    >
      Terminé
    </span>
    <span
      v-else-if="stars > 0"
      class="text-xs px-2 py-0.5 rounded-full bg-magic-500/30 text-magic-300 font-bold"
    >
      En cours
    </span>
    <span
      v-else-if="isLocked"
      class="text-xs px-2 py-0.5 rounded-full bg-white/10 text-purple-300"
    >
      Verrouillé
    </span>
  </button>
</template>
