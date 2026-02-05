import type {
  Noun,
  Adjective,
  Determiner,
  Gender,
  GrammaticalNumber,
  VocabularyTheme,
} from './types.js';

// ═══════════════════════════════════════════════════════════════════════════
// NOMS — ~55 noms répartis sur 7 thèmes CE1
// ═══════════════════════════════════════════════════════════════════════════

export const NOUNS: Noun[] = [
  // --- ANIMAUX ---
  { id: 'chat', singular: 'chat', plural: 'chats', gender: 'masculine', theme: 'animaux' },
  { id: 'chien', singular: 'chien', plural: 'chiens', gender: 'masculine', theme: 'animaux' },
  { id: 'oiseau', singular: 'oiseau', plural: 'oiseaux', gender: 'masculine', theme: 'animaux' },
  { id: 'poisson', singular: 'poisson', plural: 'poissons', gender: 'masculine', theme: 'animaux' },
  { id: 'souris', singular: 'souris', plural: 'souris', gender: 'feminine', theme: 'animaux' },
  { id: 'lapin', singular: 'lapin', plural: 'lapins', gender: 'masculine', theme: 'animaux' },
  { id: 'tortue', singular: 'tortue', plural: 'tortues', gender: 'feminine', theme: 'animaux' },
  { id: 'papillon', singular: 'papillon', plural: 'papillons', gender: 'masculine', theme: 'animaux' },

  // --- ÉCOLE ---
  { id: 'crayon', singular: 'crayon', plural: 'crayons', gender: 'masculine', theme: 'ecole' },
  { id: 'cahier', singular: 'cahier', plural: 'cahiers', gender: 'masculine', theme: 'ecole' },
  { id: 'table', singular: 'table', plural: 'tables', gender: 'feminine', theme: 'ecole' },
  { id: 'chaise', singular: 'chaise', plural: 'chaises', gender: 'feminine', theme: 'ecole' },
  { id: 'livre', singular: 'livre', plural: 'livres', gender: 'masculine', theme: 'ecole' },
  { id: 'cartable', singular: 'cartable', plural: 'cartables', gender: 'masculine', theme: 'ecole' },
  { id: 'regle', singular: 'règle', plural: 'règles', gender: 'feminine', theme: 'ecole' },
  { id: 'gomme', singular: 'gomme', plural: 'gommes', gender: 'feminine', theme: 'ecole' },

  // --- MAISON ---
  { id: 'maison', singular: 'maison', plural: 'maisons', gender: 'feminine', theme: 'maison' },
  { id: 'chambre', singular: 'chambre', plural: 'chambres', gender: 'feminine', theme: 'maison' },
  { id: 'cuisine', singular: 'cuisine', plural: 'cuisines', gender: 'feminine', theme: 'maison' },
  { id: 'jardin', singular: 'jardin', plural: 'jardins', gender: 'masculine', theme: 'maison' },
  { id: 'porte', singular: 'porte', plural: 'portes', gender: 'feminine', theme: 'maison' },
  { id: 'fenetre', singular: 'fenêtre', plural: 'fenêtres', gender: 'feminine', theme: 'maison' },
  { id: 'lit', singular: 'lit', plural: 'lits', gender: 'masculine', theme: 'maison' },
  { id: 'lampe', singular: 'lampe', plural: 'lampes', gender: 'feminine', theme: 'maison' },

  // --- JEUX ---
  { id: 'ballon', singular: 'ballon', plural: 'ballons', gender: 'masculine', theme: 'jeux' },
  { id: 'poupee', singular: 'poupée', plural: 'poupées', gender: 'feminine', theme: 'jeux' },
  { id: 'velo', singular: 'vélo', plural: 'vélos', gender: 'masculine', theme: 'jeux' },
  { id: 'balancoire', singular: 'balançoire', plural: 'balançoires', gender: 'feminine', theme: 'jeux' },
  { id: 'toboggan', singular: 'toboggan', plural: 'toboggans', gender: 'masculine', theme: 'jeux' },
  { id: 'bille', singular: 'bille', plural: 'billes', gender: 'feminine', theme: 'jeux' },
  { id: 'puzzle', singular: 'puzzle', plural: 'puzzles', gender: 'masculine', theme: 'jeux' },

  // --- NATURE ---
  { id: 'arbre', singular: 'arbre', plural: 'arbres', gender: 'masculine', theme: 'nature' },
  { id: 'fleur', singular: 'fleur', plural: 'fleurs', gender: 'feminine', theme: 'nature' },
  { id: 'soleil', singular: 'soleil', plural: 'soleils', gender: 'masculine', theme: 'nature' },
  { id: 'lune', singular: 'lune', plural: 'lunes', gender: 'feminine', theme: 'nature' },
  { id: 'etoile', singular: 'étoile', plural: 'étoiles', gender: 'feminine', theme: 'nature' },
  { id: 'riviere', singular: 'rivière', plural: 'rivières', gender: 'feminine', theme: 'nature' },
  { id: 'montagne', singular: 'montagne', plural: 'montagnes', gender: 'feminine', theme: 'nature' },
  { id: 'foret', singular: 'forêt', plural: 'forêts', gender: 'feminine', theme: 'nature' },

  // --- CORPS ---
  { id: 'main', singular: 'main', plural: 'mains', gender: 'feminine', theme: 'corps' },
  { id: 'pied', singular: 'pied', plural: 'pieds', gender: 'masculine', theme: 'corps' },
  { id: 'tete', singular: 'tête', plural: 'têtes', gender: 'feminine', theme: 'corps' },
  { id: 'bras', singular: 'bras', plural: 'bras', gender: 'masculine', theme: 'corps' },
  { id: 'jambe', singular: 'jambe', plural: 'jambes', gender: 'feminine', theme: 'corps' },
  { id: 'oeil', singular: 'œil', plural: 'yeux', gender: 'masculine', theme: 'corps' },
  { id: 'bouche', singular: 'bouche', plural: 'bouches', gender: 'feminine', theme: 'corps' },

  // --- NOURRITURE ---
  { id: 'pomme', singular: 'pomme', plural: 'pommes', gender: 'feminine', theme: 'nourriture' },
  { id: 'gateau', singular: 'gâteau', plural: 'gâteaux', gender: 'masculine', theme: 'nourriture' },
  { id: 'pain', singular: 'pain', plural: 'pains', gender: 'masculine', theme: 'nourriture' },
  { id: 'bonbon', singular: 'bonbon', plural: 'bonbons', gender: 'masculine', theme: 'nourriture' },
  { id: 'fromage', singular: 'fromage', plural: 'fromages', gender: 'masculine', theme: 'nourriture' },
  { id: 'salade', singular: 'salade', plural: 'salades', gender: 'feminine', theme: 'nourriture' },
  { id: 'banane', singular: 'banane', plural: 'bananes', gender: 'feminine', theme: 'nourriture' },
  { id: 'cerise', singular: 'cerise', plural: 'cerises', gender: 'feminine', theme: 'nourriture' },
];

// ═══════════════════════════════════════════════════════════════════════════
// ADJECTIFS — ~30 adjectifs courants CE1
// Antéposés (preposed=true) : petit, grand, joli, beau, bon, mauvais,
//   nouveau, gros, long, haut, vieux
// Postposés (preposed=false) : couleurs, états, qualités physiques
// ═══════════════════════════════════════════════════════════════════════════

export const ADJECTIVES: Adjective[] = [
  // --- Antéposés ---
  { id: 'petit', preposed: true, forms: { ms: 'petit', mp: 'petits', fs: 'petite', fp: 'petites' } },
  { id: 'grand', preposed: true, forms: { ms: 'grand', mp: 'grands', fs: 'grande', fp: 'grandes' } },
  { id: 'joli', preposed: true, forms: { ms: 'joli', mp: 'jolis', fs: 'jolie', fp: 'jolies' } },
  { id: 'beau', preposed: true, forms: { ms: 'beau', mp: 'beaux', fs: 'belle', fp: 'belles' } },
  { id: 'bon', preposed: true, forms: { ms: 'bon', mp: 'bons', fs: 'bonne', fp: 'bonnes' } },
  { id: 'mauvais', preposed: true, forms: { ms: 'mauvais', mp: 'mauvais', fs: 'mauvaise', fp: 'mauvaises' } },
  { id: 'nouveau', preposed: true, forms: { ms: 'nouveau', mp: 'nouveaux', fs: 'nouvelle', fp: 'nouvelles' } },
  { id: 'gros', preposed: true, forms: { ms: 'gros', mp: 'gros', fs: 'grosse', fp: 'grosses' } },
  { id: 'long', preposed: true, forms: { ms: 'long', mp: 'longs', fs: 'longue', fp: 'longues' } },
  { id: 'haut', preposed: true, forms: { ms: 'haut', mp: 'hauts', fs: 'haute', fp: 'hautes' } },
  { id: 'vieux', preposed: true, forms: { ms: 'vieux', mp: 'vieux', fs: 'vieille', fp: 'vieilles' } },

  // --- Postposés ---
  { id: 'rouge', preposed: false, forms: { ms: 'rouge', mp: 'rouges', fs: 'rouge', fp: 'rouges' } },
  { id: 'bleu', preposed: false, forms: { ms: 'bleu', mp: 'bleus', fs: 'bleue', fp: 'bleues' } },
  { id: 'vert', preposed: false, forms: { ms: 'vert', mp: 'verts', fs: 'verte', fp: 'vertes' } },
  { id: 'jaune', preposed: false, forms: { ms: 'jaune', mp: 'jaunes', fs: 'jaune', fp: 'jaunes' } },
  { id: 'noir', preposed: false, forms: { ms: 'noir', mp: 'noirs', fs: 'noire', fp: 'noires' } },
  { id: 'blanc', preposed: false, forms: { ms: 'blanc', mp: 'blancs', fs: 'blanche', fp: 'blanches' } },
  { id: 'content', preposed: false, forms: { ms: 'content', mp: 'contents', fs: 'contente', fp: 'contentes' } },
  { id: 'triste', preposed: false, forms: { ms: 'triste', mp: 'tristes', fs: 'triste', fp: 'tristes' } },
  { id: 'fort', preposed: false, forms: { ms: 'fort', mp: 'forts', fs: 'forte', fp: 'fortes' } },
  { id: 'rapide', preposed: false, forms: { ms: 'rapide', mp: 'rapides', fs: 'rapide', fp: 'rapides' } },
  { id: 'lent', preposed: false, forms: { ms: 'lent', mp: 'lents', fs: 'lente', fp: 'lentes' } },
  { id: 'doux', preposed: false, forms: { ms: 'doux', mp: 'doux', fs: 'douce', fp: 'douces' } },
  { id: 'rond', preposed: false, forms: { ms: 'rond', mp: 'ronds', fs: 'ronde', fp: 'rondes' } },
  { id: 'lourd', preposed: false, forms: { ms: 'lourd', mp: 'lourds', fs: 'lourde', fp: 'lourdes' } },
  { id: 'leger', preposed: false, forms: { ms: 'léger', mp: 'légers', fs: 'légère', fp: 'légères' } },
  { id: 'propre', preposed: false, forms: { ms: 'propre', mp: 'propres', fs: 'propre', fp: 'propres' } },
  { id: 'sale', preposed: false, forms: { ms: 'sale', mp: 'sales', fs: 'sale', fp: 'sales' } },
  { id: 'chaud', preposed: false, forms: { ms: 'chaud', mp: 'chauds', fs: 'chaude', fp: 'chaudes' } },
  { id: 'froid', preposed: false, forms: { ms: 'froid', mp: 'froids', fs: 'froide', fp: 'froides' } },
];

// ═══════════════════════════════════════════════════════════════════════════
// DÉTERMINANTS — articles définis, indéfinis, possessifs
// ═══════════════════════════════════════════════════════════════════════════

export const DETERMINERS: Determiner[] = [
  {
    id: 'le',
    kind: 'definite',
    forms: { ms: 'le', fs: 'la', mp: 'les', fp: 'les' },
    elidedForm: "l'",
  },
  {
    id: 'un',
    kind: 'indefinite',
    forms: { ms: 'un', fs: 'une', mp: 'des', fp: 'des' },
  },
  {
    id: 'mon',
    kind: 'possessive',
    forms: { ms: 'mon', fs: 'ma', mp: 'mes', fp: 'mes' },
  },
  {
    id: 'ton',
    kind: 'possessive',
    forms: { ms: 'ton', fs: 'ta', mp: 'tes', fp: 'tes' },
  },
  {
    id: 'son',
    kind: 'possessive',
    forms: { ms: 'son', fs: 'sa', mp: 'ses', fp: 'ses' },
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// FONCTIONS D'ACCÈS
// ═══════════════════════════════════════════════════════════════════════════

const VOWELS = new Set(['a', 'e', 'é', 'è', 'ê', 'ë', 'i', 'î', 'ï', 'o', 'ô', 'u', 'û', 'ü', 'â', 'y', 'œ']);

function startsWithVowel(word: string): boolean {
  const first = word.charAt(0).toLowerCase();
  return VOWELS.has(first) || first === 'h';
}

export function getNoun(id: string): Noun | undefined {
  return NOUNS.find((n) => n.id === id);
}

export function getNounsByTheme(theme: VocabularyTheme): Noun[] {
  return NOUNS.filter((n) => n.theme === theme);
}

export function getNounForm(noun: Noun, number: GrammaticalNumber): string {
  return number === 'singular' ? noun.singular : noun.plural;
}

export function getAdjective(id: string): Adjective | undefined {
  return ADJECTIVES.find((a) => a.id === id);
}

/** Récupère la forme fléchie d'un adjectif selon genre et nombre */
export function getAdjectiveForm(
  adj: Adjective,
  gender: Gender,
  number: GrammaticalNumber,
): string {
  const key = `${gender === 'masculine' ? 'm' : 'f'}${number === 'singular' ? 's' : 'p'}` as keyof Adjective['forms'];
  return adj.forms[key];
}

export function getDeterminer(id: string): Determiner | undefined {
  return DETERMINERS.find((d) => d.id === id);
}

/**
 * Récupère la forme correcte du déterminant selon genre, nombre et mot suivant.
 * Gère l'élision : le/la → l' devant voyelle, ma/ta/sa → mon/ton/son devant voyelle féminin.
 */
export function getDeterminerForm(
  det: Determiner,
  gender: Gender,
  number: GrammaticalNumber,
  nextWord: string,
): string {
  // Pluriel : pas d'élision
  if (number === 'plural') {
    return gender === 'masculine' ? det.forms.mp : det.forms.fp;
  }

  // Singulier devant voyelle/h muet
  if (startsWithVowel(nextWord)) {
    // Articles définis : le/la → l'
    if (det.elidedForm) {
      return det.elidedForm;
    }
    // Possessifs féminin : ma → mon, ta → ton, sa → son devant voyelle
    if (det.kind === 'possessive' && gender === 'feminine') {
      return det.forms.ms;
    }
  }

  return gender === 'masculine' ? det.forms.ms : det.forms.fs;
}

/**
 * Construit un groupe nominal complet : déterminant + (adj antéposé) + nom + (adj postposé).
 * Gère l'élision du déterminant devant le premier mot du GN.
 */
export function buildNounPhrase(
  determinerId: string,
  adjectiveId: string,
  nounId: string,
  number: GrammaticalNumber,
): string {
  const noun = getNoun(nounId);
  const adj = getAdjective(adjectiveId);
  const det = getDeterminer(determinerId);
  if (!noun || !adj || !det) return '';

  const nounForm = getNounForm(noun, number);
  const adjForm = getAdjectiveForm(adj, noun.gender, number);

  // Ordre des mots selon position de l'adjectif
  // Antéposé : dét + adj + nom — Postposé : dét + nom + adj
  const firstWordAfterDet = adj.preposed ? adjForm : nounForm;
  const detForm = getDeterminerForm(det, noun.gender, number, firstWordAfterDet);

  if (adj.preposed) {
    return `${detForm}${detForm.endsWith("'") ? '' : ' '}${adjForm} ${nounForm}`;
  }
  return `${detForm}${detForm.endsWith("'") ? '' : ' '}${nounForm} ${adjForm}`;
}

/**
 * Génère l'indice de genre et nombre pour l'enfant.
 * Ex: "masculin singulier", "féminin pluriel"
 */
export function formatGenderNumber(gender: Gender, number: GrammaticalNumber): string {
  const g = gender === 'masculine' ? 'masculin' : 'féminin';
  const n = number === 'singular' ? 'singulier' : 'pluriel';
  return `${g} ${n}`;
}
