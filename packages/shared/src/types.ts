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

// --- Types de jeu ---

// Les 5 types de mini-jeux
export type MiniGameType =
  | 'attrape-mots' // Reconnaissance — taper sur les verbes conjugués
  | 'pont-magique' // Association — drag & drop pronom ↔ forme
  | 'potion-magique' // Complétion — glisser le bon mot dans la phrase
  | 'tri-sorcier' // Distinction être vs avoir — trier dans deux chapeaux
  | 'grimoire'; // Production guidée — sélectionner la bonne forme

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
