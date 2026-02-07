<script setup lang="ts">
import { computed } from 'vue';
import { BOOKS, getChaptersForBook } from '@plumi/shared';
import { useChapterProgressStore } from '@/stores/chapter-progress';
import PlumiMascot from '@/components/game/PlumiMascot.vue';
import PlumiVariants from '@/components/game/PlumiVariants.vue';
import SubjectCard from '@/components/game/SubjectCard.vue';
import { BookIcon } from '@/components/icons';

defineEmits<{
  'select-subject': [subject: string];
}>();

const progress = useChapterProgressStore();

// Calcul des etoiles totales pour la matiere Francais (tous les livres)
const totalStars = computed(() =>
  BOOKS.reduce((sum, book) => {
    const chapters = getChaptersForBook(book.id);
    return sum + chapters.reduce((s, ch) => s + progress.getStars(ch.id), 0);
  }, 0),
);

const maxStars = computed(() =>
  BOOKS.reduce((sum, book) => {
    const chapters = getChaptersForBook(book.id);
    return sum + chapters.length * 3;
  }, 0),
);

// Affichage simplifie : 5 etoiles proportionnelles a la progression globale
const displayStars = computed(() => {
  if (maxStars.value === 0) return 0;
  return Math.round((totalStars.value / maxStars.value) * 5);
});
</script>

<template>
  <div class="home-screen flex flex-col min-h-screen p-6 gap-8">
    <!-- Header — Logo Plumi -->
    <header class="flex items-center gap-3 pt-4">
      <PlumiMascot state="idle" size="sm" />
      <h1 class="text-4xl font-bold text-sky-600">
        Plumi
      </h1>
    </header>

    <!-- Preview des variantes Plumi (temporaire) -->
    <PlumiVariants />

    <!-- Grille des matieres -->
    <main class="flex-1 flex items-center justify-center px-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-lg">
        <!-- Francais — actif -->
        <SubjectCard
          title="Francais"
          color="sky"
          :stars="displayStars"
          :max-stars="5"
          :locked="false"
          @select="$emit('select-subject', 'francais')"
        >
          <BookIcon :size="64" class="text-sky-500" />
        </SubjectCard>

        <!-- Mathematiques — verrouille -->
        <SubjectCard
          title="Maths"
          color="meadow"
          :stars="0"
          :max-stars="5"
          :locked="true"
          locked-label="Bientôt"
        >
          <div class="text-5xl text-meadow-400">
            123
          </div>
        </SubjectCard>
      </div>
    </main>
  </div>
</template>
