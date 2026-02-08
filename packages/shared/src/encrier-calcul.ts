import type { MathOperation } from './types.js';
import {
  getAdditionFacts,
  getSubtractionFacts,
  getMultiplicationFacts,
  generateNumericDistractors,
  MATH_WORD_TEMPLATES,
} from './math-data.js';
import { shuffle } from './utils.js';

/** Un item phrase-à-trou pour le mini-jeu Encrier Calcul */
export interface EncrierCalculItem {
  id: string;
  /** Phrase avec le trou (ex: "7 + _____ = 12" ou "Tom a 5 billes...") */
  sentence: string;
  /** La bonne réponse (nombre sous forme de string) */
  correctAnswer: string;
  /** 4 choix mélangés dont la bonne réponse */
  choices: string[];
  operation: MathOperation;
}

export interface EncrierCalculOptions {
  /** Opérations à inclure (défaut: ['addition']) */
  operations?: MathOperation[];
  /** Plage de nombres [min, max] (défaut: [1, 9]) */
  numberRange?: [number, number];
}

const GAP = '_____';

type GapType = 'result' | 'operand' | 'word-problem';

interface RawGapItem {
  sentence: string;
  correctAnswer: number;
  operation: MathOperation;
}

function generateGapItems(options?: EncrierCalculOptions): RawGapItem[] {
  const ops = options?.operations ?? ['addition'];
  const [min, max] = options?.numberRange ?? [1, 9];
  const items: RawGapItem[] = [];

  // Type de trou : 1/3 résultat manquant, 1/3 opérande manquant, 1/3 problème textuel
  const gapTypes: GapType[] = ['result', 'operand', 'word-problem'];

  if (ops.includes('addition')) {
    for (const f of getAdditionFacts(min, max, min, max)) {
      const gapType = gapTypes[Math.floor(Math.random() * gapTypes.length)];

      if (gapType === 'result') {
        items.push({
          sentence: `${f.a} + ${f.b} = ${GAP}`,
          correctAnswer: f.result,
          operation: 'addition',
        });
      } else if (gapType === 'operand') {
        items.push({
          sentence: `${f.a} + ${GAP} = ${f.result}`,
          correctAnswer: f.b,
          operation: 'addition',
        });
      } else {
        const templates = MATH_WORD_TEMPLATES.filter((t) => t.operation === 'addition');
        if (templates.length > 0) {
          const t = templates[Math.floor(Math.random() * templates.length)];
          const text = t.template.replace('%A%', String(f.a)).replace('%B%', String(f.b));
          items.push({
            sentence: `${text} Combien ? ${GAP}`,
            correctAnswer: f.result,
            operation: 'addition',
          });
        }
      }
    }
  }

  if (ops.includes('subtraction')) {
    for (const f of getSubtractionFacts(max * 2)) {
      if (f.a < min || f.a > max * 2 || f.result < 0) continue;

      const gapType = gapTypes[Math.floor(Math.random() * gapTypes.length)];

      if (gapType === 'result') {
        items.push({
          sentence: `${f.a} - ${f.b} = ${GAP}`,
          correctAnswer: f.result,
          operation: 'subtraction',
        });
      } else if (gapType === 'operand') {
        items.push({
          sentence: `${f.a} - ${GAP} = ${f.result}`,
          correctAnswer: f.b,
          operation: 'subtraction',
        });
      } else {
        const templates = MATH_WORD_TEMPLATES.filter((t) => t.operation === 'subtraction');
        if (templates.length > 0) {
          const t = templates[Math.floor(Math.random() * templates.length)];
          const text = t.template.replace('%A%', String(f.a)).replace('%B%', String(f.b));
          items.push({
            sentence: `${text} Combien ? ${GAP}`,
            correctAnswer: f.result,
            operation: 'subtraction',
          });
        }
      }
    }
  }

  if (ops.includes('multiplication')) {
    for (const f of getMultiplicationFacts()) {
      if (f.a < min || f.a > max) continue;

      const gapType = Math.random() < 0.5 ? 'result' : 'operand';

      if (gapType === 'result') {
        items.push({
          sentence: `${f.a} × ${f.b} = ${GAP}`,
          correctAnswer: f.result,
          operation: 'multiplication',
        });
      } else {
        items.push({
          sentence: `${GAP} × ${f.b} = ${f.result}`,
          correctAnswer: f.a,
          operation: 'multiplication',
        });
      }
    }
  }

  return items;
}

/**
 * Génère des items phrase-à-trou pour l'Encrier Calcul.
 * Types de trous : résultat manquant, opérande manquant, problème textuel.
 */
export function generateEncrierCalculItems(
  count: number = 10,
  options?: EncrierCalculOptions,
): EncrierCalculItem[] {
  const allItems = shuffle(generateGapItems(options));
  if (allItems.length === 0) return [];

  const maxAnswer = Math.max(...allItems.map((it) => it.correctAnswer), 20);
  const result: EncrierCalculItem[] = [];

  for (let i = 0; i < Math.min(count, allItems.length); i++) {
    const item = allItems[i];
    const distractors = generateNumericDistractors(item.correctAnswer, 3, [0, maxAnswer]);
    const choices = shuffle([item.correctAnswer, ...distractors].map(String));

    result.push({
      id: `encrier-calcul-${i}-${Math.random().toString(36).substring(2, 9)}`,
      sentence: item.sentence,
      correctAnswer: String(item.correctAnswer),
      choices,
      operation: item.operation,
    });
  }

  return result;
}
