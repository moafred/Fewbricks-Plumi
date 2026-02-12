import { shuffle } from './utils.js';
import { isEven } from './math-data.js';

/** Un item à trier dans le mini-jeu Tri des Nombres */
export interface MathSortingItem {
  id: string;
  number: number;
  /** Catégorie correcte (ex: 'pair', 'impair', '< 50', '≥ 50') */
  category: string;
}

export interface MathSortingOptions {
  /** Plage de nombres [min, max] (défaut: [1, 99]) */
  numberRange?: [number, number];
  /** Exactement 2 catégories — critère de tri (défaut: ['pair', 'impair']) */
  categories?: [string, string];
}

/** Classifie un nombre dans une catégorie */
function classify(n: number, categories: [string, string]): string {
  const [catA, catB] = categories;

  if (catA === 'pair' && catB === 'impair') {
    return isEven(n) ? 'pair' : 'impair';
  }
  if (catA === '< 50' && catB === '≥ 50') {
    return n < 50 ? '< 50' : '≥ 50';
  }
  if (catA === 'unité < 5' && catB === 'unité ≥ 5') {
    return (n % 10) < 5 ? 'unité < 5' : 'unité ≥ 5';
  }
  if (catA === 'multiple de 5' && catB === 'pas multiple de 5') {
    return n % 5 === 0 ? 'multiple de 5' : 'pas multiple de 5';
  }
  if (catA === 'multiple de 10' && catB === 'pas multiple de 10') {
    return n % 10 === 0 ? 'multiple de 10' : 'pas multiple de 10';
  }

  // Pas de fallback silencieux : toute nouvelle catégorie doit être explicitement gérée
  throw new Error(`[tri-nombres] Catégories non supportées : "${catA}" / "${catB}"`);
}

/**
 * Génère une liste d'items à trier pour le Tri des Nombres.
 * Distribue équitablement entre les deux catégories.
 */
export function generateMathSortingItems(
  count: number = 10,
  options?: MathSortingOptions,
): MathSortingItem[] {
  const [min, max] = options?.numberRange ?? [1, 99];
  const categories: [string, string] = (options?.categories as [string, string]) ?? ['pair', 'impair'];

  // Répartir les nombres par catégorie
  const buckets: Record<string, number[]> = { [categories[0]]: [], [categories[1]]: [] };

  for (let n = min; n <= max; n++) {
    const cat = classify(n, categories);
    buckets[cat]?.push(n);
  }

  // Piocher équitablement
  const perCat = Math.ceil(count / 2);
  const picked: MathSortingItem[] = [];

  for (const cat of categories) {
    const pool = shuffle([...(buckets[cat] ?? [])]);
    for (const n of pool.slice(0, perCat)) {
      picked.push({
        id: `tri-nombres-${n}`,
        number: n,
        category: cat,
      });
    }
  }

  return shuffle(picked).slice(0, count);
}
