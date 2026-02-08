// ═══════════════════════════════════════════════════════════════════════════
// CORPUS DE PHRASES GRAMMATICALES — Source unique de vérité
// Programme CE1 : la phrase, le sujet, le verbe, l'adjectif qualificatif
// Vocabulaire adapté 6-7 ans — thèmes familiers (école, maison, animaux)
// ═══════════════════════════════════════════════════════════════════════════

export type WordRole = 'subject' | 'verb' | 'adjective' | 'determiner' | 'noun' | 'complement' | 'punctuation';

export interface AnnotatedWord {
  word: string;
  role: WordRole;
  group?: 'subject-group' | 'verb-group';
}

export interface GrammarSentence {
  id: string;
  words: AnnotatedWord[];
  punctuation: '.' | '?' | '!';
  isValid: true;
  sentenceType: 'declarative' | 'interrogative' | 'exclamative';
}

export interface NotASentence {
  id: string;
  text: string;
  reason: 'no-verb' | 'no-sense' | 'no-capital' | 'no-punctuation' | 'fragment';
}

// ═══════════════════════════════════════════════════════════════════════════
// PHRASES VALIDES (~50)
// Chaque mot est annoté avec son rôle grammatical
// ═══════════════════════════════════════════════════════════════════════════

export const GRAMMAR_SENTENCES: GrammarSentence[] = [
  // ─── Déclaratives simples (sujet + verbe) ────────────────────────────────
  {
    id: 'gs-01',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'chat', role: 'noun', group: 'subject-group' },
      { word: 'dort', role: 'verb', group: 'verb-group' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-02',
    words: [
      { word: 'La', role: 'determiner', group: 'subject-group' },
      { word: 'fille', role: 'noun', group: 'subject-group' },
      { word: 'chante', role: 'verb', group: 'verb-group' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-03',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'garçon', role: 'noun', group: 'subject-group' },
      { word: 'mange', role: 'verb', group: 'verb-group' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-04',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'chien', role: 'noun', group: 'subject-group' },
      { word: 'court', role: 'verb', group: 'verb-group' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-05',
    words: [
      { word: 'Les', role: 'determiner', group: 'subject-group' },
      { word: 'oiseaux', role: 'noun', group: 'subject-group' },
      { word: 'chantent', role: 'verb', group: 'verb-group' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },

  // ─── Déclaratives avec complément ────────────────────────────────────────
  {
    id: 'gs-06',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'chat', role: 'noun', group: 'subject-group' },
      { word: 'mange', role: 'verb', group: 'verb-group' },
      { word: 'un', role: 'complement' },
      { word: 'poisson', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-07',
    words: [
      { word: 'La', role: 'determiner', group: 'subject-group' },
      { word: 'fille', role: 'noun', group: 'subject-group' },
      { word: 'lit', role: 'verb', group: 'verb-group' },
      { word: 'un', role: 'complement' },
      { word: 'livre', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-08',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'garçon', role: 'noun', group: 'subject-group' },
      { word: 'joue', role: 'verb', group: 'verb-group' },
      { word: 'au', role: 'complement' },
      { word: 'ballon', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-09',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'chien', role: 'noun', group: 'subject-group' },
      { word: 'court', role: 'verb', group: 'verb-group' },
      { word: 'dans', role: 'complement' },
      { word: 'le', role: 'complement' },
      { word: 'jardin', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-10',
    words: [
      { word: 'Maman', role: 'noun', group: 'subject-group' },
      { word: 'prépare', role: 'verb', group: 'verb-group' },
      { word: 'le', role: 'complement' },
      { word: 'repas', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-11',
    words: [
      { word: 'Papa', role: 'noun', group: 'subject-group' },
      { word: 'lit', role: 'verb', group: 'verb-group' },
      { word: 'le', role: 'complement' },
      { word: 'journal', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-12',
    words: [
      { word: 'Les', role: 'determiner', group: 'subject-group' },
      { word: 'enfants', role: 'noun', group: 'subject-group' },
      { word: 'jouent', role: 'verb', group: 'verb-group' },
      { word: 'dans', role: 'complement' },
      { word: 'la', role: 'complement' },
      { word: 'cour', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-13',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'lapin', role: 'noun', group: 'subject-group' },
      { word: 'saute', role: 'verb', group: 'verb-group' },
      { word: 'dans', role: 'complement' },
      { word: 'le', role: 'complement' },
      { word: 'pré', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-14',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'soleil', role: 'noun', group: 'subject-group' },
      { word: 'brille', role: 'verb', group: 'verb-group' },
      { word: 'dans', role: 'complement' },
      { word: 'le', role: 'complement' },
      { word: 'ciel', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-15',
    words: [
      { word: 'La', role: 'determiner', group: 'subject-group' },
      { word: 'maîtresse', role: 'noun', group: 'subject-group' },
      { word: 'explique', role: 'verb', group: 'verb-group' },
      { word: 'la', role: 'complement' },
      { word: 'leçon', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },

  // ─── Déclaratives avec adjectif ──────────────────────────────────────────
  {
    id: 'gs-16',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'petit', role: 'adjective', group: 'subject-group' },
      { word: 'chat', role: 'noun', group: 'subject-group' },
      { word: 'dort', role: 'verb', group: 'verb-group' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-17',
    words: [
      { word: 'La', role: 'determiner', group: 'subject-group' },
      { word: 'grande', role: 'adjective', group: 'subject-group' },
      { word: 'fille', role: 'noun', group: 'subject-group' },
      { word: 'chante', role: 'verb', group: 'verb-group' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-18',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'gros', role: 'adjective', group: 'subject-group' },
      { word: 'chien', role: 'noun', group: 'subject-group' },
      { word: 'court', role: 'verb', group: 'verb-group' },
      { word: 'vite', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-19',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'chat', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'noir', role: 'adjective' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-20',
    words: [
      { word: 'La', role: 'determiner', group: 'subject-group' },
      { word: 'fleur', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'rouge', role: 'adjective' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-21',
    words: [
      { word: 'La', role: 'determiner', group: 'subject-group' },
      { word: 'jolie', role: 'adjective', group: 'subject-group' },
      { word: 'maison', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'grande', role: 'adjective' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-22',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'petit', role: 'adjective', group: 'subject-group' },
      { word: 'garçon', role: 'noun', group: 'subject-group' },
      { word: 'mange', role: 'verb', group: 'verb-group' },
      { word: 'une', role: 'complement' },
      { word: 'pomme', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-23',
    words: [
      { word: 'Les', role: 'determiner', group: 'subject-group' },
      { word: 'petits', role: 'adjective', group: 'subject-group' },
      { word: 'oiseaux', role: 'noun', group: 'subject-group' },
      { word: 'chantent', role: 'verb', group: 'verb-group' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-24',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'ballon', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'rond', role: 'adjective' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-25',
    words: [
      { word: 'La', role: 'determiner', group: 'subject-group' },
      { word: 'petite', role: 'adjective', group: 'subject-group' },
      { word: 'souris', role: 'noun', group: 'subject-group' },
      { word: 'mange', role: 'verb', group: 'verb-group' },
      { word: 'du', role: 'complement' },
      { word: 'fromage', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-26',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'vélo', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'bleu', role: 'adjective' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },

  // ─── Déclaratives avec pronom sujet ──────────────────────────────────────
  {
    id: 'gs-27',
    words: [
      { word: 'Elle', role: 'noun', group: 'subject-group' },
      { word: 'dessine', role: 'verb', group: 'verb-group' },
      { word: 'un', role: 'complement' },
      { word: 'arbre', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-28',
    words: [
      { word: 'Il', role: 'noun', group: 'subject-group' },
      { word: 'regarde', role: 'verb', group: 'verb-group' },
      { word: 'la', role: 'complement' },
      { word: 'télé', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-29',
    words: [
      { word: 'Nous', role: 'noun', group: 'subject-group' },
      { word: 'mangeons', role: 'verb', group: 'verb-group' },
      { word: 'à', role: 'complement' },
      { word: 'la', role: 'complement' },
      { word: 'cantine', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-30',
    words: [
      { word: 'Ils', role: 'noun', group: 'subject-group' },
      { word: 'courent', role: 'verb', group: 'verb-group' },
      { word: 'dans', role: 'complement' },
      { word: 'le', role: 'complement' },
      { word: 'parc', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },

  // ─── Interrogatives ─────────────────────────────────────────────────────
  {
    id: 'gs-31',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'chat', role: 'noun', group: 'subject-group' },
      { word: 'dort', role: 'verb', group: 'verb-group' },
    ],
    punctuation: '?',
    isValid: true,
    sentenceType: 'interrogative',
  },
  {
    id: 'gs-32',
    words: [
      { word: 'Tu', role: 'noun', group: 'subject-group' },
      { word: 'viens', role: 'verb', group: 'verb-group' },
      { word: 'jouer', role: 'complement' },
    ],
    punctuation: '?',
    isValid: true,
    sentenceType: 'interrogative',
  },
  {
    id: 'gs-33',
    words: [
      { word: 'Où', role: 'complement' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'le', role: 'determiner', group: 'subject-group' },
      { word: 'chien', role: 'noun', group: 'subject-group' },
    ],
    punctuation: '?',
    isValid: true,
    sentenceType: 'interrogative',
  },
  {
    id: 'gs-34',
    words: [
      { word: 'Tu', role: 'noun', group: 'subject-group' },
      { word: 'as', role: 'verb', group: 'verb-group' },
      { word: 'faim', role: 'complement' },
    ],
    punctuation: '?',
    isValid: true,
    sentenceType: 'interrogative',
  },
  {
    id: 'gs-35',
    words: [
      { word: 'Elle', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'là', role: 'complement' },
    ],
    punctuation: '?',
    isValid: true,
    sentenceType: 'interrogative',
  },

  // ─── Exclamatives ───────────────────────────────────────────────────────
  {
    id: 'gs-36',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'chat', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'trop', role: 'complement' },
      { word: 'mignon', role: 'adjective' },
    ],
    punctuation: '!',
    isValid: true,
    sentenceType: 'exclamative',
  },
  {
    id: 'gs-37',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'gâteau', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'délicieux', role: 'adjective' },
    ],
    punctuation: '!',
    isValid: true,
    sentenceType: 'exclamative',
  },
  {
    id: 'gs-38',
    words: [
      { word: 'Nous', role: 'noun', group: 'subject-group' },
      { word: 'avons', role: 'verb', group: 'verb-group' },
      { word: 'gagné', role: 'complement' },
    ],
    punctuation: '!',
    isValid: true,
    sentenceType: 'exclamative',
  },
  {
    id: 'gs-39',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'soleil', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'magnifique', role: 'adjective' },
    ],
    punctuation: '!',
    isValid: true,
    sentenceType: 'exclamative',
  },
  {
    id: 'gs-40',
    words: [
      { word: 'Tu', role: 'noun', group: 'subject-group' },
      { word: 'as', role: 'verb', group: 'verb-group' },
      { word: 'réussi', role: 'complement' },
    ],
    punctuation: '!',
    isValid: true,
    sentenceType: 'exclamative',
  },

  // ─── Déclaratives supplémentaires ────────────────────────────────────────
  {
    id: 'gs-41',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'bébé', role: 'noun', group: 'subject-group' },
      { word: 'pleure', role: 'verb', group: 'verb-group' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-42',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'poisson', role: 'noun', group: 'subject-group' },
      { word: 'nage', role: 'verb', group: 'verb-group' },
      { word: 'vite', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-43',
    words: [
      { word: 'La', role: 'determiner', group: 'subject-group' },
      { word: 'tortue', role: 'noun', group: 'subject-group' },
      { word: 'marche', role: 'verb', group: 'verb-group' },
      { word: 'lentement', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-44',
    words: [
      { word: 'Mon', role: 'determiner', group: 'subject-group' },
      { word: 'frère', role: 'noun', group: 'subject-group' },
      { word: 'dessine', role: 'verb', group: 'verb-group' },
      { word: 'bien', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-45',
    words: [
      { word: 'Ma', role: 'determiner', group: 'subject-group' },
      { word: 'sœur', role: 'noun', group: 'subject-group' },
      { word: 'lit', role: 'verb', group: 'verb-group' },
      { word: 'un', role: 'complement' },
      { word: 'conte', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-46',
    words: [
      { word: 'Les', role: 'determiner', group: 'subject-group' },
      { word: 'nuages', role: 'noun', group: 'subject-group' },
      { word: 'sont', role: 'verb', group: 'verb-group' },
      { word: 'blancs', role: 'adjective' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-47',
    words: [
      { word: 'La', role: 'determiner', group: 'subject-group' },
      { word: 'pomme', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'verte', role: 'adjective' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-48',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'grand', role: 'adjective', group: 'subject-group' },
      { word: 'arbre', role: 'noun', group: 'subject-group' },
      { word: 'a', role: 'verb', group: 'verb-group' },
      { word: 'des', role: 'complement' },
      { word: 'feuilles', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-49',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'vent', role: 'noun', group: 'subject-group' },
      { word: 'souffle', role: 'verb', group: 'verb-group' },
      { word: 'fort', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-50',
    words: [
      { word: 'La', role: 'determiner', group: 'subject-group' },
      { word: 'lune', role: 'noun', group: 'subject-group' },
      { word: 'brille', role: 'verb', group: 'verb-group' },
      { word: 'dans', role: 'complement' },
      { word: 'la', role: 'complement' },
      { word: 'nuit', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },

  // ─── Déclaratives ambiguës pour la ponctuation ─────────────────────────────
  // Ces phrases déclaratives, sans mot-question, empêchent le pattern-matching
  // (l'enfant doit lire le sens, pas chercher "Où" ou "Quel")
  {
    id: 'gs-61',
    words: [
      { word: 'Tu', role: 'noun', group: 'subject-group' },
      { word: 'manges', role: 'verb', group: 'verb-group' },
      { word: 'une', role: 'complement' },
      { word: 'pomme', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-62',
    words: [
      { word: 'Il', role: 'noun', group: 'subject-group' },
      { word: 'fait', role: 'verb', group: 'verb-group' },
      { word: 'beau', role: 'complement' },
      { word: 'dehors', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-63',
    words: [
      { word: 'Nous', role: 'noun', group: 'subject-group' },
      { word: 'partons', role: 'verb', group: 'verb-group' },
      { word: 'demain', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-64',
    words: [
      { word: 'Elle', role: 'noun', group: 'subject-group' },
      { word: 'aime', role: 'verb', group: 'verb-group' },
      { word: 'les', role: 'complement' },
      { word: 'gâteaux', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },

  // ─── Interrogatives sans mot-question (intonation seule) ───────────────────
  {
    id: 'gs-65',
    words: [
      { word: 'Il', role: 'noun', group: 'subject-group' },
      { word: 'pleut', role: 'verb', group: 'verb-group' },
      { word: 'encore', role: 'complement' },
    ],
    punctuation: '?',
    isValid: true,
    sentenceType: 'interrogative',
  },
  {
    id: 'gs-66',
    words: [
      { word: 'Nous', role: 'noun', group: 'subject-group' },
      { word: 'allons', role: 'verb', group: 'verb-group' },
      { word: 'au', role: 'complement' },
      { word: 'parc', role: 'complement' },
    ],
    punctuation: '?',
    isValid: true,
    sentenceType: 'interrogative',
  },

  // ─── Exclamatives sans "Quel" / "Comme" ───────────────────────────────────
  {
    id: 'gs-67',
    words: [
      { word: 'Il', role: 'noun', group: 'subject-group' },
      { word: 'neige', role: 'verb', group: 'verb-group' },
    ],
    punctuation: '!',
    isValid: true,
    sentenceType: 'exclamative',
  },
  {
    id: 'gs-68',
    words: [
      { word: 'La', role: 'determiner', group: 'subject-group' },
      { word: 'récréation', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'finie', role: 'adjective' },
    ],
    punctuation: '!',
    isValid: true,
    sentenceType: 'exclamative',
  },

  // ─── Phrases avec adjectifs — enrichissement pour repérage ch. 37-39 ───────

  // Adjectif attribut du sujet (après le verbe être)
  {
    id: 'gs-51',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'papillon', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'joli', role: 'adjective' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-52',
    words: [
      { word: 'Les', role: 'determiner', group: 'subject-group' },
      { word: 'fraises', role: 'noun', group: 'subject-group' },
      { word: 'sont', role: 'verb', group: 'verb-group' },
      { word: 'rouges', role: 'adjective' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-53',
    words: [
      { word: 'La', role: 'determiner', group: 'subject-group' },
      { word: 'soupe', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'chaude', role: 'adjective' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-54',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'ciel', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'gris', role: 'adjective' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },

  // Adjectif épithète avant le nom (dans le groupe sujet)
  {
    id: 'gs-55',
    words: [
      { word: 'La', role: 'determiner', group: 'subject-group' },
      { word: 'gentille', role: 'adjective', group: 'subject-group' },
      { word: 'maîtresse', role: 'noun', group: 'subject-group' },
      { word: 'sourit', role: 'verb', group: 'verb-group' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-56',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'vieux', role: 'adjective', group: 'subject-group' },
      { word: 'chêne', role: 'noun', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'immense', role: 'adjective' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-57',
    words: [
      { word: 'Les', role: 'determiner', group: 'subject-group' },
      { word: 'jolies', role: 'adjective', group: 'subject-group' },
      { word: 'fleurs', role: 'noun', group: 'subject-group' },
      { word: 'poussent', role: 'verb', group: 'verb-group' },
      { word: 'dans', role: 'complement' },
      { word: 'le', role: 'complement' },
      { word: 'pré', role: 'complement' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },

  // Adjectif épithète après le nom (dans le groupe sujet)
  {
    id: 'gs-58',
    words: [
      { word: 'Le', role: 'determiner', group: 'subject-group' },
      { word: 'manteau', role: 'noun', group: 'subject-group' },
      { word: 'rouge', role: 'adjective', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'chaud', role: 'adjective' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-59',
    words: [
      { word: 'La', role: 'determiner', group: 'subject-group' },
      { word: 'robe', role: 'noun', group: 'subject-group' },
      { word: 'bleue', role: 'adjective', group: 'subject-group' },
      { word: 'est', role: 'verb', group: 'verb-group' },
      { word: 'neuve', role: 'adjective' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
  {
    id: 'gs-60',
    words: [
      { word: 'Un', role: 'determiner', group: 'subject-group' },
      { word: 'gros', role: 'adjective', group: 'subject-group' },
      { word: 'nuage', role: 'noun', group: 'subject-group' },
      { word: 'noir', role: 'adjective', group: 'subject-group' },
      { word: 'arrive', role: 'verb', group: 'verb-group' },
    ],
    punctuation: '.',
    isValid: true,
    sentenceType: 'declarative',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// NON-PHRASES (~20)
// Groupes de mots qui ne sont pas des phrases correctes
// ═══════════════════════════════════════════════════════════════════════════

export const NOT_SENTENCES: NotASentence[] = [
  // ─── Sans verbe (groupes nominaux, compléments isolés) ─────────────────────
  { id: 'ns-01', text: 'le petit chat', reason: 'no-verb' },
  { id: 'ns-02', text: 'une jolie fleur rouge', reason: 'no-verb' },
  { id: 'ns-03', text: 'dans le jardin', reason: 'no-verb' },
  { id: 'ns-04', text: 'avec mon ami', reason: 'no-verb' },
  { id: 'ns-05', text: 'les grands arbres', reason: 'no-verb' },
  { id: 'ns-06', text: 'sur la table', reason: 'no-verb' },
  { id: 'ns-07', text: 'du chocolat chaud', reason: 'no-verb' },
  { id: 'ns-08', text: 'mon cartable bleu', reason: 'no-verb' },
  { id: 'ns-12', text: 'des bonbons rouges', reason: 'no-verb' },
  { id: 'ns-15', text: 'les petites souris grises', reason: 'no-verb' },
  { id: 'ns-16', text: 'au parc avec papa', reason: 'no-verb' },
  { id: 'ns-17', text: 'devant la maison', reason: 'no-verb' },
  { id: 'ns-18', text: 'un beau soleil jaune', reason: 'no-verb' },
  { id: 'ns-20', text: 'très très grand', reason: 'no-verb' },

  // ─── Sans majuscule (piège : tout le reste est correct) ────────────────────
  { id: 'ns-09', text: 'le chat mange.', reason: 'no-capital' },
  { id: 'ns-11', text: 'le garçon joue.', reason: 'no-capital' },
  { id: 'ns-21', text: 'les oiseaux chantent.', reason: 'no-capital' },
  { id: 'ns-22', text: 'la fille lit un livre.', reason: 'no-capital' },

  // ─── Sans ponctuation (piège : majuscule + sujet + verbe mais pas de point) ─
  { id: 'ns-10', text: 'La fille chante bien', reason: 'no-punctuation' },
  { id: 'ns-19', text: 'Le chien court vite', reason: 'no-punctuation' },
  { id: 'ns-23', text: 'Maman prépare le repas', reason: 'no-punctuation' },
  { id: 'ns-24', text: 'Le soleil brille fort', reason: 'no-punctuation' },

  // ─── Fragments ambigus (verbe présent mais pas de phrase complète) ─────────
  { id: 'ns-13', text: 'et aussi demain', reason: 'fragment' },
  { id: 'ns-14', text: 'parce que le chat', reason: 'fragment' },
  { id: 'ns-25', text: 'quand il pleut', reason: 'fragment' },
  { id: 'ns-26', text: 'mange une pomme', reason: 'fragment' },
  { id: 'ns-27', text: 'court dans le jardin', reason: 'fragment' },
  { id: 'ns-28', text: 'qui chante fort', reason: 'fragment' },
  { id: 'ns-29', text: 'pour aller à la piscine', reason: 'fragment' },
  { id: 'ns-30', text: 'mais pas toujours', reason: 'fragment' },
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

/** Reconstruit la phrase complète à partir des mots annotés + ponctuation */
export function buildSentenceText(sentence: GrammarSentence): string {
  return sentence.words.map((w) => w.word).join(' ') + sentence.punctuation;
}

/** Récupère les mots du sujet dans une phrase */
export function getSubjectWords(sentence: GrammarSentence): AnnotatedWord[] {
  return sentence.words.filter((w) => w.group === 'subject-group');
}

/** Récupère le(s) verbe(s) d'une phrase */
export function getVerbWords(sentence: GrammarSentence): AnnotatedWord[] {
  return sentence.words.filter((w) => w.role === 'verb');
}

/** Récupère les adjectifs d'une phrase */
export function getAdjectiveWords(sentence: GrammarSentence): AnnotatedWord[] {
  return sentence.words.filter((w) => w.role === 'adjective');
}
