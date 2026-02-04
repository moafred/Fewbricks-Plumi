import type { Chapter } from './types.js';

/**
 * Progression initiale — 3 chapitres.
 * Extensible : ajouter ALLER, FAIRE, verbes en -ER, etc.
 */
export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'Le Sort ÊTRE',
    verbs: ['etre'],
    lessonCount: 6,
    hasBoss: true,
  },
  {
    id: 2,
    title: 'Le Sort AVOIR',
    verbs: ['avoir'],
    lessonCount: 6,
    hasBoss: true,
  },
  {
    id: 3,
    title: 'Le Duel ÊTRE vs AVOIR',
    verbs: ['etre', 'avoir'],
    lessonCount: 3,
    hasBoss: true,
  },
];
