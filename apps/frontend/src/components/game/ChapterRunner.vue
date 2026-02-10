<script setup lang="ts">
import { ref, computed, watch, type Component } from 'vue';
import type { StepMechanic, AnswerResult, Tense } from '@plumi/shared';
import { getChapter } from '@plumi/shared';
import { useRouter, useRoute } from 'vue-router';
import { useChapterProgressStore } from '@/stores/chapter-progress';
import { useBackNavigation, useProvideGameProgress } from '@/composables';
import ChapterResult from './ChapterResult.vue';
import TriVerbesGame from './TriVerbesGame.vue';
import ArdoiseGame from './ArdoiseGame.vue';
import EncrierGame from './EncrierGame.vue';
import PontAccordsGame from './PontAccordsGame.vue';
import EncrierGnGame from './EncrierGnGame.vue';
// Français — grammaire
import TriPhrasesGame from './TriPhrasesGame.vue';
import PonctuationGame from './PonctuationGame.vue';
import ReperageGame from './ReperageGame.vue';
// Maths — réutilisées
import TriNombresGame from './TriNombresGame.vue';
import ArdoiseCalculGame from './ArdoiseCalculGame.vue';
import EncrierCalculGame from './EncrierCalculGame.vue';
// Maths — spécifiques
import DroiteNumeriqueGame from './DroiteNumeriqueGame.vue';
import TourDeBlocsGame from './TourDeBlocsGame.vue';
import PartageGame from './PartageGame.vue';
import HorlogeGame from './HorlogeGame.vue';
import MarcheGame from './MarcheGame.vue';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import CrossIcon from '@/components/icons/CrossIcon.vue';
import NotebookButton from '@/components/ui/NotebookButton.vue';
import TenseBadge from '@/components/ui/TenseBadge.vue';
import ProgressStars from './ProgressStars.vue';

const props = defineProps<{
  chapterId: number;
  subject?: string;
  bookId?: number;
}>();

const router = useRouter();
const route = useRoute();

const chapter = computed(() => getChapter(props.chapterId));
const progressStore = useChapterProgressStore();
const { gameProgress, resetGameProgress } = useProvideGameProgress();

// Mapping mécanique -> composant
const mechanicComponents: Partial<Record<StepMechanic, Component>> = {
  // Français
  'tri-verbes': TriVerbesGame,
  'ardoise': ArdoiseGame,
  'encrier': EncrierGame,
  'pont-accords': PontAccordsGame,
  'encrier-gn': EncrierGnGame,
  // Français — grammaire
  'tri-phrases': TriPhrasesGame,
  'ponctuation': PonctuationGame,
  'reperage': ReperageGame,
  // Maths — réutilisées
  'tri-nombres': TriNombresGame,
  'ardoise-calcul': ArdoiseCalculGame,
  'encrier-calcul': EncrierCalculGame,
  // Maths — spécifiques
  'droite-numerique': DroiteNumeriqueGame,
  'tour-de-blocs': TourDeBlocsGame,
  'partage': PartageGame,
  'horloge': HorlogeGame,
  'marche': MarcheGame,
};

// --- State ---
const currentStepIndex = ref(0);
const stepScores = ref<{ score: number; total: number }[]>([]);
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

// TenseBadge uniquement pour les chapitres avec un temps défini (français)
const hasTense = computed(() => {
  const t = chapter.value?.tense;
  return !!t && t !== 'mixed';
});

// Reset la progression intra-étape quand on change d'étape
watch(currentStepIndex, () => resetGameProgress());

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
}

function goBackToBook() {
  router.push({
    name: 'book-view',
    params: { subject: route.params.subject, bookId: route.params.bookId },
  });
}

function onContinue() {
  goBackToBook();
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
  <div class="h-dvh flex flex-col w-full overflow-hidden">

    <!-- Header compact : ✕  [Présent]  Étape 1/4  ★☆ -->
    <header class="shrink-0 flex items-center px-4 py-2 gap-2">
      <NotebookButton variant="icon" size="sm" @click="handleBack">
        <CrossIcon :size="28" class="text-stone-400" />
      </NotebookButton>

      <template v-if="!showingResult">
        <TenseBadge v-if="hasTense" :tense="stepTense" />

        <span class="text-sky-600 font-bold text-sm">
          Étape {{ currentStepIndex + 1 }}/{{ steps.length }}
        </span>

        <div class="flex-1" />

        <ProgressStars
          v-if="gameProgress.results.length > 0"
          :results="gameProgress.results"
          :current="gameProgress.current"
        />
      </template>

      <div v-else class="flex-1" />
    </header>

    <!-- Mini-jeu en cours -->
    <div v-if="currentStep && currentComponent && !showingResult" class="flex-1 min-h-0 w-full flex flex-col">
      <component
        :is="currentComponent"
        :key="stepKey"
        :tense="stepTense"
        :count="currentStep.questionCount"
        :verbs="currentStep.verbs ?? chapter?.verbs"
        :pronouns="currentStep.pronouns"
        :number-range="currentStep.numberRange"
        :operations="currentStep.operations"
        :categories="currentStep.categories"
        :fraction-denominators="currentStep.fractionDenominators"
        :target="currentStep.target"
        embedded
        @step-complete="onStepComplete"
        @home="handleBack"
      />
    </div>

    <!-- Résultat du chapitre -->
    <div v-else-if="showingResult" class="flex-1 min-h-0 flex items-center justify-center w-full">
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
      @confirm="goBackToBook()"
      @cancel="showQuitConfirmation = false"
    />
  </div>
</template>
