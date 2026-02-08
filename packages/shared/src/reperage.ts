import type { ReperageTarget } from './types.js';
import { shuffle } from './utils.js';
import {
  GRAMMAR_SENTENCES,
  buildSentenceText,
  getVerbWords,
  getSubjectWords,
  getAdjectiveWords,
} from './grammar-sentences.js';
import type { GrammarSentence, AnnotatedWord } from './grammar-sentences.js';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface ReperageWord {
  word: string;
  /** Index du mot dans la phrase (0-based) */
  index: number;
  /** Est-ce la cible à trouver ? */
  isTarget: boolean;
}

export interface ReperageItem {
  id: string;
  /** La phrase complète (pour affichage contexte) */
  sentence: string;
  /** Mots décomposés avec métadonnées */
  words: ReperageWord[];
  /** Cible de l'exercice */
  target: ReperageTarget;
  /** Indice affiché ("Trouve le verbe !", "Trouve le sujet !", "Trouve l'adjectif !") */
  hint: string;
  /** Index des mots corrects (peut être multiple pour sujet = groupe) */
  correctIndices: number[];
}

export interface ReperageOptions {
  target: ReperageTarget;
}

// ═══════════════════════════════════════════════════════════════════════════
// HINTS
// ═══════════════════════════════════════════════════════════════════════════

const TARGET_HINTS: Record<ReperageTarget, string> = {
  verb: 'Trouve le verbe !',
  subject: 'Trouve le sujet !',
  adjective: "Trouve l'adjectif !",
};

// ═══════════════════════════════════════════════════════════════════════════
// FILTRAGE
// ═══════════════════════════════════════════════════════════════════════════

function getTargetWords(sentence: GrammarSentence, target: ReperageTarget): AnnotatedWord[] {
  switch (target) {
    case 'verb':
      return getVerbWords(sentence);
    case 'subject':
      return getSubjectWords(sentence);
    case 'adjective':
      return getAdjectiveWords(sentence);
  }
}

function hasSuitableTarget(sentence: GrammarSentence, target: ReperageTarget): boolean {
  return getTargetWords(sentence, target).length > 0;
}

// ═══════════════════════════════════════════════════════════════════════════
// GÉNÉRATEUR
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Génère une liste d'items pour le mini-jeu Repérage.
 * Chaque item = une phrase où l'enfant doit taper le bon mot.
 */
export function generateReperageItems(
  count: number = 10,
  options: ReperageOptions,
): ReperageItem[] {
  const { target } = options;

  const suitableSentences = GRAMMAR_SENTENCES.filter((s) => hasSuitableTarget(s, target));
  const pool = shuffle([...suitableSentences]);

  const items: ReperageItem[] = [];

  for (const s of pool.slice(0, count)) {
    const targetWords = getTargetWords(s, target);
    const targetWordTexts = new Set(targetWords.map((w) => w.word));

    const words: ReperageWord[] = s.words.map((w, i) => ({
      word: w.word,
      index: i,
      isTarget: targetWordTexts.has(w.word) && targetWords.some((tw) => tw === w),
    }));

    // Recalculer isTarget mot par mot en se basant sur la référence d'objet
    const targetSet = new Set(targetWords);
    for (let i = 0; i < s.words.length; i++) {
      words[i].isTarget = targetSet.has(s.words[i]);
    }

    const correctIndices = words.filter((w) => w.isTarget).map((w) => w.index);

    items.push({
      id: `reperage-${target}-${s.id}`,
      sentence: buildSentenceText(s),
      words,
      target,
      hint: TARGET_HINTS[target],
      correctIndices,
    });
  }

  return items;
}
