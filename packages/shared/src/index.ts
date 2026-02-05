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
  StepMechanic,
  ChapterStep,
  Chapter,
  Book,
  RewardType,
  Reward,
  // GN
  Gender,
  GrammaticalNumber,
  VocabularyTheme,
  Noun,
  Adjective,
  Determiner,
  DeterminerKind,
  GapTarget,
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

// Vocabulaire (GN)
export {
  NOUNS,
  ADJECTIVES,
  DETERMINERS,
  getNoun,
  getNounsByTheme,
  getNounForm,
  getAdjective,
  getAdjectiveForm,
  getDeterminer,
  getDeterminerForm,
  buildNounPhrase,
  formatGenderNumber,
} from './vocabulary.js';

// Tri du Sorcier
export type { SortingItem, SortingOptions } from './tri-sorcier.js';
export { generateSortingItems } from './tri-sorcier.js';

// Le Grimoire
export type { GrimoireItem, GrimoireOptions } from './grimoire.js';
export { generateGrimoireItems } from './grimoire.js';

// La Potion Magique
export type { PotionItem, VerbPotionItem, GnPotionItem, GnPotionOptions } from './potion.js';
export { generatePotionItems, generateGnPotionItems } from './potion.js';

// Le Pont des Accords
export type { PontAccordsItem, PontAccordsSlot, PontAccordsOptions } from './pont-accords.js';
export { generatePontAccordsItems } from './pont-accords.js';
