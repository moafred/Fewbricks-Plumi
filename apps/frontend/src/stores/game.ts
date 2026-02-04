import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { GamePhase, AnswerResult, VerbId, SortingItem, Tense } from '@plumi/shared';
import { generateSortingItems } from '@plumi/shared';

const DISCOVERY_DELAY = 1500;
const RESOLUTION_DELAY = 2000;

export const useGameStore = defineStore('game', () => {
  // --- State ---
  const phase = ref<GamePhase>('discovery');
  const items = ref<SortingItem[]>([]);
  const currentIndex = ref(0);
  const score = ref(0);
  const lastResult = ref<AnswerResult | null>(null);
  const lastCorrectVerb = ref<VerbId | null>(null);
  /** Tracks per-item results for the progress stars */
  const results = ref<(AnswerResult | null)[]>([]);
  const currentTense = ref<Tense>('present');

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
      // After discovery delay, move to challenge
      transitionTo('challenge', DISCOVERY_DELAY);
    }
  }

  // --- Actions ---
  function startGame(tense: Tense = 'present') {
    clearTimer();
    currentTense.value = tense;
    items.value = generateSortingItems(10, { tense });
    currentIndex.value = 0;
    score.value = 0;
    lastResult.value = null;
    lastCorrectVerb.value = null;
    results.value = new Array(items.value.length).fill(null);
    phase.value = 'discovery';
    onPhaseEnter('discovery');
  }

  function submitAnswer(verbId: VerbId) {
    if (phase.value !== 'challenge') return;
    clearTimer();

    const item = currentItem.value;
    if (!item) return;

    const correct = verbId === item.verbId;
    lastResult.value = correct ? 'correct' : 'incorrect';
    lastCorrectVerb.value = item.verbId;
    results.value[currentIndex.value] = lastResult.value;

    if (correct) {
      score.value++;
    }

    // Immediate response phase
    phase.value = 'response';

    // After a brief flash, move to resolution
    transitionTo('resolution', 200);
  }

  function nextItem() {
    clearTimer();
    currentIndex.value++;
    lastResult.value = null;
    lastCorrectVerb.value = null;

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
    lastCorrectVerb.value = null;
    results.value = [];
    currentTense.value = 'present';
    phase.value = 'discovery';
  }

  return {
    // State
    phase,
    items,
    currentIndex,
    score,
    lastResult,
    lastCorrectVerb,
    results,
    currentTense,
    // Getters
    currentItem,
    isFinished,
    progress,
    // Actions
    startGame,
    submitAnswer,
    nextItem,
    resetGame,
  };
});
