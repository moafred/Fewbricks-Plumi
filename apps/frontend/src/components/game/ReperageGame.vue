<script setup lang="ts">
import { onMounted, onUnmounted, computed, watch, ref } from 'vue';
import { useReperageStore } from '@/stores/reperage';
import type { AnswerResult, ReperageTarget } from '@plumi/shared';
import { useBackNavigation, useSyncGameProgress } from '@/composables';
import GameHeader from '@/components/game/GameHeader.vue';
import ChallengeCard from '@/components/game/ChallengeCard.vue';
import WordChip from '@/components/game/WordChip.vue';
import type { WordChipState } from '@/components/game/WordChip.vue';
import ResolutionContinueButton from '@/components/game/ResolutionContinueButton.vue';
import GameFinished from '@/components/game/GameFinished.vue';
import KeyboardGuide from '@/components/ui/KeyboardGuide.vue';
import KeyboardHintsBar from '@/components/ui/KeyboardHintsBar.vue';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import { storeToRefs } from 'pinia';

const props = withDefaults(defineProps<{
  embedded?: boolean;
  count?: number;
  target?: ReperageTarget;
}>(), {
  embedded: false,
  count: 10,
  target: 'verb',
});

const emit = defineEmits<{
  home: [];
  'step-complete': [payload: { score: number; total: number; results: (AnswerResult | null)[] }];
}>();

const store = useReperageStore();
const {
  currentItem,
  phase,
  score,
  progress,
  lastResult,
  selectedWordIndex,
  isFinished,
} = storeToRefs(store);

// Keyboard navigation — custom pour les mots
const focusedWordIndex = ref(0);
const isChallenge = computed(() => phase.value === 'challenge');
const wordCount = computed(() => currentItem.value?.words.length ?? 0);

function handleKeydown(e: KeyboardEvent) {
  if (!isChallenge.value || wordCount.value === 0) return;

  if (e.key === 'ArrowRight') {
    e.preventDefault();
    focusedWordIndex.value = (focusedWordIndex.value + 1) % wordCount.value;
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    focusedWordIndex.value = (focusedWordIndex.value - 1 + wordCount.value) % wordCount.value;
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    store.submitAnswer(focusedWordIndex.value);
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  store.resetGame();
});

watch(
  () => store.currentIndex,
  () => { focusedWordIndex.value = 0; },
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
  store.startGame(props.count, props.target);
});

function wordState(wordIndex: number): WordChipState {
  if (phase.value === 'discovery') return 'dimmed';
  if (phase.value === 'challenge') {
    return wordIndex === focusedWordIndex.value ? 'focused' : 'idle';
  }

  // response or resolution
  const item = currentItem.value;
  if (!item) return 'dimmed';

  const isTarget = item.correctIndices.includes(wordIndex);
  const isSelected = wordIndex === selectedWordIndex.value;

  if (lastResult.value === 'correct') {
    if (isTarget) return 'correct';
    return 'dimmed';
  }

  // incorrect
  if (isTarget) return 'target';
  if (isSelected) return 'incorrect';
  return 'dimmed';
}

useSyncGameProgress(() => store.results, () => store.currentIndex);
</script>

<template>
  <div
    class="flex flex-col items-center w-full max-w-4xl mx-auto"
    :class="embedded ? 'h-full min-h-0 justify-between p-3 gap-3' : 'justify-center min-h-[80vh] p-4 gap-8'"
  >

    <GameHeader
      v-if="!embedded"
      label="Repérage"
      :current="progress.current + 1"
      :total="progress.total"
      color-class="text-coral-600"
      @back="handleBack"
    />

    <!-- Finished State -->
    <GameFinished
      v-if="isFinished && !embedded"
      title="Repérage Terminé !"
      :score="score"
      :total="progress.total"
      title-color="text-coral-600"
      @home="$emit('home')"
      @replay="store.startGame(count, target)"
    />

    <!-- Game Area -->
    <template v-else-if="currentItem">

      <ChallengeCard :hint="currentItem.hint" :compact="embedded" />

      <!-- Mots de la phrase -->
      <div class="flex flex-wrap items-center justify-center gap-3 md:gap-4 px-2">
        <WordChip
          v-for="(word, idx) in currentItem.words"
          :key="`${currentItem.id}-${idx}`"
          :word="word.word"
          :state="wordState(idx)"
          :disabled="phase !== 'challenge'"
          @tap="store.submitAnswer(idx)"
        />
        <!-- Ponctuation (non cliquable) -->
        <span class="text-xl md:text-2xl font-learning text-stone-400">
          {{ currentItem.sentence.slice(-1) }}
        </span>
      </div>

      <div class="flex flex-col items-center w-full" :class="embedded ? 'gap-2 pb-2' : 'gap-6 pb-8'">
        <KeyboardHintsBar v-if="phase === 'challenge'">
          <KeyboardGuide mode="cluster" label="Flèches pour choisir" />
          <KeyboardGuide mode="single" key-name="espace" label="Appuie pour valider" />
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
      title="Quitter le Repérage ?"
      message="Si tu sors maintenant, tu devras recommencer."
      confirm-label="Quitter"
      cancel-label="Continuer"
      @confirm="$emit('home')"
      @cancel="showQuitConfirmation = false"
    />
  </div>
</template>
