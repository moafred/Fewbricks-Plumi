import type { Pronoun, Tense, VerbConjugation, VerbId } from './types.js';

/**
 * Source unique de vérité pour les conjugaisons.
 * Programme Éducation Nationale CE1 — être et avoir.
 * Temps : présent, futur simple, imparfait, passé composé.
 */
export const CONJUGATIONS: VerbConjugation[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // PRÉSENT
  // ═══════════════════════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════════════════════
  // FUTUR SIMPLE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'etre',
    infinitive: 'être',
    tense: 'futur',
    forms: [
      { pronoun: 'je', form: 'serai' },
      { pronoun: 'tu', form: 'seras' },
      { pronoun: 'il/elle/on', form: 'sera' },
      { pronoun: 'nous', form: 'serons' },
      { pronoun: 'vous', form: 'serez' },
      { pronoun: 'ils/elles', form: 'seront' },
    ],
  },
  {
    id: 'avoir',
    infinitive: 'avoir',
    tense: 'futur',
    forms: [
      { pronoun: 'je', form: 'aurai' },
      { pronoun: 'tu', form: 'auras' },
      { pronoun: 'il/elle/on', form: 'aura' },
      { pronoun: 'nous', form: 'aurons' },
      { pronoun: 'vous', form: 'aurez' },
      { pronoun: 'ils/elles', form: 'auront' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // IMPARFAIT
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'etre',
    infinitive: 'être',
    tense: 'imparfait',
    forms: [
      { pronoun: 'je', form: 'étais' },
      { pronoun: 'tu', form: 'étais' },
      { pronoun: 'il/elle/on', form: 'était' },
      { pronoun: 'nous', form: 'étions' },
      { pronoun: 'vous', form: 'étiez' },
      { pronoun: 'ils/elles', form: 'étaient' },
    ],
  },
  {
    id: 'avoir',
    infinitive: 'avoir',
    tense: 'imparfait',
    forms: [
      { pronoun: 'je', form: 'avais' },
      { pronoun: 'tu', form: 'avais' },
      { pronoun: 'il/elle/on', form: 'avait' },
      { pronoun: 'nous', form: 'avions' },
      { pronoun: 'vous', form: 'aviez' },
      { pronoun: 'ils/elles', form: 'avaient' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PASSÉ COMPOSÉ (bonus — hors programme CE1 strict)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'etre',
    infinitive: 'être',
    tense: 'passe_compose',
    forms: [
      { pronoun: 'je', form: 'ai été' },
      { pronoun: 'tu', form: 'as été' },
      { pronoun: 'il/elle/on', form: 'a été' },
      { pronoun: 'nous', form: 'avons été' },
      { pronoun: 'vous', form: 'avez été' },
      { pronoun: 'ils/elles', form: 'ont été' },
    ],
  },
  {
    id: 'avoir',
    infinitive: 'avoir',
    tense: 'passe_compose',
    forms: [
      { pronoun: 'je', form: 'ai eu' },
      { pronoun: 'tu', form: 'as eu' },
      { pronoun: 'il/elle/on', form: 'a eu' },
      { pronoun: 'nous', form: 'avons eu' },
      { pronoun: 'vous', form: 'avez eu' },
      { pronoun: 'ils/elles', form: 'ont eu' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// FONCTIONS D'ACCÈS
// ═══════════════════════════════════════════════════════════════════════════

/** Récupère un verbe par son ID (première occurrence, présent par défaut) */
export function getVerb(id: string): VerbConjugation | undefined {
  return CONJUGATIONS.find((v) => v.id === id);
}

/** Récupère la conjugaison d'un verbe pour un temps donné */
export function getConjugation(verbId: VerbId, tense: Tense): VerbConjugation | undefined {
  return CONJUGATIONS.find((v) => v.id === verbId && v.tense === tense);
}

/**
 * Récupère la forme conjuguée pour un verbe, un pronom et un temps.
 * @param tense Temps de conjugaison (défaut: 'present')
 */
export function getConjugatedForm(
  verbId: VerbId,
  pronoun: Pronoun,
  tense: Tense = 'present'
): string | undefined {
  const verb = getConjugation(verbId, tense);
  if (!verb) return undefined;
  return verb.forms.find((f) => f.pronoun === pronoun)?.form;
}

/** Toutes les formes conjuguées d'un verbe pour un temps donné (défaut: présent) */
export function getAllForms(verbId: VerbId, tense: Tense = 'present'): string[] {
  const verb = getConjugation(verbId, tense);
  if (!verb) return [];
  return verb.forms.map((f) => f.form);
}

/** Toutes les formes conjuguées de tous les verbes pour un temps donné */
export function getAllFormsForTense(tense: Tense): string[] {
  return CONJUGATIONS.filter((v) => v.tense === tense).flatMap((v) => v.forms.map((f) => f.form));
}

/** Récupère toutes les conjugaisons pour un temps donné */
export function getConjugationsForTense(tense: Tense): VerbConjugation[] {
  return CONJUGATIONS.filter((v) => v.tense === tense);
}
