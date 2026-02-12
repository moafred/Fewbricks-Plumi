import { describe, it, expect } from 'vitest';
import { generateMathSortingItems } from './tri-nombres';

describe('TriNombres', () => {
  it('should generate items with pair/impair categories', () => {
    const items = generateMathSortingItems(10, {
      categories: ['pair', 'impair'],
      numberRange: [1, 20]
    });
    expect(items).toHaveLength(10);
    items.forEach(item => {
      if (item.number % 2 === 0) {
        expect(item.category).toBe('pair');
      } else {
        expect(item.category).toBe('impair');
      }
    });
  });

  it('should support multiple de 5 category', () => {
    const items = generateMathSortingItems(10, {
      categories: ['multiple de 5', 'pas multiple de 5'],
      numberRange: [1, 50]
    });
    expect(items).toHaveLength(10);
    items.forEach(item => {
      if (item.number % 5 === 0) {
        expect(item.category).toBe('multiple de 5');
      } else {
        expect(item.category).toBe('pas multiple de 5');
      }
    });
  });

  it('should support multiple de 10 category', () => {
    const items = generateMathSortingItems(6, {
      categories: ['multiple de 10', 'pas multiple de 10'],
      numberRange: [1, 100]
    });
    expect(items).toHaveLength(6);
    items.forEach(item => {
      if (item.number % 10 === 0) {
        expect(item.category).toBe('multiple de 10');
      } else {
        expect(item.category).toBe('pas multiple de 10');
      }
    });
  });

  it('should throw error for unsupported categories', () => {
    expect(() => {
      generateMathSortingItems(5, {
        categories: ['inconnu', 'autre'] as any
      });
    }).toThrow('[tri-nombres] Catégories non supportées');
  });
});
