import { onMounted, onUnmounted, type Ref } from 'vue';

/**
 * Composable pour la navigation retour avec Escape ou Backspace.
 * Déclenche un callback quand l'utilisateur appuie sur ces touches.
 *
 * @param onBack - Callback appelé quand l'utilisateur veut revenir en arrière
 * @param enabled - Ref indiquant si la navigation retour est active
 */
export function useBackNavigation(
  onBack: () => void,
  enabled: Ref<boolean>,
) {
  function handleKeydown(event: KeyboardEvent) {
    if (!enabled.value) return;

    // Ignore si l'utilisateur est dans un champ de saisie
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

    if (event.key === 'Escape' || event.key === 'Backspace') {
      event.preventDefault();
      onBack();
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
}
