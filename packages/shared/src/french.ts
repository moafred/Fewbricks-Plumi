const VOWELS = new Set(['a', 'e', 'é', 'è', 'ê', 'ë', 'i', 'î', 'ï', 'o', 'ô', 'u', 'û', 'ü', 'â', 'y']);

/** Pronoms sujets qui s'élident devant voyelle/h muet : je → j' */
const ELISION: Record<string, string> = {
  je: "j'",
};

/**
 * Applique l'élision française entre un pronom et une forme verbale.
 * Ex: elide('je', 'ai') → "j'ai"
 *     elide('je', 'suis') → "je suis"
 */
export function elide(pronoun: string, form: string): string {
  const firstChar = form.charAt(0).toLowerCase();
  const elidedPronoun = ELISION[pronoun.toLowerCase()];

  if (elidedPronoun && (VOWELS.has(firstChar) || firstChar === 'h')) {
    return `${elidedPronoun}${form}`;
  }

  return `${pronoun} ${form}`;
}
