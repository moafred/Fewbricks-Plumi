import type { Pronoun, VerbId } from './types.js';
import { CONJUGATIONS } from './conjugations.js';
import { shuffle } from './utils.js';

/** Un item QCM pour le mini-jeu Le Grimoire */
export interface GrimoireItem {
  id: string;
  pronoun: Pronoun;
  verbId: VerbId;
  infinitive: string;
  correctForm: string;
  choices: string[]; // 4 choix mélangés, dont la bonne réponse
}

/**
 * Génère une liste d'items QCM pour Le Grimoire.
 * Pioche `count` formes (moitié être, moitié avoir),
 * génère 3 distracteurs par item, mélange les choix.
 */
export function generateGrimoireItems(count: number = 10): GrimoireItem[] {
  const perVerb = Math.ceil(count / 2);
  const items: GrimoireItem[] = [];

  // Collect all forms for distractor generation
  const allFormsByVerb = new Map<VerbId, string[]>();
  for (const verb of CONJUGATIONS) {
    allFormsByVerb.set(verb.id, verb.forms.map((f) => f.form));
  }

  for (const verb of CONJUGATIONS) {
    const forms = shuffle([...verb.forms]);
    const picked = forms.slice(0, perVerb);

    // Get forms from the other verb for cross-verb distractors
    const otherVerbForms = CONJUGATIONS
      .filter((v) => v.id !== verb.id)
      .flatMap((v) => v.forms.map((f) => f.form));

    for (const f of picked) {
      // Distractors: other forms of the same verb + forms of other verbs
      const sameVerbDistractors = verb.forms
        .map((vf) => vf.form)
        .filter((form) => form !== f.form);

      const allDistractors = shuffle([...sameVerbDistractors, ...otherVerbForms]);
      // Pick 3 unique distractors
      const distractors: string[] = [];
      for (const d of allDistractors) {
        if (d !== f.form && !distractors.includes(d)) {
          distractors.push(d);
        }
        if (distractors.length === 3) break;
      }

      items.push({
        id: `grimoire-${verb.id}-${f.pronoun}`,
        pronoun: f.pronoun,
        verbId: verb.id,
        infinitive: verb.infinitive,
        correctForm: f.form,
        choices: shuffle([f.form, ...distractors]),
      });
    }
  }

  return shuffle(items.slice(0, count));
}
