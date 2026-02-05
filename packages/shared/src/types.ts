// Pronoms personnels sujets
export const PRONOUNS = ['je', 'tu', 'il/elle/on', 'nous', 'vous', 'ils/elles'] as const;
export type Pronoun = (typeof PRONOUNS)[number];

// Verbes supportés
export type VerbId = 'etre' | 'avoir';

// Temps de conjugaison
export const TENSES = ['present', 'futur', 'imparfait', 'passe_compose'] as const;
export type Tense = (typeof TENSES)[number];

// Une forme conjuguée complète
export interface ConjugatedForm {
  pronoun: Pronoun;
  form: string;
}

// Définition d'un verbe avec toutes ses formes pour un temps donné
export interface VerbConjugation {
  id: VerbId;
  infinitive: string;
  tense: Tense;
  forms: ConjugatedForm[];
}

// --- Groupe Nominal (GN) ---

export type Gender = 'masculine' | 'feminine';
export type GrammaticalNumber = 'singular' | 'plural';

// Thèmes de vocabulaire CE1
export type VocabularyTheme = 'ecole' | 'maison' | 'animaux' | 'jeux' | 'nature' | 'corps' | 'nourriture';

export interface Noun {
  id: string;
  /** Forme canonique (singulier) */
  singular: string;
  plural: string;
  gender: Gender;
  theme: VocabularyTheme;
}

export interface Adjective {
  id: string;
  /** Adjectif antéposé (petit, grand, joli…) vs postposé (rouge, bleu…) */
  preposed: boolean;
  forms: {
    ms: string; // masculin singulier
    mp: string; // masculin pluriel
    fs: string; // féminin singulier
    fp: string; // féminin pluriel
  };
}

export type DeterminerKind = 'definite' | 'indefinite' | 'possessive';

export interface Determiner {
  id: string;
  kind: DeterminerKind;
  forms: {
    ms: string; // le, un, mon
    fs: string; // la, une, ma
    mp: string; // les, des, mes
    fp: string; // les, des, mes
  };
  /** Forme élidée devant voyelle/h muet (l' pour le/la) */
  elidedForm?: string;
}

// Cible du trou dans la Potion étendue
export type GapTarget = 'verb' | 'determiner' | 'adjective' | 'noun';

// --- Types de jeu ---

// Les 6 types de mini-jeux
export type MiniGameType =
  | 'attrape-mots' // Reconnaissance — taper sur les verbes conjugués
  | 'pont-magique' // Association — drag & drop pronom ↔ forme
  | 'potion-magique' // Complétion — glisser le bon mot dans la phrase
  | 'tri-sorcier' // Distinction être vs avoir — trier dans deux chapeaux
  | 'grimoire' // Production guidée — sélectionner la bonne forme
  | 'pont-accords'; // Accord sujet-verbe — tap séquentiel

// Phase du core loop
export type GamePhase = 'discovery' | 'challenge' | 'response' | 'resolution';

// Résultat d'une réponse
export type AnswerResult = 'correct' | 'incorrect';

// Un exercice individuel
export interface Exercise {
  id: string;
  miniGame: MiniGameType;
  verbId: VerbId;
  /** La phrase contexte (ex: "Je ___ content.") */
  sentence: string;
  /** La bonne réponse */
  correctAnswer: string;
  /** Les choix proposés (pour QCM/drag & drop) */
  choices: string[];
  /** Le pronom concerné */
  pronoun: Pronoun;
}

// État de la mascotte Plumi
export type PlumiState = 'idle' | 'challenge' | 'celebration' | 'encouragement';

// --- Progression ---

export interface Chapter {
  id: number;
  title: string;
  /** Verbes couverts dans ce chapitre */
  verbs: VerbId[];
  /** Temps de conjugaison ciblé (ou 'mixed' pour multi-temps) */
  tense: Tense | 'mixed';
  /** Nombre de leçons */
  lessonCount: number;
  /** A un boss de fin ? */
  hasBoss: boolean;
}

// Livre de sorts — regroupe plusieurs chapitres autour d'un temps
export interface Book {
  id: number;
  title: string;
  /** Temps couverts dans ce livre */
  tenses: Tense[];
  /** IDs des chapitres de ce livre */
  chapters: number[];
  /** Livre bonus (hors programme CE1 strict) */
  isBonus?: boolean;
}

// --- Récompenses ---

export type RewardType = 'star' | 'badge' | 'world-element' | 'companion' | 'cosmetic';

export interface Reward {
  type: RewardType;
  id: string;
  label: string;
}
