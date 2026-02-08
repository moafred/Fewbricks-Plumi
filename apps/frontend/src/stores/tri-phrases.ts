import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { GamePhase, AnswerResult, PhraseSortingItem } from '@plumi/shared';
import { generatePhraseSortingItems } from '@plumi/shared';

const DISCOVERY_DELAY = 1500;

export const useTriPhrasesStore = defineStore('tri-phrases', () => {
  // --- State ---
  const phase = ref<GamePhase>('discovery');
  const items = ref<PhraseSortingItem[]>([]);
  const currentIndex = ref(0);
  const score = ref(0);
  const lastResult = ref<AnswerResult | null>(null);
  const lastCorrectCategory = ref<string | null>(null);
  const results = ref<(AnswerResult | null)[]>([]);
  const currentCategories = ref<[string, string]>(['Phrase', 'Pas une phrase']);

  let phaseTimer: ReturnType<typeof setTimeout> | null = null;

  // --- Getters ---
  const currentItem = computed(() => items.value[currentIndex.value] ?? null);
  const isFinished = computed(() => currentIndex.value >= items.value.length && items.value.length > 0);
  const progress = computed(() => ({
    current: currentIndex.value,
    total: items.value.length,
  }));

  // --- Internal ---
  function clearTimer() {
    if (phaseTimer !== null) {
      clearTimeout(phaseTimer);
      phaseTimer = null;
    }
  }

  function transitionTo(newPhase: GamePhase, delay?: number) {
    if (delay) {
      phaseTimer = setTimeout(() => {
        phase.value = newPhase;
        onPhaseEnter(newPhase);
      }, delay);
    } else {
      phase.value = newPhase;
      onPhaseEnter(newPhase);
    }
  }

  function onPhaseEnter(p: GamePhase) {
    if (p === 'discovery') {
      transitionTo('challenge', DISCOVERY_DELAY);
    }
  }

  // --- Actions ---
  function startGame(count: number = 10) {
    clearTimer();
    items.value = generatePhraseSortingItems(count);
    currentIndex.value = 0;
    score.value = 0;
    lastResult.value = null;
    lastCorrectCategory.value = null;
    results.value = new Array(items.value.length).fill(null);
    phase.value = 'discovery';
    onPhaseEnter('discovery');
  }

  function submitAnswer(category: string) {
    if (phase.value !== 'challenge') return;
    clearTimer();

    const item = currentItem.value;
    if (!item) return;

    const correct = category === item.category;
    lastResult.value = correct ? 'correct' : 'incorrect';
    lastCorrectCategory.value = item.category;
    results.value[currentIndex.value] = lastResult.value;

    if (correct) {
      score.value++;
    }

    phase.value = 'response';
    transitionTo('resolution', 200);
  }

  function nextItem() {
    clearTimer();
    currentIndex.value++;
    lastResult.value = null;
    lastCorrectCategory.value = null;

    if (!isFinished.value) {
      phase.value = 'discovery';
      onPhaseEnter('discovery');
    }
  }

  function resetGame() {
    clearTimer();
    items.value = [];
    currentIndex.value = 0;
    score.value = 0;
    lastResult.value = null;
    lastCorrectCategory.value = null;
    results.value = [];
    phase.value = 'discovery';
  }

  return {
    phase,
    items,
    currentIndex,
    score,
    lastResult,
    lastCorrectCategory,
    results,
    currentCategories,
    currentItem,
    isFinished,
    progress,
    startGame,
    submitAnswer,
    nextItem,
    resetGame,
  };
});
