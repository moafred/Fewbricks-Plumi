import { shuffle } from './utils.js';
import { GRAMMAR_SENTENCES, NOT_SENTENCES, buildSentenceText } from './grammar-sentences.js';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

/** Un item à trier : "Phrase" ou "Pas une phrase" */
export interface PhraseSortingItem {
  id: string;
  /** Le texte affiché à l'enfant */
  text: string;
  /** La bonne catégorie */
  category: 'Phrase' | 'Pas une phrase';
}

export interface PhraseSortingOptions {
  /** Ratio de phrases valides (défaut: 0.5) */
  validRatio?: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// GÉNÉRATEUR
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Génère une liste d'items pour le Tri des Phrases.
 * Distribue équitablement entre phrases valides et non-phrases.
 */
export function generatePhraseSortingItems(
  count: number = 10,
  options?: PhraseSortingOptions,
): PhraseSortingItem[] {
  const ratio = options?.validRatio ?? 0.5;
  const validCount = Math.ceil(count * ratio);
  const invalidCount = count - validCount;

  const validPool = shuffle([...GRAMMAR_SENTENCES]);
  const invalidPool = shuffle([...NOT_SENTENCES]);

  const items: PhraseSortingItem[] = [];

  for (const s of validPool.slice(0, validCount)) {
    items.push({
      id: `tri-phrases-${s.id}`,
      text: buildSentenceText(s),
      category: 'Phrase',
    });
  }

  for (const ns of invalidPool.slice(0, invalidCount)) {
    items.push({
      id: `tri-phrases-${ns.id}`,
      text: ns.text,
      category: 'Pas une phrase',
    });
  }

  return shuffle(items).slice(0, count);
}
