<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue';
import type { Tense, VerbId, Pronoun, AnswerResult } from '@plumi/shared';
import { useArdoiseStore } from '@/stores/ardoise';
import { useKeyboardNavigation, useBackNavigation } from '@/composables';
import FormChoice from './FormChoice.vue';
import type { FormChoiceState } from './FormChoice.vue';
import KeyboardGuide from '@/components/ui/KeyboardGuide.vue';
import KeyboardHintsBar from '@/components/ui/KeyboardHintsBar.vue';
import TenseBadge from '@/components/ui/TenseBadge.vue';
import ChoiceGrid from './ChoiceGrid.vue';
import WordCard from './WordCard.vue';
import ProgressStars from './ProgressStars.vue';
import GameResult from './GameResult.vue';

const props = withDefaults(defineProps<{
  tense?: Tense;
  embedded?: boolean;
  count?: number;
  verbs?: VerbId[];
  pronouns?: Pronoun[];
}>(), {
  tense: 'present',
  embedded: false,
  count: 10,
});

const emit = defineEmits<{
  home: [];
  'step-complete': [payload: { score: number; total: number; results: (AnswerResult | null)[] }];
}>();

const game = useArdoiseStore();

// Navigation clavier (grille 2x2)
const choices = computed(() => game.currentItem?.choices ?? []);
const isChallenge = computed(() => game.phase === 'challenge');

const { focusedIndex, resetFocus } = useKeyboardNavigation(
  choices,
  (choice) => game.submitAnswer(choice),
  isChallenge,
  2, // 2 colonnes pour la grille 2×2
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

function onTap(choice: string) {
  game.submitAnswer(choice);
}

function choiceState(choice: string): FormChoiceState {
  const { phase, lastResult, selectedChoice, correctForm } = game;

  if (phase === 'discovery') return 'idle';
  if (phase === 'challenge') return 'waiting';

  // response or resolution
  if (lastResult === 'correct') {
    return choice === selectedChoice ? 'correct' : 'idle';
  }
  // incorrect
  if (choice === correctForm) return 'reveal';
  if (choice === selectedChoice) return 'incorrect';
  return 'idle';
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
  verbs: props.verbs,
  pronouns: props.pronouns,
});
</script>

<template>
  <div class="ardoise-game flex flex-col items-center justify-between min-h-screen px-4 py-6 gap-4">
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
      <p class="text-xl md:text-2xl font-bold text-stone-700 text-center drop-shadow-sm">
        <template v-if="game.phase === 'discovery'">La formule apparaît...</template>
        <template v-else-if="game.phase === 'challenge'">Quelle est la bonne formule ?</template>
        <template v-else-if="game.lastResult === 'correct'">Bien joué !</template>
        <template v-else>
          C'était <strong class="text-meadow-600">{{ game.correctForm }}</strong>
        </template>
      </p>

      <!-- Prompt: pronoun → infinitive -->
      <div class="flex-1 flex items-center justify-center w-full py-12">
        <div class="w-full max-w-2xl px-4 flex justify-center">
          <WordCard
            v-if="game.currentItem"
            :pronoun="game.currentItem.pronoun"
            :form="game.currentItem.infinitive"
            :phase="game.phase"
            separator="→"
          />
        </div>
      </div>

      <!-- 2×2 grid of choices -->
      <div class="flex flex-col items-center gap-8 pb-12 w-full">
        <ChoiceGrid max-width="2xl">
          <FormChoice
            v-for="(choice, index) in game.currentItem?.choices"
            :key="choice"
            :label="choice"
            :state="choiceState(choice)"
            :focused="focusedIndex === index && game.phase === 'challenge'"
            @tap="onTap"
          />
        </ChoiceGrid>

        <!-- Keyboard Hints -->
        <KeyboardHintsBar v-if="game.phase === 'challenge'">
           <KeyboardGuide mode="cluster" label="choisir" />
           <KeyboardGuide mode="single" key-name="espace" label="valider" />
        </KeyboardHintsBar>
      </div>
    </template>
  </div>
</template>
