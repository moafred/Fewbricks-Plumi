import { describe, it, expect } from 'vitest';
import { getCategoryLabel, MATH_CATEGORY_LABELS } from './math-category-labels.js';
import { MATH_CHAPTERS } from './math-chapters.js';

describe('MathCategoryLabels', () => {
  it('should return label set for known category', () => {
    const labelSet = getCategoryLabel('pair');
    expect(labelSet).toBeDefined();
    expect(labelSet.label).toBe('Nombres pairs');
    expect(labelSet.instruction).toContain('0, 2, 4, 6 ou 8');
  });

  it('should throw error for unknown category', () => {
    expect(() => getCategoryLabel('catégorie-inconnue')).toThrow(
      '[math-category-labels] Catégorie inconnue',
    );
  });

  it('should have labels for all categories used in MATH_CHAPTERS', () => {
    const usedCategories = new Set<string>();

    // Parcourir tous les chapitres maths et collecter les catégories
    for (const chapter of MATH_CHAPTERS) {
      for (const step of chapter.steps) {
        if (step.mechanic === 'tri-nombres' && step.categories) {
          step.categories.forEach((cat) => usedCategories.add(cat));
        }
      }
    }

    // Vérifier que toutes les catégories utilisées ont un label
    for (const category of usedCategories) {
      expect(
        MATH_CATEGORY_LABELS[category],
        `Catégorie "${category}" utilisée dans MATH_CHAPTERS mais absente de MATH_CATEGORY_LABELS`,
      ).toBeDefined();
    }
  });

  it('should have clear comparison labels for "< 50" categories', () => {
    const label1 = getCategoryLabel('< 50');
    const label2 = getCategoryLabel('≥ 50');

    expect(label1.label).toBe('Plus petits que 50');
    expect(label2.label).toBe('50 et plus');

    expect(label1.instruction).toContain('50');
    expect(label2.instruction).toContain('50');
  });

  it('should provide valid labels for all predefined categories', () => {
    const predefinedCategories = [
      'pair',
      'impair',
      '< 50',
      '≥ 50',
      'multiple de 5',
      'pas multiple de 5',
      'multiple de 10',
      'pas multiple de 10',
    ];

    for (const category of predefinedCategories) {
      const labelSet = getCategoryLabel(category);
      expect(labelSet.label).toBeTruthy();
      expect(labelSet.instruction).toBeTruthy();
    }
  });
});
