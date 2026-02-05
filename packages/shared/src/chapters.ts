import type { Book, Chapter } from './types.js';

/**
 * Livres de Sorts — regroupement narratif des chapitres par temps.
 * Chaque livre introduit un nouveau temps de conjugaison.
 */
export const BOOKS: Book[] = [
  {
    id: 1,
    title: 'Le Livre des Fondations',
    subtitle: "Le Jardin s'éveille",
    tenses: ['present'],
    chapters: [1, 2, 3],
    color: 'royal',
  },
  {
    id: 2,
    title: 'Le Livre des Prophéties',
    subtitle: "L'horizon s'ouvre",
    tenses: ['futur'],
    chapters: [4, 5, 6],
    color: 'enchant',
  },
  {
    id: 3,
    title: 'Le Livre des Souvenirs',
    subtitle: 'Les souvenirs dansent',
    tenses: ['imparfait'],
    chapters: [7, 8, 9],
    color: 'magic',
  },
  {
    id: 4,
    title: 'Le Livre du Temps',
    subtitle: 'Bonus',
    tenses: ['present', 'futur', 'imparfait', 'passe_compose'],
    chapters: [10, 11, 12],
    color: 'gentle',
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
    narrative: 'Bienvenue !',
    verbs: ['etre'],
    tense: 'present',
    steps: [],
  },
  {
    id: 2,
    title: 'Le Sort AVOIR',
    narrative: 'Bienvenue !',
    verbs: ['avoir'],
    tense: 'present',
    steps: [],
  },
  {
    id: 3,
    title: 'Le Duel ÊTRE vs AVOIR',
    narrative: 'Bienvenue !',
    verbs: ['etre', 'avoir'],
    tense: 'present',
    steps: [],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 2 — Le Livre des Prophéties (Futur)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 4,
    title: 'ÊTRE au Futur',
    narrative: 'Bienvenue !',
    verbs: ['etre'],
    tense: 'futur',
    steps: [],
  },
  {
    id: 5,
    title: 'AVOIR au Futur',
    narrative: 'Bienvenue !',
    verbs: ['avoir'],
    tense: 'futur',
    steps: [],
  },
  {
    id: 6,
    title: 'Duel Futur',
    narrative: 'Bienvenue !',
    verbs: ['etre', 'avoir'],
    tense: 'futur',
    steps: [],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 3 — Le Livre des Souvenirs (Imparfait)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 7,
    title: "ÊTRE à l'Imparfait",
    narrative: 'Bienvenue !',
    verbs: ['etre'],
    tense: 'imparfait',
    steps: [],
  },
  {
    id: 8,
    title: "AVOIR à l'Imparfait",
    narrative: 'Bienvenue !',
    verbs: ['avoir'],
    tense: 'imparfait',
    steps: [],
  },
  {
    id: 9,
    title: 'Duel Imparfait',
    narrative: 'Bienvenue !',
    verbs: ['etre', 'avoir'],
    tense: 'imparfait',
    steps: [],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 4 — Le Livre du Temps (Multi-temps + Passé Composé)
  // Bonus — hors programme CE1 strict
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 10,
    title: 'Maître du Temps - ÊTRE',
    narrative: 'Bienvenue !',
    verbs: ['etre'],
    tense: 'mixed',
    steps: [],
  },
  {
    id: 11,
    title: 'Maître du Temps - AVOIR',
    narrative: 'Bienvenue !',
    verbs: ['avoir'],
    tense: 'mixed',
    steps: [],
  },
  {
    id: 12,
    title: 'Boss Final - Le Flux Temporel',
    narrative: 'Bienvenue !',
    verbs: ['etre', 'avoir'],
    tense: 'mixed',
    steps: [],
  },
];
