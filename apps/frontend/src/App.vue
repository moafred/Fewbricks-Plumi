<script setup lang="ts">
import { ref, computed } from 'vue';
import HomeScreen from '@/components/game/HomeScreen.vue';
import BookShelf from '@/components/game/BookShelf.vue';
import BookView from '@/components/game/BookView.vue';
import BookLessonScreen from '@/components/game/BookLessonScreen.vue';
import ChapterRunner from '@/components/game/ChapterRunner.vue';
import { useBiome } from '@/composables';

type Screen = 'home' | 'bookshelf' | 'book-view' | 'book-lesson' | 'chapter-runner';

const screen = ref<Screen>('home');
const selectedBookId = ref<number>(1);

// Biome actif selon l'ecran : parchment pour home, biome du livre pour book-view/book-lesson
const activeBookId = computed(() =>
  screen.value === 'book-view' || screen.value === 'book-lesson'
    ? selectedBookId.value
    : null,
);
const { bgClass } = useBiome(activeBookId);

// Fond parchment pour home, biome du livre sinon
const screenBgClass = computed(() =>
  screen.value === 'home' ? 'biome-parchment' : bgClass.value,
);

const selectedChapterId = ref<number>(1);

function onSelectBook(bookId: number) {
  selectedBookId.value = bookId;
  screen.value = 'book-view';
}

function onOpenLesson(bookId: number) {
  selectedBookId.value = bookId;
  screen.value = 'book-lesson';
}

function onPlayChapter(chapterId: number) {
  selectedChapterId.value = chapterId;
  screen.value = 'chapter-runner';
}

function onChapterComplete() {
  screen.value = 'book-view';
}
</script>

<template>
  <div class="min-h-screen text-stone-800 transition-[background] duration-700" :class="screenBgClass">
    <!-- Home screen — matieres -->
    <HomeScreen
      v-if="screen === 'home'"
      @select-subject="screen = 'bookshelf'"
    />

    <!-- Bookshelf screen — cahiers -->
    <BookShelf
      v-else-if="screen === 'bookshelf'"
      @home="screen = 'home'"
      @select-book="onSelectBook"
    />

    <!-- Book view -->
    <BookView
      v-else-if="screen === 'book-view'"
      :book-id="selectedBookId"
      @back="screen = 'bookshelf'"
      @play-chapter="onPlayChapter"
      @open-lesson="onOpenLesson"
    />

    <!-- Book lesson -->
    <BookLessonScreen
      v-else-if="screen === 'book-lesson'"
      :book-id="selectedBookId"
      @back="screen = 'book-view'"
    />

    <!-- Chapter runner -->
    <ChapterRunner
      v-else-if="screen === 'chapter-runner'"
      :key="selectedChapterId"
      :chapter-id="selectedChapterId"
      @home="screen = 'book-view'"
      @chapter-complete="onChapterComplete"
    />
  </div>
</template>
