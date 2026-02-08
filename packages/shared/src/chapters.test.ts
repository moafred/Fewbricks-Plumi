import { describe, it, expect } from 'vitest';
import { BOOKS, CHAPTERS } from './chapters.js';

describe('BOOKS', () => {
  it('has 14 books (13 main + 1 bonus)', () => {
    expect(BOOKS).toHaveLength(14);
  });

  it('each book references valid chapter IDs', () => {
    const chapterIds = new Set(CHAPTERS.map((c) => c.id));
    for (const book of BOOKS) {
      for (const chId of book.chapters) {
        expect(chapterIds.has(chId)).toBe(true);
      }
    }
  });

  it('each book has exactly 3 chapters', () => {
    for (const book of BOOKS) {
      expect(book.chapters).toHaveLength(3);
    }
  });

  it('has exactly 1 bonus book', () => {
    expect(BOOKS.filter((b) => b.isBonus)).toHaveLength(1);
  });
});

describe('CHAPTERS', () => {
  it('has 42 chapters (14 books x 3)', () => {
    expect(CHAPTERS).toHaveLength(42);
  });

  it('each chapter has at least 3 steps', () => {
    for (const ch of CHAPTERS) {
      expect(ch.steps.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('each chapter has a narrative', () => {
    for (const ch of CHAPTERS) {
      expect(ch.narrative.length).toBeGreaterThan(0);
    }
  });

  it('duel chapters (2 verbs, non-mixed) include tri-verbes mechanic', () => {
    const duels = CHAPTERS.filter((c) => c.verbs && c.verbs.length === 2 && c.tense !== 'mixed');
    for (const ch of duels) {
      const mechanics = ch.steps.map((s) => s.mechanic);
      expect(mechanics).toContain('tri-verbes');
    }
  });

  it('single-verb chapters do not use tri-verbes', () => {
    const singles = CHAPTERS.filter((c) => c.verbs && c.verbs.length === 1);
    for (const ch of singles) {
      const mechanics = ch.steps.map((s) => s.mechanic);
      expect(mechanics).not.toContain('tri-verbes');
    }
  });

  it('each step has questionCount between 3 and 6', () => {
    for (const ch of CHAPTERS) {
      for (const step of ch.steps) {
        expect(step.questionCount).toBeGreaterThanOrEqual(3);
        expect(step.questionCount).toBeLessThanOrEqual(6);
      }
    }
  });
});
