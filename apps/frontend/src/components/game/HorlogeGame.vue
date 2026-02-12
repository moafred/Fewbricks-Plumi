<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue';
import type { AnswerResult } from '@plumi/shared';
import { useHorlogeStore } from '@/stores/horloge';
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
}>(), {
  embedded: false,
  count: 10,
});

const emit = defineEmits<{
  home: [];
  'step-complete': [payload: { score: number; total: number; results: (AnswerResult | null)[] }];
}>();

const game = useHorlogeStore();

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

/**
 * Angle de l'aiguille des heures (en degres depuis 12h).
 * L'aiguille avance aussi proportionnellement aux minutes.
 */
const hourHandAngle = computed(() => {
  const item = game.currentItem;
  if (!item) return 0;
  return (item.hours % 12) * 30 + item.minutes * 0.5;
});

/**
 * Angle de l'aiguille des minutes (en degres depuis 12h).
 */
const minuteHandAngle = computed(() => {
  const item = game.currentItem;
  if (!item) return 0;
  return item.minutes * 6;
});

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

game.startGame(props.count);

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
        <template v-if="game.phase === 'discovery'">Regarde l'horloge...</template>
        <template v-else-if="game.phase === 'challenge'">Quelle heure est-il ?</template>
        <template v-else-if="game.lastResult === 'correct'">Bien joué !</template>
        <template v-else>
          C'était <strong class="text-meadow-600">{{ game.correctForm }}</strong>
        </template>
      </p>

      <!-- Clock display -->
      <div class="flex-1 flex items-center justify-center w-full" :class="embedded ? '' : 'py-12'">
        <div class="w-full max-w-2xl px-4 flex justify-center">
          <NotebookCard v-if="game.currentItem" :class="embedded ? 'px-6 py-3' : 'px-12 py-8'" :padding="embedded ? 'sm' : 'md'">
            <div class="flex items-center justify-center">
              <!-- Horloge analogique SVG — visualisation dynamique -->
              <svg viewBox="0 0 200 200" class="w-48 h-48 md:w-56 md:h-56">
                <!-- Cadran -->
                <circle cx="100" cy="100" r="90" fill="none" stroke-width="3" class="stroke-stone-300 fill-white" />
                <circle cx="100" cy="100" r="88" fill="none" stroke-width="1" class="stroke-stone-200" />

                <!-- 12 graduations des heures -->
                <line
                  v-for="h in 12"
                  :key="'mark-' + h"
                  :x1="100 + 75 * Math.sin((h * 30 * Math.PI) / 180)"
                  :y1="100 - 75 * Math.cos((h * 30 * Math.PI) / 180)"
                  :x2="100 + 82 * Math.sin((h * 30 * Math.PI) / 180)"
                  :y2="100 - 82 * Math.cos((h * 30 * Math.PI) / 180)"
                  stroke-width="2"
                  stroke-linecap="round"
                  class="stroke-stone-500"
                />

                <!-- Chiffres des heures -->
                <text
                  v-for="h in 12"
                  :key="'num-' + h"
                  :x="100 + 65 * Math.sin((h * 30 * Math.PI) / 180)"
                  :y="100 - 65 * Math.cos((h * 30 * Math.PI) / 180)"
                  text-anchor="middle"
                  dominant-baseline="central"
                  class="fill-stone-600 font-bold"
                  font-size="12"
                >
                  {{ h }}
                </text>

                <!-- Aiguille des heures (courte, epaisse) -->
                <line
                  x1="100"
                  y1="100"
                  :x2="100 + 45 * Math.sin((hourHandAngle * Math.PI) / 180)"
                  :y2="100 - 45 * Math.cos((hourHandAngle * Math.PI) / 180)"
                  stroke-width="4"
                  stroke-linecap="round"
                  class="stroke-sky-600"
                />

                <!-- Aiguille des minutes (longue, fine) -->
                <line
                  x1="100"
                  y1="100"
                  :x2="100 + 65 * Math.sin((minuteHandAngle * Math.PI) / 180)"
                  :y2="100 - 65 * Math.cos((minuteHandAngle * Math.PI) / 180)"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  class="stroke-coral-500"
                />

                <!-- Centre -->
                <circle cx="100" cy="100" r="4" class="fill-stone-600" />
              </svg>
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
