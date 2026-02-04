import type { Pronoun, VerbId } from './types.js';
import { CONJUGATIONS } from './conjugations.js';
import { shuffle } from './utils.js';

/** Un item à trier dans le mini-jeu Tri du Sorcier */
export interface SortingItem {
  id: string;
  pronoun: Pronoun;
  form: string;
  verbId: VerbId;
  infinitive: string;
}

/**
 * Génère une liste d'items à trier pour le Tri du Sorcier.
 * Pioche `count` formes équitablement réparties entre être et avoir,
 * puis mélange avec Fisher-Yates.
 */
export function generateSortingItems(count: number = 10): SortingItem[] {
  const perVerb = Math.ceil(count / 2);
  const items: SortingItem[] = [];

  for (const verb of CONJUGATIONS) {
    const forms = shuffle([...verb.forms]);
    const picked = forms.slice(0, perVerb);
    for (const f of picked) {
      items.push({
        id: `${verb.id}-${f.pronoun}`,
        pronoun: f.pronoun,
        form: f.form,
        verbId: verb.id,
        infinitive: verb.infinitive,
      });
    }
  }

  // Garder exactement `count` items puis mélanger
  return shuffle(items.slice(0, count));
}
