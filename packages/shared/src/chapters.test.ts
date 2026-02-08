import { describe, it, expect } from 'vitest';
import { BOOKS, CHAPTERS, FRENCH_SHELVES, ALL_SHELVES, getBooksForSubject } from './chapters.js';
import { MATH_BOOKS, MATH_SHELVES } from './math-chapters.js';

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

describe('SHELVES', () => {
  it('every French book appears in exactly one shelf', () => {
    const shelfBookIds = FRENCH_SHELVES.flatMap((s) => s.bookIds);
    const frenchBookIds = BOOKS.map((b) => b.id);
    expect(shelfBookIds.sort()).toEqual(frenchBookIds.sort());
    // Pas de doublons
    expect(new Set(shelfBookIds).size).toBe(shelfBookIds.length);
  });

  it('every Math book appears in exactly one shelf', () => {
    const shelfBookIds = MATH_SHELVES.flatMap((s) => s.bookIds);
    const mathBookIds = MATH_BOOKS.map((b) => b.id);
    expect(shelfBookIds.sort()).toEqual(mathBookIds.sort());
    expect(new Set(shelfBookIds).size).toBe(shelfBookIds.length);
  });

  it('ALL_SHELVES contains all French + Math shelves', () => {
    expect(ALL_SHELVES).toHaveLength(FRENCH_SHELVES.length + MATH_SHELVES.length);
  });

  it('getBooksForSubject returns books in shelf order', () => {
    const frBooks = getBooksForSubject('francais');
    const expectedOrder = FRENCH_SHELVES.flatMap((s) => s.bookIds);
    expect(frBooks.map((b) => b.id)).toEqual(expectedOrder);

    const mathBooks = getBooksForSubject('maths');
    const expectedMathOrder = MATH_SHELVES.flatMap((s) => s.bookIds);
    expect(mathBooks.map((b) => b.id)).toEqual(expectedMathOrder);
  });

  it('each shelf references valid book IDs', () => {
    const allBookIds = new Set([...BOOKS, ...MATH_BOOKS].map((b) => b.id));
    for (const shelf of ALL_SHELVES) {
      for (const bookId of shelf.bookIds) {
        expect(allBookIds.has(bookId)).toBe(true);
      }
    }
  });
});
