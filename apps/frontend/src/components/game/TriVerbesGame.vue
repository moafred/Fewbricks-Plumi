<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import type { VerbId, Tense, Pronoun, AnswerResult } from '@plumi/shared';
import { getInfinitive } from '@plumi/shared';
import { useGameStore } from '@/stores/game';
import { useKeyboardNavigation, useBackNavigation, useSyncGameProgress } from '@/composables';
import GameLayout from '@/components/game/GameLayout.vue';
import ChoicesSection from '@/components/game/ChoicesSection.vue';
import GameHeader from '@/components/game/GameHeader.vue';
import GameInstruction from '@/components/game/GameInstruction.vue';
import CategoryButton from './CategoryButton.vue';
import WordCard from './WordCard.vue';
import GameResult from './GameResult.vue';
import type { CategoryButtonState } from './CategoryButton.vue';

const props = withDefaults(defineProps<{
  tense?: Tense;
  embedded?: boolean;
  count?: number;
  pronouns?: Pronoun[];
  verbs?: VerbId[];
}>(), {
  tense: 'present',
  embedded: false,
  count: 10,
});

const emit = defineEmits<{
  home: [];
  'step-complete': [payload: { score: number; total: number; results: (AnswerResult | null)[] }];
}>();

const game = useGameStore();

const { progress } = game;

// Les deux choix possibles — dynamiques selon les verbes du chapitre
const categoryChoices = ref<VerbId[]>(
  props.verbs && props.verbs.length === 2 ? [...props.verbs] : ['etre', 'avoir'],
);
const isChallenge = computed(() => game.phase === 'challenge');

const { focusedIndex, resetFocus } = useKeyboardNavigation(
  categoryChoices,
  (verbId) => game.submitAnswer(verbId),
  isChallenge,
);

// Reset focus quand on passe à un nouvel item
watch(
  () => game.currentIndex,
  () => resetFocus(),
);

// Navigation retour vers l'accueil (désactivée en mode embedded, ChapterRunner gère)
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

function onTap(categoryId: string) {
  game.submitAnswer(categoryId as VerbId);
}

function categoryState(verbId: VerbId): CategoryButtonState {
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

// Emettre step-complete en mode embedded
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

game.startGame(props.tense, props.count, {
  pronouns: props.pronouns,
  verbs: props.verbs,
});

useSyncGameProgress(() => game.results, () => game.currentIndex);
</script>

<template>
  <GameLayout :embedded="embedded">
    <GameHeader
      v-if="!embedded"
      label="Tri Verbes"
      :current="progress.current + 1"
      :total="progress.total"
      color-class="text-meadow-600"
      @back="handleBack"
    />

    <!-- Finished: show results -->
    <template v-if="game.isFinished && !embedded">
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
      <!-- Instruction -->
      <GameInstruction
        :phase="game.phase"
        :last-result="game.lastResult"
        discovery="Le mot apparaît..."
        challenge="Dans quelle catégorie ?"
        :correct-answer="game.currentItem?.infinitive"
      />

      <!-- Word card -->
      <div class="flex-1 flex items-center justify-center w-full">
        <WordCard
          v-if="game.currentItem"
          :pronoun="game.currentItem.pronoun"
          :form="game.currentItem.form"
          :phase="game.phase"
          :compact="embedded"
        />
      </div>

      <!-- Catégories de tri -->
      <ChoicesSection :embedded="embedded" :phase="game.phase">
        <div class="flex items-center justify-center gap-10 md:gap-16">
          <CategoryButton
            v-for="(verbId, idx) in categoryChoices"
            :key="verbId"
            :category-id="verbId"
            :label="getInfinitive(verbId)"
            :state="categoryState(verbId)"
            :color-scheme="idx === 0 ? 'meadow' : 'gold'"
            :focused="focusedIndex === idx && game.phase === 'challenge'"
            @tap="onTap"
          />
        </div>
      </ChoicesSection>
    </template>
  </GameLayout>
</template>
