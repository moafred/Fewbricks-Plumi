<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue';
import type { AnswerResult } from '@plumi/shared';
import { useDroiteNumeriqueStore } from '@/stores/droite-numerique';
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
import { SparkleIcon } from '@/components/icons';

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
      label="Droite Numérique"
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
        discovery="Regarde bien la position..."
        challenge="Quel est ce nombre ?"
        :correct-answer="game.correctForm ?? ''"
      />

      <!-- Line display -->
      <div class="flex-1 flex items-center justify-center w-full" :class="embedded ? '' : 'py-8'">
        <div class="w-full max-w-2xl px-4 flex justify-center">
          <NotebookCard v-if="game.currentItem" :class="embedded ? 'px-6 py-6' : 'px-12 py-12'" :padding="embedded ? 'sm' : 'md'">
            <div class="flex flex-col items-center w-full">
              <!-- Droite numerique graduée -->
              <div class="relative w-full h-24 flex items-end">
                <!-- Ligne principale -->
                <div class="absolute bottom-12 left-0 right-0 h-1 bg-stone-300 rounded-full" />
                
                <!-- Graduations -->
                <div
                  v-for="grad in game.currentItem.graduations"
                  :key="grad"
                  class="absolute bottom-6 flex flex-col items-center -translate-x-1/2"
                  :style="{ left: `${((grad - game.currentItem.lineRange[0]) / (game.currentItem.lineRange[1] - game.currentItem.lineRange[0])) * 100}%` }"
                >
                  <div class="w-0.5 h-6 bg-stone-400" />
                  <span class="text-sm font-bold text-stone-500 mt-1">{{ grad }}</span>
                </div>

                <!-- Marqueur (La Plume / Étoile) à la position cible -->
                <div
                  class="absolute bottom-12 flex flex-col items-center -translate-x-1/2 transition-all duration-500"
                  :class="game.phase === 'challenge' ? 'translate-y-0' : 'translate-y-[-10px] scale-110'"
                  :style="{ left: `${((game.currentItem.targetNumber - game.currentItem.lineRange[0]) / (game.currentItem.lineRange[1] - game.currentItem.lineRange[0])) * 100}%` }"
                >
                  <div class="relative flex flex-col items-center">
                    <SparkleIcon :size="32" class="text-gold-400 drop-shadow-sm animate-bounce" />
                    <!-- Flèche vers le bas -->
                    <div class="w-1 h-4 bg-gold-500 rounded-full" />
                  </div>
                  <!-- Révélation du nombre en phase de résolution -->
                  <div 
                    v-if="game.phase === 'response' || game.phase === 'resolution'"
                    class="mt-1 px-2 py-0.5 bg-meadow-100 text-meadow-700 rounded-md font-bold text-lg border border-meadow-200"
                  >
                    {{ game.currentItem.targetNumber }}
                  </div>
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
