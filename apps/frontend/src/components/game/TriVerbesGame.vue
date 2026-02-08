<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import type { VerbId, Tense, Pronoun, AnswerResult } from '@plumi/shared';
import { getInfinitive } from '@plumi/shared';
import { useGameStore } from '@/stores/game';
import { useKeyboardNavigation, useBackNavigation, useSyncGameProgress } from '@/composables';
import CategoryButton from './CategoryButton.vue';
import WordCard from './WordCard.vue';
import ProgressStars from './ProgressStars.vue';
import GameResult from './GameResult.vue';
import KeyboardGuide from '@/components/ui/KeyboardGuide.vue';
import KeyboardHintsBar from '@/components/ui/KeyboardHintsBar.vue';
import TenseBadge from '@/components/ui/TenseBadge.vue';
import type { CategoryButtonState } from './CategoryButton.vue';

const props = withDefaults(defineProps<{
  tense?: Tense;
  embedded?: boolean;
  count?: number;
  pronouns?: Pronoun[];
  verbs?: VerbId[];
}>(), {
  tense: 'present',
  embedded: false,
  count: 10,
});

const emit = defineEmits<{
  home: [];
  'step-complete': [payload: { score: number; total: number; results: (AnswerResult | null)[] }];
}>();

const game = useGameStore();

// Les deux choix possibles — dynamiques selon les verbes du chapitre
const categoryChoices = ref<VerbId[]>(
  props.verbs && props.verbs.length === 2 ? [...props.verbs] : ['etre', 'avoir'],
);
const isChallenge = computed(() => game.phase === 'challenge');

const { focusedIndex, resetFocus } = useKeyboardNavigation(
  categoryChoices,
  (verbId) => game.submitAnswer(verbId),
  isChallenge,
);

// Reset focus quand on passe à un nouvel item
watch(
  () => game.currentIndex,
  () => resetFocus(),
);

// Navigation retour vers l'accueil (désactivée en mode embedded, ChapterRunner gère)
const canGoBack = computed(() => !props.embedded);
useBackNavigation(() => emit('home'), canGoBack);

let resolutionTimer: ReturnType<typeof setTimeout> | null = null;

function clearResolutionTimer() {
  if (resolutionTimer !== null) {
    clearTimeout(resolutionTimer);
    resolutionTimer = null;
  }
}

// Auto-advance after resolution phase
watch(
  () => game.phase,
  (phase) => {
    if (phase === 'resolution') {
      clearResolutionTimer();
      resolutionTimer = setTimeout(() => {
        game.nextItem();
      }, 2000);
    }
  },
);

onUnmounted(() => {
  clearResolutionTimer();
});

function onTap(categoryId: string) {
  game.submitAnswer(categoryId as VerbId);
}

function categoryState(verbId: VerbId): CategoryButtonState {
  const { phase, lastResult, lastCorrectVerb } = game;

  if (phase === 'discovery') return 'idle';
  if (phase === 'challenge') return 'waiting';

  // response or resolution
  if (lastResult === 'correct') {
    return verbId === lastCorrectVerb ? 'correct' : 'idle';
  }
  // incorrect
  if (verbId === lastCorrectVerb) return 'reveal';
  return 'incorrect';
}

// Emettre step-complete en mode embedded
if (props.embedded) {
  watch(
    () => game.isFinished,
    (finished) => {
      if (finished) {
        emit('step-complete', {
          score: game.score,
          total: game.items.length,
          results: [...game.results],
        });
      }
    },
  );
}

game.startGame(props.tense, props.count, {
  pronouns: props.pronouns,
  verbs: props.verbs,
});

useSyncGameProgress(() => game.results, () => game.currentIndex);
</script>

<template>
  <div
    class="tri-verbes-game flex flex-col items-center px-4"
    :class="embedded ? 'h-full min-h-0 py-2 gap-2' : 'min-h-screen justify-between py-6 gap-4'"
  >
    <!-- Finished: show results -->
    <template v-if="game.isFinished && !embedded">
      <div class="flex-1 flex items-center justify-center w-full">
        <GameResult
          :score="game.score"
          :total="game.items.length"
          @replay="game.startGame(game.currentTense)"
          @home="emit('home')"
        />
      </div>
    </template>

    <!-- Playing -->
    <template v-else>
      <!-- Header: tense badge + progress stars (mode standalone uniquement) -->
      <div v-if="!embedded" class="w-full max-w-md flex items-center justify-center gap-3">
        <TenseBadge :tense="game.currentTense" />
        <ProgressStars
          :results="game.results"
          :current="game.currentIndex"
          class="flex-1"
        />
      </div>

      <!-- Instruction -->
      <p class="text-lg md:text-xl text-stone-600 text-center">
        <template v-if="game.phase === 'discovery'">Le mot apparaît...</template>
        <template v-else-if="game.phase === 'challenge'">Dans quelle catégorie ?</template>
        <template v-else-if="game.lastResult === 'correct'">Bien joué !</template>
        <template v-else>
          C'est <strong class="text-meadow-600">{{ game.currentItem?.infinitive }}</strong>
        </template>
      </p>

      <!-- Word card -->
      <div class="flex-1 flex items-center justify-center w-full">
        <WordCard
          v-if="game.currentItem"
          :pronoun="game.currentItem.pronoun"
          :form="game.currentItem.form"
          :phase="game.phase"
          :compact="embedded"
        />
      </div>

      <!-- Sorting hats -->
      <div class="flex flex-col items-center" :class="embedded ? 'gap-2 pb-2' : 'gap-6 pb-8'">
        <div class="flex items-center justify-center gap-10 md:gap-16">
          <CategoryButton
            v-for="(verbId, idx) in categoryChoices"
            :key="verbId"
            :category-id="verbId"
            :label="getInfinitive(verbId)"
            :state="categoryState(verbId)"
            :color-scheme="idx === 0 ? 'meadow' : 'gold'"
            :focused="focusedIndex === idx && game.phase === 'challenge'"
            @tap="onTap"
          />
        </div>

        <!-- Keyboard Hints -->
        <KeyboardHintsBar v-if="game.phase === 'challenge'">
           <KeyboardGuide mode="cluster" label="Flèches pour choisir" />
           <KeyboardGuide mode="single" key-name="espace" label="Appuie pour valider" />
        </KeyboardHintsBar>
      </div>
    </template>
  </div>
</template>
