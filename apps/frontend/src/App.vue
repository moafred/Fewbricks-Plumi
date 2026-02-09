<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Subject } from '@plumi/shared';
import WelcomeScreen from '@/components/game/WelcomeScreen.vue';
import ChildSelector from '@/components/game/ChildSelector.vue';
import HomeScreen from '@/components/game/HomeScreen.vue';
import BookShelf from '@/components/game/BookShelf.vue';
import BookView from '@/components/game/BookView.vue';
import BookLessonScreen from '@/components/game/BookLessonScreen.vue';
import ChapterRunner from '@/components/game/ChapterRunner.vue';
import { usePlayerStore } from '@/stores/player';
import { useBookTheme } from '@/composables';

type Screen =
  | 'welcome-onboarding'
  | 'welcome-add-child'
  | 'welcome-replay'
  | 'child-selector'
  | 'home'
  | 'bookshelf'
  | 'book-view'
  | 'book-lesson'
  | 'chapter-runner';

const playerStore = usePlayerStore();

// Flux initial :
// - Pas d'enfants → onboarding obligatoire
// - 1 enfant → home directement (auto-sélection)
// - 2+ enfants → sélecteur
function initialScreen(): Screen {
  if (!playerStore.hasChildren) return 'welcome-onboarding';
  if (playerStore.children.length === 1) {
    playerStore.switchChild(playerStore.children[0].id);
    return 'home';
  }
  return 'child-selector';
}

const screen = ref<Screen>(initialScreen());
const selectedSubject = ref<Subject>('francais');
const selectedBookId = ref<number>(1);

// Thème visuel du livre actif (book-view / book-lesson), blanc sinon
const activeBookId = computed(() =>
  screen.value === 'book-view' || screen.value === 'book-lesson'
    ? selectedBookId.value
    : null,
);
const { bgClass } = useBookTheme(activeBookId);

const selectedChapterId = ref<number>(1);

// --- Onboarding terminé : premier enfant créé ---
function onWelcomeComplete(childId: string) {
  playerStore.switchChild(childId);
  screen.value = 'home';
}

// --- Ajout d'un nouvel enfant (depuis ChildSelector via WelcomeScreen) ---
function onAddChildComplete(childId: string) {
  playerStore.switchChild(childId);
  // Retour au sélecteur pour que le parent voie le nouvel enfant
  screen.value = playerStore.children.length > 1 ? 'child-selector' : 'home';
}

function onSelectChild(childId: string) {
  playerStore.switchChild(childId);
  screen.value = 'home';
}

function onSwitchChild() {
  if (playerStore.children.length <= 1) return;
  screen.value = 'child-selector';
}

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
  <div class="min-h-screen text-stone-800 transition-[background] duration-700" :class="bgClass">
    <!-- Onboarding — premier lancement -->
    <WelcomeScreen
      v-if="screen === 'welcome-onboarding'"
      mode="onboarding"
      @complete="onWelcomeComplete"
    />

    <!-- Ajout d'un enfant (via ChildSelector "+") -->
    <WelcomeScreen
      v-else-if="screen === 'welcome-add-child'"
      mode="onboarding"
      @complete="onAddChildComplete"
    />

    <!-- Replay intro -->
    <WelcomeScreen
      v-else-if="screen === 'welcome-replay'"
      mode="replay"
      @close="screen = 'child-selector'"
    />

    <!-- Sélection d'enfant -->
    <ChildSelector
      v-else-if="screen === 'child-selector'"
      @select="onSelectChild"
      @add-child="screen = 'welcome-add-child'"
      @replay-intro="screen = 'welcome-replay'"
    />

    <!-- Home screen — matieres -->
    <HomeScreen
      v-else-if="screen === 'home'"
      @select-subject="(subject: string) => { selectedSubject = subject as Subject; screen = 'bookshelf'; }"
      @switch-child="onSwitchChild"
    />

    <!-- Bookshelf screen — cahiers -->
    <BookShelf
      v-else-if="screen === 'bookshelf'"
      :subject="selectedSubject"
      @home="screen = 'home'"
      @select-book="onSelectBook"
      @switch-child="onSwitchChild"
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
