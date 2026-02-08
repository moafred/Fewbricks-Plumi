<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue';
import type { AnswerResult } from '@plumi/shared';
import { usePartageStore } from '@/stores/partage';
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
  fractionDenominators?: number[];
}>(), {
  embedded: false,
  count: 10,
});

const emit = defineEmits<{
  home: [];
  'step-complete': [payload: { score: number; total: number; results: (AnswerResult | null)[] }];
}>();

const game = usePartageStore();

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

/** Angle de chaque part pour le camembert */
function sliceAngle(denominator: number): number {
  return 360 / denominator;
}

/**
 * Calcule le path SVG d'une tranche de camembert.
 * Centre (100, 100), rayon 80.
 */
function slicePath(index: number, denominator: number): string {
  const cx = 100;
  const cy = 100;
  const r = 80;
  const angle = sliceAngle(denominator);
  const startAngle = index * angle - 90;
  const endAngle = startAngle + angle;

  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);

  const largeArc = angle > 180 ? 1 : 0;

  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
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

game.startGame(props.count, { fractionDenominators: props.fractionDenominators });
</script>

<template>
  <div class="partage-game flex flex-col items-center justify-between min-h-screen px-4 py-6 gap-4">
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
        <template v-if="game.phase === 'discovery'">
          Colorie {{ game.currentItem?.numerator }} part{{ (game.currentItem?.numerator ?? 0) > 1 ? 's' : '' }}
          sur {{ game.currentItem?.denominator }}...
        </template>
        <template v-else-if="game.phase === 'challenge'">Quelle fraction est coloriee ?</template>
        <template v-else-if="game.lastResult === 'correct'">Bien joue !</template>
        <template v-else>
          C'etait <strong class="text-meadow-600">{{ game.correctForm }}</strong>
        </template>
      </p>

      <!-- Fraction visual -->
      <div class="flex-1 flex items-center justify-center w-full py-12">
        <div class="w-full max-w-2xl px-4 flex justify-center">
          <NotebookCard v-if="game.currentItem" class="px-12 py-8">
            <div class="flex flex-col items-center gap-4">
              <!-- Camembert SVG — visualisation dynamique, pas une icone -->
              <svg viewBox="0 0 200 200" class="w-40 h-40 md:w-48 md:h-48">
                <circle cx="100" cy="100" r="80" fill="none" stroke-width="2" class="stroke-stone-300" />
                <path
                  v-for="i in game.currentItem.denominator"
                  :key="i"
                  :d="slicePath(i - 1, game.currentItem.denominator)"
                  :class="i - 1 < game.currentItem.numerator ? 'fill-gold-400' : 'fill-stone-100'"
                  stroke-width="2"
                  class="stroke-stone-300"
                />
              </svg>
              <!-- Label numerateur / denominateur -->
              <div class="flex items-center gap-1 text-2xl md:text-3xl font-bold text-sky-600 font-learning">
                <span>{{ game.currentItem.numerator }}</span>
                <span class="text-stone-400">/</span>
                <span>{{ game.currentItem.denominator }}</span>
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
