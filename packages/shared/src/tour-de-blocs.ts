import { shuffle } from './utils.js';

/** Un item pour le mini-jeu Tour de Blocs (décomposition en base 10) */
export interface TourDeBlocsItem {
  id: string;
  /** Nombre cible à décomposer */
  targetNumber: number;
  /** Décomposition correcte */
  correctDecomposition: { hundreds: number; tens: number; units: number };
  /** 4 choix de décomposition (format "Xc Yd Zu") */
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

/** Formate une décomposition en chaîne lisible ("2c 3d 5u") */
function formatDecomposition(d: { hundreds: number; tens: number; units: number }): string {
  const parts: string[] = [];
  if (d.hundreds > 0) parts.push(`${d.hundreds}c`);
  if (d.tens > 0) parts.push(`${d.tens}d`);
  if (d.units > 0) parts.push(`${d.units}u`);
  // Cas spécial : nombre = 0
  if (parts.length === 0) return '0u';
  return parts.join(' ');
}

/** Génère des décompositions erronées plausibles en variant c/d/u de ±1 */
function generateWrongDecompositions(
  correct: { hundreds: number; tens: number; units: number },
  target: number,
  maxNumber: number,
): string[] {
  const correctStr = formatDecomposition(correct);
  const candidates = new Set<string>();

  // Varier chaque composante de ±1
  const offsets = [-1, 1];

  for (const dh of offsets) {
    const h = correct.hundreds + dh;
    if (h >= 0 && h <= Math.floor(maxNumber / 100)) {
      const d = { hundreds: h, tens: correct.tens, units: correct.units };
      const str = formatDecomposition(d);
      if (str !== correctStr) candidates.add(str);
    }
  }

  for (const dt of offsets) {
    const t = correct.tens + dt;
    if (t >= 0 && t <= 9) {
      const d = { hundreds: correct.hundreds, tens: t, units: correct.units };
      const str = formatDecomposition(d);
      if (str !== correctStr) candidates.add(str);
    }
  }

  for (const du of offsets) {
    const u = correct.units + du;
    if (u >= 0 && u <= 9) {
      const d = { hundreds: correct.hundreds, tens: correct.tens, units: u };
      const str = formatDecomposition(d);
      if (str !== correctStr) candidates.add(str);
    }
  }

  // Confusion dizaines/unités inversées
  if (correct.tens !== correct.units) {
    const swapped = { hundreds: correct.hundreds, tens: correct.units, units: correct.tens };
    const str = formatDecomposition(swapped);
    if (str !== correctStr) candidates.add(str);
  }

  // Confusion centaines/dizaines (ex: 235 → 3c 2d 5u au lieu de 2c 3d 5u)
  if (correct.hundreds > 0 && correct.hundreds !== correct.tens) {
    const swapped = { hundreds: correct.tens, tens: correct.hundreds, units: correct.units };
    const str = formatDecomposition(swapped);
    if (str !== correctStr) candidates.add(str);
  }

  return shuffle([...candidates]);
}

/**
 * Génère une liste d'items pour la Tour de Blocs.
 * L'enfant doit identifier la bonne décomposition en centaines/dizaines/unités.
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
    const correctStr = formatDecomposition(correct);

    const wrongChoices = generateWrongDecompositions(correct, target, rangeMax);
    if (wrongChoices.length < 3) continue;

    usedNumbers.add(target);

    const choices = shuffle([correctStr, ...wrongChoices.slice(0, 3)]);

    items.push({
      id: `tour-blocs-${target}-${items.length}`,
      targetNumber: target,
      correctDecomposition: correct,
      choices,
      correctAnswer: correctStr,
    });
  }

  return items;
}
