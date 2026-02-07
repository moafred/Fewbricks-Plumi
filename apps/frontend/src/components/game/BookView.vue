<script setup lang="ts">
import { computed } from 'vue';
import type { Book, Chapter } from '@plumi/shared';
import { BOOKS, getChaptersForBook } from '@plumi/shared';
import { useChapterProgressStore } from '@/stores/chapter-progress';
import NotebookButton from '@/components/ui/NotebookButton.vue';
import ChapterCard from '@/components/game/ChapterCard.vue';
import LessonCard from '@/components/game/LessonCard.vue';
import { HomeIcon } from '@/components/icons';

const props = defineProps<{
  bookId: number;
}>();

const emit = defineEmits<{
  back: [];
  'play-chapter': [chapterId: number];
  'open-lesson': [bookId: number];
}>();

const progressStore = useChapterProgressStore();

const book = computed<Book | undefined>(() => BOOKS.find((b) => b.id === props.bookId));
const chapters = computed<Chapter[]>(() => getChaptersForBook(props.bookId));

const colorAccentClasses: Record<string, string> = {
  sky: 'text-sky-600',
  meadow: 'text-meadow-600',
  gold: 'text-gold-500',
  coral: 'text-coral-500',
  moss: 'text-moss-600',
  dawn: 'text-gold-500',
};

const accentColor = computed(() => colorAccentClasses[book.value?.color ?? 'sky']);

function chapterStars(chapterId: number): number {
  return progressStore.getStars(chapterId);
}

function isRecommended(chapterId: number): boolean {
  return progressStore.recommendedChapterId === chapterId;
}

function getConnectionLineColor(chapterId: number): string {
  if (chapterStars(chapterId) > 0) {
    const colorMap: Record<string, string> = {
      sky: 'bg-sky-400',
      meadow: 'bg-meadow-400',
      gold: 'bg-gold-400',
      coral: 'bg-coral-400',
      moss: 'bg-moss-400',
      dawn: 'bg-gold-400',
    };
    return colorMap[book.value?.color ?? 'sky'] ?? 'bg-sky-400';
  }
  return 'bg-stone-200';
}
</script>

<template>
  <div v-if="book" class="book-view flex flex-col min-h-screen p-6 gap-8">
    <!-- Header -->
    <header class="flex items-center gap-4">
      <NotebookButton
        variant="icon"
        aria-label="Retour aux livres"
        @click="$emit('back')"
      >
        <HomeIcon :size="28" class="text-sky-200" />
      </NotebookButton>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold drop-shadow-lg" :class="accentColor">
          {{ book.title }}
        </h1>
        <p class="text-sm text-stone-500 drop-shadow-md">{{ book.subtitle }}</p>
      </div>
    </header>

    <!-- Chemin des chapitres -->
    <main class="flex-1 flex flex-col items-center gap-6 py-4">
      <!-- Carte leçon en haut du chemin -->
      <div class="flex flex-col items-center gap-3 w-full max-w-md">
        <LessonCard
          :color-variant="(book?.color ?? 'sky') as 'sky' | 'meadow' | 'gold' | 'coral' | 'moss' | 'dawn'"
          @click="$emit('open-lesson', book!.id)"
        />

        <!-- Ligne de connexion vers le premier chapitre -->
        <div
          class="w-1 h-8 rounded-full bg-stone-200"
        />
      </div>

      <div
        v-for="(chapter, index) in chapters"
        :key="chapter.id"
        class="flex flex-col items-center gap-3 w-full max-w-md"
      >
        <!-- Ligne de connexion -->
        <div
          v-if="index > 0"
          class="w-1 h-8 rounded-full transition-all"
          :class="getConnectionLineColor(chapter.id)"
        />

        <!-- Carte chapitre -->
        <ChapterCard
          :title="chapter.title"
          :narrative="chapter.narrative"
          :stars="chapterStars(chapter.id)"
          :max-stars="3"
          :is-recommended="isRecommended(chapter.id)"
          :color-variant="(book?.color ?? 'sky') as 'sky' | 'meadow' | 'gold' | 'coral' | 'moss' | 'dawn'"
          @click="$emit('play-chapter', chapter.id)"
        />
      </div>
    </main>
  </div>
</template>
