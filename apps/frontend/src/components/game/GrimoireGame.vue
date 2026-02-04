<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import type { Tense } from '@plumi/shared';
import { useGrimoireStore } from '@/stores/grimoire';
import { useKeyboardNavigation, useBackNavigation } from '@/composables';
import SpellChoice from './SpellChoice.vue';
import type { SpellState } from './SpellChoice.vue';
import KeyboardGuide from '@/components/ui/KeyboardGuide.vue';
import WordCard from './WordCard.vue';
import ProgressStars from './ProgressStars.vue';
import GameResult from './GameResult.vue';

const props = withDefaults(defineProps<{ tense?: Tense }>(), { tense: 'present' });

const emit = defineEmits<{
  home: [];
}>();

const game = useGrimoireStore();

const tenseLabels: Record<Tense, string> = {
  present: 'Présent',
  futur: 'Futur',
  imparfait: 'Imparfait',
  passe_compose: 'Passé composé',
};

// Navigation clavier (grille 2x2)
const choices = computed(() => game.currentItem?.choices ?? []);
const isChallenge = computed(() => game.phase === 'challenge');

const { focusedIndex, resetFocus } = useKeyboardNavigation(
  choices,
  (choice) => game.submitAnswer(choice),
  isChallenge,
  2, // 2 colonnes pour la grille 2×2
);

// Reset focus quand on passe à un nouvel item
watch(
  () => game.currentIndex,
  () => resetFocus(),
);

// Navigation retour vers l'accueil
const canGoBack = ref(true);
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

game.startGame(props.tense);
</script>

<template>
  <div class="grimoire-game flex flex-col items-center justify-between min-h-screen px-4 py-6 gap-4">
    <!-- Finished: show results -->
    <template v-if="game.isFinished">
      <div class="flex-1 flex items-center justify-center w-full">
        <GameResult
          :score="game.score"
          :total="game.items.length"
          @replay="game.startGame(game.currentTense)"
          @home="emit('home')"
        />
      </div>
    </template>

    <!-- Playing -->
    <template v-else>
      <!-- Header: tense badge + progress stars -->
      <div class="w-full max-w-md flex flex-col gap-2">
        <span class="self-center px-3 py-1 rounded-full bg-royal-500/30 text-royal-200 text-sm font-medium">
          {{ tenseLabels[game.currentTense] }}
        </span>
        <ProgressStars
          :results="game.results"
          :current="game.currentIndex"
        />
      </div>

      <!-- Instruction -->
      <p class="text-xl md:text-2xl font-bold text-purple-100 text-center drop-shadow-sm">
        <template v-if="game.phase === 'discovery'">La formule apparaît...</template>
        <template v-else-if="game.phase === 'challenge'">Quelle est la bonne formule ?</template>
        <template v-else-if="game.lastResult === 'correct'">Bien joué !</template>
        <template v-else>
          C'était <strong class="text-enchant-300">{{ game.correctForm }}</strong>
        </template>
      </p>

      <!-- Prompt: pronoun → infinitive -->
      <div class="flex-1 flex items-center justify-center w-full py-12">
        <div class="w-full max-w-2xl px-4 flex justify-center">
          <WordCard
            v-if="game.currentItem"
            :pronoun="game.currentItem.pronoun"
            :form="game.currentItem.infinitive"
            :phase="game.phase"
            separator="→"
          />
        </div>
      </div>

      <!-- 2×2 grid of choices -->
      <div class="flex flex-col items-center gap-8 pb-12 w-full">
        <div class="grid grid-cols-2 gap-6 w-full max-w-2xl px-6">
          <SpellChoice
            v-for="(choice, index) in game.currentItem?.choices"
            :key="choice"
            :label="choice"
            :state="choiceState(choice)"
            :focused="focusedIndex === index && game.phase === 'challenge'"
            @tap="onTap"
          />
        </div>

        <!-- Keyboard Hints -->
        <div v-if="game.phase === 'challenge'" class="hidden lg:flex gap-8 opacity-60">
           <KeyboardGuide mode="cluster" label="choisir" />
           <KeyboardGuide mode="single" key-name="espace" label="lancer le sort" />
        </div>
      </div>
    </template>
  </div>
</template>
