import type { Book, Chapter, Shelf } from './types.js';

// ═══════════════════════════════════════════════════════════════════════════
// LIVRES MATHS — 8 cahiers (IDs 101-108, pas de collision avec FR 1-10)
// ═══════════════════════════════════════════════════════════════════════════

export const MATH_BOOKS: Book[] = [
  {
    id: 101,
    subject: 'maths',
    title: 'Cahier 1 : Les Nombres',
    subtitle: 'Découvrir les nombres de 0 à 99',
    chapters: [1001, 1002, 1003],
    color: 'dawn',
    theme: 'nombres',
  },
  {
    id: 102,
    subject: 'maths',
    title: 'Cahier 2 : Les Additions',
    subtitle: 'Additionner et compléter à 10',
    chapters: [1004, 1005, 1006],
    color: 'sky',
    theme: 'additions',
  },
  {
    id: 103,
    subject: 'maths',
    title: 'Cahier 3 : Les Soustractions',
    subtitle: 'Soustraire et calculer mentalement',
    chapters: [1007, 1008, 1009],
    color: 'coral',
    theme: 'soustractions',
  },
  {
    id: 104,
    subject: 'maths',
    title: 'Cahier 4 : Les Multiplications',
    subtitle: 'Les tables ×2, ×3, ×4, ×5',
    chapters: [1010, 1011, 1012],
    color: 'gold',
    theme: 'multiplications',
  },
  {
    id: 105,
    subject: 'maths',
    title: 'Cahier 5 : Grandeurs et Mesures',
    subtitle: "L'heure, la monnaie, les longueurs",
    chapters: [1013, 1014, 1015],
    color: 'meadow',
    theme: 'mesures',
  },
  {
    id: 106,
    subject: 'maths',
    title: 'Cahier 6 : Les Fractions',
    subtitle: "Les parts d'un tout",
    chapters: [1016, 1017, 1018],
    color: 'moss',
    theme: 'fractions',
  },
  {
    id: 107,
    subject: 'maths',
    title: 'Cahier 7 : Géométrie et Espace',
    subtitle: 'Formes, nombres et positions',
    chapters: [1019, 1020, 1021],
    color: 'sky',
    theme: 'geometrie',
  },
  {
    id: 108,
    subject: 'maths',
    title: 'Cahier 8 : Révision Maths',
    subtitle: 'Tous les domaines mélangés',
    chapters: [1022, 1023, 1024],
    color: 'coral',
    theme: 'revision-maths',
    isBonus: true,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// ÉTAGÈRES MATHS — Groupement pédagogique
// ═══════════════════════════════════════════════════════════════════════════

export const MATH_SHELVES: Shelf[] = [
  {
    id: 'nombres-calcul',
    subject: 'maths',
    title: 'Nombres et Calcul',
    bookIds: [101, 102, 103],
    color: 'sky',
  },
  {
    id: 'calcul-avance',
    subject: 'maths',
    title: 'Calcul Avancé',
    bookIds: [104, 106],
    color: 'gold',
  },
  {
    id: 'grandeurs-geometrie',
    subject: 'maths',
    title: 'Grandeurs et Géométrie',
    bookIds: [105, 107],
    color: 'meadow',
  },
  {
    id: 'revision-maths',
    subject: 'maths',
    title: 'Révision',
    bookIds: [108],
    color: 'coral',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// CHAPITRES MATHS — 24 chapitres (IDs 1001-1024)
// Progression spiralaire : introduction → pratique → boss
// ═══════════════════════════════════════════════════════════════════════════

export const MATH_CHAPTERS: Chapter[] = [
  // ─── LIVRE 101 : Les Nombres (0-99, pair/impair) ────────────────────
  {
    id: 1001,
    subject: 'maths',
    title: 'Pair ou Impair ?',
    narrative: 'Bienvenue dans le monde des nombres ! Découvrons les nombres pairs et impairs.',
    steps: [
      { mechanic: 'tri-nombres', categories: ['pair', 'impair'], numberRange: [1, 20], questionCount: 4 },
      { mechanic: 'tri-nombres', categories: ['pair', 'impair'], numberRange: [1, 50], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [1, 10], questionCount: 3 },
      { mechanic: 'tri-nombres', categories: ['pair', 'impair'], numberRange: [1, 99], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1001', name: 'Le Renard Pair' },
  },
  {
    id: 1002,
    subject: 'maths',
    title: 'Comparer les Nombres',
    narrative: 'Quel nombre est le plus grand ? Le plus petit ? À toi de jouer !',
    steps: [
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [1, 10], questionCount: 3 },
      { mechanic: 'tri-nombres', categories: ['< 50', '≥ 50'], numberRange: [10, 99], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [1, 20], questionCount: 3 },
      { mechanic: 'tri-nombres', categories: ['< 50', '≥ 50'], numberRange: [1, 99], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1002', name: 'L\'Ours des Grandeurs' },
  },
  {
    id: 1003,
    subject: 'maths',
    title: 'Maître des Nombres',
    narrative: 'Tu connais bien les nombres ? Prouve-le !',
    steps: [
      { mechanic: 'tri-nombres', categories: ['pair', 'impair'], numberRange: [1, 99], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [1, 20], questionCount: 4 },
      { mechanic: 'tri-nombres', categories: ['< 50', '≥ 50'], numberRange: [1, 99], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [1, 20], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1003', name: 'Le Roi des Nombres' },
  },

  // ─── LIVRE 102 : Les Additions ──────────────────────────────────────
  {
    id: 1004,
    subject: 'maths',
    title: 'Premiers Calculs',
    narrative: 'Additionner, c\'est super ! Découvrons les petites additions.',
    steps: [
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [1, 5], questionCount: 3 },
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [1, 9], questionCount: 3 },
      { mechanic: 'encrier-calcul', operations: ['addition'], numberRange: [1, 9], questionCount: 3 },
      { mechanic: 'encrier-calcul', operations: ['addition'], numberRange: [1, 9], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1004', name: "L'Ecureuil Calculateur" },
  },
  {
    id: 1005,
    subject: 'maths',
    title: 'Compléments à 10',
    narrative: 'Pour faire 10, il faut deux nombres amis ! Trouve-les.',
    steps: [
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [1, 9], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['addition'], numberRange: [1, 10], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [1, 10], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['addition'], numberRange: [1, 10], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1005', name: 'La Marmotte des Compléments' },
  },
  {
    id: 1006,
    subject: 'maths',
    title: 'Champion des Additions',
    narrative: 'Les additions n\'ont plus de secret pour toi !',
    steps: [
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [1, 20], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['addition'], numberRange: [1, 20], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [5, 20], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['addition'], numberRange: [1, 20], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1006', name: 'Le Castor des Sommes' },
  },

  // ─── LIVRE 103 : Les Soustractions ──────────────────────────────────
  {
    id: 1007,
    subject: 'maths',
    title: 'Découvrir la Soustraction',
    narrative: 'Soustraire, c\'est enlever. Quand on perd des billes, on soustrait !',
    steps: [
      { mechanic: 'ardoise-calcul', operations: ['subtraction'], numberRange: [1, 10], questionCount: 3 },
      { mechanic: 'ardoise-calcul', operations: ['subtraction'], numberRange: [1, 10], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['subtraction'], numberRange: [1, 10], questionCount: 3 },
      { mechanic: 'encrier-calcul', operations: ['subtraction'], numberRange: [1, 10], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1007', name: 'Le Petit Chat Perdu' },
  },
  {
    id: 1008,
    subject: 'maths',
    title: 'Additions et Soustractions',
    narrative: 'Additionner ou soustraire ? Les deux ensemble !',
    steps: [
      { mechanic: 'ardoise-calcul', operations: ['addition', 'subtraction'], numberRange: [1, 10], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['addition', 'subtraction'], numberRange: [1, 10], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition', 'subtraction'], numberRange: [1, 15], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['addition', 'subtraction'], numberRange: [1, 15], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1008', name: 'Le Magicien du Moins' },
  },
  {
    id: 1009,
    subject: 'maths',
    title: 'Champion du Calcul Mental',
    narrative: 'Le grand défi ! Additions et soustractions mélangées.',
    steps: [
      { mechanic: 'ardoise-calcul', operations: ['addition', 'subtraction'], numberRange: [1, 20], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['addition', 'subtraction'], numberRange: [1, 20], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition', 'subtraction'], numberRange: [5, 20], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['addition', 'subtraction'], numberRange: [1, 20], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1009', name: 'Le Champion du Calcul' },
  },

  // ─── LIVRE 104 : Les Multiplications ────────────────────────────────
  {
    id: 1010,
    subject: 'maths',
    title: 'Table de 2',
    narrative: 'Multiplier par 2, c\'est compter double ! 2, 4, 6, 8...',
    steps: [
      { mechanic: 'ardoise-calcul', operations: ['multiplication'], numberRange: [1, 5], questionCount: 3 },
      { mechanic: 'ardoise-calcul', operations: ['multiplication'], numberRange: [1, 10], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['multiplication'], numberRange: [1, 10], questionCount: 3 },
      { mechanic: 'encrier-calcul', operations: ['multiplication'], numberRange: [1, 10], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1010', name: 'Le Lapin des Doubles' },
  },
  {
    id: 1011,
    subject: 'maths',
    title: 'Tables de 3 et 4',
    narrative: 'Trois par trois, quatre par quatre... Les tables grandissent !',
    steps: [
      { mechanic: 'ardoise-calcul', operations: ['multiplication'], numberRange: [1, 10], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['multiplication'], numberRange: [1, 10], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['multiplication'], numberRange: [1, 10], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['multiplication'], numberRange: [1, 10], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1011', name: 'Le Grillon des Tables' },
  },
  {
    id: 1012,
    subject: 'maths',
    title: 'Table de 5 et Révision',
    narrative: 'La table de 5 est facile : 5, 10, 15, 20... Et toutes les tables ensemble !',
    steps: [
      { mechanic: 'ardoise-calcul', operations: ['multiplication'], numberRange: [1, 10], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['multiplication'], numberRange: [1, 10], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition', 'subtraction', 'multiplication'], numberRange: [1, 10], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['addition', 'multiplication'], numberRange: [1, 10], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1012', name: "L'Araignée Multiplieuse" },
  },

  // ─── LIVRE 105 : Grandeurs et Mesures ───────────────────────────────
  {
    id: 1013,
    subject: 'maths',
    title: "Lire l'Heure",
    narrative: "Quelle heure est-il ? L'horloge va te le dire !",
    steps: [
      { mechanic: 'horloge', questionCount: 4 },
      { mechanic: 'horloge', questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [1, 12], questionCount: 3 },
      { mechanic: 'horloge', questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1013', name: 'Le Hibou Horloger' },
  },
  {
    id: 1014,
    subject: 'maths',
    title: 'Au Marché',
    narrative: 'Bienvenue au marché ! Apprenons à compter la monnaie.',
    steps: [
      { mechanic: 'marche', questionCount: 3 },
      { mechanic: 'marche', questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [1, 20], questionCount: 3 },
      { mechanic: 'marche', questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1014', name: 'Le Cochon Tirelire' },
  },
  {
    id: 1015,
    subject: 'maths',
    title: 'Mesures et Calculs',
    narrative: 'Heures, monnaie et calculs, tout ensemble !',
    steps: [
      { mechanic: 'horloge', questionCount: 3 },
      { mechanic: 'marche', questionCount: 3 },
      { mechanic: 'ardoise-calcul', operations: ['addition', 'subtraction'], numberRange: [1, 50], questionCount: 4 },
      { mechanic: 'marche', questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1015', name: 'La Girafe des Mesures' },
  },

  // ─── LIVRE 106 : Les Fractions ──────────────────────────────────────
  {
    id: 1016,
    subject: 'maths',
    title: 'Découvrir les Parts',
    narrative: 'Un gâteau coupé en parts égales, c\'est une fraction !',
    steps: [
      { mechanic: 'partage', fractionDenominators: [2], questionCount: 3 },
      { mechanic: 'partage', fractionDenominators: [2, 4], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [1, 10], questionCount: 3 },
      { mechanic: 'partage', fractionDenominators: [2, 3, 4], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1016', name: 'La Souris Gourmande' },
  },
  {
    id: 1017,
    subject: 'maths',
    title: 'Fractions et Partages',
    narrative: 'Partager en parts égales, c\'est la clé des fractions !',
    steps: [
      { mechanic: 'partage', fractionDenominators: [3, 4, 5], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition', 'subtraction'], numberRange: [1, 20], questionCount: 3 },
      { mechanic: 'partage', fractionDenominators: [2, 3, 4, 5, 6], questionCount: 4 },
      { mechanic: 'partage', fractionDenominators: [2, 3, 4, 5, 6, 8], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1017', name: 'Le Rat des Parts' },
  },
  {
    id: 1018,
    subject: 'maths',
    title: 'Maître des Fractions',
    narrative: 'Les fractions n\'ont plus de secret pour toi !',
    steps: [
      { mechanic: 'partage', fractionDenominators: [2, 3, 4, 5, 6, 8, 10], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition', 'subtraction'], numberRange: [1, 20], questionCount: 4 },
      { mechanic: 'partage', fractionDenominators: [2, 3, 4, 5, 6, 8, 10], questionCount: 4 },
      { mechanic: 'partage', fractionDenominators: [2, 3, 4, 5, 6, 8, 10], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1018', name: 'Le Maître du Gâteau' },
  },

  // ─── LIVRE 107 : Géométrie et Espace ────────────────────────────────
  {
    id: 1019,
    subject: 'maths',
    title: 'La Droite des Nombres',
    narrative: 'Place les nombres sur la droite graduée !',
    steps: [
      { mechanic: 'droite-numerique', numberRange: [0, 20], questionCount: 3 },
      { mechanic: 'droite-numerique', numberRange: [0, 50], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition', 'subtraction'], numberRange: [1, 20], questionCount: 3 },
      { mechanic: 'droite-numerique', numberRange: [0, 100], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1019', name: "L'Oiseau Migrateur" },
  },
  {
    id: 1020,
    subject: 'maths',
    title: 'La Tour de Blocs',
    narrative: 'Dizaines et unités : construis les nombres avec des blocs !',
    steps: [
      { mechanic: 'tour-de-blocs', numberRange: [10, 50], questionCount: 3 },
      { mechanic: 'tour-de-blocs', numberRange: [10, 99], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition'], numberRange: [10, 50], questionCount: 3 },
      { mechanic: 'tour-de-blocs', numberRange: [10, 99], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1020', name: 'Le Singe Bâtisseur' },
  },
  {
    id: 1021,
    subject: 'maths',
    title: 'Grands Nombres',
    narrative: 'Centaines, dizaines, unités... Les nombres vont jusqu\'à 999 !',
    steps: [
      { mechanic: 'tour-de-blocs', numberRange: [100, 500], questionCount: 3 },
      { mechanic: 'droite-numerique', numberRange: [0, 100], questionCount: 4 },
      { mechanic: 'tour-de-blocs', numberRange: [100, 999], questionCount: 4 },
      { mechanic: 'tour-de-blocs', numberRange: [100, 999], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1021', name: "L'Eléphant des Sommets" },
  },

  // ─── LIVRE 108 : Révision Maths (bonus) ─────────────────────────────
  {
    id: 1022,
    subject: 'maths',
    title: 'Défi Calcul',
    narrative: 'Additions, soustractions, multiplications... Tout mélangé !',
    steps: [
      { mechanic: 'ardoise-calcul', operations: ['addition', 'subtraction', 'multiplication'], numberRange: [1, 20], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['addition', 'subtraction'], numberRange: [1, 20], questionCount: 4 },
      { mechanic: 'tri-nombres', categories: ['pair', 'impair'], numberRange: [1, 99], questionCount: 4 },
      { mechanic: 'encrier-calcul', operations: ['addition', 'subtraction', 'multiplication'], numberRange: [1, 20], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1022', name: 'Le Génie du Calcul' },
  },
  {
    id: 1023,
    subject: 'maths',
    title: 'Défi Mesures',
    narrative: "L'heure, la monnaie, les fractions... Tu sais tout ?",
    steps: [
      { mechanic: 'horloge', questionCount: 4 },
      { mechanic: 'marche', questionCount: 4 },
      { mechanic: 'partage', fractionDenominators: [2, 3, 4, 5, 6], questionCount: 4 },
      { mechanic: 'ardoise-calcul', operations: ['addition', 'subtraction'], numberRange: [1, 50], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1023', name: 'L\'Expert du Marché' },
  },
  {
    id: 1024,
    subject: 'maths',
    title: 'Boss Final — Champion Maths',
    narrative: 'Le grand final des mathématiques ! Tout ce que tu as appris !',
    steps: [
      { mechanic: 'ardoise-calcul', operations: ['addition', 'subtraction', 'multiplication'], numberRange: [1, 20], questionCount: 4 },
      { mechanic: 'tour-de-blocs', numberRange: [10, 999], questionCount: 3 },
      { mechanic: 'partage', fractionDenominators: [2, 3, 4, 5, 6, 8], questionCount: 3 },
      { mechanic: 'horloge', questionCount: 3 },
      { mechanic: 'encrier-calcul', operations: ['addition', 'subtraction', 'multiplication'], numberRange: [1, 20], questionCount: 4, isBoss: true },
    ],
    sticker: { id: 'st-math-1024', name: 'Le Grand Maître Maths' },
  },
];
