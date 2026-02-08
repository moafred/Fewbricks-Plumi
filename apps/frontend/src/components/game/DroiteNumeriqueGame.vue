<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue';
import type { AnswerResult } from '@plumi/shared';
import { useDroiteNumeriqueStore } from '@/stores/droite-numerique';
import { useKeyboardNavigation, useBackNavigation } from '@/composables';
import FormChoice from './FormChoice.vue';
import type { FormChoiceState } from './FormChoice.vue';
import KeyboardGuide from '@/components/ui/KeyboardGuide.vue';
import KeyboardHintsBar from '@/components/ui/KeyboardHintsBar.vue';
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

const game = useDroiteNumeriqueStore();

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
</script>

<template>
  <div class="droite-numerique-game flex flex-col items-center justify-between min-h-screen px-4 py-6 gap-4">
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
      <!-- Header: progress stars -->
      <div class="w-full max-w-md flex flex-col gap-2">
        <ProgressStars
          :results="game.results"
          :current="game.currentIndex"
        />
      </div>

      <!-- Instruction -->
      <p class="text-xl md:text-2xl font-bold text-stone-700 text-center drop-shadow-sm">
        <template v-if="game.phase === 'discovery'">Place ce nombre sur la droite...</template>
        <template v-else-if="game.phase === 'challenge'">Ou se place ce nombre ?</template>
        <template v-else-if="game.lastResult === 'correct'">Bien joue !</template>
        <template v-else>
          C'etait <strong class="text-meadow-600">{{ game.correctForm }}</strong>
        </template>
      </p>

      <!-- Number display -->
      <div class="flex-1 flex items-center justify-center w-full py-12">
        <div class="w-full max-w-2xl px-4 flex justify-center">
          <NotebookCard v-if="game.currentItem" class="px-12 py-8">
            <div class="flex flex-col items-center gap-4">
              <span class="text-lg text-stone-500 font-medium">Nombre :</span>
              <span class="text-4xl md:text-6xl font-bold text-sky-600 font-learning">
                {{ game.currentItem.targetNumber }}
              </span>
              <!-- Droite numerique simplifiee -->
              <div class="w-full mt-4 flex flex-col items-center gap-1">
                <div class="relative w-full h-8">
                  <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-300 -translate-y-1/2" />
                  <div
                    v-for="grad in game.currentItem.graduations"
                    :key="grad"
                    class="absolute top-0 flex flex-col items-center -translate-x-1/2"
                    :style="{ left: `${((grad - game.currentItem.lineRange[0]) / (game.currentItem.lineRange[1] - game.currentItem.lineRange[0])) * 100}%` }"
                  >
                    <div class="w-0.5 h-4 bg-stone-400" />
                    <span class="text-xs text-stone-500 mt-0.5">{{ grad }}</span>
                  </div>
                </div>
              </div>
            </div>
          </NotebookCard>
        </div>
      </div>

      <!-- 2x2 grid of choices -->
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

        <KeyboardHintsBar v-if="game.phase === 'challenge'">
          <KeyboardGuide mode="cluster" label="choisir" />
          <KeyboardGuide mode="single" key-name="espace" label="valider" />
        </KeyboardHintsBar>
      </div>
    </template>
  </div>
</template>
