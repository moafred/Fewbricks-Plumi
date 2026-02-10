import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { GamePhase, AnswerResult, ArdoiseItem, Tense, VerbId, Pronoun } from '@plumi/shared';
import { generateArdoiseItems } from '@plumi/shared';

export const useArdoiseStore = defineStore('ardoise', () => {
  // --- State ---
  const phase = ref<GamePhase>('discovery');
  const items = ref<ArdoiseItem[]>([]);
  const currentIndex = ref(0);
  const score = ref(0);
  const lastResult = ref<AnswerResult | null>(null);
  const selectedChoice = ref<string | null>(null);
  const correctForm = ref<string | null>(null);
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
      transitionTo('challenge');
    }
  }

  // --- Actions ---
  function startGame(
    tense: Tense = 'present',
    count: number = 10,
    options?: { verbs?: VerbId[]; pronouns?: Pronoun[] },
  ) {
    clearTimer();
    currentTense.value = tense;
    items.value = generateArdoiseItems(count, { tense, verbs: options?.verbs, pronouns: options?.pronouns });
    currentIndex.value = 0;
    score.value = 0;
    lastResult.value = null;
    selectedChoice.value = null;
    correctForm.value = null;
    results.value = new Array(items.value.length).fill(null);
    phase.value = 'discovery';
    onPhaseEnter('discovery');
  }

  function submitAnswer(choice: string) {
    if (phase.value !== 'challenge') return;
    clearTimer();

    const item = currentItem.value;
    if (!item) return;

    const correct = choice === item.correctForm;
    lastResult.value = correct ? 'correct' : 'incorrect';
    selectedChoice.value = choice;
    correctForm.value = item.correctForm;
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
    selectedChoice.value = null;
    correctForm.value = null;

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
    selectedChoice.value = null;
    correctForm.value = null;
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
    selectedChoice,
    correctForm,
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
