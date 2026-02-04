// Types
export type {
  Pronoun,
  VerbId,
  ConjugatedForm,
  VerbConjugation,
  MiniGameType,
  GamePhase,
  AnswerResult,
  Exercise,
  PlumiState,
  Chapter,
  RewardType,
  Reward,
} from './types.js';

// Constantes
export { PRONOUNS } from './types.js';

// Conjugaisons (SSOT)
export { CONJUGATIONS, getVerb, getConjugatedForm, getAllForms } from './conjugations.js';

// Français — élision
export { elide } from './french.js';

// Chapitres
export { CHAPTERS } from './chapters.js';

// Utilitaires
export { shuffle } from './utils.js';

// Tri du Sorcier
export type { SortingItem } from './tri-sorcier.js';
export { generateSortingItems } from './tri-sorcier.js';

// Le Grimoire
export type { GrimoireItem } from './grimoire.js';
export { generateGrimoireItems } from './grimoire.js';
