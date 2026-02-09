<script setup lang="ts">
import { computed } from 'vue';
import { getBooksForSubject, getChaptersForBook } from '@plumi/shared';
import type { Subject } from '@plumi/shared';
import { useChapterProgressStore } from '@/stores/chapter-progress';
import { usePlayerStore } from '@/stores/player';
import SubjectCard from '@/components/game/SubjectCard.vue';
import ChildAvatar from '@/components/game/ChildAvatar.vue';
import { BookIcon } from '@/components/icons';

defineEmits<{
  'select-subject': [subject: string];
  'switch-child': [];
}>();

const progress = useChapterProgressStore();
const playerStore = usePlayerStore();

function computeSubjectStars(subject: Subject) {
  const books = getBooksForSubject(subject);
  const total = books.reduce((sum, book) => {
    const chapters = getChaptersForBook(book.id);
    return sum + chapters.reduce((s, ch) => s + progress.getStars(ch.id), 0);
  }, 0);
  const max = books.reduce((sum, book) => {
    const chapters = getChaptersForBook(book.id);
    return sum + chapters.length * 3;
  }, 0);
  if (max === 0) return 0;
  return Math.round((total / max) * 5);
}

const frenchStars = computed(() => computeSubjectStars('francais'));
const mathStars = computed(() => computeSubjectStars('maths'));
</script>

<template>
  <div class="home-screen flex flex-col min-h-screen p-6">
    <!-- Header — Logo Plumi + avatar enfant -->
    <header class="relative flex justify-center pt-4">
      <!-- Avatar badge — retour au sélecteur d'enfant -->
      <button
        v-if="playerStore.activeChild"
        class="absolute top-4 right-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 hover:bg-white/90 active:scale-95 transition-all shadow-sm cursor-pointer"
        aria-label="Changer de joueur"
        @click="$emit('switch-child')"
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
      <img
        src="/plumi-landing.png"
        alt="Plumi"
        class="h-60 w-auto animate-float"
      />
    </header>

    <!-- Grille des matieres -->
    <main class="flex-1 flex items-center justify-center px-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-lg">
        <!-- Francais -->
        <SubjectCard
          title="Francais"
          color="sky"
          :stars="frenchStars"
          :max-stars="5"
          :locked="false"
          @select="$emit('select-subject', 'francais')"
        >
          <BookIcon :size="64" class="text-sky-500" />
        </SubjectCard>

        <!-- Mathematiques -->
        <SubjectCard
          title="Maths"
          color="meadow"
          :stars="mathStars"
          :max-stars="5"
          :locked="false"
          @select="$emit('select-subject', 'maths')"
        >
          <BookIcon :size="64" class="text-meadow-500" />
        </SubjectCard>
      </div>
    </main>
  </div>
</template>
