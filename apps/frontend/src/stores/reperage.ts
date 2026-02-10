import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { GamePhase, AnswerResult, ReperageItem, ReperageTarget } from '@plumi/shared';
import { generateReperageItems } from '@plumi/shared';

export const useReperageStore = defineStore('reperage', () => {
  // --- State ---
  const phase = ref<GamePhase>('discovery');
  const items = ref<ReperageItem[]>([]);
  const currentIndex = ref(0);
  const score = ref(0);
  const lastResult = ref<AnswerResult | null>(null);
  const selectedWordIndex = ref<number | null>(null);
  const results = ref<(AnswerResult | null)[]>([]);

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
      transitionTo('challenge');
    } else if (p === 'response') {
      transitionTo('resolution', 500);
    }
  }

  // --- Actions ---
  function startGame(count: number = 10, target: ReperageTarget = 'verb') {
    clearTimer();
    items.value = generateReperageItems(count, { target });
    currentIndex.value = 0;
    score.value = 0;
    lastResult.value = null;
    selectedWordIndex.value = null;
    results.value = new Array(items.value.length).fill(null);
    phase.value = 'discovery';
    onPhaseEnter('discovery');
  }

  function submitAnswer(wordIndex: number) {
    if (phase.value !== 'challenge') return;
    clearTimer();

    const item = currentItem.value;
    if (!item) return;

    const correct = item.correctIndices.includes(wordIndex);
    lastResult.value = correct ? 'correct' : 'incorrect';
    selectedWordIndex.value = wordIndex;
    results.value[currentIndex.value] = lastResult.value;

    if (correct) {
      score.value++;
    }

    phase.value = 'response';
    onPhaseEnter('response');
  }

  function nextItem() {
    clearTimer();
    currentIndex.value++;
    lastResult.value = null;
    selectedWordIndex.value = null;

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
    selectedWordIndex.value = null;
    results.value = [];
    phase.value = 'discovery';
  }

  return {
    phase,
    items,
    currentIndex,
    score,
    lastResult,
    selectedWordIndex,
    results,
    currentItem,
    isFinished,
    progress,
    startGame,
    submitAnswer,
    nextItem,
    resetGame,
  };
});
