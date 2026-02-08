<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue';
import type { AnswerResult } from '@plumi/shared';
import { useTriPhrasesStore } from '@/stores/tri-phrases';
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
}>(), {
  embedded: false,
  count: 10,
});

const emit = defineEmits<{
  home: [];
  'step-complete': [payload: { score: number; total: number; results: (AnswerResult | null)[] }];
}>();

const game = useTriPhrasesStore();

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

game.startGame(props.count);

useSyncGameProgress(() => game.results, () => game.currentIndex);
</script>

<template>
  <div
    class="tri-phrases-game flex flex-col items-center px-4"
    :class="embedded ? 'h-full min-h-0 py-2 gap-2' : 'min-h-screen justify-between py-6 gap-4'"
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
      <!-- Header: progress stars (mode standalone uniquement, ChapterRunner affiche les siennes) -->
      <div v-if="!embedded" class="w-full max-w-md flex flex-col gap-2">
        <ProgressStars
          :results="game.results"
          :current="game.currentIndex"
        />
      </div>

      <!-- Instruction -->
      <p class="text-lg md:text-xl text-stone-600 text-center">
        <template v-if="game.phase === 'discovery'">Lis bien le texte...</template>
        <template v-else-if="game.phase === 'challenge'">Phrase ou pas phrase ?</template>
        <template v-else-if="game.lastResult === 'correct'">Bien joué !</template>
        <template v-else>
          C'est <strong class="text-meadow-600">{{ game.lastCorrectCategory }}</strong>
        </template>
      </p>

      <!-- Text card -->
      <div class="flex-1 flex items-center justify-center w-full">
        <NotebookCard v-if="game.currentItem" :class="embedded ? 'px-4 py-3' : 'px-8 py-6'" :padding="embedded ? 'sm' : 'md'">
          <span :class="embedded ? 'text-lg md:text-2xl' : 'text-2xl md:text-4xl'" class="font-learning text-stone-800 text-center leading-relaxed">
            {{ game.currentItem.text }}
          </span>
        </NotebookCard>
      </div>

      <!-- Category buttons -->
      <div class="flex flex-col items-center" :class="embedded ? 'gap-2 pb-2' : 'gap-6 pb-8'">
        <div class="flex items-center justify-center gap-10 md:gap-16">
          <CategoryButton
            v-for="(category, idx) in categoryChoices"
            :key="category"
            :category-id="category"
            :label="category"
            :state="categoryState(category)"
            :color-scheme="idx === 0 ? 'meadow' : 'coral'"
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
