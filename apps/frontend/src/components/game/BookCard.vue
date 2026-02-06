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
  sky: { icon: 'text-sky-600', bg: 'bg-sky-100/60', border: 'border-sky-300', glow: 'shadow-sky-400/40' },
  meadow: { icon: 'text-meadow-600', bg: 'bg-meadow-100/60', border: 'border-meadow-300', glow: 'shadow-meadow-400/40' },
  gold: { icon: 'text-gold-500', bg: 'bg-gold-100/60', border: 'border-gold-300', glow: 'shadow-gold-400/40' },
  coral: { icon: 'text-coral-500', bg: 'bg-coral-100/60', border: 'border-coral-300', glow: 'shadow-coral-400/40' },
  moss: { icon: 'text-moss-600', bg: 'bg-moss-100/60', border: 'border-moss-300', glow: 'shadow-moss-400/40' },
  dawn: { icon: 'text-gold-500', bg: 'bg-gold-100/60', border: 'border-gold-300', glow: 'shadow-gold-400/40' },
};

const colors = colorClasses[props.book.color] ?? colorClasses.sky;
</script>

<template>
  <button
    class="book-card flex flex-col items-center gap-3 p-6 rounded-2xl border backdrop-blur bg-white/90 shadow-sm transition-all active:scale-[0.98]"
    :class="[
      colors.bg,
      colors.border,
      isLocked ? 'opacity-50 grayscale' : 'cursor-pointer',
      isRecommended ? `shadow-lg ${colors.glow} ring-2 ring-gold-400/50 animate-pulse-slow` : '',
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
        class="absolute -top-1 -right-2 text-gold-400"
        aria-label="Bonus"
      />
    </div>

    <!-- Titre -->
    <h3 class="text-lg font-bold text-center" :class="colors.icon">
      {{ book.title }}
    </h3>

    <!-- Sous-titre -->
    <p class="text-sm text-stone-500 text-center">
      {{ book.subtitle }}
    </p>

    <!-- Étoiles de progression -->
    <div class="flex items-center gap-0.5">
      <template v-for="i in maxStars" :key="i">
        <StarFilledIcon
          v-if="i <= stars"
          :size="16"
          class="text-gold-400"
        />
        <StarEmptyIcon
          v-else
          :size="16"
          class="text-stone-300"
        />
      </template>
    </div>

    <!-- Badge état -->
    <span
      v-if="stars >= maxStars"
      class="text-xs px-2 py-0.5 rounded-full bg-meadow-100 text-meadow-700 font-bold"
    >
      Terminé
    </span>
    <span
      v-else-if="stars > 0"
      class="text-xs px-2 py-0.5 rounded-full bg-gold-100 text-gold-600 font-bold"
    >
      En cours
    </span>
    <span
      v-else-if="isLocked"
      class="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500"
    >
      Verrouillé
    </span>
  </button>
</template>
