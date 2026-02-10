<script setup lang="ts">
import { computed } from 'vue';
import type { Subject, Shelf } from '@plumi/shared';
import { getShelvesForSubject, getChaptersForBook, ALL_BOOKS } from '@plumi/shared';
import { useRouter } from 'vue-router';
import { useChapterProgressStore } from '@/stores/chapter-progress';
import { usePlayerStore } from '@/stores/player';
import BookCard from './BookCard.vue';
import ChildAvatar from './ChildAvatar.vue';
import ShelfSection from './ShelfSection.vue';
import NotebookButton from '@/components/ui/NotebookButton.vue';
import { HomeIcon } from '@/components/icons';

const props = withDefaults(defineProps<{
  subject?: Subject;
}>(), {
  subject: 'francais',
});

const router = useRouter();
const progress = useChapterProgressStore();
const playerStore = usePlayerStore();

const shelves = computed(() => getShelvesForSubject(props.subject));

const shelfTitle = computed(() =>
  props.subject === 'maths' ? 'Mes Cahiers de Maths' : 'Mes Cahiers de Français',
);

function getBook(bookId: number) {
  return ALL_BOOKS.find((b) => b.id === bookId);
}

function bookStars(bookId: number): number {
  const chapters = getChaptersForBook(bookId);
  return chapters.reduce((sum, ch) => sum + progress.getStars(ch.id), 0);
}

function bookMaxStars(bookId: number): number {
  const chapters = getChaptersForBook(bookId);
  return chapters.length * 3;
}

function shelfStars(shelf: Shelf): number {
  return shelf.bookIds.reduce((sum, id) => sum + bookStars(id), 0);
}

function shelfMaxStars(shelf: Shelf): number {
  return shelf.bookIds.reduce((sum, id) => sum + bookMaxStars(id), 0);
}
</script>

<template>
  <div class="bookshelf flex flex-col min-h-screen p-6 gap-6">
    <!-- Header -->
    <header class="flex items-center gap-4">
      <NotebookButton
        variant="icon"
        aria-label="Retour à l'accueil"
        @click="router.push({ name: 'home' })"
      >
        <HomeIcon :size="28" class="text-sky-200" />
      </NotebookButton>
      <h1 class="text-2xl md:text-3xl font-bold text-sky-600 flex-1">
        {{ shelfTitle }}
      </h1>

      <!-- Avatar enfant actif — accès à la liste des profils -->
      <button
        v-if="playerStore.activeChild"
        class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 shadow-sm hover:bg-white/90 active:scale-95 transition-all cursor-pointer"
        aria-label="Gérer les profils"
        @click="router.push({ name: 'children' })"
      >
        <ChildAvatar
          :name="playerStore.activeChild.name"
          :color="playerStore.activeChild.avatarColor"
          size="sm"
        />
        <span class="text-sm font-bold text-stone-600 hidden md:inline">
          {{ playerStore.activeChild.name }}
        </span>
      </button>
    </header>

    <!-- Étagères -->
    <main class="flex-1 flex flex-col gap-8 w-full max-w-5xl mx-auto">
      <ShelfSection
        v-for="shelf in shelves"
        :key="shelf.id"
        :title="shelf.title"
        :color="shelf.color"
        :stars="shelfStars(shelf)"
        :max-stars="shelfMaxStars(shelf)"
      >
        <BookCard
          v-for="bookId in shelf.bookIds"
          :key="bookId"
          :book="getBook(bookId)!"
          :stars="bookStars(bookId)"
          :max-stars="bookMaxStars(bookId)"
          :is-recommended="progress.getRecommendedBookIdForSubject(subject) === bookId"
          :is-locked="!!getBook(bookId)?.isBonus && !progress.isBonusUnlockedForSubject(subject)"
          @select="(id) => router.push({ name: 'book-view', params: { subject: props.subject, bookId: id } })"
        />
      </ShelfSection>
    </main>
  </div>
</template>
