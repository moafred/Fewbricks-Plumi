<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue';
import type { AnswerResult } from '@plumi/shared';
import { useTriNombresStore } from '@/stores/tri-nombres';
import { useKeyboardNavigation, useBackNavigation, useSyncGameProgress } from '@/composables';
import CategoryButton from './CategoryButton.vue';
import type { CategoryButtonState } from './CategoryButton.vue';
import ProgressStars from './ProgressStars.vue';
import GameResult from './GameResult.vue';
import KeyboardGuide from '@/components/ui/KeyboardGuide.vue';
import KeyboardHintsBar from '@/components/ui/KeyboardHintsBar.vue';
import NotebookCard from '@/components/ui/NotebookCard.vue';

const props = withDefaults(defineProps<{
  embedded?: boolean;
  count?: number;
  numberRange?: [number, number];
  categories?: string[];
}>(), {
  embedded: false,
  count: 10,
});

const emit = defineEmits<{
  home: [];
  'step-complete': [payload: { score: number; total: number; results: (AnswerResult | null)[] }];
}>();

const game = useTriNombresStore();

const categoryChoices = computed(() => game.currentCategories);
const isChallenge = computed(() => game.phase === 'challenge');

const { focusedIndex, resetFocus } = useKeyboardNavigation(
  categoryChoices,
  (category) => game.submitAnswer(category),
  isChallenge,
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

function onTap(category: string) {
  game.submitAnswer(category);
}

function categoryState(category: string): CategoryButtonState {
  const { phase, lastResult, lastCorrectCategory } = game;

  if (phase === 'discovery') return 'idle';
  if (phase === 'challenge') return 'waiting';

  if (lastResult === 'correct') {
    return category === lastCorrectCategory ? 'correct' : 'idle';
  }
  if (category === lastCorrectCategory) return 'reveal';
  return 'incorrect';
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

game.startGame(props.count, {
  numberRange: props.numberRange,
  categories: props.categories,
});

useSyncGameProgress(() => game.results, () => game.currentIndex);
</script>

<template>
  <div
    class="tri-nombres-game flex flex-col items-center justify-between px-4"
    :class="embedded ? 'h-full min-h-0 py-2 gap-2' : 'min-h-screen py-6 gap-4'"
  >
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
      <p class="text-lg md:text-xl text-stone-600 text-center">
        <template v-if="game.phase === 'discovery'">Un nombre apparaît...</template>
        <template v-else-if="game.phase === 'challenge'">Dans quelle catégorie ?</template>
        <template v-else-if="game.lastResult === 'correct'">Bien joué !</template>
        <template v-else>
          C'est <strong class="text-meadow-600">{{ game.lastCorrectCategory }}</strong>
        </template>
      </p>

      <!-- Number card -->
      <div class="flex-1 flex items-center justify-center w-full">
        <NotebookCard v-if="game.currentItem" :class="embedded ? 'px-6 py-3' : 'px-12 py-8'" :padding="embedded ? 'sm' : 'md'">
          <span :class="embedded ? 'text-2xl md:text-4xl' : 'text-4xl md:text-6xl'" class="font-bold text-sky-600">
            {{ game.currentItem.number }}
          </span>
        </NotebookCard>
      </div>

      <!-- Sorting hats (catégories) -->
      <div class="flex flex-col items-center" :class="embedded ? 'gap-2 pb-2' : 'gap-6 pb-8'">
        <div class="flex items-center justify-center gap-10 md:gap-16">
          <CategoryButton
            v-for="(category, idx) in categoryChoices"
            :key="category"
            :category-id="category"
            :label="category"
            :state="categoryState(category)"
            :color-scheme="idx === 0 ? 'meadow' : 'gold'"
            :focused="focusedIndex === idx && game.phase === 'challenge'"
            @tap="onTap"
          />
        </div>

        <KeyboardHintsBar v-if="game.phase === 'challenge'">
          <KeyboardGuide mode="cluster" label="Flèches pour choisir" />
          <KeyboardGuide mode="single" key-name="espace" label="Appuie pour valider" />
        </KeyboardHintsBar>
      </div>
    </template>
  </div>
</template>
