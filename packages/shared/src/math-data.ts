import { shuffle } from './utils.js';

// ═══════════════════════════════════════════════════════════════════════════
// FAITS ARITHMÉTIQUES — Source unique de vérité pour les maths CE1
// ═══════════════════════════════════════════════════════════════════════════

export interface AdditionFact {
  a: number;
  b: number;
  result: number;
}

export interface SubtractionFact {
  a: number;
  b: number;
  result: number;
}

export interface MultiplicationFact {
  a: number;
  b: number;
  result: number;
}

// ─── Tables d'addition (a + b pour a,b ∈ [1,9]) ───────────────────────

function buildAdditionFacts(): AdditionFact[] {
  const facts: AdditionFact[] = [];
  for (let a = 1; a <= 9; a++) {
    for (let b = 1; b <= 9; b++) {
      facts.push({ a, b, result: a + b });
    }
  }
  return facts;
}

export const ADDITION_FACTS: AdditionFact[] = buildAdditionFacts();

// ─── Soustractions (dérivées des additions) ────────────────────────────

function buildSubtractionFacts(): SubtractionFact[] {
  const facts: SubtractionFact[] = [];
  const seen = new Set<string>();
  for (const add of ADDITION_FACTS) {
    const key = `${add.result}-${add.a}`;
    if (!seen.has(key)) {
      seen.add(key);
      facts.push({ a: add.result, b: add.a, result: add.b });
    }
    const key2 = `${add.result}-${add.b}`;
    if (!seen.has(key2)) {
      seen.add(key2);
      facts.push({ a: add.result, b: add.b, result: add.a });
    }
  }
  return facts;
}

export const SUBTRACTION_FACTS: SubtractionFact[] = buildSubtractionFacts();

// ─── Tables de multiplication (×2, ×3, ×4, ×5) ────────────────────────

function buildMultiplicationFacts(): MultiplicationFact[] {
  const facts: MultiplicationFact[] = [];
  for (const table of [2, 3, 4, 5]) {
    for (let i = 1; i <= 10; i++) {
      facts.push({ a: i, b: table, result: i * table });
    }
  }
  return facts;
}

export const MULTIPLICATION_FACTS: MultiplicationFact[] = buildMultiplicationFacts();

// ─── Compléments à 10 ─────────────────────────────────────────────────

export const COMPLEMENTS_10: Array<{ a: number; complement: number }> = [
  { a: 1, complement: 9 },
  { a: 2, complement: 8 },
  { a: 3, complement: 7 },
  { a: 4, complement: 6 },
  { a: 5, complement: 5 },
  { a: 6, complement: 4 },
  { a: 7, complement: 3 },
  { a: 8, complement: 2 },
  { a: 9, complement: 1 },
];

// ─── Compléments à 100 ────────────────────────────────────────────────

export const COMPLEMENTS_100: Array<{ a: number; complement: number }> = [
  { a: 10, complement: 90 },
  { a: 20, complement: 80 },
  { a: 30, complement: 70 },
  { a: 40, complement: 60 },
  { a: 50, complement: 50 },
  { a: 60, complement: 40 },
  { a: 70, complement: 30 },
  { a: 80, complement: 20 },
  { a: 90, complement: 10 },
];

// ─── Propriétés des nombres ───────────────────────────────────────────

export function isEven(n: number): boolean {
  return n % 2 === 0;
}

export function isOdd(n: number): boolean {
  return n % 2 !== 0;
}

// ─── Templates de problèmes textuels (vocabulaire CE1, ≤ 8 mots) ────

export interface MathWordTemplate {
  template: string;
  operation: 'addition' | 'subtraction';
}

/** Problèmes additifs — phrases courtes, contextes familiers CE1 */
export const MATH_WORD_TEMPLATES: MathWordTemplate[] = [
  // Addition
  { template: 'Tom a %A% billes. Il en gagne %B%.', operation: 'addition' },
  { template: 'Léa a %A% bonbons et %B% gâteaux.', operation: 'addition' },
  { template: 'Il y a %A% filles et %B% garçons.', operation: 'addition' },
  { template: 'Papa a %A% pommes et %B% poires.', operation: 'addition' },
  { template: 'Maman achète %A% roses et %B% tulipes.', operation: 'addition' },
  { template: 'Le chat a %A% croquettes. On en ajoute %B%.', operation: 'addition' },
  // Soustraction
  { template: 'Tom a %A% billes. Il en perd %B%.', operation: 'subtraction' },
  { template: 'Léa a %A% bonbons. Elle en mange %B%.', operation: 'subtraction' },
  { template: 'Il y a %A% oiseaux. %B% s\'envolent.', operation: 'subtraction' },
  { template: 'Papa a %A% pommes. Il en donne %B%.', operation: 'subtraction' },
  { template: 'Le chat a %A% croquettes. Il en mange %B%.', operation: 'subtraction' },
  { template: 'Maman a %A% fleurs. Elle en offre %B%.', operation: 'subtraction' },
];

// ─── Fonctions d'accès ────────────────────────────────────────────────

/** Filtre les additions par plage de nombres */
export function getAdditionFacts(
  minA: number = 1,
  maxA: number = 9,
  minB: number = 1,
  maxB: number = 9,
): AdditionFact[] {
  return ADDITION_FACTS.filter(
    (f) => f.a >= minA && f.a <= maxA && f.b >= minB && f.b <= maxB,
  );
}

/** Filtre les soustractions par plage de résultat */
export function getSubtractionFacts(maxMinuend: number = 18): SubtractionFact[] {
  return SUBTRACTION_FACTS.filter((f) => f.a <= maxMinuend);
}

/** Filtre les multiplications par tables spécifiques */
export function getMultiplicationFacts(tables?: number[]): MultiplicationFact[] {
  if (!tables) return MULTIPLICATION_FACTS;
  return MULTIPLICATION_FACTS.filter((f) => tables.includes(f.b));
}

/**
 * Génère des distracteurs numériques proches de la bonne réponse.
 * Erreurs fréquentes CE1 : ±1, ±10, oubli de retenue.
 */
export function generateNumericDistractors(
  correctAnswer: number,
  count: number = 3,
  range: [number, number] = [0, 99],
  exclude: number[] = [],
): number[] {
  const candidates = new Set<number>();
  const toExclude = new Set([correctAnswer, ...exclude]);

  // Erreurs fréquentes
  candidates.add(correctAnswer + 1);
  candidates.add(correctAnswer - 1);
  candidates.add(correctAnswer + 10);
  candidates.add(correctAnswer - 10);
  candidates.add(correctAnswer + 2);
  candidates.add(correctAnswer - 2);

  // Filtrer : dans la plage, positif, pas dans la liste d'exclusion
  const valid = [...candidates].filter(
    (n) => n >= range[0] && n <= range[1] && !toExclude.has(n),
  );

  const result = shuffle(valid).slice(0, count);

  // Compléter avec des aléatoires si pas assez
  while (result.length < count) {
    const random = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    if (!toExclude.has(random) && !result.includes(random)) {
      result.push(random);
    }
  }

  return result.slice(0, count);
}
