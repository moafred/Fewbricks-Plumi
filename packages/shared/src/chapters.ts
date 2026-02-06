import type { Book, Chapter } from './types.js';

export const BOOKS: Book[] = [
  {
    id: 1,
    title: 'Le Jardin des Mots',
    subtitle: "Le Jardin s'éveille",
    tenses: ['present'],
    chapters: [1, 2, 3],
    color: 'dawn',
    biome: 'jardin',
  },
  {
    id: 2,
    title: 'Le Livre des Fondations',
    subtitle: 'Les sorts fondamentaux',
    tenses: ['present'],
    chapters: [4, 5, 6],
    color: 'sky',
    biome: 'fondations',
  },
  {
    id: 3,
    title: 'La Clairière Enchantée',
    subtitle: 'La Forêt murmure',
    tenses: ['present'],
    chapters: [7, 8, 9],
    color: 'moss',
    biome: 'clairiere',
  },
  {
    id: 4,
    title: 'Les Sentiers du Futur',
    subtitle: "L'horizon s'ouvre",
    tenses: ['futur'],
    chapters: [10, 11, 12],
    color: 'gold',
    biome: 'futur',
  },
  {
    id: 5,
    title: 'Les Brumes du Passé',
    subtitle: 'Les souvenirs dansent',
    tenses: ['imparfait'],
    chapters: [13, 14, 15],
    color: 'coral',
    biome: 'brumes',
  },
  {
    id: 6,
    title: 'Le Flux Temporel',
    subtitle: 'Bonus',
    tenses: ['present', 'futur', 'imparfait', 'passe_compose'],
    chapters: [16, 17, 18],
    color: 'coral',
    biome: 'flux',
    isBonus: true,
  },
];

/**
 * Progression des chapitres — 18 chapitres répartis en 6 livres.
 * Chaque chapitre définit sa séquence pédagogique (steps) avec
 * mécaniques de mini-jeu, pronoms ciblés et nombre de questions.
 *
 * Progression spiralaire des pronoms :
 *   1. je, tu (familier)
 *   2. il/elle/on, nous (extension)
 *   3. vous, ils/elles (complet)
 *   Boss : tous les pronoms (pronouns = undefined)
 */
export const CHAPTERS: Chapter[] = [
{
    id: 1,
    title: 'Découvrir ÊTRE',
    narrative: 'Bienvenue dans le Jardin ! Découvrons le sort ÊTRE.',
    verbs: ['etre'],
    tense: 'present',
    steps: [
      { mechanic: 'grimoire', pronouns: ['je', 'tu'], questionCount: 3 },
      { mechanic: 'grimoire', pronouns: ['il/elle/on', 'nous'], questionCount: 3 },
      { mechanic: 'potion', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 2,
    title: 'Découvrir AVOIR',
    narrative: 'Le Jardin grandit ! Apprenons le sort AVOIR.',
    verbs: ['avoir'],
    tense: 'present',
    steps: [
      { mechanic: 'grimoire', pronouns: ['je', 'tu'], questionCount: 3 },
      { mechanic: 'grimoire', pronouns: ['il/elle/on', 'nous'], questionCount: 3 },
      { mechanic: 'potion', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 3,
    title: 'Duel ÊTRE vs AVOIR',
    narrative: 'ÊTRE ou AVOIR ? Apprends à les reconnaître !',
    verbs: ['etre', 'avoir'],
    tense: 'present',
    steps: [
      { mechanic: 'tri-sorcier', pronouns: ['je', 'tu'], questionCount: 3 },
      {
        mechanic: 'tri-sorcier',
        pronouns: ['il/elle/on', 'nous', 'vous', 'ils/elles'],
        questionCount: 3,
      },
      { mechanic: 'grimoire', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },

{
    id: 4,
    title: 'Maîtriser ÊTRE',
    narrative: 'Tu connais ÊTRE ? Prouve-le, jeune magicien !',
    verbs: ['etre'],
    tense: 'present',
    steps: [
      { mechanic: 'grimoire', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'grimoire', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 3 },
      { mechanic: 'potion', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'potion', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 3 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 5,
    title: 'Maîtriser AVOIR',
    narrative: "Le sort AVOIR n'a plus de secret pour toi !",
    verbs: ['avoir'],
    tense: 'present',
    steps: [
      { mechanic: 'grimoire', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'grimoire', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 3 },
      { mechanic: 'potion', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'potion', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 3 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 6,
    title: 'Duel avancé ÊTRE vs AVOIR',
    narrative: 'Le grand duel ! Sauras-tu tout reconnaître ?',
    verbs: ['etre', 'avoir'],
    tense: 'present',
    steps: [
      { mechanic: 'tri-sorcier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 4 },
      { mechanic: 'tri-sorcier', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 4 },
      { mechanic: 'grimoire', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },

{
    id: 7,
    title: 'ÊTRE + Accords',
    narrative: 'Dans la Clairière, les mots s\'accordent comme par magie !',
    verbs: ['etre'],
    tense: 'present',
    steps: [
      { mechanic: 'grimoire', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'potion', questionCount: 3 },
      { mechanic: 'pont-accords', questionCount: 4 },
      { mechanic: 'potion-gn', questionCount: 4 },
    ],
  },
  {
    id: 8,
    title: 'AVOIR + Accords',
    narrative: 'Les accords du groupe nominal, tu connais ?',
    verbs: ['avoir'],
    tense: 'present',
    steps: [
      { mechanic: 'grimoire', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'potion', questionCount: 3 },
      { mechanic: 'pont-accords', questionCount: 4 },
      { mechanic: 'potion-gn', questionCount: 4 },
    ],
  },
  {
    id: 9,
    title: 'Duel + GN',
    narrative: 'Conjugaison ET accords ? Tu es prêt !',
    verbs: ['etre', 'avoir'],
    tense: 'present',
    steps: [
      { mechanic: 'tri-sorcier', questionCount: 4 },
      { mechanic: 'grimoire', questionCount: 3 },
      { mechanic: 'potion', questionCount: 3 },
      { mechanic: 'pont-accords', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },

{
    id: 10,
    title: 'ÊTRE au futur',
    narrative: "Le futur t'attend ! Découvre ÊTRE au futur.",
    verbs: ['etre'],
    tense: 'futur',
    steps: [
      { mechanic: 'grimoire', pronouns: ['je', 'tu'], questionCount: 3 },
      {
        mechanic: 'grimoire',
        pronouns: ['il/elle/on', 'nous', 'vous', 'ils/elles'],
        questionCount: 3,
      },
      { mechanic: 'potion', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 11,
    title: 'AVOIR au futur',
    narrative: "AVOIR au futur, c'est parti !",
    verbs: ['avoir'],
    tense: 'futur',
    steps: [
      { mechanic: 'grimoire', pronouns: ['je', 'tu'], questionCount: 3 },
      {
        mechanic: 'grimoire',
        pronouns: ['il/elle/on', 'nous', 'vous', 'ils/elles'],
        questionCount: 3,
      },
      { mechanic: 'potion', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 12,
    title: 'Duel futur',
    narrative: 'ÊTRE ou AVOIR au futur ? Montre tes talents !',
    verbs: ['etre', 'avoir'],
    tense: 'futur',
    steps: [
      { mechanic: 'tri-sorcier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 4 },
      { mechanic: 'tri-sorcier', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 4 },
      { mechanic: 'grimoire', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },

{
    id: 13,
    title: "ÊTRE à l'imparfait",
    narrative: "Voyageons dans le passé ! ÊTRE à l'imparfait.",
    verbs: ['etre'],
    tense: 'imparfait',
    steps: [
      { mechanic: 'grimoire', pronouns: ['je', 'tu'], questionCount: 3 },
      {
        mechanic: 'grimoire',
        pronouns: ['il/elle/on', 'nous', 'vous', 'ils/elles'],
        questionCount: 3,
      },
      { mechanic: 'potion', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 14,
    title: "AVOIR à l'imparfait",
    narrative: "AVOIR à l'imparfait, souviens-toi bien !",
    verbs: ['avoir'],
    tense: 'imparfait',
    steps: [
      { mechanic: 'grimoire', pronouns: ['je', 'tu'], questionCount: 3 },
      {
        mechanic: 'grimoire',
        pronouns: ['il/elle/on', 'nous', 'vous', 'ils/elles'],
        questionCount: 3,
      },
      { mechanic: 'potion', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 15,
    title: 'Duel imparfait',
    narrative: 'Le duel du passé ! ÊTRE ou AVOIR ?',
    verbs: ['etre', 'avoir'],
    tense: 'imparfait',
    steps: [
      { mechanic: 'tri-sorcier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 4 },
      { mechanic: 'tri-sorcier', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 4 },
      { mechanic: 'grimoire', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },

{
    id: 16,
    title: 'Maître du Temps — ÊTRE',
    narrative: 'Tous les temps ! Es-tu un vrai maître ?',
    verbs: ['etre'],
    tense: 'mixed',
    steps: [
      { mechanic: 'grimoire', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4 },
      { mechanic: 'grimoire', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 17,
    title: 'Maître du Temps — AVOIR',
    narrative: 'AVOIR à travers le temps ! À toi de jouer.',
    verbs: ['avoir'],
    tense: 'mixed',
    steps: [
      { mechanic: 'grimoire', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4 },
      { mechanic: 'grimoire', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 18,
    title: 'Boss Final — Le Flux Temporel',
    narrative: "Le boss final ! Tout ce que tu as appris, c'est maintenant !",
    verbs: ['etre', 'avoir'],
    tense: 'mixed',
    steps: [
      { mechanic: 'tri-sorcier', questionCount: 4 },
      { mechanic: 'grimoire', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4 },
      { mechanic: 'potion', questionCount: 4, isBoss: true },
    ],
  },
];

export function getChaptersForBook(bookId: number): Chapter[] {
  const book = BOOKS.find((b) => b.id === bookId);
  if (!book) return [];
  return book.chapters
    .map((id) => CHAPTERS.find((c) => c.id === id))
    .filter((ch): ch is Chapter => ch !== undefined);
}

export function getChapter(chapterId: number): Chapter | undefined {
  return CHAPTERS.find((c) => c.id === chapterId);
}

export function getBookForChapter(chapterId: number): Book | undefined {
  return BOOKS.find((b) => b.chapters.includes(chapterId));
}
