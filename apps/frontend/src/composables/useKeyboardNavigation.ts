import { ref, onMounted, onUnmounted, type Ref } from 'vue';

/**
 * Composable pour la navigation clavier dans les jeux.
 * Gère la sélection avec les flèches et la validation avec Enter/Space.
 *
 * @param itemCount - Nombre d'éléments navigables
 * @param onSelect - Callback appelé quand l'utilisateur valide sa sélection
 * @param enabled - Ref indiquant si la navigation est active (ex: phase === 'challenge')
 * @param columns - Nombre de colonnes pour la navigation 2D (défaut: itemCount = navigation linéaire)
 */
export function useKeyboardNavigation<T>(
  items: Ref<T[]>,
  onSelect: (item: T, index: number) => void,
  enabled: Ref<boolean>,
  columns?: number,
) {
  const focusedIndex = ref(0);

  function handleKeydown(event: KeyboardEvent) {
    if (!enabled.value || items.value.length === 0) return;

    const count = items.value.length;
    const cols = columns ?? count; // Si pas de colonnes, navigation linéaire
    const rows = Math.ceil(count / cols);
    const currentRow = Math.floor(focusedIndex.value / cols);
    const currentCol = focusedIndex.value % cols;

    switch (event.key) {
      case 'ArrowLeft': {
        event.preventDefault();
        // Navigation linéaire gauche (wrap around)
        focusedIndex.value = (focusedIndex.value - 1 + count) % count;
        break;
      }
      case 'ArrowRight': {
        event.preventDefault();
        // Navigation linéaire droite (wrap around)
        focusedIndex.value = (focusedIndex.value + 1) % count;
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        if (rows > 1) {
          // Navigation 2D vers le haut
          const newRow = (currentRow - 1 + rows) % rows;
          const newIndex = newRow * cols + currentCol;
          focusedIndex.value = Math.min(newIndex, count - 1);
        }
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        if (rows > 1) {
          // Navigation 2D vers le bas
          const newRow = (currentRow + 1) % rows;
          const newIndex = newRow * cols + currentCol;
          focusedIndex.value = Math.min(newIndex, count - 1);
        }
        break;
      }
      case 'Enter':
      case ' ': {
        event.preventDefault();
        const item = items.value[focusedIndex.value];
        if (item !== undefined) {
          onSelect(item, focusedIndex.value);
        }
        break;
      }
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

  function resetFocus() {
    focusedIndex.value = 0;
  }

  return {
    focusedIndex,
    resetFocus,
  };
}
