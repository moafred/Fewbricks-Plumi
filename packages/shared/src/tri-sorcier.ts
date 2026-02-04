import type { Pronoun, Tense, VerbId } from './types.js';
import { getConjugationsForTense } from './conjugations.js';
import { shuffle } from './utils.js';

/** Un item à trier dans le mini-jeu Tri du Sorcier */
export interface SortingItem {
  id: string;
  pronoun: Pronoun;
  form: string;
  verbId: VerbId;
  infinitive: string;
  tense: Tense;
}

export interface SortingOptions {
  /** Filtrer par temps (défaut: 'present') */
  tense?: Tense;
}

/**
 * Génère une liste d'items à trier pour le Tri du Sorcier.
 * Pioche `count` formes équitablement réparties entre être et avoir,
 * puis mélange avec Fisher-Yates.
 */
export function generateSortingItems(count: number = 10, options?: SortingOptions): SortingItem[] {
  const tense: Tense = options?.tense ?? 'present';
  const conjugations = getConjugationsForTense(tense);

  if (conjugations.length === 0) {
    return [];
  }

  const perVerb = Math.ceil(count / conjugations.length);
  const items: SortingItem[] = [];

  for (const verb of conjugations) {
    const forms = shuffle([...verb.forms]);
    const picked = forms.slice(0, perVerb);
    for (const f of picked) {
      items.push({
        id: `${verb.id}-${tense}-${f.pronoun}`,
        pronoun: f.pronoun,
        form: f.form,
        verbId: verb.id,
        infinitive: verb.infinitive,
        tense,
      });
    }
  }

  // Garder exactement `count` items puis mélanger
  return shuffle(items.slice(0, count));
}
