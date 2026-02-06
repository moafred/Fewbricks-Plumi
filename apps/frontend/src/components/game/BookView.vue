<script setup lang="ts">
import { computed } from 'vue';
import type { Book, Chapter } from '@plumi/shared';
import { BOOKS, getChaptersForBook } from '@plumi/shared';
import { useChapterProgressStore } from '@/stores/chapter-progress';
import { StarFilledIcon, StarEmptyIcon, HomeIcon } from '@/components/icons';

const props = defineProps<{
  bookId: number;
}>();

const emit = defineEmits<{
  back: [];
  'play-chapter': [chapterId: number];
}>();

const progressStore = useChapterProgressStore();

const book = computed<Book | undefined>(() => BOOKS.find((b) => b.id === props.bookId));
const chapters = computed<Chapter[]>(() => getChaptersForBook(props.bookId));

const colorClasses: Record<string, { accent: string; bg: string; border: string; glow: string }> = {
  royal: { accent: 'text-royal-400', bg: 'bg-royal-500/20', border: 'border-royal-400/30', glow: 'shadow-royal-400/40' },
  enchant: { accent: 'text-enchant-400', bg: 'bg-enchant-500/20', border: 'border-enchant-400/30', glow: 'shadow-enchant-400/40' },
  magic: { accent: 'text-magic-400', bg: 'bg-magic-500/20', border: 'border-magic-400/30', glow: 'shadow-magic-400/40' },
  gentle: { accent: 'text-gentle-400', bg: 'bg-gentle-500/20', border: 'border-gentle-400/30', glow: 'shadow-gentle-400/40' },
  forest: { accent: 'text-forest-400', bg: 'bg-forest-500/20', border: 'border-forest-400/30', glow: 'shadow-forest-400/40' },
  dawn: { accent: 'text-magic-400', bg: 'bg-magic-500/20', border: 'border-magic-400/30', glow: 'shadow-magic-400/40' },
};

const colors = computed(() => colorClasses[book.value?.color ?? 'royal']);

function chapterStars(chapterId: number): number {
  return progressStore.getStars(chapterId);
}

function isRecommended(chapterId: number): boolean {
  return progressStore.recommendedChapterId === chapterId;
}
</script>

<template>
  <div v-if="book" class="book-view flex flex-col min-h-screen p-6 gap-8">
    <!-- Header -->
    <header class="flex items-center gap-4">
      <button
        class="p-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
        aria-label="Retour aux livres"
        @click="$emit('back')"
      >
        <HomeIcon :size="28" class="text-royal-200" />
      </button>
      <div>
        <h1 class="text-2xl md:text-3xl font-bold" :class="colors.accent">
          {{ book.title }}
        </h1>
        <p class="text-sm text-royal-200">{{ book.subtitle }}</p>
      </div>
    </header>

    <!-- Chemin des chapitres -->
    <main class="flex-1 flex flex-col items-center gap-6 py-4">
      <div
        v-for="(chapter, index) in chapters"
        :key="chapter.id"
        class="flex flex-col items-center gap-3 w-full max-w-md"
      >
        <!-- Ligne de connexion -->
        <div
          v-if="index > 0"
          class="w-1 h-8 rounded-full"
          :class="chapterStars(chapter.id) > 0 ? colors.accent : 'bg-white/10'"
          :style="chapterStars(chapter.id) > 0 ? {} : {}"
        ></div>

        <!-- Carte chapitre -->
        <button
          class="w-full p-6 rounded-2xl border backdrop-blur transition-all active:scale-[0.98]"
          :class="[
            colors.bg,
            colors.border,
            isRecommended(chapter.id) ? `shadow-lg ${colors.glow} ring-2 ring-magic-400/50` : '',
          ]"
          @click="$emit('play-chapter', chapter.id)"
        >
          <div class="flex items-center justify-between gap-4">
            <div class="flex-1 text-left">
              <h3 class="text-lg font-bold text-white">{{ chapter.title }}</h3>
              <p class="text-sm text-royal-200 mt-1">{{ chapter.narrative }}</p>
            </div>

            <!-- Étoiles -->
            <div class="flex items-center gap-0.5 shrink-0">
              <template v-for="i in 3" :key="i">
                <StarFilledIcon
                  v-if="i <= chapterStars(chapter.id)"
                  :size="24"
                  class="text-magic-400"
                />
                <StarEmptyIcon
                  v-else
                  :size="24"
                  class="text-royal-400/30"
                />
              </template>
            </div>
          </div>

          <!-- Badge recommandé -->
          <div
            v-if="isRecommended(chapter.id)"
            class="mt-3 flex justify-center"
          >
            <span class="inline-block px-6 py-2 rounded-full bg-magic-500 text-white font-bold text-sm shadow-lg shadow-magic-500/30">
              Jouer
            </span>
          </div>
        </button>
      </div>
    </main>
  </div>
</template>
