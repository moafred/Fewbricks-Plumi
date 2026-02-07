<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import type { VerbId, Tense, Pronoun, AnswerResult } from '@plumi/shared';
import { getInfinitive } from '@plumi/shared';
import { useGameStore } from '@/stores/game';
import { useKeyboardNavigation, useBackNavigation } from '@/composables';
import SortingHat from './SortingHat.vue';
import WordCard from './WordCard.vue';
import ProgressStars from './ProgressStars.vue';
import GameResult from './GameResult.vue';
import KeyboardGuide from '@/components/ui/KeyboardGuide.vue';
import KeyboardHintsBar from '@/components/ui/KeyboardHintsBar.vue';
import TenseBadge from '@/components/ui/TenseBadge.vue';
import type { HatState } from './SortingHat.vue';

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
const hatChoices = ref<VerbId[]>(
  props.verbs && props.verbs.length === 2 ? [...props.verbs] : ['etre', 'avoir'],
);
const isChallenge = computed(() => game.phase === 'challenge');

const { focusedIndex, resetFocus } = useKeyboardNavigation(
  hatChoices,
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

function onTap(verbId: VerbId) {
  game.submitAnswer(verbId);
}

function hatState(verbId: VerbId): HatState {
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
</script>

<template>
  <div class="tri-verbes-game flex flex-col items-center justify-between min-h-screen px-4 py-6 gap-4">
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
      <!-- Header: tense badge + progress stars -->
      <div class="w-full max-w-md flex flex-col gap-2">
        <TenseBadge :tense="game.currentTense" />
        <ProgressStars
          :results="game.results"
          :current="game.currentIndex"
        />
      </div>

      <!-- Instruction -->
      <p class="text-lg md:text-xl text-stone-600 text-center">
        <template v-if="game.phase === 'discovery'">Le mot apparaît...</template>
        <template v-else-if="game.phase === 'challenge'">Dans quel chapeau ?</template>
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
        />
      </div>

      <!-- Sorting hats -->
      <div class="flex flex-col items-center gap-6 pb-8">
        <div class="flex items-center justify-center gap-10 md:gap-16">
          <SortingHat
            v-for="(verbId, idx) in hatChoices"
            :key="verbId"
            :verb-id="verbId"
            :label="getInfinitive(verbId)"
            :state="hatState(verbId)"
            :focused="focusedIndex === idx && game.phase === 'challenge'"
            @tap="onTap"
          />
        </div>

        <!-- Keyboard Hints -->
        <KeyboardHintsBar v-if="game.phase === 'challenge'">
           <KeyboardGuide mode="cluster" label="choisir" />
           <KeyboardGuide mode="single" key-name="espace" label="valider" />
        </KeyboardHintsBar>
      </div>
    </template>
  </div>
</template>
