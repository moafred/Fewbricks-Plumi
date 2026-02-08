import { shuffle } from './utils.js';

/** Un item pour le mini-jeu Partage (fractions visuelles) */
export interface PartageItem {
  id: string;
  /** Dénominateur (nombre de parts égales) */
  denominator: number;
  /** Numérateur (nombre de parts colorées) */
  numerator: number;
  /** Fraction sous forme de string (ex: "2/3") */
  fractionLabel: string;
  /** 4 choix de fractions */
  choices: string[];
  correctAnswer: string;
}

export interface PartageOptions {
  fractionDenominators?: number[];
}

/** Formate une fraction en chaîne lisible */
function formatFraction(numerator: number, denominator: number): string {
  return `${numerator}/${denominator}`;
}

/**
 * Dénominateurs de secours pour générer des distracteurs quand le pool
 * du chapitre est trop petit (ex: fractionDenominators: [2]).
 * Pédagogiquement pertinent : montrer 1/3 comme distracteur de 1/2
 * force l'enfant à distinguer les dénominateurs.
 */
const FALLBACK_DENOMINATORS = [2, 3, 4, 5, 6];

/**
 * Génère des fractions distractrices plausibles.
 * Erreurs fréquentes : même dénominateur ±1, numérateur inversé,
 * ou fraction avec un dénominateur différent.
 */
function generateFractionDistractors(
  numerator: number,
  denominator: number,
  allDenominators: number[],
): string[] {
  const correctStr = formatFraction(numerator, denominator);
  const candidates = new Set<string>();

  // Numérateur ±1, même dénominateur
  if (numerator + 1 <= denominator) {
    candidates.add(formatFraction(numerator + 1, denominator));
  }
  if (numerator - 1 >= 1) {
    candidates.add(formatFraction(numerator - 1, denominator));
  }

  // Numérateur ±2, même dénominateur
  if (numerator + 2 <= denominator) {
    candidates.add(formatFraction(numerator + 2, denominator));
  }
  if (numerator - 2 >= 1) {
    candidates.add(formatFraction(numerator - 2, denominator));
  }

  // Confusion numérateur/dénominateur inversés (si différent)
  if (numerator !== denominator && denominator - numerator >= 1) {
    candidates.add(formatFraction(denominator - numerator, denominator));
  }

  // Même numérateur, dénominateur différent (pool du chapitre + fallback)
  const expandedDenominators = new Set([...allDenominators, ...FALLBACK_DENOMINATORS]);
  for (const d of expandedDenominators) {
    if (d !== denominator && numerator <= d) {
      candidates.add(formatFraction(numerator, d));
    }
  }

  // Retirer la bonne réponse si elle s'est glissée dans les candidats
  candidates.delete(correctStr);

  return shuffle([...candidates]);
}

/**
 * Génère une liste d'items pour le Partage.
 * L'enfant doit identifier la fraction correspondant à une forme partagée.
 * Niveau CE1 : dénominateurs simples (2, 3, 4), fractions ≤ 1.
 */
export function generatePartageItems(
  count: number = 10,
  options?: PartageOptions,
): PartageItem[] {
  const denominators = options?.fractionDenominators ?? [2, 3, 4];

  // Générer toutes les fractions possibles (numérateur 1..dénominateur)
  interface FractionPair {
    numerator: number;
    denominator: number;
  }

  const allFractions: FractionPair[] = [];
  for (const d of denominators) {
    for (let n = 1; n <= d; n++) {
      allFractions.push({ numerator: n, denominator: d });
    }
  }

  if (allFractions.length === 0) return [];

  const shuffled = shuffle([...allFractions]);
  const items: PartageItem[] = [];

  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const { numerator, denominator } = shuffled[i];
    const correctStr = formatFraction(numerator, denominator);

    const distractors = generateFractionDistractors(numerator, denominator, denominators);
    if (distractors.length < 3) continue;

    const choices = shuffle([correctStr, ...distractors.slice(0, 3)]);

    items.push({
      id: `partage-${numerator}-${denominator}-${i}`,
      denominator,
      numerator,
      fractionLabel: correctStr,
      choices,
      correctAnswer: correctStr,
    });
  }

  // Si le pool de fractions est trop petit, on peut recycler
  if (items.length < count && allFractions.length > 0) {
    let attempts = 0;
    while (items.length < count && attempts < count * 10) {
      attempts++;
      const { numerator, denominator } = allFractions[Math.floor(Math.random() * allFractions.length)];
      const correctStr = formatFraction(numerator, denominator);

      const distractors = generateFractionDistractors(numerator, denominator, denominators);
      if (distractors.length < 3) continue;

      const choices = shuffle([correctStr, ...distractors.slice(0, 3)]);

      items.push({
        id: `partage-${numerator}-${denominator}-${items.length}`,
        denominator,
        numerator,
        fractionLabel: correctStr,
        choices,
        correctAnswer: correctStr,
      });
    }
  }

  return items;
}
