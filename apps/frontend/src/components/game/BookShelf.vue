<script setup lang="ts">
import { BOOKS, getChaptersForBook } from '@plumi/shared';
import { useChapterProgressStore } from '@/stores/chapter-progress';
import BookCard from './BookCard.vue';
import { HomeIcon } from '@/components/icons';

defineEmits<{
  home: [];
  'select-book': [bookId: number];
}>();

const progress = useChapterProgressStore();

function bookStars(bookId: number): number {
  const chapters = getChaptersForBook(bookId);
  return chapters.reduce((sum, ch) => sum + progress.getStars(ch.id), 0);
}

function bookMaxStars(bookId: number): number {
  const chapters = getChaptersForBook(bookId);
  return chapters.length * 3;
}
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
        <HomeIcon :size="28" class="text-purple-200" />
      </button>
      <h1 class="text-2xl md:text-3xl font-bold text-magic-300">
        Livres de Sorts
      </h1>
    </header>

    <!-- Books grid -->
    <main class="flex-1 flex items-center justify-center p-2">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl">
        <BookCard
          v-for="book in BOOKS"
          :key="book.id"
          :book="book"
          :stars="bookStars(book.id)"
          :max-stars="bookMaxStars(book.id)"
          :is-recommended="progress.recommendedBookId === book.id"
          :is-locked="!!book.isBonus && !progress.isBonusUnlocked"
          @select="(bookId) => $emit('select-book', bookId)"
        />
      </div>
    </main>
  </div>
</template>
