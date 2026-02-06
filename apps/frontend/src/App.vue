<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import BookShelf from '@/components/game/BookShelf.vue';
import BookView from '@/components/game/BookView.vue';
import ChapterRunner from '@/components/game/ChapterRunner.vue';
import MagicButton from '@/components/ui/MagicButton.vue';
import KeyboardGuide from '@/components/ui/KeyboardGuide.vue';

type Screen = 'home' | 'bookshelf' | 'book-view' | 'chapter-runner';

const screen = ref<Screen>('home');
const selectedBookId = ref<number>(1);
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
  <div class="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 text-white">
    <!-- Home screen -->
    <div
      v-if="screen === 'home'"
      class="flex flex-col items-center justify-center min-h-screen p-8 gap-12 relative overflow-hidden"
    >
      <div class="flex flex-col items-center gap-4">
        <!-- Mascot Plumi -->
        <img
          src="/plumi-landing.png"
          alt="Plumi Mascot"
          class="w-48 md:w-64 h-48 md:h-64 animate-float drop-shadow-[0_0_30px_rgba(251,191,36,0.5)] mb-2 mix-blend-screen"
          style="mask-image: radial-gradient(circle, black 40%, transparent 70%); -webkit-mask-image: radial-gradient(circle, black 40%, transparent 70%);"
        />
        <h1 class="text-6xl md:text-8xl font-bold text-amber-300 drop-shadow-2xl">
          Plumi
        </h1>
        <p class="text-2xl md:text-3xl text-purple-200 font-medium">
          La Plume Magique
        </p>
      </div>

      <div class="flex flex-col items-center gap-6">
        <MagicButton
          variant="primary"
          size="lg"
          class="w-64 md:w-80 h-20 md:h-24 !text-3xl"
          @click="screen = 'bookshelf'"
        >
          Jouer
        </MagicButton>

        <!-- Keyboard Hint - Only on Desktop -->
        <KeyboardGuide
          key-name="espace"
          mode="single"
          label="commencer"
          class="hidden lg:flex opacity-60 hover:opacity-100 transition-opacity"
        />

        <!-- Mobile Hint -->
        <p class="lg:hidden text-purple-300 animate-pulse font-medium">
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
