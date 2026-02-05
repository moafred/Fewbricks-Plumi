import { describe, it, expect } from 'vitest';
import type { Noun, Adjective, Determiner } from './types.js';
import {
  NOUNS,
  ADJECTIVES,
  DETERMINERS,
  getNoun,
  getNounsByTheme,
  getNounForm,
  getAdjective,
  getAdjectiveForm,
  getDeterminer,
  getDeterminerForm,
  buildNounPhrase,
  formatGenderNumber,
} from './vocabulary.js';

function assertDefined<T>(value: T | undefined | null): asserts value is T {
  expect(value).toBeDefined();
}

describe('vocabulary — Data Integrity', () => {
  it('NOUNS has entries with all required fields', () => {
    expect(NOUNS.length).toBeGreaterThan(0);
    NOUNS.forEach((noun) => {
      expect(noun.id).toBeDefined();
      expect(noun.singular).toBeDefined();
      expect(noun.plural).toBeDefined();
      expect(noun.gender).toMatch(/^(masculine|feminine)$/);
      expect(noun.theme).toMatch(/^(ecole|maison|animaux|jeux|nature|corps|nourriture)$/);
    });
  });

  it('NOUNS covers all 7 themes', () => {
    const themes = new Set(NOUNS.map((n) => n.theme));
    expect(themes).toEqual(
      new Set(['ecole', 'maison', 'animaux', 'jeux', 'nature', 'corps', 'nourriture']),
    );
  });

  it('ADJECTIVES has preposed and postposed entries', () => {
    const preposed = ADJECTIVES.filter((a) => a.preposed);
    const postposed = ADJECTIVES.filter((a) => !a.preposed);
    expect(preposed.length).toBeGreaterThan(0);
    expect(postposed.length).toBeGreaterThan(0);
  });

  it('ADJECTIVES all have forms for all genders and numbers', () => {
    ADJECTIVES.forEach((adj) => {
      expect(adj.forms.ms).toBeDefined();
      expect(adj.forms.mp).toBeDefined();
      expect(adj.forms.fs).toBeDefined();
      expect(adj.forms.fp).toBeDefined();
    });
  });

  it('DETERMINERS has exactly 5 entries with expected ids', () => {
    expect(DETERMINERS.length).toBe(5);
    const ids = DETERMINERS.map((d) => d.id);
    expect(ids).toEqual(['le', 'un', 'mon', 'ton', 'son']);
  });

  it('DETERMINERS all have all required forms', () => {
    DETERMINERS.forEach((det) => {
      expect(det.forms.ms).toBeDefined();
      expect(det.forms.fs).toBeDefined();
      expect(det.forms.mp).toBeDefined();
      expect(det.forms.fp).toBeDefined();
    });
  });
});

describe('getNoun', () => {
  it('returns the noun for valid id', () => {
    const noun = getNoun('chat');
    assertDefined(noun);
    expect(noun.singular).toBe('chat');
    expect(noun.plural).toBe('chats');
    expect(noun.gender).toBe('masculine');
    expect(noun.theme).toBe('animaux');
  });

  it('returns undefined for non-existent id', () => {
    expect(getNoun('nonexistent')).toBeUndefined();
  });
});

describe('getNounsByTheme', () => {
  it('returns only animaux nouns for animaux theme', () => {
    const nouns = getNounsByTheme('animaux');
    expect(nouns.length).toBeGreaterThan(0);
    nouns.forEach((n) => {
      expect(n.theme).toBe('animaux');
    });
  });

  it('returns only ecole nouns for ecole theme', () => {
    const nouns = getNounsByTheme('ecole');
    expect(nouns.length).toBeGreaterThan(0);
    nouns.forEach((n) => {
      expect(n.theme).toBe('ecole');
    });
  });

  it('returns only nouns for the requested theme', () => {
    const masonNouns = getNounsByTheme('maison');
    expect(masonNouns.length).toBeGreaterThan(0);
    masonNouns.forEach((n) => {
      expect(n.theme).toBe('maison');
    });
  });
});

describe('getNounForm', () => {
  it('returns singular form for singular number', () => {
    const chat = getNoun('chat');
    assertDefined(chat);
    expect(getNounForm(chat, 'singular')).toBe('chat');
  });

  it('returns plural form for plural number', () => {
    const chat = getNoun('chat');
    assertDefined(chat);
    expect(getNounForm(chat, 'plural')).toBe('chats');
  });

  it('handles nouns with identical singular and plural', () => {
    const souris = getNoun('souris');
    assertDefined(souris);
    expect(getNounForm(souris, 'singular')).toBe('souris');
    expect(getNounForm(souris, 'plural')).toBe('souris');
  });

  it('handles nouns with irregular plurals', () => {
    const oeil = getNoun('oeil');
    assertDefined(oeil);
    expect(getNounForm(oeil, 'singular')).toBe('œil');
    expect(getNounForm(oeil, 'plural')).toBe('yeux');
  });
});

describe('getAdjective', () => {
  it('returns the adjective for valid id', () => {
    const adj = getAdjective('petit');
    assertDefined(adj);
    expect(adj.preposed).toBe(true);
  });

  it('returns undefined for non-existent id', () => {
    expect(getAdjective('unknown')).toBeUndefined();
  });
});

describe('getAdjectiveForm', () => {
  it('returns masculine singular form', () => {
    const petit = getAdjective('petit');
    assertDefined(petit);
    expect(getAdjectiveForm(petit, 'masculine', 'singular')).toBe('petit');
  });

  it('returns feminine plural form', () => {
    const petit = getAdjective('petit');
    assertDefined(petit);
    expect(getAdjectiveForm(petit, 'feminine', 'plural')).toBe('petites');
  });

  it('handles irregular feminine singular (beau → belle)', () => {
    const beau = getAdjective('beau');
    assertDefined(beau);
    expect(getAdjectiveForm(beau, 'feminine', 'singular')).toBe('belle');
  });

  it('handles irregular masculine plural (beau → beaux)', () => {
    const beau = getAdjective('beau');
    assertDefined(beau);
    expect(getAdjectiveForm(beau, 'masculine', 'plural')).toBe('beaux');
  });

  it('handles invariant adjectives (rouge)', () => {
    const rouge = getAdjective('rouge');
    assertDefined(rouge);
    expect(getAdjectiveForm(rouge, 'masculine', 'singular')).toBe('rouge');
    expect(getAdjectiveForm(rouge, 'feminine', 'singular')).toBe('rouge');
    expect(getAdjectiveForm(rouge, 'masculine', 'plural')).toBe('rouges');
    expect(getAdjectiveForm(rouge, 'feminine', 'plural')).toBe('rouges');
  });
});

describe('getDeterminer', () => {
  it('returns the determiner for valid id', () => {
    const le = getDeterminer('le');
    assertDefined(le);
    expect(le.kind).toBe('definite');
  });

  it('returns undefined for non-existent id', () => {
    expect(getDeterminer('unknown')).toBeUndefined();
  });
});

describe('getDeterminerForm — elision', () => {
  it('returns base masculine singular form for consonant-starting word', () => {
    const le = getDeterminer('le');
    assertDefined(le);
    expect(getDeterminerForm(le, 'masculine', 'singular', 'chat')).toBe('le');
  });

  it('returns elided form (l\') for vowel-starting word', () => {
    const le = getDeterminer('le');
    assertDefined(le);
    expect(getDeterminerForm(le, 'masculine', 'singular', 'arbre')).toBe("l'");
  });

  it('handles accented vowels (arbre, étoile)', () => {
    const le = getDeterminer('le');
    assertDefined(le);
    expect(getDeterminerForm(le, 'feminine', 'singular', 'étoile')).toBe("l'");
  });

  it('returns plural form (les) with no elision', () => {
    const le = getDeterminer('le');
    assertDefined(le);
    expect(getDeterminerForm(le, 'masculine', 'plural', 'arbres')).toBe('les');
  });

  it('returns feminine form (la) for consonant-starting word', () => {
    const le = getDeterminer('le');
    assertDefined(le);
    expect(getDeterminerForm(le, 'feminine', 'singular', 'table')).toBe('la');
  });

  it('treats h as vowel for elision (h aspiré simplified for CE1)', () => {
    const le = getDeterminer('le');
    assertDefined(le);
    expect(getDeterminerForm(le, 'masculine', 'singular', 'haricot')).toBe("l'");
  });

  describe('possessive determiners — elision', () => {
    it('returns ma for feminine singular consonant-starting word', () => {
      const mon = getDeterminer('mon');
      assertDefined(mon);
      expect(getDeterminerForm(mon, 'feminine', 'singular', 'table')).toBe('ma');
    });

    it('returns mon for feminine singular vowel-starting word (elision)', () => {
      const mon = getDeterminer('mon');
      assertDefined(mon);
      expect(getDeterminerForm(mon, 'feminine', 'singular', 'étoile')).toBe('mon');
    });

    it('returns son for feminine singular vowel-starting word', () => {
      const son = getDeterminer('son');
      assertDefined(son);
      expect(getDeterminerForm(son, 'feminine', 'singular', 'arbre')).toBe('son');
    });

    it('returns ton for feminine singular vowel-starting word', () => {
      const ton = getDeterminer('ton');
      assertDefined(ton);
      expect(getDeterminerForm(ton, 'feminine', 'singular', 'amie')).toBe('ton');
    });

    it('returns mes for feminine plural (no elision)', () => {
      const mon = getDeterminer('mon');
      assertDefined(mon);
      expect(getDeterminerForm(mon, 'feminine', 'plural', 'étoiles')).toBe('mes');
    });
  });
});

describe('buildNounPhrase', () => {
  it('builds antéposé phrase: dét + adj + nom (petit chat)', () => {
    const result = buildNounPhrase('le', 'petit', 'chat', 'singular');
    expect(result).toBe('le petit chat');
  });

  it('builds postposé phrase: dét + nom + adj (chat rouge)', () => {
    const result = buildNounPhrase('le', 'rouge', 'chat', 'singular');
    expect(result).toBe('le chat rouge');
  });

  it('handles plural antéposé: les petits chats', () => {
    const result = buildNounPhrase('le', 'petit', 'chat', 'plural');
    expect(result).toBe('les petits chats');
  });

  it('handles plural postposé: les chats rouges', () => {
    const result = buildNounPhrase('le', 'rouge', 'chat', 'plural');
    expect(result).toBe('les chats rouges');
  });

  it('no elision when antéposé adj starts with consonant before vowel-starting noun', () => {
    const result = buildNounPhrase('le', 'petit', 'arbre', 'singular');
    expect(result).toBe('le petit arbre');
  });

  it('handles elision for postposé noun: l\' + noun + adj', () => {
    const result = buildNounPhrase('le', 'rouge', 'arbre', 'singular');
    expect(result).toBe("l'arbre rouge");
  });

  it('handles feminine noun with accented vowel', () => {
    const result = buildNounPhrase('le', 'rouge', 'etoile', 'singular');
    expect(result).toBe("l'étoile rouge");
  });

  it('applies gender agreement to adjectives', () => {
    const result = buildNounPhrase('le', 'petit', 'table', 'singular');
    expect(result).toBe('la petite table');
  });

  it('applies gender agreement to postposé adjectives (fleur bleue)', () => {
    const result = buildNounPhrase('le', 'bleu', 'fleur', 'singular');
    expect(result).toBe('la fleur bleue');
  });

  it('returns empty string for missing noun', () => {
    const result = buildNounPhrase('le', 'petit', 'nonexistent', 'singular');
    expect(result).toBe('');
  });

  it('returns empty string for missing adjective', () => {
    const result = buildNounPhrase('le', 'nonexistent', 'chat', 'singular');
    expect(result).toBe('');
  });

  it('returns empty string for missing determiner', () => {
    const result = buildNounPhrase('nonexistent', 'petit', 'chat', 'singular');
    expect(result).toBe('');
  });

  it('handles indefinite article (un)', () => {
    const result = buildNounPhrase('un', 'petit', 'chat', 'singular');
    expect(result).toBe('un petit chat');
  });

  it('handles indefinite article plural (des)', () => {
    const result = buildNounPhrase('un', 'petit', 'chat', 'plural');
    expect(result).toBe('des petits chats');
  });

  it('handles possessive determiner', () => {
    const result = buildNounPhrase('mon', 'petit', 'chat', 'singular');
    expect(result).toBe('mon petit chat');
  });

  it('handles possessive determiner with feminine noun', () => {
    const result = buildNounPhrase('mon', 'petit', 'table', 'singular');
    expect(result).toBe('ma petite table');
  });

  it('possessive feminine keeps ma when antéposé adj starts with consonant', () => {
    const result = buildNounPhrase('mon', 'petit', 'etoile', 'singular');
    expect(result).toBe('ma petite étoile');
  });

  it('handles indefinite article with elision', () => {
    const result = buildNounPhrase('un', 'petit', 'arbre', 'singular');
    expect(result).toBe('un petit arbre');
  });
});

describe('formatGenderNumber', () => {
  it('formats masculine singular', () => {
    expect(formatGenderNumber('masculine', 'singular')).toBe('masculin singulier');
  });

  it('formats masculine plural', () => {
    expect(formatGenderNumber('masculine', 'plural')).toBe('masculin pluriel');
  });

  it('formats feminine singular', () => {
    expect(formatGenderNumber('feminine', 'singular')).toBe('féminin singulier');
  });

  it('formats feminine plural', () => {
    expect(formatGenderNumber('feminine', 'plural')).toBe('féminin pluriel');
  });
});
