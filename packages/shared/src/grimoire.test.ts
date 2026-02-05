import { describe, it, expect } from 'vitest';
import { generateGrimoireItems } from './grimoire.js';

describe('generateGrimoireItems', () => {
  it('generates items for all pronouns by default', () => {
    const items = generateGrimoireItems(12, { tense: 'present' });
    const pronouns = new Set(items.map((i) => i.pronoun));
    expect(pronouns.size).toBeGreaterThan(1);
  });

  it('filters by pronouns when specified', () => {
    const items = generateGrimoireItems(6, {
      tense: 'present',
      pronouns: ['je', 'tu'],
    });
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(['je', 'tu']).toContain(item.pronoun);
    }
  });

  it('filters by verbs when specified', () => {
    const items = generateGrimoireItems(6, {
      tense: 'present',
      verbs: ['etre'],
    });
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(item.verbId).toBe('etre');
    }
  });

  it('combines pronoun and verb filters', () => {
    const items = generateGrimoireItems(4, {
      tense: 'present',
      verbs: ['avoir'],
      pronouns: ['nous', 'vous'],
    });
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(item.verbId).toBe('avoir');
      expect(['nous', 'vous']).toContain(item.pronoun);
    }
  });
});
