import type { Pronoun, Tense, VerbId } from './types.js';
import { getConjugationsForTense } from './conjugations.js';
import { shuffle } from './utils.js';

/** Un item QCM pour le mini-jeu Ardoise */
export interface ArdoiseItem {
  id: string;
  pronoun: Pronoun;
  verbId: VerbId;
  infinitive: string;
  tense: Tense;
  correctForm: string;
  choices: string[]; // 4 choix mélangés, dont la bonne réponse
}

export interface ArdoiseOptions {
  /** Filtrer par temps (défaut: 'present') */
  tense?: Tense;
  /** Filtrer par verbes (défaut: tous) */
  verbs?: VerbId[];
  /** Filtrer par pronoms (défaut: tous) */
  pronouns?: Pronoun[];
}

/**
 * Génère une liste d'items QCM pour l'Ardoise.
 * Pioche `count` formes selon les options,
 * génère 3 distracteurs par item, mélange les choix.
 */
export function generateArdoiseItems(
  count: number = 10,
  options?: ArdoiseOptions
): ArdoiseItem[] {
  const tense: Tense = options?.tense ?? 'present';
  const verbFilter = options?.verbs;
  const pronounFilter = options?.pronouns;

  // Récupère les conjugaisons pour le temps demandé
  let conjugations = getConjugationsForTense(tense);

  // Filtre par verbes si demandé
  if (verbFilter && verbFilter.length > 0) {
    conjugations = conjugations.filter((v) => verbFilter.includes(v.id));
  }

  if (conjugations.length === 0) {
    return [];
  }

  const items: ArdoiseItem[] = [];
  const perVerb = Math.ceil(count / conjugations.length);

  for (const verb of conjugations) {
    const allForms = shuffle([...verb.forms]);
    const filteredForms = pronounFilter
      ? allForms.filter((f) => pronounFilter.includes(f.pronoun))
      : allForms;
    const picked = filteredForms.slice(0, perVerb);

    // Distracteurs : autres formes du même verbe + formes des autres verbes du même temps
    const otherVerbForms = conjugations
      .filter((v) => v.id !== verb.id)
      .flatMap((v) => v.forms.map((f) => f.form));

    for (const f of picked) {
      const sameVerbDistractors = verb.forms
        .map((vf) => vf.form)
        .filter((form) => form !== f.form);

      const allDistractors = shuffle([...sameVerbDistractors, ...otherVerbForms]);
      const distractors: string[] = [];
      for (const d of allDistractors) {
        if (d !== f.form && !distractors.includes(d)) {
          distractors.push(d);
        }
        if (distractors.length === 3) break;
      }

      items.push({
        id: `ardoise-${verb.id}-${tense}-${f.pronoun}`,
        pronoun: f.pronoun,
        verbId: verb.id,
        infinitive: verb.infinitive,
        tense,
        correctForm: f.form,
        choices: shuffle([f.form, ...distractors]),
      });
    }
  }

  return shuffle(items.slice(0, count));
}
