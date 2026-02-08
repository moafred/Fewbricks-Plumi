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
  // 2ème groupe (-ir)
  | 'finir'
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
  | 'pont-accents'
  | 'encrier-verbes'
  | 'tri-verbes'
  | 'ardoise'
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

export type Subject = 'francais' | 'maths';

export type MathOperation = 'addition' | 'subtraction' | 'multiplication';

export type ReperageTarget = 'verb' | 'subject' | 'adjective';

export type StepMechanic =
  // Français — conjugaison
  | 'tri-verbes' | 'ardoise' | 'encrier' | 'pont-accords' | 'encrier-gn'
  // Français — grammaire
  | 'tri-phrases' | 'ponctuation' | 'reperage'
  // Maths — réutilisées
  | 'tri-nombres' | 'ardoise-calcul' | 'encrier-calcul'
  // Maths — spécifiques
  | 'droite-numerique' | 'tour-de-blocs' | 'partage' | 'horloge' | 'marche';

/**
 * Display names for mini-game mechanics (educational terminology)
 */
export const MECHANIC_DISPLAY_NAMES: Record<StepMechanic, string> = {
  // Français — conjugaison
  'tri-verbes': 'Trier les Verbes',
  'ardoise': 'Choisir la Bonne Forme',
  'encrier': 'Compléter la Phrase',
  'pont-accords': 'Le Pont des Accords',
  'encrier-gn': 'Les Groupes Nominaux',
  // Français — grammaire
  'tri-phrases': 'Phrase ou pas phrase ?',
  'ponctuation': 'Le Bon Signe',
  'reperage': 'Trouve le mot !',
  // Maths — réutilisées
  'tri-nombres': 'Trier les Nombres',
  'ardoise-calcul': 'Le Bon Résultat',
  'encrier-calcul': 'Compléter le Calcul',
  // Maths — spécifiques
  'droite-numerique': 'La Droite des Nombres',
  'tour-de-blocs': 'La Tour de Blocs',
  'partage': 'Le Partage',
  'horloge': "L'Horloge",
  'marche': 'Le Marché',
};

export interface ChapterStep {
  mechanic: StepMechanic;
  questionCount: number;
  isBoss?: boolean;
  // Français
  pronouns?: Pronoun[];
  verbs?: VerbId[];
  // Maths
  numberRange?: [number, number];
  operations?: MathOperation[];
  /** Catégories pour tri-nombres (ex: ['pair', 'impair']) */
  categories?: string[];
  fractionDenominators?: number[];
  /** Cible pour le repérage (verbe, sujet, adjectif) */
  target?: ReperageTarget;
}

export interface Chapter {
  id: number;
  subject?: Subject;
  title: string;
  /** Phrase d'intro vocalisée par Plumi */
  narrative: string;
  verbs?: VerbId[];
  tense?: Tense | 'mixed';
  steps: ChapterStep[];
}

export type ThemeId =
  // Français
  | 'jardin'
  | 'fondations'
  | 'clairiere'
  | 'futur'
  | 'brumes'
  | 'flux'
  | 'atelier'
  | 'bibliotheque'
  | 'arcanes'
  | 'symphonie'
  | 'verger'
  | 'ecole'
  | 'galerie'
  | 'observatoire'
  // Maths
  | 'nombres'
  | 'additions'
  | 'soustractions'
  | 'multiplications'
  | 'mesures'
  | 'fractions'
  | 'geometrie'
  | 'revision-maths';

export interface Book {
  id: number;
  subject?: Subject;
  title: string;
  subtitle: string;
  tenses?: Tense[];
  chapters: number[];
  color: 'sky' | 'meadow' | 'gold' | 'coral' | 'moss' | 'dawn';
  theme: ThemeId;
  isBonus?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// LEÇONS DE LIVRE
// ═══════════════════════════════════════════════════════════════════════════

export interface BookLessonExample {
  /** Phrase complète — vocabulaire CE1, 5-8 mots */
  sentence: string;
  /** Mot mis en valeur dans la phrase */
  highlight: string;
}

export interface BookLessonTip {
  /** Astuce mnémonique */
  text: string;
}

export interface BookLessonSection {
  title: string;
  /** Pour générer le tableau de conjugaison dynamiquement */
  verbId?: VerbId;
  /** Temps du tableau */
  tense?: Tense;
  /** Phrases d'exemple */
  examples: BookLessonExample[];
  /** Astuce optionnelle */
  tip?: BookLessonTip;
}

export interface BookLesson {
  bookId: number;
  /** Titre affiché en haut de l'écran leçon */
  title: string;
  /** Texte d'intro Plumi — 2-3 phrases courtes, vocabulaire CE1 */
  introduction: string;
  sections: BookLessonSection[];
}

export type RewardType = 'star' | 'badge' | 'world-element' | 'companion' | 'cosmetic';

export interface Reward {
  type: RewardType;
  id: string;
  label: string;
}
