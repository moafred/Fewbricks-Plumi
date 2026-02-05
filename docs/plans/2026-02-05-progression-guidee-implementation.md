# Progression Guidee Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remplacer la navigation a plat (25 choix) par une progression guidee ou le systeme sequence automatiquement les mini-jeux dans un ordre pedagogique aligne CE1.

**Architecture:** 3 couches de changement : (1) shared package — nouveaux types + data chapitres + filtrage pronoms dans generateurs, (2) frontend stores — progression persistee localStorage, (3) frontend composants — BookView, ChapterRunner, ChapterResult + refonte BookShelf/App.vue.

**Tech Stack:** Vue 3, Pinia, TypeScript, Vitest, @plumi/shared, Tailwind CSS 4

**Design doc:** `docs/plans/2026-02-05-progression-guidee-design.md`

---

## Phase 1 : Shared Package — Types & Data

### Task 1: Ajouter les types ChapterStep et StepMechanic

**Files:**
- Modify: `packages/shared/src/types.ts`
- Modify: `packages/shared/src/index.ts`

**Step 1: Ajouter les nouveaux types dans types.ts**

Apres la definition de `Chapter` (ligne ~121), ajouter :

```typescript
// Mecanique de mini-jeu utilisee dans une etape de chapitre
export type StepMechanic = 'tri-sorcier' | 'grimoire' | 'potion' | 'pont-accords' | 'potion-gn';

// Une etape dans la sequence d'un chapitre
export interface ChapterStep {
  mechanic: StepMechanic;
  /** Pronoms cibles pour cette etape (ex: ['je', 'tu']) */
  pronouns?: Pronoun[];
  /** Verbes cibles (heritage du chapitre si absent) */
  verbs?: VerbId[];
  /** Nombre de questions (3-4) */
  questionCount: number;
  /** Etape boss ? */
  isBoss?: boolean;
}
```

Modifier `Chapter` pour ajouter les champs `narrative` et `steps` :

```typescript
export interface Chapter {
  id: number;
  title: string;
  /** Phrase d'intro vocalisee par Plumi */
  narrative: string;
  verbs: VerbId[];
  tense: Tense | 'mixed';
  /** Sequence pedagogique auto-pilotee */
  steps: ChapterStep[];
}
```

Supprimer `lessonCount` et `hasBoss` de Chapter (remplaces par `steps` et `step.isBoss`).

Ajouter a `Book` :

```typescript
export interface Book {
  id: number;
  title: string;
  subtitle: string;
  tenses: Tense[];
  chapters: number[];
  color: 'royal' | 'enchant' | 'magic' | 'gentle' | 'forest' | 'dawn';
  isBonus?: boolean;
}
```

**Step 2: Exporter les nouveaux types dans index.ts**

Ajouter `StepMechanic` et `ChapterStep` a la liste d'exports de types.

**Step 3: Build shared et verifier**

Run: `pnpm --filter @plumi/shared build`
Expected: PASS, 0 errors

**Step 4: Commit**

```bash
git add packages/shared/src/types.ts packages/shared/src/index.ts
git commit -m "feat(shared): add ChapterStep and StepMechanic types for guided progression"
```

---

### Task 2: Ajouter filtrage par pronoms aux generateurs existants

**Files:**
- Modify: `packages/shared/src/grimoire.ts`
- Modify: `packages/shared/src/tri-sorcier.ts`
- Modify: `packages/shared/src/potion.ts`
- Test: `packages/shared/src/grimoire.test.ts` (create)
- Test: `packages/shared/src/tri-sorcier.test.ts` (create)

**Step 1: Ecrire le test pour grimoire avec filtre pronouns**

Create `packages/shared/src/grimoire.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { generateGrimoireItems } from './grimoire.js';

describe('generateGrimoireItems', () => {
  it('generates items for all pronouns by default', () => {
    const items = generateGrimoireItems(12, { tense: 'present' });
    const pronouns = new Set(items.map(i => i.pronoun));
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
```

**Step 2: Lancer le test et verifier qu'il echoue**

Run: `pnpm --filter @plumi/shared test -- grimoire.test.ts`
Expected: FAIL (pronoun filter not implemented)

**Step 3: Implementer le filtrage dans grimoire.ts**

Ajouter `pronouns?: Pronoun[]` a `GrimoireOptions`.

Dans `generateGrimoireItems`, apres `const picked = forms.slice(0, perVerb);`, filtrer :

```typescript
const pronounFilter = options?.pronouns;

// Dans la boucle sur les verbes, filtrer les formes par pronom
const forms = shuffle([...verb.forms]);
const filteredForms = pronounFilter
  ? forms.filter(f => pronounFilter.includes(f.pronoun))
  : forms;
const picked = filteredForms.slice(0, perVerb);
```

**Step 4: Lancer le test**

Run: `pnpm --filter @plumi/shared test -- grimoire.test.ts`
Expected: PASS

**Step 5: Meme pattern pour tri-sorcier.ts**

Ajouter `pronouns?: Pronoun[]` a `SortingOptions`.

Create `packages/shared/src/tri-sorcier.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { generateSortingItems } from './tri-sorcier.js';

describe('generateSortingItems', () => {
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
```

Implementer le filtre dans `generateSortingItems` (meme pattern).

**Step 6: Meme pattern pour potion.ts**

Modifier `generatePotionItems` pour accepter un objet options optionnel avec `pronouns`:

```typescript
export function generatePotionItems(
  tenses: Tense[],
  count: number = 10,
  options?: { pronouns?: Pronoun[] },
): VerbPotionItem[]
```

Filtrer les templates par pronoun si specifie.

**Step 7: Lancer tous les tests shared**

Run: `pnpm --filter @plumi/shared test`
Expected: ALL PASS

**Step 8: Build shared**

Run: `pnpm --filter @plumi/shared build`
Expected: PASS

**Step 9: Commit**

```bash
git add packages/shared/src/grimoire.ts packages/shared/src/grimoire.test.ts \
       packages/shared/src/tri-sorcier.ts packages/shared/src/tri-sorcier.test.ts \
       packages/shared/src/potion.ts
git commit -m "feat(shared): add pronoun filtering to grimoire, tri-sorcier and potion generators"
```

---

### Task 3: Reecrire chapters.ts avec sequences pedagogiques

**Files:**
- Modify: `packages/shared/src/chapters.ts`
- Test: `packages/shared/src/chapters.test.ts` (create)

**Step 1: Ecrire les tests de validation des chapitres**

Create `packages/shared/src/chapters.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { BOOKS, CHAPTERS } from './chapters.js';

describe('BOOKS', () => {
  it('has 6 books (5 main + 1 bonus)', () => {
    expect(BOOKS).toHaveLength(6);
  });

  it('each book references valid chapter IDs', () => {
    const chapterIds = new Set(CHAPTERS.map(c => c.id));
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
    expect(BOOKS.filter(b => b.isBonus)).toHaveLength(1);
  });
});

describe('CHAPTERS', () => {
  it('has 18 chapters (6 books x 3)', () => {
    expect(CHAPTERS).toHaveLength(18);
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

  it('duel chapters include tri-sorcier mechanic', () => {
    // Chapitres duel = ceux avec 2 verbes
    const duels = CHAPTERS.filter(c => c.verbs.length > 1 && c.tense !== 'mixed');
    for (const ch of duels) {
      const mechanics = ch.steps.map(s => s.mechanic);
      expect(mechanics).toContain('tri-sorcier');
    }
  });

  it('single-verb chapters do not use tri-sorcier', () => {
    const singles = CHAPTERS.filter(c => c.verbs.length === 1);
    for (const ch of singles) {
      const mechanics = ch.steps.map(s => s.mechanic);
      expect(mechanics).not.toContain('tri-sorcier');
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
```

**Step 2: Lancer le test — il echoue**

Run: `pnpm --filter @plumi/shared test -- chapters.test.ts`
Expected: FAIL (chapters don't have steps yet)

**Step 3: Reecrire chapters.ts**

Reecrire `packages/shared/src/chapters.ts` avec 6 livres et 18 chapitres.
Chaque chapitre definit sa sequence de `ChapterStep[]`.

Structure des 6 livres :

```
Livre 1 — Le Jardin des Mots (P1, decouverte, present)
  Ch 1: Decouvrir ETRE  (grimoire x2 + potion x2 = 4 etapes)
  Ch 2: Decouvrir AVOIR (grimoire x2 + potion x2 = 4 etapes)
  Ch 3: Duel ETRE vs AVOIR (tri x2 + grimoire + potion + boss = 5 etapes)

Livre 2 — Le Livre des Fondations (P2, present, consolidation)
  Ch 4: Maitriser ETRE  (grimoire x2 + potion x2 + boss = 5 etapes)
  Ch 5: Maitriser AVOIR (grimoire x2 + potion x2 + boss = 5 etapes)
  Ch 6: Duel avance (tri x2 + grimoire + potion + boss = 5 etapes)

Livre 3 — La Clairiere Enchantee (P3, present + GN)
  Ch 7: ETRE + GN (grimoire + potion + pont + potion-gn = 4 etapes)
  Ch 8: AVOIR + GN (grimoire + potion + pont + potion-gn = 4 etapes)
  Ch 9: Duel + GN (tri + grimoire + potion + pont + boss = 5 etapes)

Livre 4 — Les Sentiers du Futur (P4, futur)
  Ch 10: ETRE futur  (grimoire x2 + potion x2 = 4 etapes)
  Ch 11: AVOIR futur (grimoire x2 + potion x2 = 4 etapes)
  Ch 12: Duel futur  (tri x2 + grimoire + potion + boss = 5 etapes)

Livre 5 — Les Brumes du Passe (P5, imparfait)
  Ch 13: ETRE imparfait  (grimoire x2 + potion x2 = 4 etapes)
  Ch 14: AVOIR imparfait (grimoire x2 + potion x2 = 4 etapes)
  Ch 15: Duel imparfait  (tri x2 + grimoire + potion + boss = 5 etapes)

Livre 6 — Le Flux Temporel (Bonus, mixed)
  Ch 16: Maitre ETRE   (grimoire + potion + grimoire + potion = 4 etapes)
  Ch 17: Maitre AVOIR  (grimoire + potion + grimoire + potion = 4 etapes)
  Ch 18: Boss Final    (tri + grimoire + potion + boss = 4 etapes)
```

Chaque etape precise : `mechanic`, `pronouns` (tableau), `verbs` (optionnel), `questionCount` (3-4), `isBoss` (optionnel).

Progression des pronoms dans les etapes :
- Etape 1 : `['je', 'tu']`
- Etape 2 : `['il/elle/on', 'nous']`
- Etape 3 : `['vous', 'ils/elles']`
- Etape 4+ / Boss : tous les pronoms (pas de filtre = undefined)

**Step 4: Lancer les tests**

Run: `pnpm --filter @plumi/shared test -- chapters.test.ts`
Expected: PASS

**Step 5: Lancer tous les tests shared**

Run: `pnpm --filter @plumi/shared test`
Expected: ALL PASS

**Step 6: Build shared**

Run: `pnpm --filter @plumi/shared build`
Expected: PASS

**Step 7: Commit**

```bash
git add packages/shared/src/chapters.ts packages/shared/src/chapters.test.ts
git commit -m "feat(shared): rewrite chapters with 6 books, 18 chapters and pedagogical step sequences"
```

---

### Task 4: Exporter une helper getChaptersForBook

**Files:**
- Modify: `packages/shared/src/chapters.ts`
- Modify: `packages/shared/src/index.ts`

**Step 1: Ajouter helpers dans chapters.ts**

```typescript
/** Recupere les chapitres d'un livre */
export function getChaptersForBook(bookId: number): Chapter[] {
  const book = BOOKS.find(b => b.id === bookId);
  if (!book) return [];
  return book.chapters.map(id => CHAPTERS.find(c => c.id === id)!);
}

/** Recupere un chapitre par ID */
export function getChapter(chapterId: number): Chapter | undefined {
  return CHAPTERS.find(c => c.id === chapterId);
}

/** Recupere le livre qui contient un chapitre */
export function getBookForChapter(chapterId: number): Book | undefined {
  return BOOKS.find(b => b.chapters.includes(chapterId));
}
```

**Step 2: Exporter dans index.ts**

Ajouter `getChaptersForBook`, `getChapter`, `getBookForChapter` aux exports.

**Step 3: Build + test**

Run: `pnpm --filter @plumi/shared build`
Expected: PASS

**Step 4: Commit**

```bash
git add packages/shared/src/chapters.ts packages/shared/src/index.ts
git commit -m "feat(shared): add getChaptersForBook, getChapter, getBookForChapter helpers"
```

---

## Phase 2 : Frontend — Chapter Progress Store

### Task 5: Creer le store chapter-progress

**Files:**
- Create: `apps/frontend/src/stores/chapter-progress.ts`

**Step 1: Creer le store**

```typescript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { BOOKS, CHAPTERS, getChaptersForBook } from '@plumi/shared';

export interface ChapterScore {
  chapterId: number;
  score: number;
  total: number;
  stars: number; // 1, 2 ou 3
}

const STORAGE_KEY = 'plumi-chapter-progress';

function computeStars(score: number, total: number): number {
  if (total === 0) return 1;
  const ratio = score / total;
  if (ratio >= 0.9) return 3;
  if (ratio >= 0.7) return 2;
  return 1;
}

export const useChapterProgressStore = defineStore('chapter-progress', () => {
  // --- State ---
  const completedChapters = ref<Map<number, ChapterScore>>(new Map());

  // --- Init from localStorage ---
  function loadProgress() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const entries: [number, ChapterScore][] = JSON.parse(raw);
      completedChapters.value = new Map(entries);
    }
  }

  function saveProgress() {
    const entries = Array.from(completedChapters.value.entries());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }

  // --- Getters ---

  /** Etoiles pour un chapitre (0 si non complete) */
  function getStars(chapterId: number): number {
    return completedChapters.value.get(chapterId)?.stars ?? 0;
  }

  /** Le chapitre est-il complete ? */
  function isChapterCompleted(chapterId: number): boolean {
    return completedChapters.value.has(chapterId);
  }

  /** Le livre est-il complete ? (3 chapitres termines) */
  function isBookCompleted(bookId: number): boolean {
    const chapters = getChaptersForBook(bookId);
    return chapters.every(ch => isChapterCompleted(ch.id));
  }

  /** Prochain chapitre recommande (premier non-complete, en ordre) */
  const recommendedChapterId = computed<number | null>(() => {
    for (const book of BOOKS) {
      if (book.isBonus) continue;
      for (const chId of book.chapters) {
        if (!completedChapters.value.has(chId)) return chId;
      }
    }
    // Tous finis ? Recommander le bonus
    const bonus = BOOKS.find(b => b.isBonus);
    if (bonus) {
      for (const chId of bonus.chapters) {
        if (!completedChapters.value.has(chId)) return chId;
      }
    }
    return null;
  });

  /** Livre recommande (celui qui contient le chapitre recommande) */
  const recommendedBookId = computed<number | null>(() => {
    if (!recommendedChapterId.value) return null;
    const book = BOOKS.find(b => b.chapters.includes(recommendedChapterId.value!));
    return book?.id ?? null;
  });

  /** Le bonus est-il debloque ? */
  const isBonusUnlocked = computed(() => {
    return BOOKS.filter(b => !b.isBonus).every(b => isBookCompleted(b.id));
  });

  // --- Actions ---

  function completeChapter(chapterId: number, score: number, total: number) {
    const stars = computeStars(score, total);
    const existing = completedChapters.value.get(chapterId);

    // Garder le meilleur score
    if (!existing || stars > existing.stars) {
      completedChapters.value.set(chapterId, { chapterId, score, total, stars });
    }
    saveProgress();
  }

  function resetProgress() {
    completedChapters.value.clear();
    localStorage.removeItem(STORAGE_KEY);
  }

  // Load on init
  loadProgress();

  return {
    completedChapters,
    getStars,
    isChapterCompleted,
    isBookCompleted,
    recommendedChapterId,
    recommendedBookId,
    isBonusUnlocked,
    completeChapter,
    resetProgress,
  };
});
```

**Step 2: Typecheck**

Run: `make typecheck`
Expected: PASS (ou erreurs pre-existantes seulement)

**Step 3: Commit**

```bash
git add apps/frontend/src/stores/chapter-progress.ts
git commit -m "feat(frontend): add chapter-progress store with localStorage persistence"
```

---

## Phase 3 : Game Components — Mode Embedded

### Task 6: Ajouter mode embedded aux 5 composants mini-jeu

Chaque composant de jeu doit supporter un mode `embedded` ou :
- Il ne montre PAS son propre ecran de resultat (GameResult)
- Il emet `'step-complete'` avec `{ score, total, results }` quand `isFinished` devient true
- Il accepte des props supplementaires : `count`, `verbs`, `pronouns`

**Files:**
- Modify: `apps/frontend/src/components/game/GrimoireGame.vue`
- Modify: `apps/frontend/src/components/game/TriSorcierGame.vue`
- Modify: `apps/frontend/src/components/game/PotionGame.vue`
- Modify: `apps/frontend/src/components/game/PontAccordsGame.vue`
- Modify: `apps/frontend/src/components/game/PotionGnGame.vue`

**Pattern commun pour chaque composant :**

**Step 1: Ajouter les props et emit a GrimoireGame.vue**

```typescript
const props = withDefaults(defineProps<{
  tense?: Tense;
  embedded?: boolean;
  count?: number;
  verbs?: VerbId[];
  pronouns?: Pronoun[];
}>(), {
  tense: 'present',
  embedded: false,
  count: 10,
});

const emit = defineEmits<{
  home: [];
  'step-complete': [payload: { score: number; total: number; results: (AnswerResult | null)[] }];
}>();
```

**Step 2: Passer les options au store**

Modifier l'appel `startGame` :

```typescript
game.startGame(props.tense, props.count, {
  verbs: props.verbs,
  pronouns: props.pronouns,
});
```

Cela necessite de modifier le store `grimoire.ts` pour accepter ces params et les passer a `generateGrimoireItems`.

**Step 3: Emettre step-complete en mode embedded**

Ajouter un watcher :

```typescript
if (props.embedded) {
  watch(
    () => game.isFinished,
    (finished) => {
      if (finished) {
        emit('step-complete', {
          score: game.score,
          total: game.items.length,
          results: [...game.results],
        });
      }
    },
  );
}
```

**Step 4: Conditionner l'affichage du resultat**

```html
<template v-if="game.isFinished && !embedded">
  <!-- GameResult existant -->
</template>
```

**Step 5: Repeter pour les 4 autres composants**

Meme pattern pour TriSorcierGame, PotionGame, PontAccordsGame, PotionGnGame.

Chaque store doit etre modifie pour accepter `count` et les options de filtrage :
- `game.ts` (tri-sorcier): `startGame(tense, count, { pronouns })`
- `grimoire.ts`: `startGame(tense, count, { verbs, pronouns })`
- `potion.ts`: `startGame(tenses, count, { pronouns })`
- `pont-accords.ts`: `startGame(count)` (pas de conjugaison, pas de filtrage pronom)
- `potion-gn.ts`: `startGame(count)` (idem)

**Step 6: Typecheck**

Run: `make typecheck`
Expected: PASS

**Step 7: Commit**

```bash
git add apps/frontend/src/components/game/*.vue apps/frontend/src/stores/*.ts
git commit -m "feat(frontend): add embedded mode to all 5 mini-game components"
```

---

## Phase 4 : Nouveaux Composants

### Task 7: Creer ChapterResult.vue

**Files:**
- Create: `apps/frontend/src/components/game/ChapterResult.vue`

**Step 1: Creer le composant**

Le composant recoit `score`, `total`, `stars` et emet `replay` ou `continue`.

```typescript
const props = defineProps<{
  score: number;
  total: number;
  stars: number;
}>();

const emit = defineEmits<{
  replay: [];
  continue: [];
}>();

const messages: Record<number, string> = {
  1: 'Tu as fini l\'aventure !',
  2: 'Bravo, tu maitrises le sort !',
  3: 'Incroyable, tu es un vrai magicien !',
};
```

Template : 3 etoiles (remplies selon `stars`), message, score X/Y, 2 boutons MagicButton.

**Step 2: Typecheck**

Run: `make typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/frontend/src/components/game/ChapterResult.vue
git commit -m "feat(frontend): add ChapterResult component with stars display"
```

---

### Task 8: Creer ChapterRunner.vue — l'orchestrateur

**Files:**
- Create: `apps/frontend/src/components/game/ChapterRunner.vue`

C'est le composant le plus complexe. Il orchestre la sequence des mini-jeux.

**Step 1: Creer le composant**

Props : `chapterId: number`
Emits : `home`, `chapter-complete`

Logique interne :
1. Charger le chapitre depuis `getChapter(chapterId)`
2. State : `currentStepIndex`, `stepScores[]`, `showingNarrative`, `showingResult`
3. Au mount : afficher l'ecran narratif (phrase Plumi, 3s) puis demarrer step 0
4. Pour chaque step : rendre le bon composant en mode `embedded`
5. Sur `step-complete` : enregistrer le score, incrementer `currentStepIndex`
6. Transition entre steps : breve animation (0.5s fade)
7. Quand toutes les steps sont finies : calculer score total, afficher ChapterResult
8. Sur `replay` : reset et recommencer
9. Sur `continue` : emettre `chapter-complete` avec score

```typescript
// Mapping step mechanic -> component
const mechanicComponents: Record<StepMechanic, Component> = {
  'tri-sorcier': TriSorcierGame,
  'grimoire': GrimoireGame,
  'potion': PotionGame,
  'pont-accords': PontAccordsGame,
  'potion-gn': PotionGnGame,
};
```

Template structure :

```html
<!-- Ecran narratif -->
<div v-if="showingNarrative">
  <p class="text-2xl text-purple-200 text-center font-learning">{{ chapter.narrative }}</p>
</div>

<!-- Step en cours -->
<component
  v-else-if="currentStep && !showingResult"
  :is="currentComponent"
  :tense="chapter.tense === 'mixed' ? 'present' : chapter.tense"
  :count="currentStep.questionCount"
  :verbs="currentStep.verbs ?? chapter.verbs"
  :pronouns="currentStep.pronouns"
  embedded
  @step-complete="onStepComplete"
/>

<!-- Resultat chapitre -->
<ChapterResult
  v-else-if="showingResult"
  :score="totalScore"
  :total="totalQuestions"
  :stars="stars"
  @replay="replay"
  @continue="onContinue"
/>
```

**Step 2: Gestion quit avec ConfirmModal**

Bouton croix en haut a gauche avec ConfirmModal comme dans PotionGame.

**Step 3: Progress bar globale du chapitre**

En haut, afficher : "Etape X / Y" + barre de progression visuelle.

**Step 4: Typecheck**

Run: `make typecheck`
Expected: PASS

**Step 5: Commit**

```bash
git add apps/frontend/src/components/game/ChapterRunner.vue
git commit -m "feat(frontend): add ChapterRunner orchestrator component"
```

---

### Task 9: Creer BookView.vue

**Files:**
- Create: `apps/frontend/src/components/game/BookView.vue`

**Step 1: Creer le composant**

Props : `bookId: number`
Emits : `back`, `play-chapter`

Utilise `useChapterProgressStore` pour afficher l'etat des chapitres.

Template : chemin visuel de 3 chapitres relies par des lignes.
- Chapitre complete : etoiles dorees, tapable (rejouable)
- Chapitre recommande : gros bouton "Jouer" avec glow
- Chapitre futur : visible mais sans bouton proéminent, tout de meme tapable

Header : bouton retour + titre du livre + subtitle.

**Step 2: Typecheck**

Run: `make typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/frontend/src/components/game/BookView.vue
git commit -m "feat(frontend): add BookView component with chapter path visualization"
```

---

## Phase 5 : Integration — Navigation

### Task 10: Refondre BookShelf.vue et BookCard.vue

**Files:**
- Modify: `apps/frontend/src/components/game/BookShelf.vue`
- Modify: `apps/frontend/src/components/game/BookCard.vue`

**Step 1: Simplifier BookCard**

BookCard ne montre plus de boutons de mini-jeux. Il affiche :
- Icone livre avec couleur thematique
- Titre + sous-titre
- Badges scolaires (schoolTerms)
- Etoiles de progression (ex: "4/9 etoiles")
- Badge "En cours" ou "Termine" ou rien
- Badge "Bonus" si applicable, grise si verrouille
- Glow anime si recommande

Nouvelles props :

```typescript
const props = defineProps<{
  book: Book;
  stars: number;       // total etoiles obtenues dans ce livre (0-9)
  maxStars: number;    // 9 (3 chapitres x 3 etoiles max)
  isRecommended: boolean;
  isLocked: boolean;
}>();

defineEmits<{
  select: [bookId: number];
}>();
```

Supprimer les imports de MiniGame, GameButton, Adventure et les icons de jeux.

**Step 2: Modifier BookShelf**

Remplacer `ADVENTURES` par `BOOKS` de `@plumi/shared`.
Utiliser `useChapterProgressStore` pour calculer les etoiles par livre.
Emettre `'select-book'` au lieu de `'play'`.

```typescript
import { BOOKS, getChaptersForBook } from '@plumi/shared';
import { useChapterProgressStore } from '@/stores/chapter-progress';

const progress = useChapterProgressStore();

function bookStars(bookId: number): number {
  const chapters = getChaptersForBook(bookId);
  return chapters.reduce((sum, ch) => sum + progress.getStars(ch.id), 0);
}
```

**Step 3: Supprimer adventures.ts**

Delete `apps/frontend/src/data/adventures.ts`.

**Step 4: Typecheck**

Run: `make typecheck`
Expected: PASS

**Step 5: Commit**

```bash
git add apps/frontend/src/components/game/BookShelf.vue \
       apps/frontend/src/components/game/BookCard.vue
git rm apps/frontend/src/data/adventures.ts
git commit -m "refactor(frontend): simplify BookShelf and BookCard, remove adventures.ts"
```

---

### Task 11: Mettre a jour App.vue — nouvelle navigation

**Files:**
- Modify: `apps/frontend/src/App.vue`

**Step 1: Refondre la navigation**

Nouveau type Screen :

```typescript
type Screen = 'home' | 'bookshelf' | 'book-view' | 'chapter-runner';
```

Nouveaux state refs :

```typescript
const screen = ref<Screen>('home');
const selectedBookId = ref<number>(1);
const selectedChapterId = ref<number>(1);
```

Supprimer `selectedAdventure`, `goToGame`, les imports des 5 jeux individuels.

Template :

```html
<!-- Home screen (inchange) -->
<div v-if="screen === 'home'"> ... </div>

<!-- Bookshelf -->
<BookShelf
  v-else-if="screen === 'bookshelf'"
  @home="screen = 'home'"
  @select-book="onSelectBook"
/>

<!-- Book view -->
<BookView
  v-else-if="screen === 'book-view'"
  :book-id="selectedBookId"
  @back="screen = 'bookshelf'"
  @play-chapter="onPlayChapter"
/>

<!-- Chapter runner -->
<ChapterRunner
  v-else-if="screen === 'chapter-runner'"
  :chapter-id="selectedChapterId"
  @home="screen = 'book-view'"
  @chapter-complete="onChapterComplete"
/>
```

Handlers :

```typescript
function onSelectBook(bookId: number) {
  selectedBookId.value = bookId;
  screen.value = 'book-view';
}

function onPlayChapter(chapterId: number) {
  selectedChapterId.value = chapterId;
  screen.value = 'chapter-runner';
}

function onChapterComplete(result: { score: number; total: number }) {
  const progress = useChapterProgressStore();
  progress.completeChapter(selectedChapterId.value, result.score, result.total);
  screen.value = 'book-view';
}
```

**Step 2: Nettoyer les imports**

Supprimer les imports de TriSorcierGame, GrimoireGame, PotionGame, PontAccordsGame, PotionGnGame depuis App.vue (ils sont maintenant enfants de ChapterRunner).

Supprimer l'import de `ADVENTURES` et le type `Adventure`.

**Step 3: Typecheck**

Run: `make typecheck`
Expected: PASS

**Step 4: Test manuel**

Run: `make dev`
Verifier :
1. Home -> Jouer -> Bibliotheque (6 livres)
2. Tap livre -> BookView (3 chapitres)
3. Tap Jouer -> ChapterRunner (narrative puis exercices)
4. Fin chapitre -> ChapterResult (etoiles)
5. Continuer -> retour BookView (chapitre suivant recommande)
6. Navigations retour (BookView -> Bookshelf -> Home)

**Step 5: Commit**

```bash
git add apps/frontend/src/App.vue
git commit -m "feat(frontend): wire new navigation flow Home -> Bookshelf -> BookView -> ChapterRunner"
```

---

### Task 12: Nettoyage final et typecheck global

**Files:**
- Verify: all files compile cleanly

**Step 1: Typecheck complet**

Run: `make typecheck`
Expected: 0 errors

**Step 2: Verifier qu'aucun import mort ne reste**

Chercher les references orphelines a `Adventure`, `MiniGame`, `adventures.ts`, `goToGame`.

**Step 3: Supprimer le code mort**

Si `BookCard.vue` exporte encore le type `MiniGame` ou `Adventure`, les supprimer.
Si des composants referent encore aux anciens types, mettre a jour.

**Step 4: Build shared final**

Run: `pnpm --filter @plumi/shared build`
Expected: PASS

**Step 5: Commit final**

```bash
git add -A
git commit -m "chore: cleanup dead imports and types after navigation refactor"
```

---

## Resume des Commits

| # | Message | Phase |
|---|---------|-------|
| 1 | `feat(shared): add ChapterStep and StepMechanic types` | Shared types |
| 2 | `feat(shared): add pronoun filtering to generators` | Shared generators |
| 3 | `feat(shared): rewrite chapters with 6 books, 18 chapters` | Shared data |
| 4 | `feat(shared): add chapter helper functions` | Shared helpers |
| 5 | `feat(frontend): add chapter-progress store` | Frontend store |
| 6 | `feat(frontend): add embedded mode to mini-game components` | Game components |
| 7 | `feat(frontend): add ChapterResult component` | New component |
| 8 | `feat(frontend): add ChapterRunner orchestrator` | New component |
| 9 | `feat(frontend): add BookView component` | New component |
| 10 | `refactor(frontend): simplify BookShelf/BookCard, remove adventures.ts` | Navigation |
| 11 | `feat(frontend): wire new navigation flow` | Integration |
| 12 | `chore: cleanup dead imports` | Cleanup |
