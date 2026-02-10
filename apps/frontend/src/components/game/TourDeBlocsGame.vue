<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue';
import type { AnswerResult } from '@plumi/shared';
import { useTourDeBlocsStore } from '@/stores/tour-de-blocs';
import { useKeyboardNavigation, useBackNavigation, useSyncGameProgress } from '@/composables';
import GameLayout from '@/components/game/GameLayout.vue';
import ChoicesSection from '@/components/game/ChoicesSection.vue';
import FormChoice from './FormChoice.vue';
import type { FormChoiceState } from './FormChoice.vue';
import ChoiceGrid from './ChoiceGrid.vue';
import ProgressStars from './ProgressStars.vue';
import GameResult from './GameResult.vue';
import NotebookCard from '@/components/ui/NotebookCard.vue';

const props = withDefaults(defineProps<{
  embedded?: boolean;
  count?: number;
  numberRange?: [number, number];
}>(), {
  embedded: false,
  count: 10,
});

const emit = defineEmits<{
  home: [];
  'step-complete': [payload: { score: number; total: number; results: (AnswerResult | null)[] }];
}>();

const game = useTourDeBlocsStore();

const choices = computed(() => game.currentItem?.choices ?? []);
const isChallenge = computed(() => game.phase === 'challenge');

const { focusedIndex, resetFocus } = useKeyboardNavigation(
  choices,
  (choice) => game.submitAnswer(choice),
  isChallenge,
  2,
);

watch(
  () => game.currentIndex,
  () => resetFocus(),
);

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

  if (lastResult === 'correct') {
    return choice === selectedChoice ? 'correct' : 'idle';
  }
  if (choice === correctForm) return 'reveal';
  if (choice === selectedChoice) return 'incorrect';
  return 'idle';
}

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

game.startGame(props.count, { numberRange: props.numberRange });

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
          @replay="game.startGame()"
          @home="emit('home')"
        />
      </div>
    </template>

    <!-- Playing -->
    <template v-else>
      <!-- Header: progress stars (mode standalone uniquement, ChapterRunner affiche les siennes) -->
      <div v-if="!embedded" class="w-full max-w-md flex flex-col gap-2">
        <ProgressStars
          :results="game.results"
          :current="game.currentIndex"
        />
      </div>

      <!-- Instruction -->
      <p class="text-xl md:text-2xl font-bold text-stone-700 text-center drop-shadow-sm">
        <template v-if="game.phase === 'discovery'">Observe ce nombre...</template>
        <template v-else-if="game.phase === 'challenge'">Décompose ce nombre !</template>
        <template v-else-if="game.lastResult === 'correct'">Bien joué !</template>
        <template v-else>
          C'était <strong class="text-meadow-600">{{ game.correctForm }}</strong>
        </template>
      </p>

      <!-- Number display -->
      <div class="flex-1 flex items-center justify-center w-full" :class="embedded ? '' : 'py-12'">
        <div class="w-full max-w-2xl px-4 flex justify-center">
          <NotebookCard v-if="game.currentItem" :class="embedded ? 'px-6 py-3' : 'px-12 py-8'" :padding="embedded ? 'sm' : 'md'">
            <div class="flex flex-col items-center gap-2">
              <span class="text-4xl md:text-6xl font-bold text-sky-600 font-learning">
                {{ game.currentItem.targetNumber }}
              </span>
              <!-- Decomposition visuelle : centaines, dizaines, unites -->
              <div class="flex items-end gap-3 mt-4">
                <div
                  v-if="game.currentItem.correctDecomposition.hundreds > 0"
                  class="flex flex-col items-center gap-1"
                >
                  <div
                    v-for="h in game.currentItem.correctDecomposition.hundreds"
                    :key="'h-' + h"
                    class="w-10 h-10 rounded-lg bg-coral-400/80 border-2 border-coral-300"
                  />
                  <span class="text-xs text-stone-500 font-medium">c</span>
                </div>
                <div
                  v-if="game.currentItem.correctDecomposition.tens > 0"
                  class="flex flex-col items-center gap-1"
                >
                  <div
                    v-for="t in game.currentItem.correctDecomposition.tens"
                    :key="'t-' + t"
                    class="w-10 h-3 rounded bg-gold-400/80 border border-gold-300"
                  />
                  <span class="text-xs text-stone-500 font-medium">d</span>
                </div>
                <div
                  v-if="game.currentItem.correctDecomposition.units > 0"
                  class="flex flex-col items-center gap-1"
                >
                  <div
                    v-for="u in game.currentItem.correctDecomposition.units"
                    :key="'u-' + u"
                    class="w-3 h-3 rounded-sm bg-sky-400/80 border border-sky-300"
                  />
                  <span class="text-xs text-stone-500 font-medium">u</span>
                </div>
              </div>
            </div>
          </NotebookCard>
        </div>
      </div>

      <!-- 2x2 grid of choices -->
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
