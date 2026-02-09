<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue';
import type { Tense, VerbId, Pronoun, AnswerResult } from '@plumi/shared';
import { useArdoiseStore } from '@/stores/ardoise';
import { useKeyboardNavigation, useBackNavigation, useSyncGameProgress } from '@/composables';
import GameLayout from '@/components/game/GameLayout.vue';
import ChoicesSection from '@/components/game/ChoicesSection.vue';
import FormChoice from './FormChoice.vue';
import type { FormChoiceState } from './FormChoice.vue';
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

useSyncGameProgress(() => game.results, () => game.currentIndex);
</script>

<template>
  <GameLayout :embedded="embedded">
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
      <p class="text-xl md:text-2xl font-bold text-stone-700 text-center drop-shadow-sm">
        <template v-if="game.phase === 'discovery'">Regarde bien...</template>
        <template v-else-if="game.phase === 'challenge'">Quel est le bon mot ?</template>
        <template v-else-if="game.lastResult === 'correct'">Bien joué !</template>
        <template v-else>
          C'était <strong class="text-meadow-600">{{ game.correctForm }}</strong>
        </template>
      </p>

      <!-- Prompt: pronoun → infinitive -->
      <div class="flex-1 flex items-center justify-center w-full" :class="embedded ? '' : 'py-4'">
        <div class="w-full max-w-2xl px-4 flex justify-center">
          <WordCard
            v-if="game.currentItem"
            :pronoun="game.currentItem.pronoun"
            :form="game.currentItem.infinitive"
            :phase="game.phase"
            separator="→"
            :compact="embedded"
          />
        </div>
      </div>

      <!-- 2×2 grid of choices -->
      <ChoicesSection :embedded="embedded" :phase="game.phase">
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
      </ChoicesSection>
    </template>
  </GameLayout>
</template>
