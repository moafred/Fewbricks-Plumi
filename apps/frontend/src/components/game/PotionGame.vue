<script setup lang="ts">
import { onMounted, onUnmounted, computed, watch, ref } from 'vue';
import { usePotionStore } from '@/stores/potion';
import type { Tense, Pronoun, AnswerResult } from '@plumi/shared';
import { useKeyboardNavigation, useBackNavigation } from '@/composables';
import SentenceGap from '@/components/game/SentenceGap.vue';
import GameHeader from '@/components/game/GameHeader.vue';
import ChallengeCard from '@/components/game/ChallengeCard.vue';
import ChoiceButton from '@/components/game/ChoiceButton.vue';
import type { ChoiceState } from '@/components/game/ChoiceButton.vue';
import GameFinished from '@/components/game/GameFinished.vue';
import MagicButton from '@/components/ui/MagicButton.vue';
import KeyboardGuide from '@/components/ui/KeyboardGuide.vue';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import { storeToRefs } from 'pinia';

// Props
const props = withDefaults(defineProps<{
  tense: Tense | Tense[];
  embedded?: boolean;
  count?: number;
  pronouns?: Pronoun[];
}>(), {
  embedded: false,
  count: 10,
});

const emit = defineEmits<{
  home: [];
  'step-complete': [payload: { score: number; total: number; results: (AnswerResult | null)[] }];
}>();

const store = usePotionStore();
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
  store.startGame(tenses.value, props.count, { pronouns: props.pronouns });
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
  <div class="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto p-4 gap-8">

    <GameHeader
      v-if="!embedded"
      label="Potion"
      :current="progress.current + 1"
      :total="progress.total"
      color-class="text-magic-300"
      @back="handleBack"
    />

    <!-- Finished State -->
    <GameFinished
      v-if="isFinished && !embedded"
      title="Potion Complétée !"
      :score="score"
      :total="progress.total"
      @home="$emit('home')"
      @replay="store.startGame(tenses)"
    />

    <!-- Game Area -->
    <template v-else-if="currentItem">

      <ChallengeCard hint="Complète la formule !">
        <SentenceGap
          :sentence="currentItem.sentence"
          :filled-word="gapWord"
          :is-correct="isGapCorrect"
          :is-wrong="false"
        />
        <template #footer>
          <div class="text-royal-300 font-sans text-sm">
            ({{ currentItem.infinitive }})
          </div>
        </template>
      </ChallengeCard>

      <!-- Choices -->
      <div class="flex flex-col items-center gap-10 pb-12 w-full">
        <div class="grid grid-cols-2 gap-6 w-full max-w-3xl px-6">
          <ChoiceButton
            v-for="(choice, index) in currentItem.choices"
            :key="choice"
            :label="choice"
            :state="choiceState(choice, index)"
            :disabled="phase !== 'challenge'"
            @select="store.submitAnswer(choice)"
          />
        </div>

        <div v-if="phase === 'challenge'" class="hidden lg:flex gap-8 opacity-60">
          <KeyboardGuide mode="cluster" label="choisir" />
          <KeyboardGuide mode="single" key-name="espace" label="verser" />
        </div>
      </div>

      <div class="h-16 flex items-center justify-center w-full">
        <div v-if="phase === 'resolution'" class="animate-fade-in">
          <MagicButton variant="primary" @click="store.nextItem()">
            Continuer →
          </MagicButton>
        </div>
      </div>

    </template>

    <ConfirmModal
      v-if="showQuitConfirmation && !embedded"
      title="Quitter la Potion ?"
      message="Si tu sors maintenant, tu devras recommencer."
      confirm-label="Quitter"
      cancel-label="Continuer"
      @confirm="$emit('home')"
      @cancel="showQuitConfirmation = false"
    />
  </div>
</template>
