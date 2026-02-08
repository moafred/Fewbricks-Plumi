import { shuffle } from './utils.js';
import { GRAMMAR_SENTENCES, buildSentenceText } from './grammar-sentences.js';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

/** Un item de ponctuation : trouver le bon signe */
export interface PonctuationItem {
  id: string;
  /** La phrase SANS ponctuation finale (ex: "Le chat dort") */
  sentenceWithoutPunctuation: string;
  /** Le signe correct */
  correctSign: '.' | '?' | '!';
  /** Les 3 choix mélangés */
  choices: ('.' | '?' | '!')[];
}

// ═══════════════════════════════════════════════════════════════════════════
// GÉNÉRATEUR
// ═══════════════════════════════════════════════════════════════════════════

const ALL_SIGNS: ('.' | '?' | '!')[] = ['.', '?', '!'];

/**
 * Génère une liste d'items pour le mini-jeu Ponctuation.
 * Distribue entre déclaratives, interrogatives et exclamatives.
 */
export function generatePonctuationItems(count: number = 10): PonctuationItem[] {
  const pool = shuffle([...GRAMMAR_SENTENCES]);

  const items: PonctuationItem[] = [];

  for (const s of pool.slice(0, count)) {
    const fullText = buildSentenceText(s);
    const sentenceWithoutPunctuation = fullText.slice(0, -1);

    items.push({
      id: `ponctuation-${s.id}`,
      sentenceWithoutPunctuation,
      correctSign: s.punctuation,
      choices: shuffle([...ALL_SIGNS]),
    });
  }

  return items;
}
