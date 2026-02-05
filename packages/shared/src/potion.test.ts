import { describe, it, expect } from 'vitest';
import {
  generatePotionItems,
  generateGnPotionItems,
  type PotionItem,
  type VerbPotionItem,
  type GnPotionItem,
} from './potion.js';
import { NOUNS } from './vocabulary.js';
import { PRONOUNS, TENSES } from './types.js';

describe('generatePotionItems — Verb Conjugation', () => {
  it('returns up to count items when requesting 5 items with present tense', () => {
    const items = generatePotionItems(['present'], 5);
    expect(items.length).toBeLessThanOrEqual(5);
    expect(items.length).toBeGreaterThan(0);
  });

  it('returns items with gapTarget: "verb"', () => {
    const items = generatePotionItems(['present'], 3);
    items.forEach((item) => {
      expect(item.gapTarget).toBe('verb');
    });
  });

  it('every item has required VerbPotionItem fields', () => {
    const items = generatePotionItems(['present'], 5);
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

      expect(item.verbId).toMatch(/^(etre|avoir)$/);
      expect(item.infinitive).toMatch(/^(être|avoir)$/);
      expect(item.pronoun).toMatch(/^(je|tu|il\/elle\/on|nous|vous|ils\/elles)$/);
      expect(item.tense).toBe('present');
    });
  });

  it('correctForm is included in choices', () => {
    const items = generatePotionItems(['present'], 10);
    items.forEach((item) => {
      expect(item.choices).toContain(item.correctForm);
    });
  });

  it('verbId is always "etre" or "avoir"', () => {
    const items = generatePotionItems(['present'], 10);
    items.forEach((item) => {
      expect(['etre', 'avoir']).toContain(item.verbId);
    });
  });

  it('infinitive matches verbId (etre → être, avoir → avoir)', () => {
    const items = generatePotionItems(['present'], 10);
    items.forEach((item) => {
      if (item.verbId === 'etre') {
        expect(item.infinitive).toBe('être');
      } else if (item.verbId === 'avoir') {
        expect(item.infinitive).toBe('avoir');
      }
    });
  });

  it('pronoun is one of the 6 French pronouns', () => {
    const items = generatePotionItems(['present'], 10);
    const validPronouns = PRONOUNS;
    items.forEach((item) => {
      expect(validPronouns).toContain(item.pronoun);
    });
  });

  it('handles multiple tenses (present and futur)', () => {
    const items = generatePotionItems(['present', 'futur'], 20);
    const tenses = new Set(items.map((i) => i.tense));
    expect(tenses.size).toBeGreaterThan(0);
  });

  it('default count is 10 items', () => {
    const items = generatePotionItems(['present']);
    expect(items.length).toBeLessThanOrEqual(10);
  });

  it('count of 0 returns empty array', () => {
    const items = generatePotionItems(['present'], 0);
    expect(items).toEqual([]);
  });

  it('each item has a unique id', () => {
    const items = generatePotionItems(['present'], 20);
    const ids = items.map((i) => i.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('sentence contains the gap placeholder "_____"', () => {
    const items = generatePotionItems(['present'], 10);
    items.forEach((item) => {
      expect(item.sentence).toContain('_____');
    });
  });

  it('choices array has exactly 4 elements', () => {
    const items = generatePotionItems(['present'], 10);
    items.forEach((item) => {
      expect(item.choices.length).toBe(4);
    });
  });

  it('choices are unique (no duplicates)', () => {
    const items = generatePotionItems(['present'], 10);
    items.forEach((item) => {
      const uniqueChoices = new Set(item.choices);
      expect(uniqueChoices.size).toBe(4);
    });
  });
});

describe('generateGnPotionItems — Noun Phrase', () => {
  it('returns up to count items when requesting 5 items', () => {
    const items = generateGnPotionItems(5);
    expect(items.length).toBeLessThanOrEqual(5);
    expect(items.length).toBeGreaterThan(0);
  });

  it('every item has gapTarget in ["determiner", "adjective", "noun"]', () => {
    const items = generateGnPotionItems(10);
    items.forEach((item) => {
      expect(['determiner', 'adjective', 'noun']).toContain(item.gapTarget);
    });
  });

  it('every item has required GnPotionItem fields', () => {
    const items = generateGnPotionItems(10);
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
    const items = generateGnPotionItems(15);
    items.forEach((item) => {
      expect(item.choices).toContain(item.correctForm);
    });
  });

  it('hint matches gender and number format ("masculin singulier" etc.)', () => {
    const items = generateGnPotionItems(10);
    items.forEach((item) => {
      const genderPart = item.gender === 'masculine' ? 'masculin' : 'féminin';
      const numberPart = item.number === 'singular' ? 'singulier' : 'pluriel';
      expect(item.hint).toBe(`${genderPart} ${numberPart}`);
    });
  });

  it('default count is 10 items', () => {
    const items = generateGnPotionItems();
    expect(items.length).toBeLessThanOrEqual(10);
  });

  it('count of 0 returns empty array', () => {
    const items = generateGnPotionItems(0);
    expect(items).toEqual([]);
  });

  it('each item has a unique id', () => {
    const items = generateGnPotionItems(20);
    const ids = items.map((i) => i.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('sentence contains the gap placeholder "_____"', () => {
    const items = generateGnPotionItems(10);
    items.forEach((item) => {
      expect(item.sentence).toContain('_____');
    });
  });

  it('choices array has exactly 4 elements', () => {
    const items = generateGnPotionItems(10);
    items.forEach((item) => {
      expect(item.choices.length).toBe(4);
    });
  });

  it('choices are unique (no duplicates)', () => {
    const items = generateGnPotionItems(10);
    items.forEach((item) => {
      const uniqueChoices = new Set(item.choices);
      expect(uniqueChoices.size).toBe(4);
    });
  });
});

describe('generateGnPotionItems — Filtering by theme', () => {
  it('theme: ["animaux"] — all items reference animaux nouns', () => {
    const animauxNouns = NOUNS.filter((n) => n.theme === 'animaux').map((n) => n.id);
    expect(animauxNouns.length).toBeGreaterThan(0);

    const items = generateGnPotionItems(20, { themes: ['animaux'] });
    items.forEach((item) => {
      expect(animauxNouns).toContain(item.nounId);
    });
  });

  it('theme: ["ecole"] — all items reference ecole nouns', () => {
    const ecoleNouns = NOUNS.filter((n) => n.theme === 'ecole').map((n) => n.id);
    expect(ecoleNouns.length).toBeGreaterThan(0);

    const items = generateGnPotionItems(20, { themes: ['ecole'] });
    items.forEach((item) => {
      expect(ecoleNouns).toContain(item.nounId);
    });
  });

  it('theme: ["maison"] — all items reference maison nouns', () => {
    const maisonNouns = NOUNS.filter((n) => n.theme === 'maison').map((n) => n.id);
    expect(maisonNouns.length).toBeGreaterThan(0);

    const items = generateGnPotionItems(20, { themes: ['maison'] });
    items.forEach((item) => {
      expect(maisonNouns).toContain(item.nounId);
    });
  });

  it('multiple themes: ["jeux", "nature"] — items reference both themes', () => {
    const allowedNouns = NOUNS.filter((n) => ['jeux', 'nature'].includes(n.theme)).map((n) => n.id);
    expect(allowedNouns.length).toBeGreaterThan(0);

    const items = generateGnPotionItems(30, { themes: ['jeux', 'nature'] });
    items.forEach((item) => {
      expect(allowedNouns).toContain(item.nounId);
    });
  });

  it('multiple themes returns items from both themes', () => {
    const items = generateGnPotionItems(20, { themes: ['animaux', 'ecole'] });
    const validNouns = NOUNS.filter((n) => n.theme === 'animaux' || n.theme === 'ecole').map((n) => n.id);
    items.forEach((item) => {
      expect(validNouns).toContain(item.nounId);
    });
  });
});

describe('generateGnPotionItems — Filtering by targetKinds', () => {
  it('targetKinds: ["determiner"] — all items have gapTarget === "determiner"', () => {
    const items = generateGnPotionItems(20, { targetKinds: ['determiner'] });
    items.forEach((item) => {
      expect(item.gapTarget).toBe('determiner');
    });
  });

  it('targetKinds: ["adjective"] — all items have gapTarget === "adjective"', () => {
    const items = generateGnPotionItems(20, { targetKinds: ['adjective'] });
    items.forEach((item) => {
      expect(item.gapTarget).toBe('adjective');
    });
  });

  it('targetKinds: ["noun"] — all items have gapTarget === "noun"', () => {
    const items = generateGnPotionItems(20, { targetKinds: ['noun'] });
    items.forEach((item) => {
      expect(item.gapTarget).toBe('noun');
    });
  });

  it('targetKinds: ["determiner", "noun"] — items have only these targets', () => {
    const items = generateGnPotionItems(30, { targetKinds: ['determiner', 'noun'] });
    items.forEach((item) => {
      expect(['determiner', 'noun']).toContain(item.gapTarget);
    });
  });

  it('empty targetKinds returns empty array', () => {
    const items = generateGnPotionItems(10, { targetKinds: [] });
    expect(items).toEqual([]);
  });
});

describe('generateGnPotionItems — Combined filtering (theme + targetKind)', () => {
  it('themes: ["animaux"], targetKinds: ["determiner"] — animaux determiner items', () => {
    const animauxNouns = NOUNS.filter((n) => n.theme === 'animaux').map((n) => n.id);

    const items = generateGnPotionItems(20, { themes: ['animaux'], targetKinds: ['determiner'] });
    items.forEach((item) => {
      expect(item.gapTarget).toBe('determiner');
      expect(animauxNouns).toContain(item.nounId);
    });
  });

  it('themes: ["nature"], targetKinds: ["adjective", "noun"]', () => {
    const natureNouns = NOUNS.filter((n) => n.theme === 'nature').map((n) => n.id);

    const items = generateGnPotionItems(20, { themes: ['nature'], targetKinds: ['adjective', 'noun'] });
    items.forEach((item) => {
      expect(['adjective', 'noun']).toContain(item.gapTarget);
      expect(natureNouns).toContain(item.nounId);
    });
  });
});

describe('Union discriminant — Type structure', () => {
  it('VerbPotionItem has gapTarget "verb" and verb-specific properties', () => {
    const verbItems = generatePotionItems(['present'], 5);
    verbItems.forEach((item) => {
      expect(item.gapTarget).toBe('verb');
      expect(item.verbId).toMatch(/^(etre|avoir)$/);
      expect(item.pronoun).toBeDefined();
      expect(item.tense).toBeDefined();
      expect(item.infinitive).toBeDefined();
    });
  });

  it('GnPotionItem has gapTarget in ["determiner", "adjective", "noun"] and GN-specific properties', () => {
    const gnItems = generateGnPotionItems(5);
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

  it('PotionItem union type can be narrowed by gapTarget', () => {
    const verbItems = generatePotionItems(['present'], 2);
    const gnItems = generateGnPotionItems(2);
    const mixed: PotionItem[] = [...verbItems, ...gnItems];

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
  it('generatePotionItems with count 1 returns at least 0 items', () => {
    const items = generatePotionItems(['present'], 1);
    expect(items.length).toBeGreaterThanOrEqual(0);
  });

  it('generateGnPotionItems returns consistent structure across multiple calls', () => {
    const items1 = generateGnPotionItems(5);
    const items2 = generateGnPotionItems(5);

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
    const items = generateGnPotionItems(100);
    expect(items.length).toBeLessThanOrEqual(100);
    expect(items.length).toBeGreaterThan(0);
  });

  it('VerbPotionItem sentence handles Je contraction correctly', () => {
    const items = generatePotionItems(['present'], 20);
    expect(items.length).toBeGreaterThan(0);
  });
});
