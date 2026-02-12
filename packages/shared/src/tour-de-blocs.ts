import { shuffle } from './utils.js';
import { generateNumericDistractors } from './math-data.js';

/** Un item pour le mini-jeu Tour de Blocs (décomposition en base 10) */
export interface TourDeBlocsItem {
  id: string;
  /** Nombre cible à décomposer */
  targetNumber: number;
  /** Décomposition correcte */
  correctDecomposition: { hundreds: number; tens: number; units: number };
  /** 4 choix de nombres (format string pour UI) */
  choices: string[];
  correctAnswer: string;
}

export interface TourDeBlocsOptions {
  numberRange?: [number, number];
}

/** Décompose un nombre en centaines, dizaines, unités */
function decompose(n: number): { hundreds: number; tens: number; units: number } {
  const hundreds = Math.floor(n / 100);
  const tens = Math.floor((n % 100) / 10);
  const units = n % 10;
  return { hundreds, tens, units };
}

/**
 * Génère une liste d'items pour la Tour de Blocs.
 * L'enfant doit identifier le nombre correspondant à la décomposition visuelle.
 * Niveau CE1 : nombres de 10 à 999.
 */
export function generateTourDeBlocsItems(
  count: number = 10,
  options?: TourDeBlocsOptions,
): TourDeBlocsItem[] {
  const [rangeMin, rangeMax] = options?.numberRange ?? [10, 999];
  const usedNumbers = new Set<number>();
  const items: TourDeBlocsItem[] = [];
  let attempts = 0;

  while (items.length < count && attempts < count * 10) {
    attempts++;

    const target = rangeMin + Math.floor(Math.random() * (rangeMax - rangeMin + 1));

    if (usedNumbers.has(target)) continue;

    const correct = decompose(target);
    const distractors = generateNumericDistractors(target, 3, [rangeMin, rangeMax]);

    usedNumbers.add(target);

    const choices = shuffle([target, ...distractors].map(String));

    items.push({
      id: `tour-blocs-${target}-${items.length}`,
      targetNumber: target,
      correctDecomposition: correct,
      choices,
      correctAnswer: String(target),
    });
  }

  return items;
}
