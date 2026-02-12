<script setup lang="ts">
import { computed } from 'vue';
import { getBookLesson } from '@plumi/shared';
import { useRouter } from 'vue-router';
import NarrativeCard from '@/components/game/NarrativeCard.vue';
import ConjugationTable from '@/components/game/ConjugationTable.vue';
import LessonExampleList from '@/components/game/LessonExampleList.vue';
import LessonTip from '@/components/game/LessonTip.vue';
import ScreenLayout from './ScreenLayout.vue';
import ScreenHeader from './ScreenHeader.vue';

const props = defineProps<{
  bookId: number;
  subject?: string;
}>();

const router = useRouter();

const lesson = computed(() => getBookLesson(props.bookId));
</script>

<template>
  <ScreenLayout v-if="lesson" gap="md">
    <!-- Header -->
    <ScreenHeader back-label="Retour au livre" @back="router.back()">
      <h1 class="text-xl md:text-2xl font-bold text-sky-600 drop-shadow-lg">
        {{ lesson.title }}
      </h1>
    </ScreenHeader>

    <!-- Contenu scrollable -->
    <main class="flex-1 flex flex-col items-center gap-8 pb-12 max-w-2xl mx-auto w-full">
      <!-- Intro narrative Plumi -->
      <NarrativeCard
        title="Plumi dit :"
        :text="lesson.introduction"
      />

      <!-- Sections de la leçon -->
      <section
        v-for="(section, index) in lesson.sections"
        :key="index"
        class="w-full flex flex-col gap-4"
      >
        <!-- Titre de section -->
        <h2 class="text-xl md:text-2xl font-bold text-sky-600 font-learning">
          {{ section.title }}
        </h2>

        <!-- Tableau de conjugaison (si verbId + tense) -->
        <ConjugationTable
          v-if="section.verbId && section.tense"
          :verb-id="section.verbId"
          :tense="section.tense"
        />

        <!-- Exemples -->
        <LessonExampleList
          v-if="section.examples.length > 0"
          :examples="section.examples"
        />

        <!-- Astuce mnémonique -->
        <LessonTip
          v-if="section.tip"
          :text="section.tip.text"
        />
      </section>
    </main>
  </ScreenLayout>
</template>
