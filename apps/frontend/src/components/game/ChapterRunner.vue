<script setup lang="ts">
import { ref, computed, watch, onUnmounted, type Component } from 'vue';
import type { StepMechanic, AnswerResult, Tense } from '@plumi/shared';
import { getChapter } from '@plumi/shared';
import { useChapterProgressStore } from '@/stores/chapter-progress';
import { useBackNavigation } from '@/composables';
import ChapterResult from './ChapterResult.vue';
import TriVerbesGame from './TriVerbesGame.vue';
import GrimoireGame from './GrimoireGame.vue';
import PotionGame from './PotionGame.vue';
import PontAccordsGame from './PontAccordsGame.vue';
import PotionGnGame from './PotionGnGame.vue';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import CrossIcon from '@/components/icons/CrossIcon.vue';
import NotebookBadge from '@/components/ui/NotebookBadge.vue';
import NotebookButton from '@/components/ui/NotebookButton.vue';

const props = defineProps<{
  chapterId: number;
}>();

const emit = defineEmits<{
  home: [];
  'chapter-complete': [payload: { chapterId: number; score: number; total: number; stars: number }];
}>();

const chapter = computed(() => getChapter(props.chapterId));
const progressStore = useChapterProgressStore();

// Mapping mécanique -> composant
const mechanicComponents: Record<StepMechanic, Component> = {
  'tri-verbes': TriVerbesGame,
  'grimoire': GrimoireGame,
  'potion': PotionGame,
  'pont-accords': PontAccordsGame,
  'potion-gn': PotionGnGame,
};

// --- State ---
const currentStepIndex = ref(0);
const stepScores = ref<{ score: number; total: number }[]>([]);
const showingNarrative = ref(true);
const showingResult = ref(false);
// Clé pour forcer le re-mount du composant mini-jeu entre les étapes
const stepKey = ref(0);

// --- Getters ---
const steps = computed(() => chapter.value?.steps ?? []);
const currentStep = computed(() => steps.value[currentStepIndex.value] ?? null);
const currentComponent = computed(() => {
  if (!currentStep.value) return null;
  return mechanicComponents[currentStep.value.mechanic];
});

// Résoudre le tense pour le composant enfant
const stepTense = computed<Tense>(() => {
  const t = chapter.value?.tense;
  if (!t || t === 'mixed') return 'present';
  return t;
});

// Progression visuelle
const totalScore = computed(() => stepScores.value.reduce((sum, s) => sum + s.score, 0));
const totalQuestions = computed(() => stepScores.value.reduce((sum, s) => sum + s.total, 0));

function computeStars(score: number, total: number): number {
  if (total === 0) return 1;
  const ratio = score / total;
  if (ratio >= 0.9) return 3;
  if (ratio >= 0.7) return 2;
  return 1;
}

const stars = computed(() => computeStars(totalScore.value, totalQuestions.value));

// --- Narrative timer ---
let narrativeTimer: ReturnType<typeof setTimeout> | null = null;

function clearNarrativeTimer() {
  if (narrativeTimer !== null) {
    clearTimeout(narrativeTimer);
    narrativeTimer = null;
  }
}

function startNarrative() {
  showingNarrative.value = true;
  clearNarrativeTimer();
  narrativeTimer = setTimeout(() => {
    showingNarrative.value = false;
  }, 3000);
}

onUnmounted(() => {
  clearNarrativeTimer();
});

// --- Démarrage ---
startNarrative();

// --- Events ---
function onStepComplete(payload: { score: number; total: number; results: (AnswerResult | null)[] }) {
  stepScores.value.push({ score: payload.score, total: payload.total });

  const nextIndex = currentStepIndex.value + 1;
  if (nextIndex >= steps.value.length) {
    // Chapitre terminé
    showingResult.value = true;
    progressStore.completeChapter(props.chapterId, totalScore.value, totalQuestions.value);
  } else {
    // Étape suivante
    currentStepIndex.value = nextIndex;
    stepKey.value++;
  }
}

function replay() {
  currentStepIndex.value = 0;
  stepScores.value = [];
  showingResult.value = false;
  stepKey.value++;
  startNarrative();
}

function onContinue() {
  emit('chapter-complete', {
    chapterId: props.chapterId,
    score: totalScore.value,
    total: totalQuestions.value,
    stars: stars.value,
  });
}

// --- Quit confirmation ---
const showQuitConfirmation = ref(false);

function handleBack() {
  if (showingResult.value) {
    onContinue();
  } else {
    showQuitConfirmation.value = true;
  }
}

useBackNavigation(handleBack, computed(() => !showQuitConfirmation.value));
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen w-full">

    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3">
      <NotebookButton variant="icon" size="sm" @click="handleBack">
        <CrossIcon :size="32" class="text-stone-400" />
      </NotebookButton>

      <NotebookBadge v-if="!showingNarrative && !showingResult">
        <span class="text-sky-600 font-bold">
          Étape {{ currentStepIndex + 1 }} / {{ steps.length }}
        </span>
      </NotebookBadge>

      <div class="w-10"></div>
    </header>

    <!-- Écran narratif -->
    <div v-if="showingNarrative" class="flex flex-col items-center justify-center gap-6 animate-fade-in px-8">
      <h2 class="text-2xl md:text-4xl font-bold text-sky-600 text-center">
        {{ chapter?.title }}
      </h2>
      <p class="text-xl md:text-2xl text-stone-800 text-center font-learning max-w-lg">
        {{ chapter?.narrative }}
      </p>
    </div>

    <!-- Mini-jeu en cours -->
    <div v-else-if="currentStep && currentComponent && !showingResult" class="pt-16 w-full flex-1">
      <component
        :is="currentComponent"
        :key="stepKey"
        :tense="stepTense"
        :count="currentStep.questionCount"
        :verbs="currentStep.verbs ?? chapter?.verbs"
        :pronouns="currentStep.pronouns"
        embedded
        @step-complete="onStepComplete"
        @home="handleBack"
      />
    </div>

    <!-- Résultat du chapitre -->
    <div v-else-if="showingResult" class="flex-1 flex items-center justify-center w-full">
      <ChapterResult
        :score="totalScore"
        :total="totalQuestions"
        :stars="stars"
        @replay="replay"
        @continue="onContinue"
      />
    </div>

    <ConfirmModal
      v-if="showQuitConfirmation"
      title="Quitter le chapitre ?"
      message="Si tu sors maintenant, tu devras recommencer."
      confirm-label="Quitter"
      cancel-label="Continuer"
      @confirm="$emit('home')"
      @cancel="showQuitConfirmation = false"
    />
  </div>
</template>
