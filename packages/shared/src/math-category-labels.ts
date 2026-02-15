/**
 * Mapping des catégories techniques (IDs backend) vers labels accessibles pour enfants CE1 (6-7 ans).
 *
 * **Architecture** :
 * - Backend/shared garde les IDs techniques (SSOT)
 * - Frontend mappe vers labels enfants via `getCategoryLabel()`
 * - Chaque catégorie a : label court (bouton), instruction complète (consigne), narrative optionnelle (contexte)
 */

/** Ensemble de labels pour une catégorie de tri mathématique */
export interface CategoryLabelSet {
  /** Label court affiché sur le bouton (ex: "Nombres pairs") */
  label: string;
  /** Instruction complète expliquant le critère de tri (ex: "Les nombres pairs se terminent par 0, 2, 4, 6 ou 8.") */
  instruction: string;
  /** Contexte narratif optionnel affiché en phase discovery (gamification) */
  narrative?: string;
}

/**
 * Mapping exhaustif de toutes les catégories mathématiques utilisées dans `math-chapters.ts`.
 *
 * **Règles [PEDA]** :
 * - Vocabulaire adapté CE1 (6-7 ans)
 * - Instructions explicites (listes exhaustives)
 * - Pas de symboles < ≥ dans les labels enfants (conservés en IDs techniques)
 * - Contexte narratif si la tâche est abstraite (ex: "unité < 5")
 */
export const MATH_CATEGORY_LABELS: Record<string, CategoryLabelSet> = {
  pair: {
    label: 'Nombres pairs',
    instruction: 'Les nombres pairs se terminent par 0, 2, 4, 6 ou 8.',
  },
  impair: {
    label: 'Nombres impairs',
    instruction: 'Les nombres impairs se terminent par 1, 3, 5, 7 ou 9.',
  },
  '< 50': {
    label: 'Plus petits que 50',
    instruction: 'Le nombre est-il plus petit que 50 ?',
  },
  '≥ 50': {
    label: '50 et plus',
    instruction: 'Le nombre est-il 50 ou plus grand ?',
  },
  'multiple de 5': {
    label: 'Se termine par 0 ou 5',
    instruction: 'Ces nombres finissent toujours par 0 ou 5.',
  },
  'pas multiple de 5': {
    label: 'Autre fin',
    instruction: 'Ces nombres finissent par 1, 2, 3, 4, 6, 7, 8 ou 9.',
  },
  'multiple de 10': {
    label: 'Se termine par 0',
    instruction: 'Ces nombres finissent toujours par 0.',
  },
  'pas multiple de 10': {
    label: 'Ne finit pas par 0',
    instruction: 'Ces nombres finissent par 1, 2, 3, 4, 5, 6, 7, 8 ou 9.',
  },
};

/**
 * Récupère les labels enfants pour une catégorie technique.
 *
 * @param categoryId - ID technique de la catégorie (ex: 'unité < 5')
 * @returns Label set { label, instruction, narrative? }
 * @throws {Error} Si la catégorie n'existe pas (zéro fallback silencieux)
 */
export function getCategoryLabel(categoryId: string): CategoryLabelSet {
  const labelSet = MATH_CATEGORY_LABELS[categoryId];
  if (!labelSet) {
    throw new Error(
      `[math-category-labels] Catégorie inconnue : "${categoryId}". ` +
        `Ajouter cette catégorie à MATH_CATEGORY_LABELS.`,
    );
  }
  return labelSet;
}
