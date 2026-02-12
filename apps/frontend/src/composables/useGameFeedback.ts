import { ref, watch } from 'vue';

/**
 * useGameFeedback — Centralise la logique de feedback visuel pour les choix
 * 
 * @param state Ref ou Computed de l'état du choix ('correct', 'incorrect', etc.)
 * @param duration Durée de l'animation (défaut 600ms)
 */
export function useGameFeedback(state: () => string, duration = 600) {
  const showBurst = ref(false);
  const showWobble = ref(false);

  watch(state, (newState) => {
    if (newState === 'correct') {
      showBurst.value = true;
      setTimeout(() => (showBurst.value = false), duration);
    }
    if (newState === 'incorrect') {
      showWobble.value = true;
      setTimeout(() => (showWobble.value = false), duration - 100);
    }
  });

  return {
    showBurst,
    showWobble
  };
}
