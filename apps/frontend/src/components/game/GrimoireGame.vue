<script setup lang="ts">
import { watch, onUnmounted } from 'vue';
import { useGrimoireStore } from '@/stores/grimoire';
import SpellChoice from './SpellChoice.vue';
import type { SpellState } from './SpellChoice.vue';
import WordCard from './WordCard.vue';
import ProgressStars from './ProgressStars.vue';
import GameResult from './GameResult.vue';

const emit = defineEmits<{
  home: [];
}>();

const game = useGrimoireStore();

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

function choiceState(choice: string): SpellState {
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

game.startGame();
</script>

<template>
  <div class="grimoire-game flex flex-col items-center justify-between min-h-screen px-4 py-6 gap-4">
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
        <template v-if="game.phase === 'discovery'">La formule apparaît...</template>
        <template v-else-if="game.phase === 'challenge'">Quelle est la bonne formule ?</template>
        <template v-else-if="game.lastResult === 'correct'">Bien joué !</template>
        <template v-else>
          C'était <strong class="text-enchant-300">{{ game.correctForm }}</strong>
        </template>
      </p>

      <!-- Prompt: pronoun → infinitive -->
      <div class="flex-1 flex items-center justify-center w-full">
        <WordCard
          v-if="game.currentItem"
          :pronoun="game.currentItem.pronoun"
          :form="game.currentItem.infinitive"
          :phase="game.phase"
          separator="→"
        />
      </div>

      <!-- 2×2 grid of choices -->
      <div class="grid grid-cols-2 gap-3 w-full max-w-md pb-8">
        <SpellChoice
          v-for="choice in game.currentItem?.choices"
          :key="choice"
          :label="choice"
          :state="choiceState(choice)"
          @tap="onTap"
        />
      </div>
    </template>
  </div>
</template>
