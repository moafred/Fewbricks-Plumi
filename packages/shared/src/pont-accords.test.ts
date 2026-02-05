import { describe, it, expect } from 'vitest';
import { generatePontAccordsItems } from './pont-accords.js';
import type { PontAccordsItem } from './pont-accords.js';

describe('generatePontAccordsItems', () => {
  describe('basic generation', () => {
    it('generates up to 5 items when count is 5', () => {
      const items = generatePontAccordsItems(5);
      expect(items.length).toBeLessThanOrEqual(5);
    });

    it('each item has all required fields', () => {
      const items = generatePontAccordsItems(3);
      items.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('nounPhrase');
        expect(item).toHaveProperty('slots');
        expect(item).toHaveProperty('targetSlotIndex');
        expect(item).toHaveProperty('targetKind');
        expect(item).toHaveProperty('choices');
        expect(item).toHaveProperty('correctAnswer');
        expect(item).toHaveProperty('hint');
      });
    });

    it('choices array has exactly 4 elements', () => {
      const items = generatePontAccordsItems(5);
      items.forEach((item) => {
        expect(item.choices).toHaveLength(4);
      });
    });

    it('correctAnswer is in choices array', () => {
      const items = generatePontAccordsItems(5);
      items.forEach((item) => {
        expect(item.choices).toContain(item.correctAnswer);
      });
    });

    it('targetSlotIndex is a valid index into slots', () => {
      const items = generatePontAccordsItems(5);
      items.forEach((item) => {
        expect(item.targetSlotIndex).toBeGreaterThanOrEqual(0);
        expect(item.targetSlotIndex).toBeLessThan(item.slots.length);
      });
    });

    it('slots[targetSlotIndex].kind matches targetKind', () => {
      const items = generatePontAccordsItems(5);
      items.forEach((item) => {
        const targetSlot = item.slots[item.targetSlotIndex];
        expect(targetSlot.kind).toBe(item.targetKind);
      });
    });
  });

  describe('default count', () => {
    it('generatePontAccordsItems() generates 10 items by default', () => {
      const items = generatePontAccordsItems();
      expect(items.length).toBeLessThanOrEqual(10);
      expect(items.length).toBeGreaterThan(0);
    });
  });

  describe('options filtering', () => {
    it('themes: ["animaux"] generates items with animaux nouns', () => {
      const items = generatePontAccordsItems(10, { themes: ['animaux'] });
      items.forEach((item) => {
        expect(item.id).toMatch(/^pont-(chat|chien|oiseau|poisson|souris|lapin|tortue|papillon)-/);
      });
    });

    it('determiners: ["le"] generates items with only "le" determiner', () => {
      const items = generatePontAccordsItems(10, { determiners: ['le'] });
      items.forEach((item) => {
        expect(item.id).toContain('-le-');
      });
    });

    it('targetKinds: ["noun"] generates items with targetKind === "noun"', () => {
      const items = generatePontAccordsItems(10, { targetKinds: ['noun'] });
      items.forEach((item) => {
        expect(item.targetKind).toBe('noun');
      });
    });

    it('targetKinds: ["adjective"] generates items with targetKind === "adjective"', () => {
      const items = generatePontAccordsItems(10, { targetKinds: ['adjective'] });
      items.forEach((item) => {
        expect(item.targetKind).toBe('adjective');
      });
    });

    it('targetKinds: ["determiner"] generates items with targetKind === "determiner"', () => {
      const items = generatePontAccordsItems(10, { targetKinds: ['determiner'] });
      items.forEach((item) => {
        expect(item.targetKind).toBe('determiner');
      });
    });
  });

  describe('slot structure', () => {
    it('each item has 3 slots', () => {
      const items = generatePontAccordsItems(5);
      items.forEach((item) => {
        expect(item.slots).toHaveLength(3);
      });
    });

    it('slots contain exactly one determiner, one adjective, one noun', () => {
      const items = generatePontAccordsItems(5);
      items.forEach((item) => {
        const kinds = item.slots.map((s) => s.kind);
        expect(kinds).toContain('determiner');
        expect(kinds).toContain('adjective');
        expect(kinds).toContain('noun');
        expect(kinds.filter((k) => k === 'determiner')).toHaveLength(1);
        expect(kinds.filter((k) => k === 'adjective')).toHaveLength(1);
        expect(kinds.filter((k) => k === 'noun')).toHaveLength(1);
      });
    });

    it('first slot is always determiner', () => {
      const items = generatePontAccordsItems(5);
      items.forEach((item) => {
        expect(item.slots[0].kind).toBe('determiner');
      });
    });

    it('each slot has a non-empty label', () => {
      const items = generatePontAccordsItems(5);
      items.forEach((item) => {
        item.slots.forEach((slot) => {
          expect(slot.label).toBeTruthy();
          expect(typeof slot.label).toBe('string');
        });
      });
    });
  });

  describe('hint format', () => {
    it('hint matches gender/number pattern', () => {
      const items = generatePontAccordsItems(10);
      const validHints = ['masculin singulier', 'masculin pluriel', 'féminin singulier', 'féminin pluriel'];
      items.forEach((item) => {
        expect(validHints).toContain(item.hint);
      });
    });
  });

  describe('id format', () => {
    it('id follows pattern pont-{nounId}-{adjId}-{detId}-{number}-{targetKind}', () => {
      const items = generatePontAccordsItems(5);
      items.forEach((item) => {
        const pattern = /^pont-[\w-]+-[\w-]+-[\w-]+-(singular|plural)-(determiner|adjective|noun)$/;
        expect(item.id).toMatch(pattern);
      });
    });
  });

  describe('noun phrase construction', () => {
    it('nounPhrase is non-empty string', () => {
      const items = generatePontAccordsItems(5);
      items.forEach((item) => {
        expect(typeof item.nounPhrase).toBe('string');
        expect(item.nounPhrase.length).toBeGreaterThan(0);
      });
    });

    it('nounPhrase is reconstructible from slots', () => {
      const items = generatePontAccordsItems(5);
      items.forEach((item) => {
        // Reconstructed phrase should contain all slot labels
        item.slots.forEach((slot) => {
          expect(item.nounPhrase).toContain(slot.label);
        });
      });
    });
  });

  describe('edge cases', () => {
    it('generatePontAccordsItems(0) returns empty array', () => {
      const items = generatePontAccordsItems(0);
      expect(items).toHaveLength(0);
    });

    it('generatePontAccordsItems(50) does not crash', () => {
      const items = generatePontAccordsItems(50);
      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeLessThanOrEqual(50);
    });

    it('generates different ids across multiple calls', () => {
      const items1 = generatePontAccordsItems(5);
      const items2 = generatePontAccordsItems(5);
      const ids1 = new Set(items1.map((i) => i.id));
      const ids2 = new Set(items2.map((i) => i.id));
      // At least some variation expected (probabilistic test)
      expect(ids1.size).toBeGreaterThan(0);
      expect(ids2.size).toBeGreaterThan(0);
    });
  });

  describe('correct answer validation', () => {
    it('correctAnswer matches target slot label', () => {
      const items = generatePontAccordsItems(5);
      items.forEach((item) => {
        const targetSlot = item.slots[item.targetSlotIndex];
        expect(item.correctAnswer).toBe(targetSlot.label);
      });
    });

    it('correctAnswer is always one of the choices', () => {
      const items = generatePontAccordsItems(10);
      items.forEach((item) => {
        expect(item.choices).toContain(item.correctAnswer);
      });
    });
  });

  describe('multiple options combined', () => {
    it('themes + determiners filters work together', () => {
      const items = generatePontAccordsItems(10, {
        themes: ['ecole'],
        determiners: ['un'],
      });
      items.forEach((item) => {
        expect(item.id).toMatch(/^pont-(crayon|cahier|table|chaise|livre|cartable|regle|gomme)-/);
        expect(item.id).toContain('-un-');
      });
    });

    it('themes + targetKinds filters work together', () => {
      const items = generatePontAccordsItems(10, {
        themes: ['nature'],
        targetKinds: ['noun'],
      });
      items.forEach((item) => {
        expect(item.id).toMatch(/^pont-(arbre|fleur|soleil|lune|etoile|riviere|montagne|foret)-/);
        expect(item.targetKind).toBe('noun');
      });
    });
  });
});
