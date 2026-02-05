import type { VerbId, Pronoun, Tense, GapTarget, Gender, GrammaticalNumber, VocabularyTheme } from './types.js';
import { getConjugatedForm, getAllFormsForTense } from './conjugations.js';
import {
  NOUNS,
  ADJECTIVES,
  DETERMINERS,
  getNounForm,
  getAdjectiveForm,
  getDeterminerForm,
  formatGenderNumber,
} from './vocabulary.js';
import { shuffle } from './utils.js';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES — Union discriminée par gapTarget
// ═══════════════════════════════════════════════════════════════════════════

/** Champs communs à tout item Potion */
interface PotionItemBase {
  id: string;
  /** La phrase avec le trou (ex: "Je _____ content.") */
  sentence: string;
  /** Placeholder visuel du trou */
  gap: string;
  /** La bonne réponse */
  correctForm: string;
  /** 4 choix mélangés dont la bonne réponse */
  choices: string[];
}

/** Potion conjugaison — trou sur le verbe */
export interface VerbPotionItem extends PotionItemBase {
  gapTarget: 'verb';
  verbId: VerbId;
  infinitive: string;
  pronoun: Pronoun;
  tense: Tense;
}

/** Potion GN — trou sur déterminant, adjectif ou nom */
export interface GnPotionItem extends PotionItemBase {
  gapTarget: Exclude<GapTarget, 'verb'>;
  nounId: string;
  adjectiveId: string;
  determinerId: string;
  gender: Gender;
  number: GrammaticalNumber;
  /** Indice genre/nombre (ex: "masculin singulier") */
  hint: string;
}

/** Union discriminée — le frontend peut checker gapTarget pour le rendu conditionnel */
export type PotionItem = VerbPotionItem | GnPotionItem;

// ═══════════════════════════════════════════════════════════════════════════
// TEMPLATES CONJUGAISON (inchangé)
// ═══════════════════════════════════════════════════════════════════════════

interface PotionTemplate {
  verbId: VerbId;
  pronoun: Pronoun;
  template: string;
}

const TEMPLATES: PotionTemplate[] = [
  // ÊTRE
  { verbId: 'etre', pronoun: 'je', template: 'Je %GAP% content.' },
  { verbId: 'etre', pronoun: 'tu', template: 'Tu %GAP% mon ami.' },
  { verbId: 'etre', pronoun: 'il/elle/on', template: 'Elle %GAP% grande.' },
  { verbId: 'etre', pronoun: 'nous', template: 'Nous %GAP% en classe.' },
  { verbId: 'etre', pronoun: 'vous', template: 'Vous %GAP% gentils.' },
  { verbId: 'etre', pronoun: 'ils/elles', template: 'Ils %GAP% au parc.' },

  // AVOIR
  { verbId: 'avoir', pronoun: 'je', template: "J'%GAP% faim." },
  { verbId: 'avoir', pronoun: 'tu', template: 'Tu %GAP% un chat.' },
  { verbId: 'avoir', pronoun: 'il/elle/on', template: 'Il %GAP% froid.' },
  { verbId: 'avoir', pronoun: 'nous', template: 'Nous %GAP% des livres.' },
  { verbId: 'avoir', pronoun: 'vous', template: 'Vous %GAP% raison.' },
  { verbId: 'avoir', pronoun: 'ils/elles', template: 'Elles %GAP% peur.' },
];

const GAP_DISPLAY = '_____';

function adjustElision(sentence: string, verbForm: string): string {
  if (sentence.startsWith('Je ') && /^[aeiouéèêh]/i.test(verbForm)) {
    return sentence.replace('Je ', "J'");
  }
  return sentence;
}

// ═══════════════════════════════════════════════════════════════════════════
// GÉNÉRATEUR CONJUGAISON (backward compat)
// ═══════════════════════════════════════════════════════════════════════════

/** Génère des items Potion conjugaison (trou = verbe). Rétro-compatible. */
export function generatePotionItems(tenses: Tense[], count: number = 10): VerbPotionItem[] {
  const items: VerbPotionItem[] = [];
  const allTemplates = [...TEMPLATES];

  let attempts = 0;
  while (items.length < count && attempts < count * 10) {
    attempts++;
    const template = allTemplates[Math.floor(Math.random() * allTemplates.length)];
    const tense = tenses[Math.floor(Math.random() * tenses.length)];

    const correctForm = getConjugatedForm(template.verbId, template.pronoun, tense);
    if (!correctForm) continue;

    const distractorPool = getAllFormsForTense(tense).filter((f) => f !== correctForm);

    const choicesSet = new Set<string>();
    choicesSet.add(correctForm);

    const shuffledDistractors = shuffle([...distractorPool]);
    for (const d of shuffledDistractors) {
      if (choicesSet.size >= 4) break;
      choicesSet.add(d);
    }

    if (choicesSet.size < 4) continue;

    const choices = shuffle(Array.from(choicesSet));

    let rawSentence = template.template.replace('%GAP%', GAP_DISPLAY);
    rawSentence = adjustElision(rawSentence, correctForm);

    items.push({
      id: `${template.verbId}-${tense}-${template.pronoun}-${Math.random().toString(36).substring(2, 11)}`,
      gapTarget: 'verb',
      sentence: rawSentence,
      gap: GAP_DISPLAY,
      verbId: template.verbId,
      infinitive: template.verbId === 'etre' ? 'être' : 'avoir',
      pronoun: template.pronoun,
      tense,
      correctForm,
      choices,
    });
  }

  return items;
}

// ═══════════════════════════════════════════════════════════════════════════
// TEMPLATES GN
// ═══════════════════════════════════════════════════════════════════════════

interface GnPotionTemplate {
  /** Patron de phrase avec placeholders : %DET%, %ADJ%, %NOUN% */
  template: string;
  /** Quel élément est le trou */
  gapTarget: Exclude<GapTarget, 'verb'>;
}

// Phrases à trous GN — vocabulaire adapté CE1 (5-8 mots)
const GN_TEMPLATES: GnPotionTemplate[] = [
  // Trou = déterminant
  { template: '%DET% %NOUN% est joli.', gapTarget: 'determiner' },
  { template: 'Je vois %DET% %NOUN%.', gapTarget: 'determiner' },
  { template: '%DET% %ADJ% %NOUN% dort.', gapTarget: 'determiner' },
  { template: 'Voici %DET% %ADJ% %NOUN%.', gapTarget: 'determiner' },

  // Trou = adjectif
  { template: '%DET% %ADJ% %NOUN% court.', gapTarget: 'adjective' },
  { template: 'Je mange %DET% %ADJ% %NOUN%.', gapTarget: 'adjective' },
  { template: '%DET% %NOUN% est %ADJ%.', gapTarget: 'adjective' },
  { template: 'Regarde %DET% %NOUN% %ADJ% !', gapTarget: 'adjective' },

  // Trou = nom
  { template: '%DET% %ADJ% %NOUN% est là.', gapTarget: 'noun' },
  { template: 'Je cherche %DET% %NOUN%.', gapTarget: 'noun' },
  { template: '%DET% %NOUN% %ADJ% brille.', gapTarget: 'noun' },
  { template: 'Voilà %DET% %ADJ% %NOUN% !', gapTarget: 'noun' },
];

export interface GnPotionOptions {
  themes?: VocabularyTheme[];
  targetKinds?: Exclude<GapTarget, 'verb'>[];
}

// ═══════════════════════════════════════════════════════════════════════════
// GÉNÉRATEUR GN
// ═══════════════════════════════════════════════════════════════════════════

/** Génère des items Potion GN (trou = déterminant, adjectif ou nom). */
export function generateGnPotionItems(count: number = 10, options?: GnPotionOptions): GnPotionItem[] {
  const allowedThemes = options?.themes;
  const allowedTargets = options?.targetKinds ?? ['determiner', 'adjective', 'noun'];

  const nouns = allowedThemes ? NOUNS.filter((n) => allowedThemes.includes(n.theme)) : [...NOUNS];
  const templates = GN_TEMPLATES.filter((t) => allowedTargets.includes(t.gapTarget));

  if (nouns.length === 0 || templates.length === 0) return [];

  const items: GnPotionItem[] = [];
  let attempts = 0;

  while (items.length < count && attempts < count * 10) {
    attempts++;

    const template = templates[Math.floor(Math.random() * templates.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const det = DETERMINERS[Math.floor(Math.random() * DETERMINERS.length)];
    const number: GrammaticalNumber = Math.random() < 0.5 ? 'singular' : 'plural';

    const nounForm = getNounForm(noun, number);
    const adjForm = getAdjectiveForm(adj, noun.gender, number);
    const firstWordAfterDet = adj.preposed ? adjForm : nounForm;
    const detForm = getDeterminerForm(det, noun.gender, number, firstWordAfterDet);

    // Bonne réponse selon la cible
    let correctForm: string;
    switch (template.gapTarget) {
      case 'determiner':
        correctForm = detForm;
        break;
      case 'adjective':
        correctForm = adjForm;
        break;
      case 'noun':
        correctForm = nounForm;
        break;
    }

    // Construction de la phrase
    const replacements: Record<string, string> = {
      '%DET%': detForm,
      '%ADJ%': adjForm,
      '%NOUN%': nounForm,
    };

    // Remplacer la cible par le gap, les autres par leur forme
    const gapKey = template.gapTarget === 'determiner' ? '%DET%' : template.gapTarget === 'adjective' ? '%ADJ%' : '%NOUN%';
    const sentence = template.template.replace(/%DET%|%ADJ%|%NOUN%/g, (match) =>
      match === gapKey ? GAP_DISPLAY : replacements[match] ?? match,
    );

    // Gérer l'élision dans la phrase
    const finalSentence = handleGnElision(sentence, detForm);

    // Distracteurs
    const distractors = generateGnDistractors(template.gapTarget, correctForm, noun, adj, det, number);
    if (distractors.length < 3) continue;

    const choices = shuffle([correctForm, ...distractors.slice(0, 3)]);

    items.push({
      id: `gn-${noun.id}-${adj.id}-${det.id}-${number}-${template.gapTarget}-${Math.random().toString(36).substring(2, 11)}`,
      gapTarget: template.gapTarget,
      sentence: finalSentence,
      gap: GAP_DISPLAY,
      nounId: noun.id,
      adjectiveId: adj.id,
      determinerId: det.id,
      gender: noun.gender,
      number,
      hint: formatGenderNumber(noun.gender, number),
      correctForm,
      choices,
    });
  }

  return items;
}

/** Gère les espaces doubles et l'apostrophe dans les phrases GN */
function handleGnElision(sentence: string, detForm: string): string {
  // Si le déterminant se termine par une apostrophe, coller au mot suivant
  if (detForm.endsWith("'")) {
    // Nettoyer "l' chat" → "l'chat"
    return sentence.replace(/'\s+/g, "'");
  }
  return sentence;
}

function generateGnDistractors(
  targetKind: Exclude<GapTarget, 'verb'>,
  correctForm: string,
  noun: (typeof NOUNS)[number],
  adj: (typeof ADJECTIVES)[number],
  det: (typeof DETERMINERS)[number],
  number: GrammaticalNumber,
): string[] {
  const pool = new Set<string>();

  switch (targetKind) {
    case 'determiner': {
      for (const form of Object.values(det.forms)) pool.add(form);
      if (det.elidedForm) pool.add(det.elidedForm);
      for (const d of DETERMINERS) {
        if (d.id === det.id) continue;
        const key = `${noun.gender === 'masculine' ? 'm' : 'f'}${number === 'singular' ? 's' : 'p'}` as keyof typeof d.forms;
        pool.add(d.forms[key]);
      }
      break;
    }
    case 'adjective': {
      for (const form of Object.values(adj.forms)) pool.add(form);
      for (const a of ADJECTIVES) {
        if (a.id === adj.id) continue;
        const key = `${noun.gender === 'masculine' ? 'm' : 'f'}${number === 'singular' ? 's' : 'p'}` as keyof typeof a.forms;
        pool.add(a.forms[key]);
      }
      break;
    }
    case 'noun': {
      pool.add(noun.singular);
      pool.add(noun.plural);
      const themeNouns = NOUNS.filter((n) => n.theme === noun.theme && n.id !== noun.id);
      for (const n of themeNouns) {
        pool.add(getNounForm(n, number));
      }
      break;
    }
  }

  pool.delete(correctForm);
  return shuffle([...pool]);
}
