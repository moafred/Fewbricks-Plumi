import type { Pronoun, Tense, VerbConjugation, VerbId } from './types.js';

/**
 * Source unique de vérité pour les conjugaisons.
 * Programme Éducation Nationale CE1 — être, avoir, 1er groupe, irréguliers fréquents.
 * Temps : présent, futur simple, imparfait, passé composé (être/avoir uniquement).
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
  // 1er groupe (-er) — présent
  {
    id: 'jouer',
    infinitive: 'jouer',
    tense: 'present',
    forms: [
      { pronoun: 'je', form: 'joue' },
      { pronoun: 'tu', form: 'joues' },
      { pronoun: 'il/elle/on', form: 'joue' },
      { pronoun: 'nous', form: 'jouons' },
      { pronoun: 'vous', form: 'jouez' },
      { pronoun: 'ils/elles', form: 'jouent' },
    ],
  },
  {
    id: 'manger',
    infinitive: 'manger',
    tense: 'present',
    forms: [
      { pronoun: 'je', form: 'mange' },
      { pronoun: 'tu', form: 'manges' },
      { pronoun: 'il/elle/on', form: 'mange' },
      { pronoun: 'nous', form: 'mangeons' },
      { pronoun: 'vous', form: 'mangez' },
      { pronoun: 'ils/elles', form: 'mangent' },
    ],
  },
  {
    id: 'chanter',
    infinitive: 'chanter',
    tense: 'present',
    forms: [
      { pronoun: 'je', form: 'chante' },
      { pronoun: 'tu', form: 'chantes' },
      { pronoun: 'il/elle/on', form: 'chante' },
      { pronoun: 'nous', form: 'chantons' },
      { pronoun: 'vous', form: 'chantez' },
      { pronoun: 'ils/elles', form: 'chantent' },
    ],
  },
  {
    id: 'regarder',
    infinitive: 'regarder',
    tense: 'present',
    forms: [
      { pronoun: 'je', form: 'regarde' },
      { pronoun: 'tu', form: 'regardes' },
      { pronoun: 'il/elle/on', form: 'regarde' },
      { pronoun: 'nous', form: 'regardons' },
      { pronoun: 'vous', form: 'regardez' },
      { pronoun: 'ils/elles', form: 'regardent' },
    ],
  },
  // 3ème groupe — irréguliers fréquents — présent
  {
    id: 'aller',
    infinitive: 'aller',
    tense: 'present',
    forms: [
      { pronoun: 'je', form: 'vais' },
      { pronoun: 'tu', form: 'vas' },
      { pronoun: 'il/elle/on', form: 'va' },
      { pronoun: 'nous', form: 'allons' },
      { pronoun: 'vous', form: 'allez' },
      { pronoun: 'ils/elles', form: 'vont' },
    ],
  },
  {
    id: 'faire',
    infinitive: 'faire',
    tense: 'present',
    forms: [
      { pronoun: 'je', form: 'fais' },
      { pronoun: 'tu', form: 'fais' },
      { pronoun: 'il/elle/on', form: 'fait' },
      { pronoun: 'nous', form: 'faisons' },
      { pronoun: 'vous', form: 'faites' },
      { pronoun: 'ils/elles', form: 'font' },
    ],
  },
  {
    id: 'dire',
    infinitive: 'dire',
    tense: 'present',
    forms: [
      { pronoun: 'je', form: 'dis' },
      { pronoun: 'tu', form: 'dis' },
      { pronoun: 'il/elle/on', form: 'dit' },
      { pronoun: 'nous', form: 'disons' },
      { pronoun: 'vous', form: 'dites' },
      { pronoun: 'ils/elles', form: 'disent' },
    ],
  },
  {
    id: 'venir',
    infinitive: 'venir',
    tense: 'present',
    forms: [
      { pronoun: 'je', form: 'viens' },
      { pronoun: 'tu', form: 'viens' },
      { pronoun: 'il/elle/on', form: 'vient' },
      { pronoun: 'nous', form: 'venons' },
      { pronoun: 'vous', form: 'venez' },
      { pronoun: 'ils/elles', form: 'viennent' },
    ],
  },
  // 3ème groupe — modaux / fréquents — présent
  {
    id: 'pouvoir',
    infinitive: 'pouvoir',
    tense: 'present',
    forms: [
      { pronoun: 'je', form: 'peux' },
      { pronoun: 'tu', form: 'peux' },
      { pronoun: 'il/elle/on', form: 'peut' },
      { pronoun: 'nous', form: 'pouvons' },
      { pronoun: 'vous', form: 'pouvez' },
      { pronoun: 'ils/elles', form: 'peuvent' },
    ],
  },
  {
    id: 'voir',
    infinitive: 'voir',
    tense: 'present',
    forms: [
      { pronoun: 'je', form: 'vois' },
      { pronoun: 'tu', form: 'vois' },
      { pronoun: 'il/elle/on', form: 'voit' },
      { pronoun: 'nous', form: 'voyons' },
      { pronoun: 'vous', form: 'voyez' },
      { pronoun: 'ils/elles', form: 'voient' },
    ],
  },
  {
    id: 'vouloir',
    infinitive: 'vouloir',
    tense: 'present',
    forms: [
      { pronoun: 'je', form: 'veux' },
      { pronoun: 'tu', form: 'veux' },
      { pronoun: 'il/elle/on', form: 'veut' },
      { pronoun: 'nous', form: 'voulons' },
      { pronoun: 'vous', form: 'voulez' },
      { pronoun: 'ils/elles', form: 'veulent' },
    ],
  },
  {
    id: 'prendre',
    infinitive: 'prendre',
    tense: 'present',
    forms: [
      { pronoun: 'je', form: 'prends' },
      { pronoun: 'tu', form: 'prends' },
      { pronoun: 'il/elle/on', form: 'prend' },
      { pronoun: 'nous', form: 'prenons' },
      { pronoun: 'vous', form: 'prenez' },
      { pronoun: 'ils/elles', form: 'prennent' },
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
  // 1er groupe (-er) — futur
  {
    id: 'jouer',
    infinitive: 'jouer',
    tense: 'futur',
    forms: [
      { pronoun: 'je', form: 'jouerai' },
      { pronoun: 'tu', form: 'joueras' },
      { pronoun: 'il/elle/on', form: 'jouera' },
      { pronoun: 'nous', form: 'jouerons' },
      { pronoun: 'vous', form: 'jouerez' },
      { pronoun: 'ils/elles', form: 'joueront' },
    ],
  },
  {
    id: 'manger',
    infinitive: 'manger',
    tense: 'futur',
    forms: [
      { pronoun: 'je', form: 'mangerai' },
      { pronoun: 'tu', form: 'mangeras' },
      { pronoun: 'il/elle/on', form: 'mangera' },
      { pronoun: 'nous', form: 'mangerons' },
      { pronoun: 'vous', form: 'mangerez' },
      { pronoun: 'ils/elles', form: 'mangeront' },
    ],
  },
  {
    id: 'chanter',
    infinitive: 'chanter',
    tense: 'futur',
    forms: [
      { pronoun: 'je', form: 'chanterai' },
      { pronoun: 'tu', form: 'chanteras' },
      { pronoun: 'il/elle/on', form: 'chantera' },
      { pronoun: 'nous', form: 'chanterons' },
      { pronoun: 'vous', form: 'chanterez' },
      { pronoun: 'ils/elles', form: 'chanteront' },
    ],
  },
  {
    id: 'regarder',
    infinitive: 'regarder',
    tense: 'futur',
    forms: [
      { pronoun: 'je', form: 'regarderai' },
      { pronoun: 'tu', form: 'regarderas' },
      { pronoun: 'il/elle/on', form: 'regardera' },
      { pronoun: 'nous', form: 'regarderons' },
      { pronoun: 'vous', form: 'regarderez' },
      { pronoun: 'ils/elles', form: 'regarderont' },
    ],
  },
  // 3ème groupe — irréguliers fréquents — futur
  {
    id: 'aller',
    infinitive: 'aller',
    tense: 'futur',
    forms: [
      { pronoun: 'je', form: 'irai' },
      { pronoun: 'tu', form: 'iras' },
      { pronoun: 'il/elle/on', form: 'ira' },
      { pronoun: 'nous', form: 'irons' },
      { pronoun: 'vous', form: 'irez' },
      { pronoun: 'ils/elles', form: 'iront' },
    ],
  },
  {
    id: 'faire',
    infinitive: 'faire',
    tense: 'futur',
    forms: [
      { pronoun: 'je', form: 'ferai' },
      { pronoun: 'tu', form: 'feras' },
      { pronoun: 'il/elle/on', form: 'fera' },
      { pronoun: 'nous', form: 'ferons' },
      { pronoun: 'vous', form: 'ferez' },
      { pronoun: 'ils/elles', form: 'feront' },
    ],
  },
  {
    id: 'dire',
    infinitive: 'dire',
    tense: 'futur',
    forms: [
      { pronoun: 'je', form: 'dirai' },
      { pronoun: 'tu', form: 'diras' },
      { pronoun: 'il/elle/on', form: 'dira' },
      { pronoun: 'nous', form: 'dirons' },
      { pronoun: 'vous', form: 'direz' },
      { pronoun: 'ils/elles', form: 'diront' },
    ],
  },
  {
    id: 'venir',
    infinitive: 'venir',
    tense: 'futur',
    forms: [
      { pronoun: 'je', form: 'viendrai' },
      { pronoun: 'tu', form: 'viendras' },
      { pronoun: 'il/elle/on', form: 'viendra' },
      { pronoun: 'nous', form: 'viendrons' },
      { pronoun: 'vous', form: 'viendrez' },
      { pronoun: 'ils/elles', form: 'viendront' },
    ],
  },
  // 3ème groupe — modaux / fréquents — futur
  {
    id: 'pouvoir',
    infinitive: 'pouvoir',
    tense: 'futur',
    forms: [
      { pronoun: 'je', form: 'pourrai' },
      { pronoun: 'tu', form: 'pourras' },
      { pronoun: 'il/elle/on', form: 'pourra' },
      { pronoun: 'nous', form: 'pourrons' },
      { pronoun: 'vous', form: 'pourrez' },
      { pronoun: 'ils/elles', form: 'pourront' },
    ],
  },
  {
    id: 'voir',
    infinitive: 'voir',
    tense: 'futur',
    forms: [
      { pronoun: 'je', form: 'verrai' },
      { pronoun: 'tu', form: 'verras' },
      { pronoun: 'il/elle/on', form: 'verra' },
      { pronoun: 'nous', form: 'verrons' },
      { pronoun: 'vous', form: 'verrez' },
      { pronoun: 'ils/elles', form: 'verront' },
    ],
  },
  {
    id: 'vouloir',
    infinitive: 'vouloir',
    tense: 'futur',
    forms: [
      { pronoun: 'je', form: 'voudrai' },
      { pronoun: 'tu', form: 'voudras' },
      { pronoun: 'il/elle/on', form: 'voudra' },
      { pronoun: 'nous', form: 'voudrons' },
      { pronoun: 'vous', form: 'voudrez' },
      { pronoun: 'ils/elles', form: 'voudront' },
    ],
  },
  {
    id: 'prendre',
    infinitive: 'prendre',
    tense: 'futur',
    forms: [
      { pronoun: 'je', form: 'prendrai' },
      { pronoun: 'tu', form: 'prendras' },
      { pronoun: 'il/elle/on', form: 'prendra' },
      { pronoun: 'nous', form: 'prendrons' },
      { pronoun: 'vous', form: 'prendrez' },
      { pronoun: 'ils/elles', form: 'prendront' },
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
  // 1er groupe (-er) — imparfait
  {
    id: 'jouer',
    infinitive: 'jouer',
    tense: 'imparfait',
    forms: [
      { pronoun: 'je', form: 'jouais' },
      { pronoun: 'tu', form: 'jouais' },
      { pronoun: 'il/elle/on', form: 'jouait' },
      { pronoun: 'nous', form: 'jouions' },
      { pronoun: 'vous', form: 'jouiez' },
      { pronoun: 'ils/elles', form: 'jouaient' },
    ],
  },
  {
    id: 'manger',
    infinitive: 'manger',
    tense: 'imparfait',
    forms: [
      { pronoun: 'je', form: 'mangeais' },
      { pronoun: 'tu', form: 'mangeais' },
      { pronoun: 'il/elle/on', form: 'mangeait' },
      { pronoun: 'nous', form: 'mangions' },
      { pronoun: 'vous', form: 'mangiez' },
      { pronoun: 'ils/elles', form: 'mangeaient' },
    ],
  },
  {
    id: 'chanter',
    infinitive: 'chanter',
    tense: 'imparfait',
    forms: [
      { pronoun: 'je', form: 'chantais' },
      { pronoun: 'tu', form: 'chantais' },
      { pronoun: 'il/elle/on', form: 'chantait' },
      { pronoun: 'nous', form: 'chantions' },
      { pronoun: 'vous', form: 'chantiez' },
      { pronoun: 'ils/elles', form: 'chantaient' },
    ],
  },
  {
    id: 'regarder',
    infinitive: 'regarder',
    tense: 'imparfait',
    forms: [
      { pronoun: 'je', form: 'regardais' },
      { pronoun: 'tu', form: 'regardais' },
      { pronoun: 'il/elle/on', form: 'regardait' },
      { pronoun: 'nous', form: 'regardions' },
      { pronoun: 'vous', form: 'regardiez' },
      { pronoun: 'ils/elles', form: 'regardaient' },
    ],
  },
  // 3ème groupe — irréguliers fréquents — imparfait
  {
    id: 'aller',
    infinitive: 'aller',
    tense: 'imparfait',
    forms: [
      { pronoun: 'je', form: 'allais' },
      { pronoun: 'tu', form: 'allais' },
      { pronoun: 'il/elle/on', form: 'allait' },
      { pronoun: 'nous', form: 'allions' },
      { pronoun: 'vous', form: 'alliez' },
      { pronoun: 'ils/elles', form: 'allaient' },
    ],
  },
  {
    id: 'faire',
    infinitive: 'faire',
    tense: 'imparfait',
    forms: [
      { pronoun: 'je', form: 'faisais' },
      { pronoun: 'tu', form: 'faisais' },
      { pronoun: 'il/elle/on', form: 'faisait' },
      { pronoun: 'nous', form: 'faisions' },
      { pronoun: 'vous', form: 'faisiez' },
      { pronoun: 'ils/elles', form: 'faisaient' },
    ],
  },
  {
    id: 'dire',
    infinitive: 'dire',
    tense: 'imparfait',
    forms: [
      { pronoun: 'je', form: 'disais' },
      { pronoun: 'tu', form: 'disais' },
      { pronoun: 'il/elle/on', form: 'disait' },
      { pronoun: 'nous', form: 'disions' },
      { pronoun: 'vous', form: 'disiez' },
      { pronoun: 'ils/elles', form: 'disaient' },
    ],
  },
  {
    id: 'venir',
    infinitive: 'venir',
    tense: 'imparfait',
    forms: [
      { pronoun: 'je', form: 'venais' },
      { pronoun: 'tu', form: 'venais' },
      { pronoun: 'il/elle/on', form: 'venait' },
      { pronoun: 'nous', form: 'venions' },
      { pronoun: 'vous', form: 'veniez' },
      { pronoun: 'ils/elles', form: 'venaient' },
    ],
  },
  // 3ème groupe — modaux / fréquents — imparfait
  {
    id: 'pouvoir',
    infinitive: 'pouvoir',
    tense: 'imparfait',
    forms: [
      { pronoun: 'je', form: 'pouvais' },
      { pronoun: 'tu', form: 'pouvais' },
      { pronoun: 'il/elle/on', form: 'pouvait' },
      { pronoun: 'nous', form: 'pouvions' },
      { pronoun: 'vous', form: 'pouviez' },
      { pronoun: 'ils/elles', form: 'pouvaient' },
    ],
  },
  {
    id: 'voir',
    infinitive: 'voir',
    tense: 'imparfait',
    forms: [
      { pronoun: 'je', form: 'voyais' },
      { pronoun: 'tu', form: 'voyais' },
      { pronoun: 'il/elle/on', form: 'voyait' },
      { pronoun: 'nous', form: 'voyions' },
      { pronoun: 'vous', form: 'voyiez' },
      { pronoun: 'ils/elles', form: 'voyaient' },
    ],
  },
  {
    id: 'vouloir',
    infinitive: 'vouloir',
    tense: 'imparfait',
    forms: [
      { pronoun: 'je', form: 'voulais' },
      { pronoun: 'tu', form: 'voulais' },
      { pronoun: 'il/elle/on', form: 'voulait' },
      { pronoun: 'nous', form: 'voulions' },
      { pronoun: 'vous', form: 'vouliez' },
      { pronoun: 'ils/elles', form: 'voulaient' },
    ],
  },
  {
    id: 'prendre',
    infinitive: 'prendre',
    tense: 'imparfait',
    forms: [
      { pronoun: 'je', form: 'prenais' },
      { pronoun: 'tu', form: 'prenais' },
      { pronoun: 'il/elle/on', form: 'prenait' },
      { pronoun: 'nous', form: 'prenions' },
      { pronoun: 'vous', form: 'preniez' },
      { pronoun: 'ils/elles', form: 'prenaient' },
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

/** Mapping VerbId → infinitif pour lookup rapide */
const VERB_INFINITIVES: Record<VerbId, string> = {
  etre: 'être',
  avoir: 'avoir',
  jouer: 'jouer',
  manger: 'manger',
  chanter: 'chanter',
  regarder: 'regarder',
  aller: 'aller',
  faire: 'faire',
  dire: 'dire',
  venir: 'venir',
  pouvoir: 'pouvoir',
  voir: 'voir',
  vouloir: 'vouloir',
  prendre: 'prendre',
};

/** Récupère l'infinitif d'un verbe par son ID */
export function getInfinitive(verbId: VerbId): string {
  return VERB_INFINITIVES[verbId];
}

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
