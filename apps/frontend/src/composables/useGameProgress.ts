/**
 * useGameProgress — Synchronisation de la progression intra-étape
 *
 * Permet à ChapterRunner d'afficher les ProgressStars dans son header
 * en recevant les données de progression du mini-jeu enfant via provide/inject.
 */
import { reactive, watch, provide, inject, type InjectionKey } from 'vue';
import type { AnswerResult } from '@plumi/shared';

interface GameProgressState {
  results: (AnswerResult | null)[];
  current: number;
}

export const GAME_PROGRESS_KEY: InjectionKey<GameProgressState> = Symbol('game-progress');

/**
 * Appelé par ChapterRunner — fournit l'objet réactif aux mini-jeux enfants.
 */
export function useProvideGameProgress() {
  const state = reactive<GameProgressState>({ results: [], current: 0 });
  provide(GAME_PROGRESS_KEY, state);

  function reset() {
    state.results = [];
    state.current = 0;
  }

  return { gameProgress: state, resetGameProgress: reset };
}

/**
 * Appelé par chaque mini-jeu — synchronise results/currentIndex vers le parent.
 */
export function useSyncGameProgress(
  results: () => (AnswerResult | null)[],
  currentIndex: () => number,
) {
  const sink = inject(GAME_PROGRESS_KEY, null);
  if (!sink) return;

  watch([results, currentIndex], ([r, c]) => {
    sink.results = [...r];
    sink.current = c;
  }, { deep: true, immediate: true });
}
