import type { Book, Chapter } from './types.js';

/**
 * Livres de Sorts — regroupement narratif des chapitres par temps.
 * Chaque livre introduit un nouveau temps de conjugaison.
 */
export const BOOKS: Book[] = [
  {
    id: 1,
    title: 'Le Livre des Fondations',
    tenses: ['present'],
    chapters: [1, 2, 3],
  },
  {
    id: 2,
    title: 'Le Livre des Prophéties',
    tenses: ['futur'],
    chapters: [4, 5, 6],
  },
  {
    id: 3,
    title: 'Le Livre des Souvenirs',
    tenses: ['imparfait'],
    chapters: [7, 8, 9],
  },
  {
    id: 4,
    title: 'Le Livre du Temps',
    tenses: ['present', 'futur', 'imparfait', 'passe_compose'],
    chapters: [10, 11, 12],
    isBonus: true,
  },
];

/**
 * Progression des chapitres — 12 chapitres répartis en 4 livres.
 * Chaque chapitre cible un verbe et un temps spécifique.
 */
export const CHAPTERS: Chapter[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 1 — Le Livre des Fondations (Présent)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 1,
    title: 'Le Sort ÊTRE',
    verbs: ['etre'],
    tense: 'present',
    lessonCount: 6,
    hasBoss: true,
  },
  {
    id: 2,
    title: 'Le Sort AVOIR',
    verbs: ['avoir'],
    tense: 'present',
    lessonCount: 6,
    hasBoss: true,
  },
  {
    id: 3,
    title: 'Le Duel ÊTRE vs AVOIR',
    verbs: ['etre', 'avoir'],
    tense: 'present',
    lessonCount: 3,
    hasBoss: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 2 — Le Livre des Prophéties (Futur)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 4,
    title: 'ÊTRE au Futur',
    verbs: ['etre'],
    tense: 'futur',
    lessonCount: 6,
    hasBoss: true,
  },
  {
    id: 5,
    title: 'AVOIR au Futur',
    verbs: ['avoir'],
    tense: 'futur',
    lessonCount: 6,
    hasBoss: true,
  },
  {
    id: 6,
    title: 'Duel Futur',
    verbs: ['etre', 'avoir'],
    tense: 'futur',
    lessonCount: 3,
    hasBoss: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 3 — Le Livre des Souvenirs (Imparfait)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 7,
    title: "ÊTRE à l'Imparfait",
    verbs: ['etre'],
    tense: 'imparfait',
    lessonCount: 6,
    hasBoss: true,
  },
  {
    id: 8,
    title: "AVOIR à l'Imparfait",
    verbs: ['avoir'],
    tense: 'imparfait',
    lessonCount: 6,
    hasBoss: true,
  },
  {
    id: 9,
    title: 'Duel Imparfait',
    verbs: ['etre', 'avoir'],
    tense: 'imparfait',
    lessonCount: 3,
    hasBoss: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 4 — Le Livre du Temps (Multi-temps + Passé Composé)
  // Bonus — hors programme CE1 strict
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 10,
    title: 'Maître du Temps - ÊTRE',
    verbs: ['etre'],
    tense: 'mixed',
    lessonCount: 4,
    hasBoss: true,
  },
  {
    id: 11,
    title: 'Maître du Temps - AVOIR',
    verbs: ['avoir'],
    tense: 'mixed',
    lessonCount: 4,
    hasBoss: true,
  },
  {
    id: 12,
    title: 'Boss Final - Le Flux Temporel',
    verbs: ['etre', 'avoir'],
    tense: 'mixed',
    lessonCount: 3,
    hasBoss: true,
  },
];
