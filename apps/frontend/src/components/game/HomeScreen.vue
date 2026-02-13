<script setup lang="ts">
import { computed, ref } from 'vue';
import { getBooksForSubject, getChaptersForBook } from '@plumi/shared';
import type { Subject } from '@plumi/shared';
import { useRouter } from 'vue-router';
import { useChapterProgressStore } from '@/stores/chapter-progress';
import { usePlayerStore } from '@/stores/player';
import SubjectCard from '@/components/game/SubjectCard.vue';
import AvatarBadge from '@/components/game/AvatarBadge.vue';
import ParentGuideModal from './ParentGuideModal.vue';
import { BookIcon, SparkleIcon, InfoIcon } from '@/components/icons';
import NotebookButton from '@/components/ui/NotebookButton.vue';
import ScreenLayout from './ScreenLayout.vue';

const router = useRouter();
const progress = useChapterProgressStore();
const playerStore = usePlayerStore();

const showParentGuide = ref(false);

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
  <ScreenLayout gap="none">
    <!-- Header — Logo Plumi + avatar enfant -->
    <header class="relative flex justify-center shrink-0">
      <!-- Parent Guide button (left) -->
      <div class="absolute top-2 left-0 z-10">
        <NotebookButton
          variant="icon"
          aria-label="Guide pour les parents"
          @click="showParentGuide = true"
        >
          <InfoIcon :size="28" class="text-sky-500" />
        </NotebookButton>
      </div>

      <!-- Album badge (moved) -->
      <div class="absolute top-2 left-16 z-10">
        <NotebookButton
          variant="icon"
          aria-label="Mon Album"
          @click="router.push({ name: 'album' })"
        >
          <SparkleIcon :size="28" class="text-gold-400" />
        </NotebookButton>
      </div>

      <!-- Avatar badge — accès à la liste des profils -->
      <AvatarBadge
        v-if="playerStore.activeChild"
        :name="playerStore.activeChild.name"
        :avatar-color="playerStore.activeChild.avatarColor"
        class="absolute top-2 right-0 z-10"
        @click="router.push({ name: 'children' })"
      />
      <!-- Vertical stack for mascot + label -->
      <div class="flex flex-col items-center gap-2">
        <img
          src="/plumi-landing.png"
          alt="Plumi"
          class="h-36 md:h-48 w-auto animate-float"
        />
        <h2 class="text-xl md:text-2xl font-bold text-sky-500/80 font-learning">
          Niveau CE1
        </h2>
      </div>
    </header>

    <!-- Grille des matieres -->
    <main class="flex-1 flex items-center justify-center px-2 min-h-0">
      <div class="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-lg">
        <!-- Francais -->
        <SubjectCard
          title="Français"
          color="sky"
          :stars="frenchStars"
          :max-stars="5"
          :locked="false"
          @select="router.push({ name: 'bookshelf', params: { subject: 'francais' } })"
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
          @select="router.push({ name: 'bookshelf', params: { subject: 'maths' } })"
        >
          <BookIcon :size="64" class="text-meadow-500" />
        </SubjectCard>
      </div>
    </main>

    <!-- Parent Guide Modal -->
    <ParentGuideModal
      :is-open="showParentGuide"
      @close="showParentGuide = false"
    />
  </ScreenLayout>
</template>
