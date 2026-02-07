import type { VerbId, Pronoun, Tense, GapTarget, Gender, GrammaticalNumber, VocabularyTheme } from './types.js';
import { getConjugatedForm, getAllFormsForTense, getInfinitive, getConjugationsForTense } from './conjugations.js';
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
// TEMPLATES CONJUGAISON — Indexés par VerbId → Pronoun → string[]
// Vocabulaire CE1 : phrases courtes (5-8 mots), contextes familiers
// ═══════════════════════════════════════════════════════════════════════════

type TemplateIndex = Partial<Record<VerbId, Partial<Record<Pronoun, string[]>>>>;

const TEMPLATE_INDEX: TemplateIndex = {
  // ─── ÊTRE ──────────────────────────────────────────────────────────────────
  etre: {
    'je': ['Je %GAP% content.', 'Je %GAP% en classe.', 'Je %GAP% prêt.'],
    'tu': ['Tu %GAP% mon ami.', 'Tu %GAP% rapide.', 'Tu %GAP% en forme.'],
    'il/elle/on': ['Elle %GAP% grande.', 'Il %GAP% gentil.', 'On %GAP% en vacances.'],
    'nous': ['Nous %GAP% en classe.', 'Nous %GAP% amis.', 'Nous %GAP% contents.'],
    'vous': ['Vous %GAP% gentils.', 'Vous %GAP% prêts.', 'Vous %GAP% en retard.'],
    'ils/elles': ['Ils %GAP% au parc.', 'Elles %GAP% sages.', 'Ils %GAP% grands.'],
  },

  // ─── AVOIR ─────────────────────────────────────────────────────────────────
  avoir: {
    'je': ["J'%GAP% faim.", "J'%GAP% un chien.", "J'%GAP% sept ans."],
    'tu': ['Tu %GAP% un chat.', 'Tu %GAP% raison.', 'Tu %GAP% de la chance.'],
    'il/elle/on': ['Il %GAP% froid.', 'Elle %GAP% un frère.', 'On %GAP% le temps.'],
    'nous': ['Nous %GAP% des livres.', 'Nous %GAP% un jardin.', 'Nous %GAP% soif.'],
    'vous': ['Vous %GAP% raison.', 'Vous %GAP% du courage.', 'Vous %GAP% un ballon.'],
    'ils/elles': ['Elles %GAP% peur.', 'Ils %GAP% faim.', 'Elles %GAP% des amis.'],
  },

  // ─── JOUER ─────────────────────────────────────────────────────────────────
  jouer: {
    'je': ['Je %GAP% dans le jardin.', 'Je %GAP% avec mon ami.', 'Je %GAP% au ballon.'],
    'tu': ['Tu %GAP% à la marelle.', 'Tu %GAP% dehors.', 'Tu %GAP% avec nous.'],
    'il/elle/on': ['Elle %GAP% à la poupée.', 'Il %GAP% au foot.', 'On %GAP% ensemble.'],
    'nous': ['Nous %GAP% dans la cour.', 'Nous %GAP% aux cartes.', 'Nous %GAP% après l\'école.'],
    'vous': ['Vous %GAP% à cache-cache.', 'Vous %GAP% au parc.'],
    'ils/elles': ['Ils %GAP% aux billes.', 'Elles %GAP% ensemble.', 'Ils %GAP% dans le sable.'],
  },

  // ─── MANGER ────────────────────────────────────────────────────────────────
  manger: {
    'je': ['Je %GAP% une pomme.', 'Je %GAP% à la cantine.', 'Je %GAP% du pain.'],
    'tu': ['Tu %GAP% ton goûter.', 'Tu %GAP% une banane.', 'Tu %GAP% bien.'],
    'il/elle/on': ['Elle %GAP% un gâteau.', 'Il %GAP% des fruits.', 'On %GAP% à midi.'],
    'nous': ['Nous %GAP% ensemble.', 'Nous %GAP% de la soupe.', 'Nous %GAP% à table.'],
    'vous': ['Vous %GAP% des légumes.', 'Vous %GAP% à la maison.'],
    'ils/elles': ['Ils %GAP% du chocolat.', 'Elles %GAP% des fraises.', 'Ils %GAP% le dessert.'],
  },

  // ─── CHANTER ───────────────────────────────────────────────────────────────
  chanter: {
    'je': ['Je %GAP% une chanson.', 'Je %GAP% sous la pluie.', 'Je %GAP% bien.'],
    'tu': ['Tu %GAP% très fort.', 'Tu %GAP% en classe.', 'Tu %GAP% juste.'],
    'il/elle/on': ['Elle %GAP% au concert.', 'Il %GAP% une comptine.', 'On %GAP% ensemble.'],
    'nous': ['Nous %GAP% en choeur.', 'Nous %GAP% pour la fête.'],
    'vous': ['Vous %GAP% très bien.', 'Vous %GAP% une berceuse.'],
    'ils/elles': ['Ils %GAP% dans la cour.', 'Elles %GAP% avec joie.'],
  },

  // ─── REGARDER ──────────────────────────────────────────────────────────────
  regarder: {
    'je': ['Je %GAP% un dessin animé.', 'Je %GAP% les étoiles.', 'Je %GAP% par la fenêtre.'],
    'tu': ['Tu %GAP% le ciel.', 'Tu %GAP% un livre.', 'Tu %GAP% les oiseaux.'],
    'il/elle/on': ['Elle %GAP% la télé.', 'Il %GAP% les nuages.', 'On %GAP% le spectacle.'],
    'nous': ['Nous %GAP% un film.', 'Nous %GAP% les animaux.'],
    'vous': ['Vous %GAP% les fleurs.', 'Vous %GAP% la mer.'],
    'ils/elles': ['Ils %GAP% les poissons.', 'Elles %GAP% le coucher de soleil.'],
  },

  // ─── ALLER ─────────────────────────────────────────────────────────────────
  aller: {
    'je': ['Je %GAP% à l\'école.', 'Je %GAP% au parc.', 'Je %GAP% chez mamie.'],
    'tu': ['Tu %GAP% au marché.', 'Tu %GAP% à la piscine.', 'Tu %GAP% bien.'],
    'il/elle/on': ['Elle %GAP% à l\'école.', 'Il %GAP% au parc.', 'On %GAP% chez mamie.'],
    'nous': ['Nous %GAP% à la plage.', 'Nous %GAP% en forêt.', 'Nous %GAP% au cinéma.'],
    'vous': ['Vous %GAP% à la bibliothèque.', 'Vous %GAP% au zoo.'],
    'ils/elles': ['Ils %GAP% en vacances.', 'Elles %GAP% au jardin.', 'Ils %GAP% à la fête.'],
  },

  // ─── FAIRE ─────────────────────────────────────────────────────────────────
  faire: {
    'je': ['Je %GAP% un dessin.', 'Je %GAP% mes devoirs.', 'Je %GAP% du vélo.'],
    'tu': ['Tu %GAP% un gâteau.', 'Tu %GAP% du sport.', 'Tu %GAP% la cuisine.'],
    'il/elle/on': ['Elle %GAP% du coloriage.', 'Il %GAP% un puzzle.', 'On %GAP% la fête.'],
    'nous': ['Nous %GAP% un gâteau.', 'Nous %GAP% nos devoirs.', 'Nous %GAP% du dessin.'],
    'vous': ['Vous %GAP% du bricolage.', 'Vous %GAP% la vaisselle.'],
    'ils/elles': ['Ils %GAP% du sport.', 'Elles %GAP% de la musique.', 'Ils %GAP% un spectacle.'],
  },

  // ─── DIRE ──────────────────────────────────────────────────────────────────
  dire: {
    'je': ['Je %GAP% bonjour.', 'Je %GAP% merci.', 'Je %GAP% la vérité.'],
    'tu': ['Tu %GAP% un mot gentil.', 'Tu %GAP% au revoir.', 'Tu %GAP% oui.'],
    'il/elle/on': ['Elle %GAP% son nom.', 'Il %GAP% un secret.', 'On %GAP% bravo.'],
    'nous': ['Nous %GAP% une histoire.', 'Nous %GAP% les mots importants.'],
    'vous': ['Vous %GAP% la réponse.', 'Vous %GAP% bonjour.'],
    'ils/elles': ['Ils %GAP% merci.', 'Elles %GAP% au revoir.'],
  },

  // ─── VENIR ─────────────────────────────────────────────────────────────────
  venir: {
    'je': ['Je %GAP% à la maison.', 'Je %GAP% avec toi.', 'Je %GAP% de l\'école.'],
    'tu': ['Tu %GAP% chez moi.', 'Tu %GAP% au parc.', 'Tu %GAP% vite.'],
    'il/elle/on': ['Elle %GAP% en courant.', 'Il %GAP% de loin.', 'On %GAP% demain.'],
    'nous': ['Nous %GAP% en bus.', 'Nous %GAP% à la fête.'],
    'vous': ['Vous %GAP% avec nous.', 'Vous %GAP% à pied.'],
    'ils/elles': ['Ils %GAP% à vélo.', 'Elles %GAP% ce soir.'],
  },

  // ─── POUVOIR ───────────────────────────────────────────────────────────────
  pouvoir: {
    'je': ['Je %GAP% courir vite.', 'Je %GAP% lire ce mot.', 'Je %GAP% dessiner.'],
    'tu': ['Tu %GAP% m\'aider.', 'Tu %GAP% jouer dehors.', 'Tu %GAP% essayer.'],
    'il/elle/on': ['Elle %GAP% nager.', 'Il %GAP% sauter haut.', 'On %GAP% chanter.'],
    'nous': ['Nous %GAP% gagner.', 'Nous %GAP% jouer ensemble.'],
    'vous': ['Vous %GAP% entrer.', 'Vous %GAP% commencer.'],
    'ils/elles': ['Ils %GAP% voler.', 'Elles %GAP% danser.'],
  },

  // ─── VOIR ──────────────────────────────────────────────────────────────────
  voir: {
    'je': ['Je %GAP% un oiseau.', 'Je %GAP% la lune.', 'Je %GAP% mon ami.'],
    'tu': ['Tu %GAP% le chat.', 'Tu %GAP% les étoiles.', 'Tu %GAP% le tableau.'],
    'il/elle/on': ['Elle %GAP% un papillon.', 'Il %GAP% le soleil.', 'On %GAP% la mer.'],
    'nous': ['Nous %GAP% un arc-en-ciel.', 'Nous %GAP% les montagnes.'],
    'vous': ['Vous %GAP% la forêt.', 'Vous %GAP% le château.'],
    'ils/elles': ['Ils %GAP% les dauphins.', 'Elles %GAP% les fleurs.'],
  },

  // ─── VOULOIR ───────────────────────────────────────────────────────────────
  vouloir: {
    'je': ['Je %GAP% un bonbon.', 'Je %GAP% jouer.', 'Je %GAP% dormir.'],
    'tu': ['Tu %GAP% un câlin.', 'Tu %GAP% un livre.', 'Tu %GAP% sortir.'],
    'il/elle/on': ['Elle %GAP% une glace.', 'Il %GAP% un vélo.', 'On %GAP% danser.'],
    'nous': ['Nous %GAP% un chien.', 'Nous %GAP% partir.'],
    'vous': ['Vous %GAP% du gâteau.', 'Vous %GAP% rester.'],
    'ils/elles': ['Ils %GAP% des bonbons.', 'Elles %GAP% chanter.'],
  },

  // ─── PRENDRE ───────────────────────────────────────────────────────────────
  prendre: {
    'je': ['Je %GAP% mon cartable.', 'Je %GAP% un crayon.', 'Je %GAP% le bus.'],
    'tu': ['Tu %GAP% ton goûter.', 'Tu %GAP% une douche.', 'Tu %GAP% le chemin.'],
    'il/elle/on': ['Elle %GAP% son manteau.', 'Il %GAP% un livre.', 'On %GAP% le petit-déjeuner.'],
    'nous': ['Nous %GAP% le train.', 'Nous %GAP% nos affaires.'],
    'vous': ['Vous %GAP% vos cahiers.', 'Vous %GAP% la route.'],
    'ils/elles': ['Ils %GAP% leurs sacs.', 'Elles %GAP% le goûter.'],
  },
};

/** Aplatit l'index en liste de templates pour le tirage aléatoire */
interface PotionTemplate {
  verbId: VerbId;
  pronoun: Pronoun;
  template: string;
}

function flattenTemplates(
  index: TemplateIndex,
  verbFilter?: VerbId[],
  pronounFilter?: Pronoun[],
): PotionTemplate[] {
  const result: PotionTemplate[] = [];
  for (const [verbId, pronounMap] of Object.entries(index)) {
    if (verbFilter && !verbFilter.includes(verbId as VerbId)) continue;
    if (!pronounMap) continue;
    for (const [pronoun, templates] of Object.entries(pronounMap)) {
      if (pronounFilter && !pronounFilter.includes(pronoun as Pronoun)) continue;
      if (!templates) continue;
      for (const template of templates) {
        result.push({ verbId: verbId as VerbId, pronoun: pronoun as Pronoun, template });
      }
    }
  }
  return result;
}

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

/** Génère des items Potion conjugaison (trou = verbe). */
export function generatePotionItems(
  tenses: Tense[],
  count: number = 10,
  options?: { pronouns?: Pronoun[]; verbs?: VerbId[] },
): VerbPotionItem[] {
  const items: VerbPotionItem[] = [];
  const allTemplates = flattenTemplates(TEMPLATE_INDEX, options?.verbs, options?.pronouns);

  if (allTemplates.length === 0) return [];

  // Distracteurs : limités aux verbes du scope pour plus de pertinence
  const verbScope = options?.verbs;

  let attempts = 0;
  while (items.length < count && attempts < count * 10) {
    attempts++;
    const template = allTemplates[Math.floor(Math.random() * allTemplates.length)];
    const tense = tenses[Math.floor(Math.random() * tenses.length)];

    const correctForm = getConjugatedForm(template.verbId, template.pronoun, tense);
    if (!correctForm) continue;

    // Distracteurs : formes du même temps, limitées au scope de verbes si filtré
    let distractorPool: string[];
    if (verbScope) {
      distractorPool = getConjugationsForTense(tense)
        .filter((v) => verbScope.includes(v.id))
        .flatMap((v) => v.forms.map((f) => f.form))
        .filter((f) => f !== correctForm);
    } else {
      distractorPool = getAllFormsForTense(tense).filter((f) => f !== correctForm);
    }

    const choicesSet = new Set<string>();
    choicesSet.add(correctForm);

    const shuffledDistractors = shuffle([...distractorPool]);
    for (const d of shuffledDistractors) {
      if (choicesSet.size >= 4) break;
      choicesSet.add(d);
    }

    // Fallback : si pas assez de distracteurs dans le scope, élargir à tous
    if (choicesSet.size < 4) {
      const allDistractors = shuffle(getAllFormsForTense(tense).filter((f) => !choicesSet.has(f)));
      for (const d of allDistractors) {
        if (choicesSet.size >= 4) break;
        choicesSet.add(d);
      }
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
      infinitive: getInfinitive(template.verbId),
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
    const distractors = generateGnDistractors(template.gapTarget, noun, adj, number);
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

/**
 * Génère des distracteurs qui ont TOUJOURS un mauvais accord genre/nombre.
 * Approche : on construit l'ensemble des formes valides pour l'accord cible,
 * puis on prend toutes les formes possibles SAUF celles qui sont valides.
 * Cela gère les cas où une même forme couvre plusieurs accords
 * (ex: "des" = mp ET fp, "rouge" = ms ET fs).
 */
function generateGnDistractors(
  targetKind: Exclude<GapTarget, 'verb'>,
  noun: (typeof NOUNS)[number],
  adj: (typeof ADJECTIVES)[number],
  number: GrammaticalNumber,
): string[] {
  const gender = noun.gender;

  // 1. Formes valides pour l'accord cible — à exclure des distracteurs
  const validForms = new Set<string>();

  // 2. Pool de toutes les formes candidates
  const pool = new Set<string>();

  switch (targetKind) {
    case 'determiner': {
      const nounForm = getNounForm(noun, number);
      const adjForm = getAdjectiveForm(adj, gender, number);
      const nextWord = adj.preposed ? adjForm : nounForm;
      for (const d of DETERMINERS) {
        validForms.add(getDeterminerForm(d, gender, number, nextWord));
        for (const form of Object.values(d.forms)) pool.add(form);
        if (d.elidedForm) pool.add(d.elidedForm);
      }
      break;
    }
    case 'adjective': {
      for (const a of ADJECTIVES) {
        validForms.add(getAdjectiveForm(a, gender, number));
        for (const form of Object.values(a.forms)) pool.add(form);
      }
      break;
    }
    case 'noun': {
      for (const n of NOUNS) {
        if (n.gender === gender) validForms.add(getNounForm(n, number));
        pool.add(n.singular);
        pool.add(n.plural);
      }
      break;
    }
  }

  // Retirer toutes les formes valides du pool
  for (const v of validForms) pool.delete(v);

  return shuffle([...pool]);
}
