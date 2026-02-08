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
  ShelfId,
  Shelf,
  RewardType,
  Reward,
  ThemeId,
  Gender,
  GrammaticalNumber,
  VocabularyTheme,
  Noun,
  Adjective,
  Determiner,
  DeterminerKind,
  GapTarget,
  BookLessonExample,
  BookLessonTip,
  BookLessonSection,
  BookLesson,
  Subject,
  MathOperation,
  ReperageTarget,
} from './types.js';

export { PRONOUNS, TENSES, MECHANIC_DISPLAY_NAMES } from './types.js';

export {
  CONJUGATIONS,
  getVerb,
  getConjugation,
  getConjugatedForm,
  getAllForms,
  getAllFormsForTense,
  getConjugationsForTense,
  getInfinitive,
} from './conjugations.js';

export { elide } from './french.js';

export {
  CHAPTERS,
  BOOKS,
  ALL_BOOKS,
  ALL_CHAPTERS,
  FRENCH_SHELVES,
  ALL_SHELVES,
  getChaptersForBook,
  getChapter,
  getBookForChapter,
  getBooksForSubject,
  getShelvesForSubject,
} from './chapters.js';

export { MATH_BOOKS, MATH_CHAPTERS, MATH_SHELVES } from './math-chapters.js';

export type {
  AdditionFact,
  SubtractionFact,
  MultiplicationFact,
  MathWordTemplate,
} from './math-data.js';

export {
  ADDITION_FACTS,
  SUBTRACTION_FACTS,
  MULTIPLICATION_FACTS,
  COMPLEMENTS_10,
  COMPLEMENTS_100,
  MATH_WORD_TEMPLATES,
  isEven,
  isOdd,
  getAdditionFacts,
  getSubtractionFacts,
  getMultiplicationFacts,
  generateNumericDistractors,
} from './math-data.js';

export { shuffle } from './utils.js';

export { BOOK_LESSONS, ALL_BOOK_LESSONS, getBookLesson } from './book-lessons.js';
export { MATH_BOOK_LESSONS } from './math-book-lessons.js';

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

export type { SortingItem, SortingOptions } from './tri-verbes.js';
export { generateSortingItems } from './tri-verbes.js';

export type { ArdoiseItem, ArdoiseOptions } from './ardoise.js';
export { generateArdoiseItems } from './ardoise.js';

export type { EncrierItem, VerbEncrierItem, GnEncrierItem, GnEncrierOptions } from './encrier.js';
export { generateEncrierItems, generateGnEncrierItems } from './encrier.js';

export type { PontAccordsItem, PontAccordsSlot, PontAccordsOptions } from './pont-accords.js';
export { generatePontAccordsItems } from './pont-accords.js';

// Français — grammaire
export type {
  WordRole,
  AnnotatedWord,
  GrammarSentence,
  NotASentence,
} from './grammar-sentences.js';
export {
  GRAMMAR_SENTENCES,
  NOT_SENTENCES,
  buildSentenceText,
  getSubjectWords,
  getVerbWords,
  getAdjectiveWords,
} from './grammar-sentences.js';

export type { PhraseSortingItem, PhraseSortingOptions } from './tri-phrases.js';
export { generatePhraseSortingItems } from './tri-phrases.js';

export type { PonctuationItem } from './ponctuation.js';
export { generatePonctuationItems } from './ponctuation.js';

export type { ReperageWord, ReperageItem, ReperageOptions } from './reperage.js';
export { generateReperageItems } from './reperage.js';

// Maths — mini-jeux réutilisés
export type { MathSortingItem, MathSortingOptions } from './tri-nombres.js';
export { generateMathSortingItems } from './tri-nombres.js';

export type { ArdoiseCalculItem, ArdoiseCalculOptions } from './ardoise-calcul.js';
export { generateArdoiseCalculItems } from './ardoise-calcul.js';

export type { EncrierCalculItem, EncrierCalculOptions } from './encrier-calcul.js';
export { generateEncrierCalculItems } from './encrier-calcul.js';

// Maths — mécaniques spécifiques
export type { DroiteNumeriqueItem, DroiteNumeriqueOptions } from './droite-numerique.js';
export { generateDroiteNumeriqueItems } from './droite-numerique.js';

export type { TourDeBlocsItem, TourDeBlocsOptions } from './tour-de-blocs.js';
export { generateTourDeBlocsItems } from './tour-de-blocs.js';

export type { PartageItem, PartageOptions } from './partage.js';
export { generatePartageItems } from './partage.js';

export type { HorlogeItem, HorlogeOptions } from './horloge.js';
export { generateHorlogeItems } from './horloge.js';

export type { MarcheItem, MarcheOptions, MarcheArticle, MarcheQuestionType } from './marche.js';
export { generateMarcheItems } from './marche.js';
