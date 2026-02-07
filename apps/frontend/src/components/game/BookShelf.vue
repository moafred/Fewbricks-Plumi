<script setup lang="ts">
import { BOOKS, getChaptersForBook } from '@plumi/shared';
import { useChapterProgressStore } from '@/stores/chapter-progress';
import BookCard from './BookCard.vue';
import NotebookButton from '@/components/ui/NotebookButton.vue';
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
      <NotebookButton
        variant="icon"
        aria-label="Retour à l'accueil"
        @click="$emit('home')"
      >
        <HomeIcon :size="28" class="text-sky-200" />
      </NotebookButton>
      <h1 class="text-2xl md:text-3xl font-bold text-sky-600">
        Mes Cahiers de Français
      </h1>
    </header>

    <!-- Books grid -->
    <main class="flex-1 flex items-center justify-center p-2">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
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
