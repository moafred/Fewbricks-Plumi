import type { GapTarget, Gender, GrammaticalNumber, VocabularyTheme } from './types.js';
import {
  NOUNS,
  ADJECTIVES,
  DETERMINERS,
  getNounForm,
  getAdjectiveForm,
  getDeterminerForm,
  formatGenderNumber,
} from './vocabulary.js';
import { shuffle } from './utils.js';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface PontAccordsSlot {
  label: string;
  kind: 'determiner' | 'adjective' | 'noun';
}

export interface PontAccordsItem {
  id: string;
  /** Le GN complet correct (ex: "le petit chat") */
  nounPhrase: string;
  /** Décomposition en slots ordonnés */
  slots: PontAccordsSlot[];
  /** Index du slot à deviner */
  targetSlotIndex: number;
  /** Cible sémantique du trou */
  targetKind: Exclude<GapTarget, 'verb'>;
  /** 4 choix mélangés dont la bonne réponse */
  choices: string[];
  /** La bonne réponse */
  correctAnswer: string;
  /** Indice genre/nombre (ex: "masculin singulier") */
  hint: string;
}

export interface PontAccordsOptions {
  /** Filtrer par thèmes de vocabulaire */
  themes?: VocabularyTheme[];
  /** IDs de déterminants autorisés (défaut: tous) */
  determiners?: string[];
  /** Types de slots ciblés (défaut: les trois) */
  targetKinds?: Exclude<GapTarget, 'verb'>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// GÉNÉRATEUR
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Génère `count` items pour le mini-jeu Pont des Accords.
 * Chaque item = un GN avec un "trou" (déterminant, adjectif ou nom) à compléter.
 */
export function generatePontAccordsItems(
  count: number = 10,
  options?: PontAccordsOptions,
): PontAccordsItem[] {
  const allowedThemes = options?.themes;
  const allowedDets = options?.determiners;
  const allowedTargets = options?.targetKinds ?? ['determiner', 'adjective', 'noun'];

  const nouns = allowedThemes
    ? NOUNS.filter((n) => allowedThemes.includes(n.theme))
    : [...NOUNS];

  const dets = allowedDets
    ? DETERMINERS.filter((d) => allowedDets.includes(d.id))
    : [...DETERMINERS];

  if (nouns.length === 0 || dets.length === 0 || ADJECTIVES.length === 0) {
    return [];
  }

  const items: PontAccordsItem[] = [];
  let attempts = 0;

  while (items.length < count && attempts < count * 10) {
    attempts++;

    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const det = dets[Math.floor(Math.random() * dets.length)];
    const number: GrammaticalNumber = Math.random() < 0.5 ? 'singular' : 'plural';
    const targetKind = allowedTargets[Math.floor(Math.random() * allowedTargets.length)];

    // Formes correctes
    const nounForm = getNounForm(noun, number);
    const adjForm = getAdjectiveForm(adj, noun.gender, number);
    const firstWordAfterDet = adj.preposed ? adjForm : nounForm;
    const detForm = getDeterminerForm(det, noun.gender, number, firstWordAfterDet);

    // Construction des slots (ordre selon position de l'adjectif)
    const slots: PontAccordsSlot[] = adj.preposed
      ? [
          { label: detForm, kind: 'determiner' },
          { label: adjForm, kind: 'adjective' },
          { label: nounForm, kind: 'noun' },
        ]
      : [
          { label: detForm, kind: 'determiner' },
          { label: nounForm, kind: 'noun' },
          { label: adjForm, kind: 'adjective' },
        ];

    const targetSlotIndex = slots.findIndex((s) => s.kind === targetKind);
    if (targetSlotIndex === -1) continue;

    const correctAnswer = slots[targetSlotIndex].label;
    const nounPhrase = slots.map((s) => s.label).join(detForm.endsWith("'") ? '' : ' ').replace("' ", "'");

    // Génération de distracteurs selon le type de cible
    const distractors = generateDistractors(targetKind, noun.gender, number, adj, noun);
    if (distractors.length < 3) continue;

    const choices = shuffle([correctAnswer, ...distractors.slice(0, 3)]);

    items.push({
      id: `pont-${noun.id}-${adj.id}-${det.id}-${number}-${targetKind}`,
      nounPhrase,
      slots,
      targetSlotIndex,
      targetKind,
      choices,
      correctAnswer,
      hint: formatGenderNumber(noun.gender, number),
    });
  }

  return shuffle(items.slice(0, count));
}

// ═══════════════════════════════════════════════════════════════════════════
// DISTRACTEURS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Génère des distracteurs qui ont TOUJOURS un mauvais accord genre/nombre.
 * Approche : on construit l'ensemble des formes valides pour l'accord cible,
 * puis on prend toutes les formes possibles SAUF celles qui sont valides.
 * Cela gère les cas où une même forme couvre plusieurs accords
 * (ex: "des" = mp ET fp, "rouge" = ms ET fs).
 */
function generateDistractors(
  targetKind: Exclude<GapTarget, 'verb'>,
  gender: Gender,
  number: GrammaticalNumber,
  adj: (typeof ADJECTIVES)[number],
  noun: (typeof NOUNS)[number],
): string[] {
  // 1. Formes valides pour l'accord cible — à exclure des distracteurs
  const validForms = new Set<string>();

  // 2. Pool de toutes les formes candidates
  const pool = new Set<string>();

  switch (targetKind) {
    case 'determiner': {
      const nounForm = getNounForm(noun, number);
      const adjForm = getAdjectiveForm(adj, gender, number);
      const nextWord = adj.preposed ? adjForm : nounForm;
      for (const d of DETERMINERS) {
        validForms.add(getDeterminerForm(d, gender, number, nextWord));
        for (const form of Object.values(d.forms)) pool.add(form);
        if (d.elidedForm) pool.add(d.elidedForm);
      }
      break;
    }
    case 'adjective': {
      for (const a of ADJECTIVES) {
        validForms.add(getAdjectiveForm(a, gender, number));
        for (const form of Object.values(a.forms)) pool.add(form);
      }
      break;
    }
    case 'noun': {
      for (const n of NOUNS) {
        if (n.gender === gender) validForms.add(getNounForm(n, number));
        pool.add(n.singular);
        pool.add(n.plural);
      }
      break;
    }
  }

  // Retirer toutes les formes valides du pool
  for (const v of validForms) pool.delete(v);

  return shuffle([...pool]);
}
