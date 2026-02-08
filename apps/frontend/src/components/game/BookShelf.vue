<script setup lang="ts">
import { computed } from 'vue';
import type { Subject } from '@plumi/shared';
import { getBooksForSubject, getChaptersForBook } from '@plumi/shared';
import { useChapterProgressStore } from '@/stores/chapter-progress';
import BookCard from './BookCard.vue';
import NotebookButton from '@/components/ui/NotebookButton.vue';
import { HomeIcon } from '@/components/icons';

const props = withDefaults(defineProps<{
  subject?: Subject;
}>(), {
  subject: 'francais',
});

defineEmits<{
  home: [];
  'select-book': [bookId: number];
}>();

const progress = useChapterProgressStore();

const books = computed(() => getBooksForSubject(props.subject));

const shelfTitle = computed(() =>
  props.subject === 'maths' ? 'Mes Cahiers de Maths' : 'Mes Cahiers de Français',
);

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
        {{ shelfTitle }}
      </h1>
    </header>

    <!-- Books grid -->
    <main class="flex-1 flex items-center justify-center p-2">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
        <BookCard
          v-for="book in books"
          :key="book.id"
          :book="book"
          :stars="bookStars(book.id)"
          :max-stars="bookMaxStars(book.id)"
          :is-recommended="progress.getRecommendedBookIdForSubject(subject) === book.id"
          :is-locked="!!book.isBonus && !progress.isBonusUnlockedForSubject(subject)"
          @select="(bookId) => $emit('select-book', bookId)"
        />
      </div>
    </main>
  </div>
</template>
