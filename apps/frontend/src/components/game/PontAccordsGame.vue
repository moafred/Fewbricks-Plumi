<script setup lang="ts">
import { onMounted, onUnmounted, computed, watch, ref } from 'vue';
import { usePontAccordsStore } from '@/stores/pont-accords';
import type { AnswerResult } from '@plumi/shared';
import { useKeyboardNavigation, useBackNavigation } from '@/composables';
import GameHeader from '@/components/game/GameHeader.vue';
import ChallengeCard from '@/components/game/ChallengeCard.vue';
import ChoiceButton from '@/components/game/ChoiceButton.vue';
import type { ChoiceState } from '@/components/game/ChoiceButton.vue';
import GameFinished from '@/components/game/GameFinished.vue';
import MagicButton from '@/components/ui/MagicButton.vue';
import KeyboardGuide from '@/components/ui/KeyboardGuide.vue';
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

const store = usePontAccordsStore();
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

// Keyboard Navigation
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

// Mot affiché dans le trou après réponse
const filledWord = computed(() => {
  if (phase.value === 'response' || phase.value === 'resolution') {
    return correctAnswer.value;
  }
  return undefined;
});

// Classes CSS du trou selon la phase et le résultat (fond sombre)
const gapClasses = computed(() => {
  if (phase.value === 'response' || phase.value === 'resolution') {
    if (lastResult.value === 'correct') {
      return 'text-enchant-300 font-bold scale-110 transform border-enchant-400';
    }
    return 'text-gentle-300 border-gentle-400';
  }
  // Phase discovery / challenge : état idle
  return 'border-forest-400 bg-forest-500/20';
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto p-4 gap-8">

    <GameHeader
      v-if="!embedded"
      label="Pont"
      :current="progress.current + 1"
      :total="progress.total"
      color-class="text-forest-300"
      @back="handleBack"
    />

    <!-- Finished State -->
    <GameFinished
      v-if="isFinished && !embedded"
      title="Pont Complété !"
      :score="score"
      :total="progress.total"
      title-color="text-forest-400"
      @home="$emit('home')"
      @replay="store.startGame()"
    />

    <!-- Game Area -->
    <template v-else-if="currentItem">

      <ChallengeCard hint="Complète le groupe nominal !">
        <div class="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-4 text-3xl md:text-5xl font-learning text-white">
          <template v-for="(slot, i) in currentItem.slots" :key="i">
            <span v-if="i !== currentItem.targetSlotIndex">{{ slot.label }}</span>
            <div
              v-else
              class="inline-flex items-center justify-center min-w-[100px] px-3 py-1 border-b-4 rounded-t-lg transition-all duration-500"
              :class="gapClasses"
            >
              <span v-if="filledWord">{{ filledWord }}</span>
              <span v-else class="opacity-0">mot</span>
            </div>
          </template>
        </div>
        <template #footer>
          <div class="text-forest-300 font-sans text-sm">
            ({{ currentItem.hint }})
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
          <KeyboardGuide mode="single" key-name="espace" label="traverser" />
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
      title="Quitter le Pont des Accords ?"
      message="Si tu sors maintenant, tu devras recommencer."
      confirm-label="Quitter"
      cancel-label="Continuer"
      @confirm="$emit('home')"
      @cancel="showQuitConfirmation = false"
    />
  </div>
</template>
