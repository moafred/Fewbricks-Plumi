<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import BookShelf from '@/components/game/BookShelf.vue';
import BookView from '@/components/game/BookView.vue';
import ChapterRunner from '@/components/game/ChapterRunner.vue';
import PlumiMascot from '@/components/game/PlumiMascot.vue';
import ActionButton from '@/components/ui/ActionButton.vue';
import KeyboardGuide from '@/components/ui/KeyboardGuide.vue';
import { useBiome } from '@/composables';

type Screen = 'home' | 'bookshelf' | 'book-view' | 'chapter-runner';

const screen = ref<Screen>('home');
const selectedBookId = ref<number>(1);

// Biome actif uniquement sur home/bookshelf — en jeu, fond neutre pour la lisibilité
const activeBookId = computed(() =>
  screen.value === 'book-view'
    ? selectedBookId.value
    : null,
);
const { bgClass } = useBiome(activeBookId);
const selectedChapterId = ref<number>(1);

function onSelectBook(bookId: number) {
  selectedBookId.value = bookId;
  screen.value = 'book-view';
}

function onPlayChapter(chapterId: number) {
  selectedChapterId.value = chapterId;
  screen.value = 'chapter-runner';
}

function onChapterComplete() {
  // Le ChapterRunner persiste déjà le score via chapter-progress store
  screen.value = 'book-view';
}

// Global keyboard listener for home screen
function handleGlobalKeydown(e: KeyboardEvent) {
  if (screen.value === 'home' && (e.key === ' ' || e.key === 'Enter')) {
    screen.value = 'bookshelf';
  }
}
onMounted(() => window.addEventListener('keydown', handleGlobalKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleGlobalKeydown));
</script>

<template>
  <div class="min-h-screen text-stone-800 transition-[background] duration-700" :class="bgClass">
    <!-- Home screen -->
    <div
      v-if="screen === 'home'"
      class="flex flex-col items-center justify-center min-h-screen p-8 gap-12 relative overflow-hidden"
    >
      <div class="flex flex-col items-center gap-4">
        <!-- Mascot Plumi -->
        <PlumiMascot state="idle" size="md" />
        <h1 class="text-6xl md:text-8xl font-bold text-sky-600 drop-shadow-lg">
          Plumi
        </h1>
        <p class="text-2xl md:text-3xl text-stone-700 font-medium drop-shadow-sm">
          Apprendre le Français — CE1
        </p>
        <p class="text-lg md:text-xl text-stone-500 font-normal">
          Conjugaison • Grammaire • Orthographe
        </p>
      </div>

      <div class="flex flex-col items-center gap-6">
        <ActionButton
          variant="primary"
          size="lg"
          class="w-64 md:w-80 h-20 md:h-24 !text-3xl"
          @click="screen = 'bookshelf'"
        >
          Jouer
        </ActionButton>

        <!-- Keyboard Hint - Only on Desktop -->
        <div class="hidden lg:flex opacity-60 hover:opacity-100 transition-opacity">
          <KeyboardGuide
            key-name="espace"
            mode="single"
            label="commencer"
          />
        </div>

        <!-- Mobile Hint -->
        <p class="lg:hidden text-sky-600 animate-pulse-slow font-medium">
          Appuie sur le bouton pour commencer
        </p>
      </div>
    </div>

    <!-- Bookshelf screen -->
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
