export const PRONOUNS = ['je', 'tu', 'il/elle/on', 'nous', 'vous', 'ils/elles'] as const;
export type Pronoun = (typeof PRONOUNS)[number];

export type VerbId =
  | 'etre'
  | 'avoir'
  // 1er groupe (-er)
  | 'jouer'
  | 'manger'
  | 'chanter'
  | 'regarder'
  // 3ème groupe — irréguliers fréquents
  | 'aller'
  | 'faire'
  | 'dire'
  | 'venir'
  // 3ème groupe — modaux / fréquents
  | 'pouvoir'
  | 'voir'
  | 'vouloir'
  | 'prendre';

export const TENSES = ['present', 'futur', 'imparfait', 'passe_compose'] as const;
export type Tense = (typeof TENSES)[number];

export interface ConjugatedForm {
  pronoun: Pronoun;
  form: string;
}

export interface VerbConjugation {
  id: VerbId;
  infinitive: string;
  tense: Tense;
  forms: ConjugatedForm[];
}

export type Gender = 'masculine' | 'feminine';
export type GrammaticalNumber = 'singular' | 'plural';

export type VocabularyTheme = 'ecole' | 'maison' | 'animaux' | 'jeux' | 'nature' | 'corps' | 'nourriture';

export interface Noun {
  id: string;
  singular: string;
  plural: string;
  gender: Gender;
  theme: VocabularyTheme;
}

export interface Adjective {
  id: string;
  /** Antéposé (petit, grand) vs postposé (rouge, bleu) */
  preposed: boolean;
  forms: {
    /** Masculin singulier */
    ms: string;
    /** Masculin pluriel */
    mp: string;
    /** Féminin singulier */
    fs: string;
    /** Féminin pluriel */
    fp: string;
  };
}

export type DeterminerKind = 'definite' | 'indefinite' | 'possessive';

export interface Determiner {
  id: string;
  kind: DeterminerKind;
  forms: {
    /** Masculin singulier (le, un, mon) */
    ms: string;
    /** Féminin singulier (la, une, ma) */
    fs: string;
    /** Masculin pluriel (les, des, mes) */
    mp: string;
    /** Féminin pluriel (les, des, mes) */
    fp: string;
  };
  /** Forme élidée devant voyelle/h muet (l' pour le/la) */
  elidedForm?: string;
}

export type GapTarget = 'verb' | 'determiner' | 'adjective' | 'noun';

export type MiniGameType =
  | 'attrape-mots'
  | 'pont-magique'
  | 'potion-magique'
  | 'tri-sorcier'
  | 'grimoire'
  | 'pont-accords';

export type GamePhase = 'discovery' | 'challenge' | 'response' | 'resolution';

export type AnswerResult = 'correct' | 'incorrect';

export interface Exercise {
  id: string;
  miniGame: MiniGameType;
  verbId: VerbId;
  sentence: string;
  correctAnswer: string;
  choices: string[];
  pronoun: Pronoun;
}

export type PlumiState = 'idle' | 'challenge' | 'celebration' | 'encouragement';

export type StepMechanic = 'tri-sorcier' | 'grimoire' | 'potion' | 'pont-accords' | 'potion-gn';

/**
 * Display names for mini-game mechanics (educational terminology)
 */
export const MECHANIC_DISPLAY_NAMES: Record<StepMechanic, string> = {
  'tri-sorcier': 'Trier les Verbes',
  'grimoire': 'Choisir la Bonne Forme',
  'potion': 'Compléter la Phrase',
  'pont-accords': 'Le Pont des Accords',
  'potion-gn': 'Les Groupes Nominaux',
};

export interface ChapterStep {
  mechanic: StepMechanic;
  pronouns?: Pronoun[];
  verbs?: VerbId[];
  questionCount: number;
  isBoss?: boolean;
}

export interface Chapter {
  id: number;
  title: string;
  /** Phrase d'intro vocalisée par Plumi */
  narrative: string;
  verbs: VerbId[];
  tense: Tense | 'mixed';
  steps: ChapterStep[];
}

export type BiomeId =
  | 'home'
  | 'jardin'
  | 'fondations'
  | 'clairiere'
  | 'futur'
  | 'brumes'
  | 'flux'
  | 'atelier'
  | 'bibliotheque'
  | 'arcanes'
  | 'symphonie';

export interface Book {
  id: number;
  title: string;
  subtitle: string;
  tenses: Tense[];
  chapters: number[];
  color: 'sky' | 'meadow' | 'gold' | 'coral' | 'moss' | 'dawn';
  biome: BiomeId;
  isBonus?: boolean;
}

export type RewardType = 'star' | 'badge' | 'world-element' | 'companion' | 'cosmetic';

export interface Reward {
  type: RewardType;
  id: string;
  label: string;
}
