<script setup lang="ts">
import { onMounted, onUnmounted, computed, watch, ref } from 'vue';
import { useEncrierCalculStore } from '@/stores/encrier-calcul';
import type { AnswerResult, MathOperation } from '@plumi/shared';
import { useKeyboardNavigation, useBackNavigation, useSyncGameProgress } from '@/composables';
import GameLayout from '@/components/game/GameLayout.vue';
import ChoicesSection from '@/components/game/ChoicesSection.vue';
import SentenceGap from '@/components/game/SentenceGap.vue';
import GameHeader from '@/components/game/GameHeader.vue';
import GameInstruction from '@/components/game/GameInstruction.vue';
import ChallengeCard from '@/components/game/ChallengeCard.vue';
import ChoiceButton from '@/components/game/ChoiceButton.vue';
import type { ChoiceState } from '@/components/game/ChoiceButton.vue';
import ChoiceGrid from './ChoiceGrid.vue';
import ResolutionContinueButton from '@/components/game/ResolutionContinueButton.vue';
import GameFinished from '@/components/game/GameFinished.vue';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import { storeToRefs } from 'pinia';

const props = withDefaults(defineProps<{
  embedded?: boolean;
  count?: number;
  numberRange?: [number, number];
  operations?: MathOperation[];
}>(), {
  embedded: false,
  count: 10,
});

const emit = defineEmits<{
  home: [];
  'step-complete': [payload: { score: number; total: number; results: (AnswerResult | null)[] }];
}>();

const store = useEncrierCalculStore();
const {
  currentItem,
  phase,
  score,
  progress,
  lastResult,
  selectedChoice,
  isFinished,
} = storeToRefs(store);

const choices = computed(() => currentItem.value?.choices ?? []);
const isChallenge = computed(() => phase.value === 'challenge');

const { focusedIndex, resetFocus } = useKeyboardNavigation(
  choices,
  (choice) => store.submitAnswer(choice),
  isChallenge,
  2,
);

watch(
  () => store.currentIndex,
  () => resetFocus(),
);

const showQuitConfirmation = ref(false);

function handleBack() {
  if (isFinished.value) {
    emit('home');
  } else {
    showQuitConfirmation.value = true;
  }
}

useBackNavigation(handleBack, computed(() => !props.embedded && !showQuitConfirmation.value));

if (props.embedded) {
  watch(
    () => store.isFinished,
    (finished) => {
      if (finished) {
        emit('step-complete', {
          score: store.score,
          total: store.items.length,
          results: [...store.results],
        });
      }
    },
  );
}

onMounted(() => {
  store.startGame(props.count, {
    operations: props.operations,
    numberRange: props.numberRange,
  });
});

onUnmounted(() => {
  store.resetGame();
});

function choiceState(choice: string, index: number): ChoiceState {
  if (phase.value === 'challenge' || phase.value === 'discovery') {
    return (phase.value === 'challenge' && index === focusedIndex.value) ? 'focused' : 'idle';
  }
  if (choice === currentItem.value?.correctAnswer) return 'correct';
  if (choice === selectedChoice.value) return 'incorrect';
  return 'dimmed';
}

const gapWord = computed(() => {
  if (phase.value === 'response' || phase.value === 'resolution') {
    return currentItem.value?.correctAnswer;
  }
  return undefined;
});

const isGapCorrect = computed(() => !!gapWord.value);

useSyncGameProgress(() => store.results, () => store.currentIndex);
</script>

<template>
  <GameLayout :embedded="embedded">

    <GameHeader
      v-if="!embedded"
      label="Calcul"
      :current="progress.current + 1"
      :total="progress.total"
      color-class="text-gold-400"
      @back="handleBack"
    />

    <!-- Finished State -->
    <GameFinished
      v-if="isFinished && !embedded"
      title="Calcul Terminé !"
      :score="score"
      :total="progress.total"
      @home="$emit('home')"
      @replay="store.startGame()"
    />

    <!-- Game Area -->
    <template v-else-if="currentItem">

      <GameInstruction
        :phase="phase"
        :last-result="lastResult"
        challenge="Complète le calcul !"
        :correct-answer="currentItem.correctAnswer"
      />

      <ChallengeCard :compact="embedded">
        <SentenceGap
          :sentence="currentItem.sentence"
          :filled-word="gapWord"
          :is-correct="isGapCorrect"
          :is-wrong="false"
        />
      </ChallengeCard>

      <!-- Choices -->
      <ChoicesSection :embedded="embedded" :phase="phase">
        <ChoiceGrid>
          <ChoiceButton
            v-for="(choice, index) in currentItem.choices"
            :key="choice"
            :label="choice"
            :state="choiceState(choice, index)"
            :disabled="phase !== 'challenge'"
            @select="store.submitAnswer(choice)"
          />
        </ChoiceGrid>
      </ChoicesSection>

      <ResolutionContinueButton
        :visible="phase === 'resolution'"
        :compact="embedded"
        @continue="store.nextItem()"
      />

    </template>

    <ConfirmModal
      v-if="showQuitConfirmation && !embedded"
      title="Quitter le calcul ?"
      message="Si tu sors maintenant, tu devras recommencer."
      confirm-label="Quitter"
      cancel-label="Continuer"
      @confirm="$emit('home')"
      @cancel="showQuitConfirmation = false"
    />
  </GameLayout>
</template>
