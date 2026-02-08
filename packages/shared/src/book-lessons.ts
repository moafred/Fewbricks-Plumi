import type { BookLesson } from './types.js';
import { MATH_BOOK_LESSONS } from './math-book-lessons.js';

/**
 * Leçons de référence par livre — contenu pédagogique CE1.
 * Les tableaux de conjugaison sont générés dynamiquement depuis CONJUGATIONS
 * via verbId + tense — pas de duplication.
 *
 * Vocabulaire adapté 6-7 ans, phrases courtes (5-8 mots).
 */
export const BOOK_LESSONS: BookLesson[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 1 — Le Présent (être + avoir, découverte)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 1,
    title: 'La Leçon du Présent',
    introduction:
      'Bienvenue ! Ici tu vas apprendre deux verbes très importants : ÊTRE et AVOIR. Ce sont les premières leçons de ton cahier !',
    sections: [
      {
        title: 'Le verbe ÊTRE',
        verbId: 'etre',
        tense: 'present',
        examples: [
          { sentence: 'Je suis content.', highlight: 'suis' },
          { sentence: 'Tu es à l\'école.', highlight: 'es' },
          { sentence: 'Elle est grande.', highlight: 'est' },
        ],
        tip: { text: 'Retiens : je Suis, tu eS, il eST — le S se promène !' },
      },
      {
        title: 'Le verbe AVOIR',
        verbId: 'avoir',
        tense: 'present',
        examples: [
          { sentence: 'J\'ai un chat.', highlight: 'ai' },
          { sentence: 'Tu as un cartable.', highlight: 'as' },
          { sentence: 'Il a faim.', highlight: 'a' },
        ],
        tip: { text: 'Retiens : j\'Ai, tu As, il A — les trois A !' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 2 — Les Fondations (consolider être + avoir)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 2,
    title: 'Réviser ÊTRE et AVOIR',
    introduction:
      'Tu connais déjà ÊTRE et AVOIR ? Super ! Maintenant, on va les revoir avec tous les pronoms. Tu vas devenir un champion !',
    sections: [
      {
        title: 'ÊTRE — tous les pronoms',
        verbId: 'etre',
        tense: 'present',
        examples: [
          { sentence: 'Nous sommes en classe.', highlight: 'sommes' },
          { sentence: 'Vous êtes mes amis.', highlight: 'êtes' },
          { sentence: 'Ils sont dans la cour.', highlight: 'sont' },
        ],
        tip: { text: 'Nous soMMes : deux M comme deux copains ensemble !' },
      },
      {
        title: 'AVOIR — tous les pronoms',
        verbId: 'avoir',
        tense: 'present',
        examples: [
          { sentence: 'Nous avons un jardin.', highlight: 'avons' },
          { sentence: 'Vous avez raison.', highlight: 'avez' },
          { sentence: 'Elles ont des bonbons.', highlight: 'ont' },
        ],
        tip: { text: 'AVOIR au pluriel : avons, avez, ont — facile !' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 3 — Les Accords (genre, nombre dans le GN)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 3,
    title: 'Les Accords dans la phrase',
    introduction:
      'Dans ce cahier, on apprend les accords ! Les mots changent quand on parle d\'un garçon ou d\'une fille, d\'un ou de plusieurs.',
    sections: [
      {
        title: 'Le genre : masculin ou féminin',
        examples: [
          { sentence: 'Le chat est petit.', highlight: 'petit' },
          { sentence: 'La chatte est petite.', highlight: 'petite' },
          { sentence: 'Un grand garçon.', highlight: 'grand' },
          { sentence: 'Une grande fille.', highlight: 'grande' },
        ],
        tip: { text: 'Souvent, on ajoute un E pour le féminin : petit → petite !' },
      },
      {
        title: 'Le nombre : singulier ou pluriel',
        examples: [
          { sentence: 'Le chat dort.', highlight: 'chat' },
          { sentence: 'Les chats dorment.', highlight: 'chats' },
          { sentence: 'Un joli ballon.', highlight: 'ballon' },
          { sentence: 'Des jolis ballons.', highlight: 'ballons' },
        ],
        tip: { text: 'Souvent, on ajoute un S pour le pluriel : chat → chats !' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 4 — Le Futur (être + avoir)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 4,
    title: 'La Leçon du Futur',
    introduction:
      'Le futur, c\'est quand on parle de ce qui va arriver. Demain, la semaine prochaine... Découvre ÊTRE et AVOIR au futur !',
    sections: [
      {
        title: 'ÊTRE au futur',
        verbId: 'etre',
        tense: 'futur',
        examples: [
          { sentence: 'Je serai grand.', highlight: 'serai' },
          { sentence: 'Tu seras en vacances.', highlight: 'seras' },
          { sentence: 'Nous serons ensemble.', highlight: 'serons' },
        ],
        tip: { text: 'Au futur, ÊTRE commence toujours par SER- : serai, seras, sera...' },
      },
      {
        title: 'AVOIR au futur',
        verbId: 'avoir',
        tense: 'futur',
        examples: [
          { sentence: 'J\'aurai un vélo.', highlight: 'aurai' },
          { sentence: 'Tu auras un cadeau.', highlight: 'auras' },
          { sentence: 'Ils auront faim.', highlight: 'auront' },
        ],
        tip: { text: 'Au futur, AVOIR commence toujours par AUR- : aurai, auras, aura...' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 5 — L'Imparfait (être + avoir)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 5,
    title: 'La Leçon de l\'Imparfait',
    introduction:
      'L\'imparfait, c\'est le temps du passé. Quand on raconte ce qu\'on faisait avant. Découvre ÊTRE et AVOIR à l\'imparfait !',
    sections: [
      {
        title: 'ÊTRE à l\'imparfait',
        verbId: 'etre',
        tense: 'imparfait',
        examples: [
          { sentence: 'J\'étais petit.', highlight: 'étais' },
          { sentence: 'Tu étais à la maison.', highlight: 'étais' },
          { sentence: 'Nous étions au parc.', highlight: 'étions' },
        ],
        tip: { text: 'À l\'imparfait, ÊTRE commence par ÉT- : étais, était, étions...' },
      },
      {
        title: 'AVOIR à l\'imparfait',
        verbId: 'avoir',
        tense: 'imparfait',
        examples: [
          { sentence: 'J\'avais un doudou.', highlight: 'avais' },
          { sentence: 'Tu avais un ballon.', highlight: 'avais' },
          { sentence: 'Elles avaient des jouets.', highlight: 'avaient' },
        ],
        tip: { text: 'À l\'imparfait, AVOIR commence par AV- : avais, avait, avions...' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 6 — Révision (tous les temps — bonus)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 6,
    title: 'Tous les temps !',
    introduction:
      'Bravo, tu as terminé les 5 cahiers ! Ici, on mélange le présent, le futur et l\'imparfait. Tu es prêt !',
    sections: [
      {
        title: 'ÊTRE — les 3 temps',
        verbId: 'etre',
        tense: 'present',
        examples: [
          { sentence: 'Je suis ici. (présent)', highlight: 'suis' },
          { sentence: 'Je serai là. (futur)', highlight: 'serai' },
          { sentence: 'J\'étais content. (imparfait)', highlight: 'étais' },
        ],
        tip: { text: 'ÊTRE change beaucoup : suis, serai, étais. Observe bien le début du mot !' },
      },
      {
        title: 'AVOIR — les 3 temps',
        verbId: 'avoir',
        tense: 'present',
        examples: [
          { sentence: 'J\'ai faim. (présent)', highlight: 'ai' },
          { sentence: 'J\'aurai soif. (futur)', highlight: 'aurai' },
          { sentence: 'J\'avais sommeil. (imparfait)', highlight: 'avais' },
        ],
        tip: { text: 'AVOIR : ai, aurai, avais. Le A est toujours là !' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 7 — Verbes -ER (1er groupe, présent)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 7,
    title: 'Les verbes en -ER',
    introduction:
      'Les verbes en -ER sont les plus nombreux ! Jouer, manger, chanter, regarder... Ils se conjuguent tous pareil !',
    sections: [
      {
        title: 'Le verbe JOUER',
        verbId: 'jouer',
        tense: 'present',
        examples: [
          { sentence: 'Je joue au ballon.', highlight: 'joue' },
          { sentence: 'Nous jouons ensemble.', highlight: 'jouons' },
        ],
      },
      {
        title: 'Le verbe MANGER',
        verbId: 'manger',
        tense: 'present',
        examples: [
          { sentence: 'Tu manges une pomme.', highlight: 'manges' },
          { sentence: 'Nous mangeons à midi.', highlight: 'mangeons' },
        ],
        tip: { text: 'Attention à MANGER avec nous : on garde le E → nous mangEons !' },
      },
      {
        title: 'Le verbe CHANTER',
        verbId: 'chanter',
        tense: 'present',
        examples: [
          { sentence: 'Elle chante bien.', highlight: 'chante' },
          { sentence: 'Vous chantez fort.', highlight: 'chantez' },
        ],
      },
      {
        title: 'Le verbe REGARDER',
        verbId: 'regarder',
        tense: 'present',
        examples: [
          { sentence: 'Il regarde un film.', highlight: 'regarde' },
          { sentence: 'Ils regardent la télé.', highlight: 'regardent' },
        ],
        tip: { text: 'Les verbes en -ER : -e, -es, -e, -ons, -ez, -ent. Retiens les terminaisons !' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 8 — Verbes irréguliers (aller, venir, faire, dire)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 8,
    title: 'Les verbes irréguliers',
    introduction:
      'Certains verbes ne suivent pas les règles ! Aller, venir, faire, dire... Il faut les apprendre par cœur.',
    sections: [
      {
        title: 'Le verbe ALLER',
        verbId: 'aller',
        tense: 'present',
        examples: [
          { sentence: 'Je vais à l\'école.', highlight: 'vais' },
          { sentence: 'Nous allons au parc.', highlight: 'allons' },
        ],
        tip: { text: 'ALLER est spécial : je vais, tu vas, mais nous allons !' },
      },
      {
        title: 'Le verbe VENIR',
        verbId: 'venir',
        tense: 'present',
        examples: [
          { sentence: 'Tu viens chez moi.', highlight: 'viens' },
          { sentence: 'Ils viennent ce soir.', highlight: 'viennent' },
        ],
        tip: { text: 'VENIR : je viens, tu viens (pareil !), mais ils vieNNent avec deux N.' },
      },
      {
        title: 'Le verbe FAIRE',
        verbId: 'faire',
        tense: 'present',
        examples: [
          { sentence: 'Je fais un dessin.', highlight: 'fais' },
          { sentence: 'Vous faites du sport.', highlight: 'faites' },
        ],
        tip: { text: 'FAIRE : nous faisons (on dit « fesons »), vous faites (pas « faisez » !).' },
      },
      {
        title: 'Le verbe DIRE',
        verbId: 'dire',
        tense: 'present',
        examples: [
          { sentence: 'Il dit bonjour.', highlight: 'dit' },
          { sentence: 'Vous dites merci.', highlight: 'dites' },
        ],
        tip: { text: 'DIRE : vous dites (pas « disez » !) — comme FAIRE, c\'est spécial avec vous.' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 9 — Verbes fréquents (pouvoir, vouloir, voir, prendre)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 9,
    title: 'Les verbes essentiels',
    introduction:
      'Pouvoir, vouloir, voir, prendre... Ces verbes sont partout ! Apprends-les bien, tu en auras besoin tous les jours.',
    sections: [
      {
        title: 'Le verbe POUVOIR',
        verbId: 'pouvoir',
        tense: 'present',
        examples: [
          { sentence: 'Je peux venir.', highlight: 'peux' },
          { sentence: 'Ils peuvent jouer.', highlight: 'peuvent' },
        ],
        tip: { text: 'POUVOIR : je peux, tu peux (pareil !), mais ils peuVent.' },
      },
      {
        title: 'Le verbe VOULOIR',
        verbId: 'vouloir',
        tense: 'present',
        examples: [
          { sentence: 'Tu veux un bonbon.', highlight: 'veux' },
          { sentence: 'Nous voulons jouer.', highlight: 'voulons' },
        ],
        tip: { text: 'VOULOIR ressemble à POUVOIR : je veux, tu veux, ils veulent.' },
      },
      {
        title: 'Le verbe VOIR',
        verbId: 'voir',
        tense: 'present',
        examples: [
          { sentence: 'Je vois un oiseau.', highlight: 'vois' },
          { sentence: 'Nous voyons la mer.', highlight: 'voyons' },
        ],
      },
      {
        title: 'Le verbe PRENDRE',
        verbId: 'prendre',
        tense: 'present',
        examples: [
          { sentence: 'Elle prend son sac.', highlight: 'prend' },
          { sentence: 'Ils prennent le bus.', highlight: 'prennent' },
        ],
        tip: { text: 'PRENDRE : il prend (sans S !), mais ils preNNent avec deux N.' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 10 — Révision Générale (tous verbes, tous temps)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 10,
    title: 'Le Grand Récapitulatif',
    introduction:
      'Tu as tout appris ! Voici un résumé de tous les verbes et tous les temps. Consulte cette leçon quand tu veux !',
    sections: [
      {
        title: 'ÊTRE et AVOIR au présent',
        verbId: 'etre',
        tense: 'present',
        examples: [
          { sentence: 'Je suis prêt.', highlight: 'suis' },
          { sentence: 'J\'ai tout compris.', highlight: 'ai' },
        ],
      },
      {
        title: 'Les verbes en -ER',
        verbId: 'jouer',
        tense: 'present',
        examples: [
          { sentence: 'Je joue dehors.', highlight: 'joue' },
          { sentence: 'Nous chantons ensemble.', highlight: 'chantons' },
        ],
        tip: { text: 'Tous les verbes en -ER se conjuguent pareil : -e, -es, -e, -ons, -ez, -ent.' },
      },
      {
        title: 'Les verbes irréguliers',
        verbId: 'aller',
        tense: 'present',
        examples: [
          { sentence: 'Je vais au marché.', highlight: 'vais' },
          { sentence: 'Il fait beau.', highlight: 'fait' },
        ],
        tip: { text: 'Aller, faire, dire, venir : chacun est unique, il faut les connaître par cœur !' },
      },
      {
        title: 'Les verbes essentiels',
        verbId: 'pouvoir',
        tense: 'present',
        examples: [
          { sentence: 'Je peux le faire.', highlight: 'peux' },
          { sentence: 'Elle prend le train.', highlight: 'prend' },
        ],
        tip: { text: 'Pouvoir, vouloir, voir, prendre : des verbes importants pour tous les jours !' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 11 — Verbes -IR (FINIR, 2e groupe)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 11,
    title: 'Le verbe FINIR',
    introduction:
      'FINIR est le premier verbe du 2e groupe ! Il se conjugue avec -ISS- au pluriel. Finis, finit, mais finissons !',
    sections: [
      {
        title: 'FINIR au présent',
        verbId: 'finir',
        tense: 'present',
        examples: [
          { sentence: 'Je finis mon dessin.', highlight: 'finis' },
          { sentence: 'Nous finissons nos devoirs.', highlight: 'finissons' },
          { sentence: 'Ils finissent le repas.', highlight: 'finissent' },
        ],
        tip: { text: 'Avec nous, vous, ils : le -ISS- apparaît ! Fini-SS-ons, fini-SS-ez, fini-SS-ent.' },
      },
      {
        title: 'FINIR au futur',
        verbId: 'finir',
        tense: 'futur',
        examples: [
          { sentence: 'Je finirai demain.', highlight: 'finirai' },
          { sentence: 'Nous finirons bientôt.', highlight: 'finirons' },
        ],
        tip: { text: 'Au futur, c\'est facile : finir + ai, as, a, ons, ez, ont !' },
      },
      {
        title: 'FINIR à l\'imparfait',
        verbId: 'finir',
        tense: 'imparfait',
        examples: [
          { sentence: 'Je finissais lentement.', highlight: 'finissais' },
          { sentence: 'Nous finissions ensemble.', highlight: 'finissions' },
        ],
        tip: { text: 'À l\'imparfait aussi, le -ISS- est là : finissais, finissait, finissions...' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 12 — La Phrase
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 12,
    title: 'La Phrase et la Ponctuation',
    introduction:
      'Une phrase commence par une majuscule, contient un verbe, et se termine par un point. Apprends à la reconnaître !',
    sections: [
      {
        title: 'Qu\'est-ce qu\'une phrase ?',
        examples: [
          { sentence: 'Le chat dort.', highlight: 'Le' },
          { sentence: 'Les enfants jouent dans la cour.', highlight: 'Les' },
        ],
        tip: { text: 'Une phrase a 3 choses : une Majuscule au début, un Verbe, un Point à la fin.' },
      },
      {
        title: 'Les signes de ponctuation',
        examples: [
          { sentence: 'Le chat dort.', highlight: '.' },
          { sentence: 'Tu viens jouer ?', highlight: '?' },
          { sentence: 'Nous avons gagné !', highlight: '!' },
        ],
        tip: { text: 'Le point (.) raconte, le point d\'interrogation (?) pose une question, le point d\'exclamation (!) montre une émotion.' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 13 — L'Adjectif qualificatif
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 13,
    title: 'L\'Adjectif Qualificatif',
    introduction:
      'L\'adjectif donne des informations sur le nom : la couleur, la taille, la forme... Il s\'accorde avec le nom !',
    sections: [
      {
        title: 'Reconnaître l\'adjectif',
        examples: [
          { sentence: 'Le petit chat dort.', highlight: 'petit' },
          { sentence: 'La fleur est rouge.', highlight: 'rouge' },
          { sentence: 'Les grands arbres.', highlight: 'grands' },
        ],
        tip: { text: 'L\'adjectif dit comment est le nom. Petit, grand, joli, rouge, bleu...' },
      },
      {
        title: 'L\'accord de l\'adjectif',
        examples: [
          { sentence: 'Le chat est petit.', highlight: 'petit' },
          { sentence: 'La chatte est petite.', highlight: 'petite' },
          { sentence: 'Les chats sont petits.', highlight: 'petits' },
        ],
        tip: { text: 'L\'adjectif s\'accorde : féminin = +E, pluriel = +S. Petit → petite → petits → petites.' },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIVRE 14 — Sujet et Verbe
  // ═══════════════════════════════════════════════════════════════════════════
  {
    bookId: 14,
    title: 'Le Sujet et le Verbe',
    introduction:
      'Dans chaque phrase, il y a un sujet (qui fait l\'action) et un verbe (l\'action). Apprends à les trouver !',
    sections: [
      {
        title: 'Trouver le verbe',
        examples: [
          { sentence: 'Le chat mange un poisson.', highlight: 'mange' },
          { sentence: 'Les enfants jouent.', highlight: 'jouent' },
          { sentence: 'Le soleil brille.', highlight: 'brille' },
        ],
        tip: { text: 'Le verbe, c\'est l\'action ! Mange, joue, court, dort... Que fait-on ?' },
      },
      {
        title: 'Trouver le sujet',
        examples: [
          { sentence: 'Le chat mange un poisson.', highlight: 'Le chat' },
          { sentence: 'Les enfants jouent.', highlight: 'Les enfants' },
          { sentence: 'Maman prépare le repas.', highlight: 'Maman' },
        ],
        tip: { text: 'Pour trouver le sujet, demande : « Qui est-ce qui + verbe ? » Qui est-ce qui mange ? Le chat !' },
      },
    ],
  },
];

/** Toutes les leçons (français + maths) */
export const ALL_BOOK_LESSONS: BookLesson[] = [...BOOK_LESSONS, ...MATH_BOOK_LESSONS];

/** Récupère la leçon d'un livre par son ID */
export function getBookLesson(bookId: number): BookLesson | undefined {
  return ALL_BOOK_LESSONS.find((l) => l.bookId === bookId);
}
