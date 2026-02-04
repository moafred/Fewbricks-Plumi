// Types
export type {
  Pronoun,
  VerbId,
  Tense,
  ConjugatedForm,
  VerbConjugation,
  MiniGameType,
  GamePhase,
  AnswerResult,
  Exercise,
  PlumiState,
  Chapter,
  Book,
  RewardType,
  Reward,
} from './types.js';

// Constantes
export { PRONOUNS, TENSES } from './types.js';

// Conjugaisons (SSOT)
export {
  CONJUGATIONS,
  getVerb,
  getConjugation,
  getConjugatedForm,
  getAllForms,
  getAllFormsForTense,
  getConjugationsForTense,
} from './conjugations.js';

// Français — élision
export { elide } from './french.js';

// Chapitres et Livres
export { CHAPTERS, BOOKS } from './chapters.js';

// Utilitaires
export { shuffle } from './utils.js';

// Tri du Sorcier
export type { SortingItem, SortingOptions } from './tri-sorcier.js';
export { generateSortingItems } from './tri-sorcier.js';

// Le Grimoire
export type { GrimoireItem, GrimoireOptions } from './grimoire.js';
export { generateGrimoireItems } from './grimoire.js';

// La Potion Magique
export type { PotionItem } from './potion.js';
export { generatePotionItems } from './potion.js';
