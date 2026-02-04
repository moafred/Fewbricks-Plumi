<script setup lang="ts">
import { watch, onUnmounted } from 'vue';
import type { VerbId } from '@plumi/shared';
import { useGameStore } from '@/stores/game';
import SortingHat from './SortingHat.vue';
import WordCard from './WordCard.vue';
import ProgressStars from './ProgressStars.vue';
import GameResult from './GameResult.vue';
import type { HatState } from './SortingHat.vue';

const emit = defineEmits<{
  home: [];
}>();

const game = useGameStore();

let resolutionTimer: ReturnType<typeof setTimeout> | null = null;

function clearResolutionTimer() {
  if (resolutionTimer !== null) {
    clearTimeout(resolutionTimer);
    resolutionTimer = null;
  }
}

// Auto-advance after resolution phase
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

function onTap(verbId: VerbId) {
  game.submitAnswer(verbId);
}

function hatState(verbId: VerbId): HatState {
  const { phase, lastResult, lastCorrectVerb } = game;

  if (phase === 'discovery') return 'idle';
  if (phase === 'challenge') return 'waiting';

  // response or resolution
  if (lastResult === 'correct') {
    return verbId === lastCorrectVerb ? 'correct' : 'idle';
  }
  // incorrect
  if (verbId === lastCorrectVerb) return 'reveal';
  return 'incorrect';
}

// Start the game on mount
game.startGame();
</script>

<template>
  <div class="tri-sorcier-game flex flex-col items-center justify-between min-h-screen px-4 py-6 gap-4">
    <!-- Finished: show results -->
    <template v-if="game.isFinished">
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
      <!-- Progress stars -->
      <div class="w-full max-w-md">
        <ProgressStars
          :results="game.results"
          :current="game.currentIndex"
        />
      </div>

      <!-- Instruction -->
      <p class="text-lg md:text-xl text-purple-200 text-center">
        <template v-if="game.phase === 'discovery'">Le mot apparaît...</template>
        <template v-else-if="game.phase === 'challenge'">Dans quel chapeau ?</template>
        <template v-else-if="game.lastResult === 'correct'">Bien joué !</template>
        <template v-else>
          C'est <strong class="text-enchant-300">{{ game.currentItem?.infinitive }}</strong>
        </template>
      </p>

      <!-- Word card -->
      <div class="flex-1 flex items-center justify-center w-full">
        <WordCard
          v-if="game.currentItem"
          :pronoun="game.currentItem.pronoun"
          :form="game.currentItem.form"
          :phase="game.phase"
        />
      </div>

      <!-- Sorting hats -->
      <div class="flex items-center justify-center gap-6 md:gap-12 pb-8">
        <SortingHat
          verb-id="etre"
          label="être"
          :state="hatState('etre')"
          @tap="onTap"
        />
        <SortingHat
          verb-id="avoir"
          label="avoir"
          :state="hatState('avoir')"
          @tap="onTap"
        />
      </div>
    </template>
  </div>
</template>
