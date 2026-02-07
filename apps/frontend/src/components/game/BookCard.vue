<script setup lang="ts">
import type { Book } from '@plumi/shared';
import { BookIcon, StarFilledIcon, StarEmptyIcon } from '@/components/icons';
import StatusBadge from '@/components/ui/StatusBadge.vue';

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

const colorClasses: Record<string, { icon: string; border: string; glow: string; rotation: string }> = {
  sky: { icon: 'text-sky-600', border: 'border-sky-400/40', glow: 'shadow-sky-400/40', rotation: 'rotate-1' },
  meadow: { icon: 'text-meadow-600', border: 'border-meadow-400/40', glow: 'shadow-meadow-400/40', rotation: '-rotate-1' },
  gold: { icon: 'text-gold-500', border: 'border-gold-400/40', glow: 'shadow-gold-400/40', rotation: 'rotate-1' },
  coral: { icon: 'text-coral-500', border: 'border-coral-400/40', glow: 'shadow-coral-400/40', rotation: '-rotate-1' },
  moss: { icon: 'text-moss-600', border: 'border-moss-400/40', glow: 'shadow-moss-400/40', rotation: 'rotate-1' },
  dawn: { icon: 'text-gold-500', border: 'border-gold-400/40', glow: 'shadow-gold-400/40', rotation: '-rotate-1' },
};

const colors = colorClasses[props.book.color] ?? colorClasses.sky;
</script>

<template>
  <button
    class="book-card flex flex-col items-center gap-3 p-6 rounded-2xl border-2 shadow-[0_8px_16px_rgba(0,0,0,0.3)] transition-all active:scale-[0.98] texture-notebook"
    :class="[
      'bg-white/95',
      colors.border,
      colors.rotation,
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
    <p class="text-sm text-stone-500 text-center drop-shadow-md">
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
          class="text-stone-400"
        />
      </template>
    </div>

    <!-- Badge état -->
    <StatusBadge v-if="stars >= maxStars" status="completed" />
    <StatusBadge v-else-if="stars > 0" status="in-progress" />
    <StatusBadge v-else-if="isLocked" status="locked" />
  </button>
</template>
