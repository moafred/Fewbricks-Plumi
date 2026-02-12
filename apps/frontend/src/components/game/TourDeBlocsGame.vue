<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue';
import type { AnswerResult } from '@plumi/shared';
import { useTourDeBlocsStore } from '@/stores/tour-de-blocs';
import { useKeyboardNavigation, useBackNavigation, useSyncGameProgress } from '@/composables';
import GameLayout from '@/components/game/GameLayout.vue';
import ChoicesSection from '@/components/game/ChoicesSection.vue';
import GameHeader from '@/components/game/GameHeader.vue';
import GameInstruction from '@/components/game/GameInstruction.vue';
import FormChoice from './FormChoice.vue';
import type { FormChoiceState } from './FormChoice.vue';
import ChoiceGrid from './ChoiceGrid.vue';
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
const { progress } = game;

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
function handleBack() {
  emit('home');
}
useBackNavigation(handleBack, canGoBack);

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
    <GameHeader
      v-if="!embedded"
      label="Tour de Blocs"
      :current="progress.current + 1"
      :total="progress.total"
      color-class="text-sky-600"
      @back="handleBack"
    />

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
      <!-- Instruction -->
      <GameInstruction
        :phase="game.phase"
        :last-result="game.lastResult"
        discovery="Observe les blocs..."
        challenge="Quel est ce nombre ?"
        :correct-answer="String(game.currentItem?.targetNumber)"
      />

      <!-- Blocks display -->
      <div class="flex-1 flex items-center justify-center w-full" :class="embedded ? '' : 'py-8'">
        <div class="w-full max-w-2xl px-4 flex justify-center">
          <NotebookCard v-if="game.currentItem" :class="embedded ? 'px-6 py-6' : 'px-12 py-12'" :padding="embedded ? 'sm' : 'md'">
            <div class="flex flex-col items-center gap-6">
              <!-- Decomposition visuelle : centaines, dizaines, unites -->
              <div class="flex items-end justify-center gap-6 min-h-[120px]">
                <div
                  v-if="game.currentItem.correctDecomposition.hundreds > 0"
                  class="flex flex-col items-center gap-1"
                >
                  <div class="grid grid-cols-2 gap-1">
                    <div
                      v-for="h in game.currentItem.correctDecomposition.hundreds"
                      :key="'h-' + h"
                      class="w-8 h-8 rounded bg-coral-400 border-2 border-coral-500 shadow-sm"
                    />
                  </div>
                  <span class="text-xs font-bold text-coral-600 uppercase">Centaines</span>
                </div>
                
                <div
                  v-if="game.currentItem.correctDecomposition.tens > 0"
                  class="flex flex-col items-center gap-1"
                >
                  <div class="flex flex-col-reverse gap-0.5">
                    <div
                      v-for="t in game.currentItem.correctDecomposition.tens"
                      :key="'t-' + t"
                      class="w-10 h-3 rounded bg-gold-400 border border-gold-500 shadow-sm"
                    />
                  </div>
                  <span class="text-xs font-bold text-gold-600 uppercase">Dizaines</span>
                </div>

                <div
                  v-if="game.currentItem.correctDecomposition.units > 0"
                  class="flex flex-col items-center gap-1"
                >
                  <div class="grid grid-cols-2 gap-0.5">
                    <div
                      v-for="u in game.currentItem.correctDecomposition.units"
                      :key="'u-' + u"
                      class="w-3 h-3 rounded-sm bg-sky-400 border border-sky-500 shadow-sm"
                    />
                  </div>
                  <span class="text-xs font-bold text-sky-600 uppercase">Unités</span>
                </div>
              </div>

              <!-- Révélation du nombre en phase de résolution -->
              <div 
                v-if="game.phase === 'response' || game.phase === 'resolution'"
                class="px-6 py-2 bg-meadow-100 text-meadow-700 rounded-2xl font-learning text-4xl border-2 border-meadow-300 animate-celebrate"
              >
                {{ game.currentItem.targetNumber }}
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
