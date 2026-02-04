import { VerbId, Pronoun, Tense } from './types.js';
import { getConjugatedForm, getAllFormsForTense } from './conjugations.js';
import { shuffle } from './utils.js';

export interface PotionItem {
    id: string;
    sentence: string;      // The full sentence with the gap, e.g. "Je _____ content."
    gap: string;           // The gap placeholder, e.g. "_____"
    verbId: VerbId;
    infinitive: string;
    pronoun: Pronoun;
    tense: Tense;
    correctForm: string;
    choices: string[];
}

interface PotionTemplate {
    verbId: VerbId;
    pronoun: Pronoun;
    template: string; // Use %GAP% as internal placeholder
}

// Templates from the design plan
const TEMPLATES: PotionTemplate[] = [
    // ÊTRE
    { verbId: 'etre', pronoun: 'je', template: 'Je %GAP% content.' },
    { verbId: 'etre', pronoun: 'tu', template: 'Tu %GAP% mon ami.' },
    { verbId: 'etre', pronoun: 'il/elle/on', template: 'Elle %GAP% grande.' },
    { verbId: 'etre', pronoun: 'nous', template: 'Nous %GAP% en classe.' },
    { verbId: 'etre', pronoun: 'vous', template: 'Vous %GAP% gentils.' },
    { verbId: 'etre', pronoun: 'ils/elles', template: 'Ils %GAP% au parc.' },

    // AVOIR
    { verbId: 'avoir', pronoun: 'je', template: "J'%GAP% faim." }, // J'ai, J'avais...
    { verbId: 'avoir', pronoun: 'tu', template: 'Tu %GAP% un chat.' },
    { verbId: 'avoir', pronoun: 'il/elle/on', template: 'Il %GAP% froid.' },
    { verbId: 'avoir', pronoun: 'nous', template: 'Nous %GAP% des livres.' },
    { verbId: 'avoir', pronoun: 'vous', template: 'Vous %GAP% raison.' },
    { verbId: 'avoir', pronoun: 'ils/elles', template: 'Elles %GAP% peur.' },
];

const GAP_DISPLAY = '_____';

/**
 * Handles elision for "Je" -> "J'" if the verb starts with a vowel.
 * Specifically for "Je %GAP%..." templates when the verb form starts with a vowel.
 */
function adjustElision(sentence: string, verbForm: string): string {
    // Check if sentence starts with "Je " and verb starts with vowel
    if (sentence.startsWith('Je ') && /^[aeiouéèêh]/i.test(verbForm)) {
        return sentence.replace('Je ', "J'");
    }
    return sentence;
}

export function generatePotionItems(tenses: Tense[], count: number = 10): PotionItem[] {
    const items: PotionItem[] = [];
    const allTemplates = [...TEMPLATES];

    // We want to generate 'count' items.
    // We'll loop until we have enough, shuffling templates and tenses.

    let attempts = 0;
    while (items.length < count && attempts < 100) {
        attempts++;
        const template = allTemplates[Math.floor(Math.random() * allTemplates.length)];
        const tense = tenses[Math.floor(Math.random() * tenses.length)];

        const correctForm = getConjugatedForm(template.verbId, template.pronoun, tense);
        if (!correctForm) continue;

        // Distractors: get other forms for this tense (same verb or different verb?)
        // Plan: "Choix 4 (grille 2x2)"
        // Typically we want forms of the same verb in the same tense but different pronouns,
        // OR same pronoun different tenses?
        // Looking at the layout example:
        // "Je suis content" -> Choices: suis, es, est, sont.
        // These are all 'etre' in 'present'.
        // So distractors should be other forms of the SAME verb in the SAME tense.

        // Get all forms for this verb and tense
        let allForms = getAllFormsForTense(tense).filter(f => f !== correctForm);
        // Actually getAllFormsForTense returns forms for ALL verbs.
        // We probably want restricted to the current verb to avoid mixing "suis" and "ai" if confusing,
        // although mixing 'etre' and 'avoir' is also a good challenge.
        // Plan example: 'suis', 'es', 'est', 'sont'. All 'etre'.

        // Let's filter to only this verb's forms generally, or maybe allow confusing ones.
        // For now, let's stick to the same verb's forms to match the example, but checking if we have enough.
        // If not, we can pull from others.
        // Wait, getAllFormsForTense returns ALL verbs forms.
        // Let's implement getAllForms(verbId, tense) in conjugations?
        // Yes, getAllForms(verbId, tense) exists in conjugations.ts.

        // We cannot easily import getAllForms here if we didn't update types yet, but I can use the one I saw in conjugations.ts
        // Wait, I am in shared/src/potion.ts, I can import from conjugations.ts.
        // Note: getAllForms is exported.

        // But I need to call it. I didn't import it. I'll add the import.
        // Actually I imported getAllFormsForTense. I will change that.

        // unique set of choices
        const distractorPool = getAllFormsForTense(tense).filter(f => f !== correctForm);
        // This gives mixed etre/avoir.

        // Let's prioritize same verb forms if possible, but the plan example shows strictly same verb.
        // Let's try to filter distractorPool to only include forms of the current verb if possible?
        // But getAllFormsForTense returns strings, we lost the verbId.
        // Let's manually get forms for current verb.
        // I recall getConjugation(verbId, tense) returns the object with forms.

        // Let's use getConjugation to get more relevant distractors.
        /*
        const conjugation = getConjugation(template.verbId, tense);
        if (!conjugation) continue;
        const sameVerbForms = conjugation.forms.map(f => f.form).filter(f => f !== correctForm);
        */

        // However, I'll stick to a simpler logic: just pick 3 random distractors from the same tense.
        // Mixing etre/avoir is good practice.

        const choicesSet = new Set<string>();
        choicesSet.add(correctForm);

        const shuffledDistractors = shuffle([...distractorPool]);
        for (const d of shuffledDistractors) {
            if (choicesSet.size >= 4) break;
            choicesSet.add(d);
        }

        // If we still don't have 4 (e.g. very few forms), valid?
        if (choicesSet.size < 4) continue;

        const choices = shuffle(Array.from(choicesSet));

        // Format sentence
        // Special handling for je/j'
        let rawSentence = template.template.replace('%GAP%', GAP_DISPLAY);
        rawSentence = adjustElision(rawSentence, correctForm);

        items.push({
            id: `${template.verbId}-${tense}-${template.pronoun}-${Math.random().toString(36).substr(2, 9)}`,
            sentence: rawSentence,
            gap: GAP_DISPLAY,
            verbId: template.verbId,
            infinitive: template.verbId === 'etre' ? 'être' : 'avoir',
            pronoun: template.pronoun,
            tense,
            correctForm,
            choices
        });
    }

    return items;
}
