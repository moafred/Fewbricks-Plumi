import { describe, it, expect } from 'vitest';
import { generateSortingItems } from './tri-verbes.js';

describe('generateSortingItems', () => {
  it('generates items for all pronouns by default', () => {
    const items = generateSortingItems(12, { tense: 'present' });
    const pronouns = new Set(items.map((i) => i.pronoun));
    expect(pronouns.size).toBeGreaterThan(1);
  });

  it('filters by pronouns when specified', () => {
    const items = generateSortingItems(6, {
      tense: 'present',
      pronouns: ['je', 'tu'],
    });
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(['je', 'tu']).toContain(item.pronoun);
    }
  });
});
