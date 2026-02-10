<script setup lang="ts">
import { onMounted, onUnmounted, computed, watch, ref } from 'vue';
import { usePonctuationStore } from '@/stores/ponctuation';
import type { AnswerResult } from '@plumi/shared';
import { useKeyboardNavigation, useBackNavigation, useSyncGameProgress } from '@/composables';
import GameLayout from '@/components/game/GameLayout.vue';
import ChoicesSection from '@/components/game/ChoicesSection.vue';
import GameHeader from '@/components/game/GameHeader.vue';
import ChallengeCard from '@/components/game/ChallengeCard.vue';
import ChoiceButton from '@/components/game/ChoiceButton.vue';
import type { ChoiceState } from '@/components/game/ChoiceButton.vue';
import ResolutionContinueButton from '@/components/game/ResolutionContinueButton.vue';
import GameFinished from '@/components/game/GameFinished.vue';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import { storeToRefs } from 'pinia';

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

const store = usePonctuationStore();
const {
  currentItem,
  phase,
  score,
  progress,
  lastResult,
  selectedChoice,
  correctAnswer,
  isFinished,
} = storeToRefs(store);

// Keyboard Navigation — 3 choix en ligne (1 colonne = 3)
const choices = computed(() => currentItem.value?.choices ?? []);
const isChallenge = computed(() => phase.value === 'challenge');

const { focusedIndex, resetFocus } = useKeyboardNavigation(
  choices,
  (choice) => store.submitAnswer(choice),
  isChallenge,
  3,
);

watch(
  () => store.currentIndex,
  () => resetFocus(),
);

// Back Navigation
const showQuitConfirmation = ref(false);

function handleBack() {
  if (isFinished.value) {
    emit('home');
  } else {
    showQuitConfirmation.value = true;
  }
}

useBackNavigation(handleBack, computed(() => !props.embedded && !showQuitConfirmation.value));

// Emettre step-complete en mode embedded
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
  store.startGame(props.count);
});

onUnmounted(() => {
  store.resetGame();
});

function choiceState(choice: string, index: number): ChoiceState {
  if (phase.value === 'challenge' || phase.value === 'discovery') {
    return (phase.value === 'challenge' && index === focusedIndex.value) ? 'focused' : 'idle';
  }
  if (choice === correctAnswer.value) return 'correct';
  if (choice === selectedChoice.value) return 'incorrect';
  return 'dimmed';
}

/** La phrase complète avec le bon signe après réponse */
const displaySentence = computed(() => {
  if (!currentItem.value) return '';
  if (phase.value === 'response' || phase.value === 'resolution') {
    return currentItem.value.sentenceWithoutPunctuation + correctAnswer.value;
  }
  return currentItem.value.sentenceWithoutPunctuation;
});

useSyncGameProgress(() => store.results, () => store.currentIndex);
</script>

<template>
  <GameLayout :embedded="embedded">

    <GameHeader
      v-if="!embedded"
      label="Ponctuation"
      :current="progress.current + 1"
      :total="progress.total"
      color-class="text-sky-600"
      @back="handleBack"
    />

    <!-- Finished State -->
    <GameFinished
      v-if="isFinished && !embedded"
      title="Ponctuation Terminée !"
      :score="score"
      :total="progress.total"
      title-color="text-sky-600"
      @home="$emit('home')"
      @replay="store.startGame()"
    />

    <!-- Game Area -->
    <template v-else-if="currentItem">

      <ChallengeCard hint="Quel signe de ponctuation ?" :compact="embedded">
        <div class="text-3xl md:text-5xl font-learning text-stone-800 text-center leading-relaxed">
          {{ displaySentence }}
          <span
            v-if="phase === 'challenge' || phase === 'discovery'"
            class="inline-block w-10 border-b-4 border-sky-400 ml-1"
          />
        </div>
      </ChallengeCard>

      <!-- 3 choix de ponctuation en ligne -->
      <ChoicesSection :embedded="embedded" :phase="phase">
        <div class="flex items-center justify-center gap-6 md:gap-10">
          <ChoiceButton
            v-for="(choice, index) in currentItem.choices"
            :key="choice"
            :label="choice"
            :state="choiceState(choice, index)"
            :disabled="phase !== 'challenge'"
            class="w-20 md:w-24 text-4xl md:text-5xl"
            @select="store.submitAnswer(choice)"
          />
        </div>
      </ChoicesSection>

      <ResolutionContinueButton
        :visible="phase === 'resolution'"
        :compact="embedded"
        @continue="store.nextItem()"
      />

    </template>

    <ConfirmModal
      v-if="showQuitConfirmation && !embedded"
      title="Quitter la Ponctuation ?"
      message="Si tu sors maintenant, tu devras recommencer."
      confirm-label="Quitter"
      cancel-label="Continuer"
      @confirm="$emit('home')"
      @cancel="showQuitConfirmation = false"
    />
  </GameLayout>
</template>
