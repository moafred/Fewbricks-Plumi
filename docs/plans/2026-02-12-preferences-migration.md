# Migration localStorage → @capacitor/preferences

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remplacer localStorage par `@capacitor/preferences` (stockage natif fiable) et supprimer la config API inutilisée.

**Architecture:** Un `StorageService` singleton charge toutes les clés en mémoire au démarrage (async), puis expose une API sync `getItem/setItem/removeItem`. Les stores Pinia restent synchrones — seul l'import change. Sur web, fallback transparent vers localStorage.

**Tech Stack:** `@capacitor/preferences` (Capacitor 8), Pinia, TypeScript

---

### Task 1: Supprimer la config API inutilisée

**Files:**
- Delete: `apps/frontend/src/config/api.ts`

**Step 1: Supprimer le fichier**

Supprimer `apps/frontend/src/config/api.ts` — confirmé par grep : aucun import nulle part dans le frontend.

**Step 2: Vérifier que le typecheck passe**

Run: `cd /home/fred/workspace/perso/Fewbricks-Plumi && make typecheck`
Expected: PASS (aucun fichier n'importe api.ts)

**Step 3: Commit**

```bash
git add -u apps/frontend/src/config/api.ts
git commit -m "chore: remove unused API config

The frontend has zero API calls — all data is stored locally.
Removing dead code before migrating to @capacitor/preferences."
```

---

### Task 2: Installer @capacitor/preferences

**Files:**
- Modify: `apps/frontend/package.json`

**Step 1: Installer le package**

Run: `cd /home/fred/workspace/perso/Fewbricks-Plumi/apps/frontend && pnpm add @capacitor/preferences`

Expected: ajout dans `dependencies` de `package.json`

**Step 2: Commit**

```bash
git add apps/frontend/package.json pnpm-lock.yaml
git commit -m "chore: add @capacitor/preferences dependency"
```

---

### Task 3: Créer le StorageService

**Files:**
- Create: `apps/frontend/src/services/storage.ts`

**Step 1: Écrire le service**

```typescript
import { Preferences } from '@capacitor/preferences';

/**
 * Service de stockage avec cache synchrone.
 *
 * Charge toutes les clés Preferences en mémoire au démarrage,
 * puis expose une API synchrone getItem/setItem/removeItem.
 * Les écritures persistent en arrière-plan via Preferences.set().
 * Sur web, Preferences utilise localStorage comme backend automatiquement.
 */

const cache = new Map<string, string>();
let initialized = false;

/** Clés utilisées par l'application — chargées au démarrage */
const KNOWN_KEYS = [
  'plumi-children',
  'plumi-active-child',
  'plumi-chapter-progress',
] as const;

/**
 * Initialise le cache en chargeant toutes les clés connues + clés dynamiques.
 * DOIT être appelé avant le montage de l'app (dans main.ts).
 */
export async function initStorage(): Promise<void> {
  if (initialized) return;

  // Charger les clés statiques connues
  for (const key of KNOWN_KEYS) {
    const { value } = await Preferences.get({ key });
    if (value !== null) {
      cache.set(key, value);
    }
  }

  // Charger les clés dynamiques (progression par enfant : plumi-chapter-progress-{uuid})
  const { keys } = await Preferences.keys();
  for (const key of keys) {
    if (!cache.has(key)) {
      const { value } = await Preferences.get({ key });
      if (value !== null) {
        cache.set(key, value);
      }
    }
  }

  initialized = true;
}

/** Lecture synchrone depuis le cache */
export function getItem(key: string): string | null {
  return cache.get(key) ?? null;
}

/** Écriture synchrone dans le cache + persistance async */
export function setItem(key: string, value: string): void {
  cache.set(key, value);
  Preferences.set({ key, value });
}

/** Suppression synchrone du cache + persistance async */
export function removeItem(key: string): void {
  cache.delete(key);
  Preferences.remove({ key });
}
```

**Step 2: Typecheck**

Run: `cd /home/fred/workspace/perso/Fewbricks-Plumi && make typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/frontend/src/services/storage.ts
git commit -m "feat: add StorageService with sync cache over @capacitor/preferences"
```

---

### Task 4: Initialiser StorageService au démarrage

**Files:**
- Modify: `apps/frontend/src/main.ts`

**Step 1: Ajouter initStorage avant le montage**

Remplacer le contenu de `main.ts` :

```typescript
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { initializeCapacitor } from './plugins/capacitor';
import { initStorage } from './services/storage';
import './assets/main.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);

// Initialise Capacitor + Storage avant le montage
// Les stores Pinia lisent le cache sync au premier accès
initializeCapacitor()
  .then(() => initStorage())
  .then(() => {
    app.mount('#app');
  });
```

**Step 2: Typecheck**

Run: `cd /home/fred/workspace/perso/Fewbricks-Plumi && make typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/frontend/src/main.ts
git commit -m "feat: initialize StorageService before app mount"
```

---

### Task 5: Migrer player.ts vers StorageService

**Files:**
- Modify: `apps/frontend/src/stores/player.ts`

**Step 1: Remplacer localStorage par StorageService**

Changements :
- Import `getItem`, `setItem`, `removeItem` depuis `@/services/storage`
- `localStorage.getItem(key)` → `getItem(key)`
- `localStorage.setItem(key, value)` → `setItem(key, value)`
- `localStorage.removeItem(key)` → `removeItem(key)`

```typescript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ChildProfile, AvatarColor } from '@plumi/shared';
import { MAX_CHILDREN } from '@plumi/shared';
import { useChapterProgressStore } from './chapter-progress';
import { getItem, setItem, removeItem } from '@/services/storage';

const STORAGE_KEY = 'plumi-children';
const ACTIVE_KEY = 'plumi-active-child';

export const usePlayerStore = defineStore('player', () => {
  const children = ref<ChildProfile[]>([]);
  const activeChildId = ref<string | null>(null);

  function load() {
    const raw = getItem(STORAGE_KEY);
    if (raw) {
      children.value = JSON.parse(raw);
    }
    activeChildId.value = getItem(ACTIVE_KEY);
  }

  function save() {
    setItem(STORAGE_KEY, JSON.stringify(children.value));
    if (activeChildId.value) {
      setItem(ACTIVE_KEY, activeChildId.value);
    } else {
      removeItem(ACTIVE_KEY);
    }
  }

  const activeChild = computed(() =>
    children.value.find((c) => c.id === activeChildId.value) ?? null,
  );

  const canAddChild = computed(() => children.value.length < MAX_CHILDREN);

  const hasChildren = computed(() => children.value.length > 0);

  function addChild(name: string, avatarColor: AvatarColor): ChildProfile {
    const child: ChildProfile = {
      id: crypto.randomUUID(),
      name: name.slice(0, 12),
      avatarColor,
      createdAt: Date.now(),
    };
    children.value.push(child);
    save();
    return child;
  }

  function removeChild(id: string) {
    children.value = children.value.filter((c) => c.id !== id);
    if (activeChildId.value === id) {
      activeChildId.value = children.value[0]?.id ?? null;
    }
    removeItem(`plumi-chapter-progress-${id}`);
    save();
  }

  function switchChild(id: string) {
    const child = children.value.find((c) => c.id === id);
    if (!child) return;
    activeChildId.value = id;
    save();
    const chapterProgress = useChapterProgressStore();
    chapterProgress.loadProgressForChild(id);
  }

  load();

  return {
    children,
    activeChildId,
    activeChild,
    canAddChild,
    hasChildren,
    addChild,
    removeChild,
    switchChild,
  };
});
```

**Step 2: Typecheck**

Run: `cd /home/fred/workspace/perso/Fewbricks-Plumi && make typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/frontend/src/stores/player.ts
git commit -m "refactor: migrate player store from localStorage to StorageService"
```

---

### Task 6: Migrer chapter-progress.ts vers StorageService

**Files:**
- Modify: `apps/frontend/src/stores/chapter-progress.ts`

**Step 1: Remplacer localStorage par StorageService**

Même pattern : remplacer tous les `localStorage.*` par les fonctions du StorageService.

```typescript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Subject } from '@plumi/shared';
import { getBooksForSubject, getChaptersForBook } from '@plumi/shared';
import { getItem, setItem, removeItem } from '@/services/storage';

export interface ChapterScore {
  chapterId: number;
  score: number;
  total: number;
  stars: number;
}

const STORAGE_KEY = 'plumi-chapter-progress';

function storageKeyForChild(childId: string | null): string {
  return childId ? `${STORAGE_KEY}-${childId}` : STORAGE_KEY;
}

function computeStars(score: number, total: number): number {
  if (total === 0) return 1;
  const ratio = score / total;
  if (ratio >= 0.9) return 3;
  if (ratio >= 0.7) return 2;
  return 1;
}

export const useChapterProgressStore = defineStore('chapter-progress', () => {
  const completedChapters = ref<Map<number, ChapterScore>>(new Map());
  const activeChildId = ref<string | null>(null);

  function loadProgress(childId?: string | null) {
    const key = storageKeyForChild(childId ?? activeChildId.value);
    const raw = getItem(key);
    completedChapters.value = raw ? new Map(JSON.parse(raw)) : new Map();
  }

  function saveProgress() {
    const key = storageKeyForChild(activeChildId.value);
    const entries = Array.from(completedChapters.value.entries());
    setItem(key, JSON.stringify(entries));
  }

  function loadProgressForChild(childId: string) {
    const globalData = getItem(STORAGE_KEY);
    const childKey = storageKeyForChild(childId);
    if (globalData && !getItem(childKey)) {
      setItem(childKey, globalData);
      removeItem(STORAGE_KEY);
    }

    activeChildId.value = childId;
    loadProgress(childId);
  }

  function getStars(chapterId: number): number {
    return completedChapters.value.get(chapterId)?.stars ?? 0;
  }

  function isChapterCompleted(chapterId: number): boolean {
    return completedChapters.value.has(chapterId);
  }

  function isBookCompleted(bookId: number): boolean {
    const chapters = getChaptersForBook(bookId);
    return chapters.every((ch) => isChapterCompleted(ch.id));
  }

  function getRecommendedChapterIdForSubject(subject: Subject): number | null {
    const books = getBooksForSubject(subject);
    for (const book of books) {
      if (book.isBonus) continue;
      for (const chId of book.chapters) {
        if (!completedChapters.value.has(chId)) return chId;
      }
    }
    const bonus = books.find((b) => b.isBonus);
    if (bonus) {
      for (const chId of bonus.chapters) {
        if (!completedChapters.value.has(chId)) return chId;
      }
    }
    return null;
  }

  function getRecommendedBookIdForSubject(subject: Subject): number | null {
    const chId = getRecommendedChapterIdForSubject(subject);
    if (!chId) return null;
    const books = getBooksForSubject(subject);
    const book = books.find((b) => b.chapters.includes(chId));
    return book?.id ?? null;
  }

  function isBonusUnlockedForSubject(subject: Subject): boolean {
    const books = getBooksForSubject(subject);
    return books.filter((b) => !b.isBonus).every((b) => isBookCompleted(b.id));
  }

  const recommendedChapterId = computed<number | null>(() => getRecommendedChapterIdForSubject('francais'));
  const recommendedBookId = computed<number | null>(() => getRecommendedBookIdForSubject('francais'));
  const isBonusUnlocked = computed(() => isBonusUnlockedForSubject('francais'));

  function completeChapter(chapterId: number, score: number, total: number) {
    const stars = computeStars(score, total);
    const existing = completedChapters.value.get(chapterId);

    if (!existing || stars > existing.stars) {
      completedChapters.value.set(chapterId, { chapterId, score, total, stars });
    }
    saveProgress();
  }

  function resetProgress() {
    completedChapters.value.clear();
    const key = storageKeyForChild(activeChildId.value);
    removeItem(key);
  }

  loadProgress();

  return {
    completedChapters,
    getStars,
    isChapterCompleted,
    isBookCompleted,
    recommendedChapterId,
    recommendedBookId,
    isBonusUnlocked,
    getRecommendedChapterIdForSubject,
    getRecommendedBookIdForSubject,
    isBonusUnlockedForSubject,
    completeChapter,
    resetProgress,
    loadProgressForChild,
  };
});
```

**Step 2: Typecheck**

Run: `cd /home/fred/workspace/perso/Fewbricks-Plumi && make typecheck`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/frontend/src/stores/chapter-progress.ts
git commit -m "refactor: migrate chapter-progress store from localStorage to StorageService"
```

---

### Task 7: Supprimer le dossier config/ vide

**Files:**
- Delete: `apps/frontend/src/config/` (dossier vide après suppression de api.ts)

**Step 1: Vérifier que le dossier est vide puis supprimer**

Run: `ls apps/frontend/src/config/`

Si vide, supprimer le dossier.

**Step 2: Commit final**

```bash
git add -u
git commit -m "chore: remove empty config directory"
```
