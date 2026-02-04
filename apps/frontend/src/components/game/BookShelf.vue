<script setup lang="ts">
import type { Tense } from '@plumi/shared';
import BookCard, { type BookInfo } from './BookCard.vue';
import { HomeIcon } from '@/components/icons';

defineEmits<{
  home: [];
  play: [tense: Tense, game: 'tri-sorcier' | 'grimoire' | 'potion'];
}>();

const books: BookInfo[] = [
  {
    id: 1,
    title: 'Fondations',
    subtitle: 'Présent',
    tense: 'present',
    color: 'royal',
  },
  {
    id: 2,
    title: 'Prophéties',
    subtitle: 'Futur',
    tense: 'futur',
    color: 'enchant',
  },
  {
    id: 3,
    title: 'Souvenirs',
    subtitle: 'Imparfait',
    tense: 'imparfait',
    color: 'magic',
  },
  {
    id: 4,
    title: 'Le Temps',
    subtitle: 'Bonus',
    tense: 'passe_compose',
    color: 'gentle',
    isBonus: true,
  },
];
</script>

<template>
  <div class="bookshelf flex flex-col min-h-screen p-6 gap-6">
    <!-- Header -->
    <header class="flex items-center gap-4">
      <button
        class="p-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
        aria-label="Retour à l'accueil"
        @click="$emit('home')"
      >
        <HomeIcon
          :size="28"
          class="text-purple-200"
        />
      </button>
      <h1 class="text-2xl md:text-3xl font-bold text-magic-300">
        Livres de Sorts
      </h1>
    </header>

    <!-- Books grid -->
    <main class="flex-1 flex items-center justify-center p-2">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl">
        <BookCard
          v-for="book in books"
          :key="book.id"
          :book="book"
          @play="(tense, game) => $emit('play', tense, game)"
        />
      </div>
    </main>
  </div>
</template>
