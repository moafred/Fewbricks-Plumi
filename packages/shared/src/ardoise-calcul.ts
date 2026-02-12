import type { MathOperation } from './types.js';
import {
  getAdditionFacts,
  getSubtractionFacts,
  getMultiplicationFacts,
  generateNumericDistractors,
} from './math-data.js';
import { shuffle } from './utils.js';

/** Un item QCM pour le mini-jeu Ardoise Calcul */
export interface ArdoiseCalculItem {
  id: string;
  /** Expression affichée (ex: "7 + 5") */
  expression: string;
  /** La bonne réponse */
  correctAnswer: number;
  /** 4 choix mélangés (strings pour affichage) dont la bonne réponse */
  choices: string[];
  operation: MathOperation;
}

export interface ArdoiseCalculOptions {
  /** Opérations à inclure (défaut: ['addition']) */
  operations?: MathOperation[];
  /** Plage de nombres [min, max] (défaut: [1, 9]) */
  numberRange?: [number, number];
}

interface RawFact {
  expression: string;
  correctAnswer: number;
  operation: MathOperation;
  operands: number[];
}

function collectFacts(options?: ArdoiseCalculOptions): RawFact[] {
  const ops = options?.operations ?? ['addition'];
  const [min, max] = options?.numberRange ?? [1, 9];
  const facts: RawFact[] = [];

  if (ops.includes('addition')) {
    for (const f of getAdditionFacts(min, max, min, max)) {
      facts.push({ expression: `${f.a} + ${f.b}`, correctAnswer: f.result, operation: 'addition', operands: [f.a, f.b] });
    }
  }

  if (ops.includes('subtraction')) {
    for (const f of getSubtractionFacts(max * 2)) {
      if (f.a >= min && f.a <= max * 2 && f.result >= 0) {
        facts.push({ expression: `${f.a} - ${f.b}`, correctAnswer: f.result, operation: 'subtraction', operands: [f.a, f.b] });
      }
    }
  }

  if (ops.includes('multiplication')) {
    for (const f of getMultiplicationFacts()) {
      if (f.a >= min && f.a <= max) {
        facts.push({ expression: `${f.a} × ${f.b}`, correctAnswer: f.result, operation: 'multiplication', operands: [f.a, f.b] });
      }
    }
  }

  return facts;
}

/**
 * Génère des items QCM calcul pour l'Ardoise Calcul.
 * Chaque item : une expression + 4 choix (1 correct + 3 distracteurs).
 */
export function generateArdoiseCalculItems(
  count: number = 10,
  options?: ArdoiseCalculOptions,
): ArdoiseCalculItem[] {
  const allFacts = shuffle(collectFacts(options));
  if (allFacts.length === 0) return [];

  const items: ArdoiseCalculItem[] = [];
  const maxResult = Math.max(...allFacts.map((f) => f.correctAnswer), 20);

  for (let i = 0; i < Math.min(count, allFacts.length); i++) {
    const fact = allFacts[i];
    const distractors = generateNumericDistractors(fact.correctAnswer, 3, [0, maxResult], fact.operands);
    const choices = shuffle([fact.correctAnswer, ...distractors].map(String));

    items.push({
      id: `ardoise-calcul-${fact.expression.replace(/\s/g, '')}-${i}`,
      expression: fact.expression,
      correctAnswer: fact.correctAnswer,
      choices,
      operation: fact.operation,
    });
  }

  return items;
}
