<script setup lang="ts">
import { onMounted, onUnmounted, computed, watch, ref } from 'vue';
import { useEncrierStore } from '@/stores/encrier';
import type { Tense, Pronoun, AnswerResult, VerbId } from '@plumi/shared';
import { useKeyboardNavigation, useBackNavigation } from '@/composables';
import SentenceGap from '@/components/game/SentenceGap.vue';
import GameHeader from '@/components/game/GameHeader.vue';
import ChallengeCard from '@/components/game/ChallengeCard.vue';
import ChoiceButton from '@/components/game/ChoiceButton.vue';
import type { ChoiceState } from '@/components/game/ChoiceButton.vue';
import ChoiceGrid from '@/components/game/ChoiceGrid.vue';
import ResolutionContinueButton from '@/components/game/ResolutionContinueButton.vue';
import GameFinished from '@/components/game/GameFinished.vue';
import KeyboardGuide from '@/components/ui/KeyboardGuide.vue';
import KeyboardHintsBar from '@/components/ui/KeyboardHintsBar.vue';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import { storeToRefs } from 'pinia';

// Props
const props = withDefaults(defineProps<{
  tense: Tense | Tense[];
  embedded?: boolean;
  count?: number;
  pronouns?: Pronoun[];
  verbs?: VerbId[];
}>(), {
  embedded: false,
  count: 10,
});

const emit = defineEmits<{
  home: [];
  'step-complete': [payload: { score: number; total: number; results: (AnswerResult | null)[] }];
}>();

const store = useEncrierStore();
const {
  currentItem,
  phase,
  score,
  progress,
  lastResult,
  selectedChoice,
  isFinished
} = storeToRefs(store);

// Keyboard Navigation
const choices = computed(() => currentItem.value?.choices ?? []);
const isChallenge = computed(() => phase.value === 'challenge');

const { focusedIndex, resetFocus } = useKeyboardNavigation(
  choices,
  (choice) => store.submitAnswer(choice),
  isChallenge,
  2 // Grid cols
);

watch(
  () => store.currentIndex,
  () => resetFocus()
);

// Handle tense prop: can be single or array
const tenses = computed(() => {
  return Array.isArray(props.tense) ? props.tense : [props.tense];
});

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
  store.startGame(tenses.value, props.count, { pronouns: props.pronouns, verbs: props.verbs });
});

onUnmounted(() => {
  store.resetGame();
});

function choiceState(choice: string, index: number): ChoiceState {
  if (phase.value === 'challenge' || phase.value === 'discovery') {
    return (phase.value === 'challenge' && index === focusedIndex.value) ? 'focused' : 'idle';
  }
  if (choice === currentItem.value?.correctForm) return 'correct';
  if (choice === selectedChoice.value) return 'incorrect';
  return 'dimmed';
}

// Determine what valid word to show in the gap
const gapWord = computed(() => {
  if (phase.value === 'response' || phase.value === 'resolution') {
    return currentItem.value?.correctForm;
  }
  return undefined;
});

// Is the gap word effectively "correct" logic for styling?
// Always true if we show it (since we only show the correct answer in the gap per spec)
const isGapCorrect = computed(() => !!gapWord.value);

</script>

<template>
  <div
    class="flex flex-col items-center w-full max-w-4xl mx-auto"
    :class="embedded ? 'h-full min-h-0 justify-between p-3 gap-3' : 'justify-center min-h-[80vh] p-4 gap-8'"
  >

    <GameHeader
      v-if="!embedded"
      label="Encrier"
      :current="progress.current + 1"
      :total="progress.total"
      color-class="text-gold-400"
      @back="handleBack"
    />

    <!-- Finished State -->
    <GameFinished
      v-if="isFinished && !embedded"
      title="Encrier Complété !"
      :score="score"
      :total="progress.total"
      @home="$emit('home')"
      @replay="store.startGame(tenses)"
    />

    <!-- Game Area -->
    <template v-else-if="currentItem">

      <ChallengeCard hint="Complète la phrase !" :compact="embedded">
        <SentenceGap
          :sentence="currentItem.sentence"
          :filled-word="gapWord"
          :is-correct="isGapCorrect"
          :is-wrong="false"
        />
        <template #footer>
          <div class="text-sky-400 font-sans text-sm">
            ({{ currentItem.infinitive }})
          </div>
        </template>
      </ChallengeCard>

      <!-- Choices -->
      <div class="flex flex-col items-center w-full" :class="embedded ? 'gap-2 pb-2' : 'gap-10 pb-12'">
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

        <KeyboardHintsBar v-if="phase === 'challenge'">
          <KeyboardGuide mode="cluster" label="choisir" />
          <KeyboardGuide mode="single" key-name="espace" label="valider" />
        </KeyboardHintsBar>
      </div>

      <ResolutionContinueButton
        :visible="phase === 'resolution'"
        :compact="embedded"
        @continue="store.nextItem()"
      />

    </template>

    <ConfirmModal
      v-if="showQuitConfirmation && !embedded"
      title="Quitter l'Encrier ?"
      message="Si tu sors maintenant, tu devras recommencer."
      confirm-label="Quitter"
      cancel-label="Continuer"
      @confirm="$emit('home')"
      @cancel="showQuitConfirmation = false"
    />
  </div>
</template>
