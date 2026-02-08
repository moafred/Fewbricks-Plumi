import { shuffle } from './utils.js';

/** Un item pour le mini-jeu Droite Numérique */
export interface DroiteNumeriqueItem {
  id: string;
  /** Nombre cible à placer */
  targetNumber: number;
  /** Bornes de la droite [min, max] */
  lineRange: [number, number];
  /** Graduations principales visibles */
  graduations: number[];
  /** 4 choix de position (nombres) */
  choices: string[];
  correctAnswer: string;
}

export interface DroiteNumeriqueOptions {
  numberRange?: [number, number];
}

/**
 * Calcule les graduations adaptées à la plage donnée.
 * Pas de 10 pour [0, 100], pas de 5 pour [0, 50], pas de 2 pour [0, 20].
 */
function computeGraduations(min: number, max: number): number[] {
  const range = max - min;
  let step: number;

  if (range <= 20) {
    step = 2;
  } else if (range <= 50) {
    step = 5;
  } else {
    step = 10;
  }

  const graduations: number[] = [];
  // Commencer à la première graduation arrondie au pas
  const start = Math.ceil(min / step) * step;
  for (let n = start; n <= max; n += step) {
    graduations.push(n);
  }

  // Toujours inclure les bornes
  if (!graduations.includes(min)) graduations.unshift(min);
  if (!graduations.includes(max)) graduations.push(max);

  return graduations;
}

/**
 * Arrondit une borne vers le bas au multiple de step le plus proche.
 */
function roundDown(n: number, step: number): number {
  return Math.floor(n / step) * step;
}

/**
 * Arrondit une borne vers le haut au multiple de step le plus proche.
 */
function roundUp(n: number, step: number): number {
  return Math.ceil(n / step) * step;
}

/**
 * Génère des distracteurs proches du nombre cible.
 * Choix plausibles : le correct + 3 nombres voisins.
 */
function generateDistractors(target: number, lineMin: number, lineMax: number): number[] {
  const candidates = new Set<number>();

  // Distracteurs proches (erreurs fréquentes CE1)
  candidates.add(target + 1);
  candidates.add(target - 1);
  candidates.add(target + 2);
  candidates.add(target - 2);
  candidates.add(target + 5);
  candidates.add(target - 5);
  candidates.add(target + 10);
  candidates.add(target - 10);

  // Filtrer : dans la plage, différent de la cible
  const valid = [...candidates].filter(
    (n) => n !== target && n >= lineMin && n <= lineMax,
  );

  return shuffle(valid).slice(0, 3);
}

/**
 * Génère une liste d'items pour la Droite Numérique.
 * L'enfant doit identifier la position d'un nombre sur une droite graduée.
 * Niveau CE1 : nombres de 0 à 100.
 */
export function generateDroiteNumeriqueItems(
  count: number = 10,
  options?: DroiteNumeriqueOptions,
): DroiteNumeriqueItem[] {
  const [rangeMin, rangeMax] = options?.numberRange ?? [0, 100];
  const usedNumbers = new Set<number>();
  const items: DroiteNumeriqueItem[] = [];
  let attempts = 0;

  while (items.length < count && attempts < count * 10) {
    attempts++;

    const target = rangeMin + Math.floor(Math.random() * (rangeMax - rangeMin + 1));

    // Éviter les doublons
    if (usedNumbers.has(target)) continue;

    // Calculer une plage de droite englobant le nombre cible
    const range = rangeMax - rangeMin;
    let step: number;
    if (range <= 20) {
      step = 2;
    } else if (range <= 50) {
      step = 5;
    } else {
      step = 10;
    }

    const lineMin = Math.max(rangeMin, roundDown(target - step * 3, step));
    const lineMax = Math.min(rangeMax, roundUp(target + step * 3, step));

    const graduations = computeGraduations(lineMin, lineMax);

    // Générer les distracteurs
    const distractors = generateDistractors(target, lineMin, lineMax);
    if (distractors.length < 3) continue;

    usedNumbers.add(target);

    const choices = shuffle([target, ...distractors].map(String));

    items.push({
      id: `droite-num-${target}-${items.length}`,
      targetNumber: target,
      lineRange: [lineMin, lineMax],
      graduations,
      choices,
      correctAnswer: String(target),
    });
  }

  return items;
}
