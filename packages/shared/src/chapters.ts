import type { Book, Chapter, Subject } from './types.js';
import { MATH_BOOKS, MATH_CHAPTERS } from './math-chapters.js';

export const BOOKS: Book[] = [
  {
    id: 1,
    title: 'Cahier 1 : Le Présent',
    subtitle: 'Découvrir ÊTRE et AVOIR',
    tenses: ['present'],
    chapters: [1, 2, 3],
    color: 'dawn',
    theme: 'jardin',
  },
  {
    id: 2,
    title: 'Cahier 2 : Les Fondations',
    subtitle: 'Consolider les bases',
    tenses: ['present'],
    chapters: [4, 5, 6],
    color: 'sky',
    theme: 'fondations',
  },
  {
    id: 3,
    title: 'Cahier 3 : Les Accords',
    subtitle: 'Accords dans le groupe nominal',
    tenses: ['present'],
    chapters: [7, 8, 9],
    color: 'moss',
    theme: 'clairiere',
  },
  {
    id: 4,
    title: 'Cahier 4 : Le Futur',
    subtitle: 'Conjuguer au futur',
    tenses: ['futur'],
    chapters: [10, 11, 12],
    color: 'gold',
    theme: 'futur',
  },
  {
    id: 5,
    title: "Cahier 5 : L'Imparfait",
    subtitle: "Conjuguer à l'imparfait",
    tenses: ['imparfait'],
    chapters: [13, 14, 15],
    color: 'coral',
    theme: 'brumes',
  },
  {
    id: 6,
    title: 'Cahier 6 : Révision',
    subtitle: 'Tous les temps mélangés',
    tenses: ['present', 'futur', 'imparfait', 'passe_compose'],
    chapters: [16, 17, 18],
    color: 'coral',
    theme: 'flux',
    isBonus: true,
  },
  // ─── Nouveaux cahiers — extension programme CE1 ────────────────────────────
  {
    id: 7,
    title: 'Cahier 7 : Verbes -ER',
    subtitle: 'Les verbes du 1er groupe',
    tenses: ['present'],
    chapters: [19, 20, 21],
    color: 'meadow',
    theme: 'atelier',
  },
  {
    id: 8,
    title: 'Cahier 8 : Verbes Irréguliers',
    subtitle: 'Les verbes irréguliers',
    tenses: ['present'],
    chapters: [22, 23, 24],
    color: 'sky',
    theme: 'bibliotheque',
  },
  {
    id: 9,
    title: 'Cahier 9 : Verbes Fréquents',
    subtitle: 'Les verbes essentiels',
    tenses: ['present'],
    chapters: [25, 26, 27],
    color: 'gold',
    theme: 'arcanes',
  },
  {
    id: 10,
    title: 'Cahier 10 : Révision Générale',
    subtitle: 'Tous les verbes, tous les temps',
    tenses: ['present', 'futur', 'imparfait'],
    chapters: [28, 29, 30],
    color: 'dawn',
    theme: 'symphonie',
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
    narrative: 'Bienvenue dans ton premier cahier ! Découvrons le verbe ÊTRE.',
    verbs: ['etre'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], questionCount: 3 },
      { mechanic: 'ardoise', pronouns: ['il/elle/on', 'nous'], questionCount: 3 },
      { mechanic: 'encrier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 2,
    title: 'Découvrir AVOIR',
    narrative: 'Continuons à apprendre ! Apprenons le verbe AVOIR.',
    verbs: ['avoir'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], questionCount: 3 },
      { mechanic: 'ardoise', pronouns: ['il/elle/on', 'nous'], questionCount: 3 },
      { mechanic: 'encrier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 3,
    title: 'Duel ÊTRE vs AVOIR',
    narrative: 'ÊTRE ou AVOIR ? Apprends à les reconnaître !',
    verbs: ['etre', 'avoir'],
    tense: 'present',
    steps: [
      { mechanic: 'tri-verbes', pronouns: ['je', 'tu'], questionCount: 3 },
      {
        mechanic: 'tri-verbes',
        pronouns: ['il/elle/on', 'nous', 'vous', 'ils/elles'],
        questionCount: 3,
      },
      { mechanic: 'ardoise', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },

{
    id: 4,
    title: 'Maîtriser ÊTRE',
    narrative: 'Tu connais ÊTRE ? Prouve-le, jeune champion !',
    verbs: ['etre'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'ardoise', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 3 },
      { mechanic: 'encrier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'encrier', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 3 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 5,
    title: 'Maîtriser AVOIR',
    narrative: "Le verbe AVOIR n'a plus de secret pour toi !",
    verbs: ['avoir'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'ardoise', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 3 },
      { mechanic: 'encrier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'encrier', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 3 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 6,
    title: 'Duel avancé ÊTRE vs AVOIR',
    narrative: 'Le grand duel ! Sauras-tu tout reconnaître ?',
    verbs: ['etre', 'avoir'],
    tense: 'present',
    steps: [
      { mechanic: 'tri-verbes', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 4 },
      { mechanic: 'tri-verbes', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 4 },
      { mechanic: 'ardoise', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },

{
    id: 7,
    title: 'ÊTRE + Accords',
    narrative: 'Dans la Clairière, les mots s\'accordent ensemble !',
    verbs: ['etre'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'encrier', questionCount: 3 },
      { mechanic: 'pont-accords', questionCount: 4 },
      { mechanic: 'encrier-gn', questionCount: 4 },
    ],
  },
  {
    id: 8,
    title: 'AVOIR + Accords',
    narrative: 'Les accords du groupe nominal, tu connais ?',
    verbs: ['avoir'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'encrier', questionCount: 3 },
      { mechanic: 'pont-accords', questionCount: 4 },
      { mechanic: 'encrier-gn', questionCount: 4 },
    ],
  },
  {
    id: 9,
    title: 'Duel + GN',
    narrative: 'Conjugaison ET accords ? Tu es prêt !',
    verbs: ['etre', 'avoir'],
    tense: 'present',
    steps: [
      { mechanic: 'tri-verbes', questionCount: 4 },
      { mechanic: 'ardoise', questionCount: 3 },
      { mechanic: 'encrier', questionCount: 3 },
      { mechanic: 'pont-accords', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },

{
    id: 10,
    title: 'ÊTRE au futur',
    narrative: "Le futur t'attend ! Découvre ÊTRE au futur.",
    verbs: ['etre'],
    tense: 'futur',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], questionCount: 3 },
      {
        mechanic: 'ardoise',
        pronouns: ['il/elle/on', 'nous', 'vous', 'ils/elles'],
        questionCount: 3,
      },
      { mechanic: 'encrier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 11,
    title: 'AVOIR au futur',
    narrative: "AVOIR au futur, c'est parti !",
    verbs: ['avoir'],
    tense: 'futur',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], questionCount: 3 },
      {
        mechanic: 'ardoise',
        pronouns: ['il/elle/on', 'nous', 'vous', 'ils/elles'],
        questionCount: 3,
      },
      { mechanic: 'encrier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 12,
    title: 'Duel futur',
    narrative: 'ÊTRE ou AVOIR au futur ? Montre tes talents !',
    verbs: ['etre', 'avoir'],
    tense: 'futur',
    steps: [
      { mechanic: 'tri-verbes', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 4 },
      { mechanic: 'tri-verbes', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 4 },
      { mechanic: 'ardoise', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },

{
    id: 13,
    title: "ÊTRE à l'imparfait",
    narrative: "Voyageons dans le passé ! ÊTRE à l'imparfait.",
    verbs: ['etre'],
    tense: 'imparfait',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], questionCount: 3 },
      {
        mechanic: 'ardoise',
        pronouns: ['il/elle/on', 'nous', 'vous', 'ils/elles'],
        questionCount: 3,
      },
      { mechanic: 'encrier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 14,
    title: "AVOIR à l'imparfait",
    narrative: "AVOIR à l'imparfait, souviens-toi bien !",
    verbs: ['avoir'],
    tense: 'imparfait',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], questionCount: 3 },
      {
        mechanic: 'ardoise',
        pronouns: ['il/elle/on', 'nous', 'vous', 'ils/elles'],
        questionCount: 3,
      },
      { mechanic: 'encrier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 15,
    title: 'Duel imparfait',
    narrative: 'Le duel du passé ! ÊTRE ou AVOIR ?',
    verbs: ['etre', 'avoir'],
    tense: 'imparfait',
    steps: [
      { mechanic: 'tri-verbes', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 4 },
      { mechanic: 'tri-verbes', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 4 },
      { mechanic: 'ardoise', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },

{
    id: 16,
    title: 'Maître du Temps — ÊTRE',
    narrative: 'Tous les temps ! Es-tu un vrai maître ?',
    verbs: ['etre'],
    tense: 'mixed',
    steps: [
      { mechanic: 'ardoise', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4 },
      { mechanic: 'ardoise', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 17,
    title: 'Maître du Temps — AVOIR',
    narrative: 'AVOIR à travers le temps ! À toi de jouer.',
    verbs: ['avoir'],
    tense: 'mixed',
    steps: [
      { mechanic: 'ardoise', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4 },
      { mechanic: 'ardoise', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 18,
    title: 'Boss Final — Le Flux Temporel',
    narrative: "Le boss final ! Tout ce que tu as appris, c'est maintenant !",
    verbs: ['etre', 'avoir'],
    tense: 'mixed',
    steps: [
      { mechanic: 'tri-verbes', questionCount: 4 },
      { mechanic: 'ardoise', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 7 — Cahier 7 : Verbes -ER (1er groupe, présent)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 19,
    title: 'Découvrir JOUER et MANGER',
    narrative: "Bienvenue à l'Atelier ! Découvrons les verbes jouer et manger.",
    verbs: ['jouer', 'manger'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], verbs: ['jouer'], questionCount: 3 },
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], verbs: ['manger'], questionCount: 3 },
      { mechanic: 'encrier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'tri-verbes', verbs: ['jouer', 'manger'], questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 20,
    title: 'Découvrir CHANTER et REGARDER',
    narrative: 'Deux nouveaux verbes ! Chanter et regarder.',
    verbs: ['chanter', 'regarder'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], verbs: ['chanter'], questionCount: 3 },
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], verbs: ['regarder'], questionCount: 3 },
      { mechanic: 'encrier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'tri-verbes', verbs: ['chanter', 'regarder'], questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 21,
    title: 'Maître du 1er groupe',
    narrative: 'Les quatre verbes en -er réunis ! Es-tu prêt ?',
    verbs: ['jouer', 'manger', 'chanter', 'regarder'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['il/elle/on', 'nous', 'vous', 'ils/elles'], questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4 },
      { mechanic: 'tri-verbes', verbs: ['jouer', 'chanter'], questionCount: 3 },
      { mechanic: 'tri-verbes', verbs: ['manger', 'regarder'], questionCount: 3 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 8 — La Grande Bibliothèque (irréguliers, présent)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 22,
    title: 'Découvrir ALLER et VENIR',
    narrative: 'La Bibliothèque t\'ouvre ses portes ! Aller et venir.',
    verbs: ['aller', 'venir'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], verbs: ['aller'], questionCount: 3 },
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], verbs: ['venir'], questionCount: 3 },
      { mechanic: 'encrier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'tri-verbes', verbs: ['aller', 'venir'], questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 23,
    title: 'Découvrir FAIRE et DIRE',
    narrative: 'Faire et dire, deux verbes très puissants !',
    verbs: ['faire', 'dire'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], verbs: ['faire'], questionCount: 3 },
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], verbs: ['dire'], questionCount: 3 },
      { mechanic: 'encrier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'tri-verbes', verbs: ['faire', 'dire'], questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 24,
    title: 'Maître des irréguliers',
    narrative: 'Aller, venir, faire, dire... Tu les connais tous ?',
    verbs: ['aller', 'venir', 'faire', 'dire'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['il/elle/on', 'nous', 'vous', 'ils/elles'], questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4 },
      { mechanic: 'tri-verbes', verbs: ['aller', 'faire'], questionCount: 3 },
      { mechanic: 'tri-verbes', verbs: ['venir', 'dire'], questionCount: 3 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 9 — Le Cercle des Arcanes (modaux / fréquents, présent)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 25,
    title: 'Découvrir POUVOIR et VOULOIR',
    narrative: 'Le Cercle des Arcanes ! Pouvoir et vouloir.',
    verbs: ['pouvoir', 'vouloir'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], verbs: ['pouvoir'], questionCount: 3 },
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], verbs: ['vouloir'], questionCount: 3 },
      { mechanic: 'encrier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'tri-verbes', verbs: ['pouvoir', 'vouloir'], questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 26,
    title: 'Découvrir VOIR et PRENDRE',
    narrative: 'Voir et prendre, des verbes précieux !',
    verbs: ['voir', 'prendre'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], verbs: ['voir'], questionCount: 3 },
      { mechanic: 'ardoise', pronouns: ['je', 'tu'], verbs: ['prendre'], questionCount: 3 },
      { mechanic: 'encrier', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 3 },
      { mechanic: 'tri-verbes', verbs: ['voir', 'prendre'], questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 27,
    title: 'Maître des Arcanes',
    narrative: 'Pouvoir, vouloir, voir, prendre... Le cercle est complet !',
    verbs: ['pouvoir', 'vouloir', 'voir', 'prendre'],
    tense: 'present',
    steps: [
      { mechanic: 'ardoise', pronouns: ['il/elle/on', 'nous', 'vous', 'ils/elles'], questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4 },
      { mechanic: 'tri-verbes', verbs: ['pouvoir', 'voir'], questionCount: 3 },
      { mechanic: 'tri-verbes', verbs: ['vouloir', 'prendre'], questionCount: 3 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 10 — La Symphonie des Temps (tous verbes, futur + imparfait)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 28,
    title: 'Verbes du 1er groupe au futur',
    narrative: 'Jouer, manger, chanter, regarder... Au futur !',
    verbs: ['jouer', 'manger', 'chanter', 'regarder'],
    tense: 'futur',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 4 },
      { mechanic: 'ardoise', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 29,
    title: "Irréguliers et modaux à l'imparfait",
    narrative: "Aller, faire, pouvoir, voir... À l'imparfait !",
    verbs: ['aller', 'faire', 'pouvoir', 'voir'],
    tense: 'imparfait',
    steps: [
      { mechanic: 'ardoise', pronouns: ['je', 'tu', 'il/elle/on'], questionCount: 4 },
      { mechanic: 'ardoise', pronouns: ['nous', 'vous', 'ils/elles'], questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },
  {
    id: 30,
    title: 'Boss Final — La Symphonie',
    narrative: 'Tous les verbes, tous les temps ! Le grand final !',
    verbs: ['etre', 'avoir', 'jouer', 'manger', 'aller', 'faire', 'pouvoir', 'voir', 'vouloir', 'prendre'],
    tense: 'mixed',
    steps: [
      { mechanic: 'ardoise', questionCount: 4 },
      { mechanic: 'encrier', questionCount: 4 },
      { mechanic: 'tri-verbes', verbs: ['etre', 'aller'], questionCount: 3 },
      { mechanic: 'tri-verbes', verbs: ['avoir', 'faire'], questionCount: 3 },
      { mechanic: 'encrier', questionCount: 4, isBoss: true },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// COLLECTIONS MULTI-MATIÈRES
// ═══════════════════════════════════════════════════════════════════════════

export const ALL_BOOKS: Book[] = [...BOOKS, ...MATH_BOOKS];
export const ALL_CHAPTERS: Chapter[] = [...CHAPTERS, ...MATH_CHAPTERS];

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

export function getChaptersForBook(bookId: number): Chapter[] {
  const book = ALL_BOOKS.find((b) => b.id === bookId);
  if (!book) return [];
  return book.chapters
    .map((id) => ALL_CHAPTERS.find((c) => c.id === id))
    .filter((ch): ch is Chapter => ch !== undefined);
}

export function getChapter(chapterId: number): Chapter | undefined {
  return ALL_CHAPTERS.find((c) => c.id === chapterId);
}

export function getBookForChapter(chapterId: number): Book | undefined {
  return ALL_BOOKS.find((b) => b.chapters.includes(chapterId));
}

export function getBooksForSubject(subject: Subject): Book[] {
  return ALL_BOOKS.filter((b) => (b.subject ?? 'francais') === subject);
}
