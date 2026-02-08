import type { BookLesson } from './types.js';

/**
 * Leçons de référence par livre maths — contenu pédagogique CE1.
 * Vocabulaire adapté 6-7 ans, phrases courtes (5-8 mots).
 * Pas de tableaux de conjugaison (verbId/tense absents).
 */
export const MATH_BOOK_LESSONS: BookLesson[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 101 — Les Nombres (pair/impair, 0-99)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 101,
    title: 'Les Nombres de 0 à 99',
    introduction:
      'Bienvenue dans le monde des nombres ! Ici, tu vas apprendre à reconnaître les nombres pairs et impairs.',
    sections: [
      {
        title: 'Pair ou Impair ?',
        examples: [
          { sentence: '2, 4, 6, 8 sont des nombres pairs.', highlight: 'pairs' },
          { sentence: '1, 3, 5, 7 sont des nombres impairs.', highlight: 'impairs' },
          { sentence: 'Un nombre pair finit par 0, 2, 4, 6 ou 8.', highlight: 'pair' },
        ],
        tip: { text: 'Astuce : si tu peux partager en 2 parts égales, c\'est pair !' },
      },
      {
        title: 'Comparer les nombres',
        examples: [
          { sentence: '15 est plus petit que 42.', highlight: 'plus petit' },
          { sentence: '78 est plus grand que 23.', highlight: 'plus grand' },
          { sentence: 'On écrit : 15 < 42 et 78 > 23.', highlight: '<' },
        ],
        tip: { text: 'Le crocodile mange toujours le plus grand nombre : 78 > 23.' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 102 — Les Additions
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 102,
    title: 'La Leçon des Additions',
    introduction:
      'Additionner, c\'est mettre ensemble ! Quand tu as 3 billes et que tu en gagnes 5, tu additionnes.',
    sections: [
      {
        title: 'Les petites additions',
        examples: [
          { sentence: '3 + 2 = 5', highlight: '5' },
          { sentence: '7 + 1 = 8', highlight: '8' },
          { sentence: '4 + 4 = 8 (un double !)', highlight: 'double' },
        ],
        tip: { text: 'Commence toujours par le plus grand nombre, c\'est plus facile !' },
      },
      {
        title: 'Les compléments à 10',
        examples: [
          { sentence: '1 + 9 = 10', highlight: '10' },
          { sentence: '3 + 7 = 10', highlight: '10' },
          { sentence: '5 + 5 = 10', highlight: '10' },
        ],
        tip: { text: 'Apprends les compléments à 10 par cœur : 1+9, 2+8, 3+7, 4+6, 5+5 !' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 103 — Les Soustractions
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 103,
    title: 'La Leçon des Soustractions',
    introduction:
      'Soustraire, c\'est enlever. Quand tu as 8 bonbons et que tu en manges 3, tu soustrais.',
    sections: [
      {
        title: 'Les petites soustractions',
        examples: [
          { sentence: '8 - 3 = 5', highlight: '5' },
          { sentence: '10 - 4 = 6', highlight: '6' },
          { sentence: '15 - 7 = 8', highlight: '8' },
        ],
        tip: { text: 'Soustraire, c\'est chercher ce qui reste quand on enlève.' },
      },
      {
        title: 'Addition et soustraction ensemble',
        examples: [
          { sentence: 'Si 3 + 7 = 10, alors 10 - 7 = 3.', highlight: '3' },
          { sentence: 'Si 5 + 4 = 9, alors 9 - 4 = 5.', highlight: '5' },
        ],
        tip: { text: 'L\'addition et la soustraction sont des opérations inverses !' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 104 — Les Multiplications
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 104,
    title: 'La Leçon des Multiplications',
    introduction:
      'Multiplier, c\'est additionner plusieurs fois le même nombre. 3 × 4, c\'est 4 + 4 + 4 !',
    sections: [
      {
        title: 'La table de 2',
        examples: [
          { sentence: '2 × 1 = 2, 2 × 2 = 4, 2 × 3 = 6', highlight: '2' },
          { sentence: '2 × 5 = 10', highlight: '10' },
          { sentence: 'Multiplier par 2, c\'est doubler.', highlight: 'doubler' },
        ],
        tip: { text: 'La table de 2, c\'est comme compter de 2 en 2 : 2, 4, 6, 8, 10...' },
      },
      {
        title: 'Les tables de 3, 4, 5',
        examples: [
          { sentence: '3 × 4 = 12 (c\'est 4 + 4 + 4)', highlight: '12' },
          { sentence: '4 × 5 = 20', highlight: '20' },
          { sentence: '5 × 6 = 30', highlight: '30' },
        ],
        tip: { text: 'La table de 5 est facile : ça finit toujours par 0 ou 5 !' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 105 — Grandeurs et Mesures
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 105,
    title: 'Mesurer le temps et la monnaie',
    introduction:
      'L\'heure, la monnaie... Apprenons à lire l\'horloge et à compter les pièces !',
    sections: [
      {
        title: 'Lire l\'heure',
        examples: [
          { sentence: 'La petite aiguille montre les heures.', highlight: 'heures' },
          { sentence: 'La grande aiguille montre les minutes.', highlight: 'minutes' },
          { sentence: '3 h 30, c\'est 3 heures et demie.', highlight: 'et demie' },
        ],
        tip: { text: 'Quand la grande aiguille est en haut, c\'est l\'heure pile !' },
      },
      {
        title: 'La monnaie',
        examples: [
          { sentence: '1 euro = 100 centimes.', highlight: '100' },
          { sentence: 'Un billet de 5 € = cinq pièces de 1 €.', highlight: '5' },
          { sentence: '2,50 € = 2 euros et 50 centimes.', highlight: '2,50' },
        ],
        tip: { text: 'Compte d\'abord les billets, puis les pièces !' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 106 — Les Fractions
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 106,
    title: 'Découvrir les Fractions',
    introduction:
      'Une fraction, c\'est une part d\'un tout. Quand on coupe un gâteau en 4, chaque part est 1/4 !',
    sections: [
      {
        title: 'Les fractions simples',
        examples: [
          { sentence: '1/2 = une moitié du gâteau.', highlight: '1/2' },
          { sentence: '1/4 = un quart de la pizza.', highlight: '1/4' },
          { sentence: '3/4 = trois quarts du cercle.', highlight: '3/4' },
        ],
        tip: { text: 'Le nombre du bas dit en combien de parts on coupe. Le nombre du haut dit combien on prend.' },
      },
      {
        title: 'Fractions et partage',
        examples: [
          { sentence: '2/3 = deux parts sur trois.', highlight: '2/3' },
          { sentence: '3/6 = la moitié (comme 1/2).', highlight: '3/6' },
        ],
        tip: { text: 'Si on colorie toutes les parts, on a la fraction entière (3/3 = 1) !' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 107 — Géométrie et Espace
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 107,
    title: 'Nombres et Géométrie',
    introduction:
      'Plaçons les nombres sur une droite et décomposons-les en centaines, dizaines et unités !',
    sections: [
      {
        title: 'La droite des nombres',
        examples: [
          { sentence: 'Sur la droite, 0 est à gauche.', highlight: 'gauche' },
          { sentence: 'Les nombres grandissent vers la droite.', highlight: 'droite' },
          { sentence: '25 est entre 20 et 30.', highlight: '25' },
        ],
        tip: { text: 'Pour placer un nombre, cherche d\'abord les dizaines les plus proches !' },
      },
      {
        title: 'Centaines, dizaines, unités',
        examples: [
          { sentence: '357 = 3 centaines + 5 dizaines + 7 unités.', highlight: '357' },
          { sentence: '1 centaine = 10 dizaines = 100 unités.', highlight: '100' },
          { sentence: '240 = 2 centaines + 4 dizaines + 0 unité.', highlight: '240' },
        ],
        tip: { text: 'Le chiffre des centaines est le plus à gauche, puis dizaines, puis unités.' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 108 — Révision Maths (bonus)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 108,
    title: 'Le Grand Récapitulatif Maths',
    introduction:
      'Bravo, tu as terminé tous les cahiers de maths ! Voici un résumé de tout ce que tu as appris.',
    sections: [
      {
        title: 'Les opérations',
        examples: [
          { sentence: '7 + 8 = 15 (addition)', highlight: '15' },
          { sentence: '13 - 5 = 8 (soustraction)', highlight: '8' },
          { sentence: '4 × 5 = 20 (multiplication)', highlight: '20' },
        ],
      },
      {
        title: 'Nombres et fractions',
        examples: [
          { sentence: '456 = 4c + 5d + 6u', highlight: '456' },
          { sentence: '2/3 = deux tiers', highlight: '2/3' },
        ],
        tip: { text: 'Tu sais tout ! Reviens ici quand tu veux réviser.' },
      },
    ],
  },
];
