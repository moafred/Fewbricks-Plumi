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
  /** Filtrer par pronoms (défaut: tous) */
  pronouns?: Pronoun[];
  /** Limiter aux verbes spécifiés (défaut: tous les verbes du temps) */
  verbs?: VerbId[];
}

/**
 * Génère une liste d'items à trier pour le Tri du Sorcier.
 * Pioche `count` formes équitablement réparties entre être et avoir,
 * puis mélange avec Fisher-Yates.
 */
export function generateSortingItems(count: number = 10, options?: SortingOptions): SortingItem[] {
  const tense: Tense = options?.tense ?? 'present';
  const pronounFilter = options?.pronouns;
  const verbFilter = options?.verbs;
  let conjugations = getConjugationsForTense(tense);

  if (verbFilter && verbFilter.length > 0) {
    conjugations = conjugations.filter((v) => verbFilter.includes(v.id));
  }

  if (conjugations.length === 0) {
    return [];
  }

  const perVerb = Math.ceil(count / conjugations.length);
  const items: SortingItem[] = [];

  for (const verb of conjugations) {
    const allForms = shuffle([...verb.forms]);
    const filteredForms = pronounFilter
      ? allForms.filter((f) => pronounFilter.includes(f.pronoun))
      : allForms;
    const picked = filteredForms.slice(0, perVerb);
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
