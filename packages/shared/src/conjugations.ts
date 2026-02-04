import type { VerbConjugation } from './types.js';

/**
 * Source unique de vérité pour les conjugaisons au présent.
 * Programme Éducation Nationale CE1 — être et avoir.
 */
export const CONJUGATIONS: VerbConjugation[] = [
  {
    id: 'etre',
    infinitive: 'être',
    tense: 'present',
    forms: [
      { pronoun: 'je', form: 'suis' },
      { pronoun: 'tu', form: 'es' },
      { pronoun: 'il/elle/on', form: 'est' },
      { pronoun: 'nous', form: 'sommes' },
      { pronoun: 'vous', form: 'êtes' },
      { pronoun: 'ils/elles', form: 'sont' },
    ],
  },
  {
    id: 'avoir',
    infinitive: 'avoir',
    tense: 'present',
    forms: [
      { pronoun: 'je', form: 'ai' },
      { pronoun: 'tu', form: 'as' },
      { pronoun: 'il/elle/on', form: 'a' },
      { pronoun: 'nous', form: 'avons' },
      { pronoun: 'vous', form: 'avez' },
      { pronoun: 'ils/elles', form: 'ont' },
    ],
  },
];

/** Récupère un verbe par son ID */
export function getVerb(id: string): VerbConjugation | undefined {
  return CONJUGATIONS.find(v => v.id === id);
}

/** Récupère la forme conjuguée pour un verbe et un pronom */
export function getConjugatedForm(verbId: string, pronoun: string): string | undefined {
  const verb = getVerb(verbId);
  if (!verb) return undefined;
  return verb.forms.find(f => f.pronoun === pronoun)?.form;
}

/** Toutes les formes conjuguées d'un verbe (utile pour générer des choix) */
export function getAllForms(verbId: string): string[] {
  const verb = getVerb(verbId);
  if (!verb) return [];
  return verb.forms.map(f => f.form);
}
