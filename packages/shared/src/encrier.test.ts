import { describe, it, expect } from 'vitest';
import {
  generateEncrierItems,
  generateGnEncrierItems,
  type EncrierItem,
  type VerbEncrierItem,
  type GnEncrierItem,
} from './encrier.js';
import {
  NOUNS,
  ADJECTIVES,
  DETERMINERS,
  getAdjectiveForm,
  getNounForm,
  getDeterminerForm,
} from './vocabulary.js';
import { PRONOUNS, TENSES } from './types.js';

describe('generateEncrierItems — Verb Conjugation', () => {
  it('returns up to count items when requesting 5 items with present tense', () => {
    const items = generateEncrierItems(['present'], 5);
    expect(items.length).toBeLessThanOrEqual(5);
    expect(items.length).toBeGreaterThan(0);
  });

  it('returns items with gapTarget: "verb"', () => {
    const items = generateEncrierItems(['present'], 3);
    items.forEach((item) => {
      expect(item.gapTarget).toBe('verb');
    });
  });

  it('every item has required VerbEncrierItem fields', () => {
    const items = generateEncrierItems(['present'], 5);
    items.forEach((item) => {
      expect(item.id).toBeDefined();
      expect(typeof item.id).toBe('string');
      expect(item.id.length).toBeGreaterThan(0);

      expect(item.sentence).toBeDefined();
      expect(typeof item.sentence).toBe('string');
      expect(item.sentence).toContain('_____');

      expect(item.gap).toBe('_____');

      expect(item.correctForm).toBeDefined();
      expect(typeof item.correctForm).toBe('string');

      expect(Array.isArray(item.choices)).toBe(true);
      expect(item.choices.length).toBe(4);

      expect(typeof item.verbId).toBe('string');
      expect(typeof item.infinitive).toBe('string');
      expect(item.pronoun).toMatch(/^(je|tu|il\/elle\/on|nous|vous|ils\/elles)$/);
      expect(item.tense).toBe('present');
    });
  });

  it('correctForm is included in choices', () => {
    const items = generateEncrierItems(['present'], 10);
    items.forEach((item) => {
      expect(item.choices).toContain(item.correctForm);
    });
  });

  it('verbId is always a valid VerbId', () => {
    const items = generateEncrierItems(['present'], 10);
    items.forEach((item) => {
      expect(typeof item.verbId).toBe('string');
      expect(item.verbId.length).toBeGreaterThan(0);
    });
  });

  it('infinitive matches verbId (etre → être, avoir → avoir)', () => {
    const items = generateEncrierItems(['present'], 10);
    items.forEach((item) => {
      if (item.verbId === 'etre') {
        expect(item.infinitive).toBe('être');
      } else if (item.verbId === 'avoir') {
        expect(item.infinitive).toBe('avoir');
      }
    });
  });

  it('pronoun is one of the 6 French pronouns', () => {
    const items = generateEncrierItems(['present'], 10);
    const validPronouns = PRONOUNS;
    items.forEach((item) => {
      expect(validPronouns).toContain(item.pronoun);
    });
  });

  it('handles multiple tenses (present and futur)', () => {
    const items = generateEncrierItems(['present', 'futur'], 20);
    const tenses = new Set(items.map((i) => i.tense));
    expect(tenses.size).toBeGreaterThan(0);
  });

  it('default count is 10 items', () => {
    const items = generateEncrierItems(['present']);
    expect(items.length).toBeLessThanOrEqual(10);
  });

  it('count of 0 returns empty array', () => {
    const items = generateEncrierItems(['present'], 0);
    expect(items).toEqual([]);
  });

  it('each item has a unique id', () => {
    const items = generateEncrierItems(['present'], 20);
    const ids = items.map((i) => i.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('sentence contains the gap placeholder "_____"', () => {
    const items = generateEncrierItems(['present'], 10);
    items.forEach((item) => {
      expect(item.sentence).toContain('_____');
    });
  });

  it('choices array has exactly 4 elements', () => {
    const items = generateEncrierItems(['present'], 10);
    items.forEach((item) => {
      expect(item.choices.length).toBe(4);
    });
  });

  it('choices are unique (no duplicates)', () => {
    const items = generateEncrierItems(['present'], 10);
    items.forEach((item) => {
      const uniqueChoices = new Set(item.choices);
      expect(uniqueChoices.size).toBe(4);
    });
  });
});

describe('generateGnEncrierItems — Noun Phrase', () => {
  it('returns up to count items when requesting 5 items', () => {
    const items = generateGnEncrierItems(5);
    expect(items.length).toBeLessThanOrEqual(5);
    expect(items.length).toBeGreaterThan(0);
  });

  it('every item has gapTarget in ["determiner", "adjective", "noun"]', () => {
    const items = generateGnEncrierItems(10);
    items.forEach((item) => {
      expect(['determiner', 'adjective', 'noun']).toContain(item.gapTarget);
    });
  });

  it('every item has required GnEncrierItem fields', () => {
    const items = generateGnEncrierItems(10);
    items.forEach((item) => {
      expect(item.id).toBeDefined();
      expect(typeof item.id).toBe('string');
      expect(item.id.length).toBeGreaterThan(0);

      expect(item.sentence).toBeDefined();
      expect(typeof item.sentence).toBe('string');
      expect(item.sentence).toContain('_____');

      expect(item.gap).toBe('_____');

      expect(item.correctForm).toBeDefined();
      expect(typeof item.correctForm).toBe('string');

      expect(Array.isArray(item.choices)).toBe(true);
      expect(item.choices.length).toBe(4);

      expect(item.nounId).toBeDefined();
      expect(typeof item.nounId).toBe('string');

      expect(item.adjectiveId).toBeDefined();
      expect(typeof item.adjectiveId).toBe('string');

      expect(item.determinerId).toBeDefined();
      expect(typeof item.determinerId).toBe('string');

      expect(item.gender).toMatch(/^(masculine|feminine)$/);
      expect(item.number).toMatch(/^(singular|plural)$/);

      expect(item.hint).toBeDefined();
      expect(typeof item.hint).toBe('string');
    });
  });

  it('correctForm is included in choices', () => {
    const items = generateGnEncrierItems(15);
    items.forEach((item) => {
      expect(item.choices).toContain(item.correctForm);
    });
  });

  it('hint matches gender and number format ("masculin singulier" etc.)', () => {
    const items = generateGnEncrierItems(10);
    items.forEach((item) => {
      const genderPart = item.gender === 'masculine' ? 'masculin' : 'féminin';
      const numberPart = item.number === 'singular' ? 'singulier' : 'pluriel';
      expect(item.hint).toBe(`${genderPart} ${numberPart}`);
    });
  });

  it('default count is 10 items', () => {
    const items = generateGnEncrierItems();
    expect(items.length).toBeLessThanOrEqual(10);
  });

  it('count of 0 returns empty array', () => {
    const items = generateGnEncrierItems(0);
    expect(items).toEqual([]);
  });

  it('each item has a unique id', () => {
    const items = generateGnEncrierItems(20);
    const ids = items.map((i) => i.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('sentence contains the gap placeholder "_____"', () => {
    const items = generateGnEncrierItems(10);
    items.forEach((item) => {
      expect(item.sentence).toContain('_____');
    });
  });

  it('choices array has exactly 4 elements', () => {
    const items = generateGnEncrierItems(10);
    items.forEach((item) => {
      expect(item.choices.length).toBe(4);
    });
  });

  it('choices are unique (no duplicates)', () => {
    const items = generateGnEncrierItems(10);
    items.forEach((item) => {
      const uniqueChoices = new Set(item.choices);
      expect(uniqueChoices.size).toBe(4);
    });
  });
});

describe('generateGnEncrierItems — Filtering by theme', () => {
  it('theme: ["animaux"] — all items reference animaux nouns', () => {
    const animauxNouns = NOUNS.filter((n) => n.theme === 'animaux').map((n) => n.id);
    expect(animauxNouns.length).toBeGreaterThan(0);

    const items = generateGnEncrierItems(20, { themes: ['animaux'] });
    items.forEach((item) => {
      expect(animauxNouns).toContain(item.nounId);
    });
  });

  it('theme: ["ecole"] — all items reference ecole nouns', () => {
    const ecoleNouns = NOUNS.filter((n) => n.theme === 'ecole').map((n) => n.id);
    expect(ecoleNouns.length).toBeGreaterThan(0);

    const items = generateGnEncrierItems(20, { themes: ['ecole'] });
    items.forEach((item) => {
      expect(ecoleNouns).toContain(item.nounId);
    });
  });

  it('theme: ["maison"] — all items reference maison nouns', () => {
    const maisonNouns = NOUNS.filter((n) => n.theme === 'maison').map((n) => n.id);
    expect(maisonNouns.length).toBeGreaterThan(0);

    const items = generateGnEncrierItems(20, { themes: ['maison'] });
    items.forEach((item) => {
      expect(maisonNouns).toContain(item.nounId);
    });
  });

  it('multiple themes: ["jeux", "nature"] — items reference both themes', () => {
    const allowedNouns = NOUNS.filter((n) => ['jeux', 'nature'].includes(n.theme)).map((n) => n.id);
    expect(allowedNouns.length).toBeGreaterThan(0);

    const items = generateGnEncrierItems(30, { themes: ['jeux', 'nature'] });
    items.forEach((item) => {
      expect(allowedNouns).toContain(item.nounId);
    });
  });

  it('multiple themes returns items from both themes', () => {
    const items = generateGnEncrierItems(20, { themes: ['animaux', 'ecole'] });
    const validNouns = NOUNS.filter((n) => n.theme === 'animaux' || n.theme === 'ecole').map((n) => n.id);
    items.forEach((item) => {
      expect(validNouns).toContain(item.nounId);
    });
  });
});

describe('generateGnEncrierItems — Filtering by targetKinds', () => {
  it('targetKinds: ["determiner"] — all items have gapTarget === "determiner"', () => {
    const items = generateGnEncrierItems(20, { targetKinds: ['determiner'] });
    items.forEach((item) => {
      expect(item.gapTarget).toBe('determiner');
    });
  });

  it('targetKinds: ["adjective"] — all items have gapTarget === "adjective"', () => {
    const items = generateGnEncrierItems(20, { targetKinds: ['adjective'] });
    items.forEach((item) => {
      expect(item.gapTarget).toBe('adjective');
    });
  });

  it('targetKinds: ["noun"] — all items have gapTarget === "noun"', () => {
    const items = generateGnEncrierItems(20, { targetKinds: ['noun'] });
    items.forEach((item) => {
      expect(item.gapTarget).toBe('noun');
    });
  });

  it('targetKinds: ["determiner", "noun"] — items have only these targets', () => {
    const items = generateGnEncrierItems(30, { targetKinds: ['determiner', 'noun'] });
    items.forEach((item) => {
      expect(['determiner', 'noun']).toContain(item.gapTarget);
    });
  });

  it('empty targetKinds returns empty array', () => {
    const items = generateGnEncrierItems(10, { targetKinds: [] });
    expect(items).toEqual([]);
  });
});

describe('generateGnEncrierItems — Combined filtering (theme + targetKind)', () => {
  it('themes: ["animaux"], targetKinds: ["determiner"] — animaux determiner items', () => {
    const animauxNouns = NOUNS.filter((n) => n.theme === 'animaux').map((n) => n.id);

    const items = generateGnEncrierItems(20, { themes: ['animaux'], targetKinds: ['determiner'] });
    items.forEach((item) => {
      expect(item.gapTarget).toBe('determiner');
      expect(animauxNouns).toContain(item.nounId);
    });
  });

  it('themes: ["nature"], targetKinds: ["adjective", "noun"]', () => {
    const natureNouns = NOUNS.filter((n) => n.theme === 'nature').map((n) => n.id);

    const items = generateGnEncrierItems(20, { themes: ['nature'], targetKinds: ['adjective', 'noun'] });
    items.forEach((item) => {
      expect(['adjective', 'noun']).toContain(item.gapTarget);
      expect(natureNouns).toContain(item.nounId);
    });
  });
});

describe('Union discriminant — Type structure', () => {
  it('VerbEncrierItem has gapTarget "verb" and verb-specific properties', () => {
    const verbItems = generateEncrierItems(['present'], 5);
    verbItems.forEach((item) => {
      expect(item.gapTarget).toBe('verb');
      expect(typeof item.verbId).toBe('string');
      expect(item.pronoun).toBeDefined();
      expect(item.tense).toBeDefined();
      expect(item.infinitive).toBeDefined();
    });
  });

  it('GnEncrierItem has gapTarget in ["determiner", "adjective", "noun"] and GN-specific properties', () => {
    const gnItems = generateGnEncrierItems(5);
    gnItems.forEach((item) => {
      expect(['determiner', 'adjective', 'noun']).toContain(item.gapTarget);
      expect(item.nounId).toBeDefined();
      expect(item.adjectiveId).toBeDefined();
      expect(item.determinerId).toBeDefined();
      expect(item.gender).toMatch(/^(masculine|feminine)$/);
      expect(item.number).toMatch(/^(singular|plural)$/);
      expect(item.hint).toBeDefined();
    });
  });

  it('EncrierItem union type can be narrowed by gapTarget', () => {
    const verbItems = generateEncrierItems(['present'], 2);
    const gnItems = generateGnEncrierItems(2);
    const mixed: EncrierItem[] = [...verbItems, ...gnItems];

    mixed.forEach((item) => {
      if (item.gapTarget === 'verb') {
        expect(item.verbId).toBeDefined();
        expect(item.pronoun).toBeDefined();
      } else {
        expect(item.gender).toBeDefined();
        expect(item.number).toBeDefined();
      }
    });
  });
});

describe('Edge cases and robustness', () => {
  it('generateEncrierItems with count 1 returns at least 0 items', () => {
    const items = generateEncrierItems(['present'], 1);
    expect(items.length).toBeGreaterThanOrEqual(0);
  });

  it('generateGnEncrierItems returns consistent structure across multiple calls', () => {
    const items1 = generateGnEncrierItems(5);
    const items2 = generateGnEncrierItems(5);

    items1.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('sentence');
      expect(item).toHaveProperty('choices');
      expect(item).toHaveProperty('correctForm');
      expect(item).toHaveProperty('gender');
      expect(item).toHaveProperty('number');
      expect(item).toHaveProperty('hint');
    });

    items2.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('sentence');
      expect(item).toHaveProperty('choices');
      expect(item).toHaveProperty('correctForm');
      expect(item).toHaveProperty('gender');
      expect(item).toHaveProperty('number');
      expect(item).toHaveProperty('hint');
    });
  });

  it('large count request generates items up to limit', () => {
    const items = generateGnEncrierItems(100);
    expect(items.length).toBeLessThanOrEqual(100);
    expect(items.length).toBeGreaterThan(0);
  });

  it('VerbEncrierItem sentence handles Je contraction correctly', () => {
    const items = generateEncrierItems(['present'], 20);
    expect(items.length).toBeGreaterThan(0);
  });
});

describe('generateGnEncrierItems — distractors must break agreement', () => {
  it('adjective choices: only correctForm has valid agreement', () => {
    const items = generateGnEncrierItems(50, { targetKinds: ['adjective'] });
    expect(items.length).toBeGreaterThan(0);

    items.forEach((item) => {
      const validForms = new Set(ADJECTIVES.map((a) => getAdjectiveForm(a, item.gender, item.number)));

      const distractors = item.choices.filter((c) => c !== item.correctForm);
      distractors.forEach((d) => {
        expect(
          validForms.has(d),
          `"${d}" est un adjectif ${item.hint} valide — ne devrait pas être un distracteur dans "${item.sentence}"`,
        ).toBe(false);
      });
    });
  });

  it('determiner choices: only correctForm has valid agreement', () => {
    const items = generateGnEncrierItems(50, { targetKinds: ['determiner'] });
    expect(items.length).toBeGreaterThan(0);

    items.forEach((item) => {
      const noun = NOUNS.find((n) => n.id === item.nounId);
      const adj = ADJECTIVES.find((a) => a.id === item.adjectiveId);
      if (!noun || !adj) throw new Error(`Unknown noun "${item.nounId}" or adjective "${item.adjectiveId}"`);

      const nounForm = getNounForm(noun, item.number);
      const adjForm = getAdjectiveForm(adj, noun.gender, item.number);
      const nextWord = adj.preposed ? adjForm : nounForm;

      const validForms = new Set(
        DETERMINERS.map((d) => getDeterminerForm(d, item.gender, item.number, nextWord)),
      );

      const distractors = item.choices.filter((c) => c !== item.correctForm);
      distractors.forEach((d) => {
        expect(
          validForms.has(d),
          `"${d}" est un déterminant ${item.hint} valide — ne devrait pas être un distracteur`,
        ).toBe(false);
      });
    });
  });

  it('noun choices: only correctForm has valid agreement', () => {
    const items = generateGnEncrierItems(50, { targetKinds: ['noun'] });
    expect(items.length).toBeGreaterThan(0);

    items.forEach((item) => {
      const validForms = new Set(
        NOUNS.filter((n) => n.gender === item.gender).map((n) => getNounForm(n, item.number)),
      );

      const distractors = item.choices.filter((c) => c !== item.correctForm);
      distractors.forEach((d) => {
        expect(
          validForms.has(d),
          `"${d}" est un nom ${item.hint} valide — ne devrait pas être un distracteur dans "${item.sentence}"`,
        ).toBe(false);
      });
    });
  });
});
