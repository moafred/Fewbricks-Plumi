# La Forêt — Intégration des mini-jeux GN

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ajouter un 5e livre "La Forêt" (Accords) sur l'étagère, contenant deux mini-jeux GN : Pont des Accords et Potion GN.

**Architecture:** Généraliser `BookCard` pour être data-driven (liste de jeux configurable par livre). Créer un store + composant pour chaque nouveau mini-jeu. Le Pont des Accords affiche un GN en slots avec un trou ; la Potion GN réutilise la mécanique phrase-à-trou de PotionGame avec des GnPotionItem.

**Tech Stack:** Vue 3, Pinia, Tailwind CSS 4, @plumi/shared (generatePontAccordsItems, generateGnPotionItems)

---

## Fichiers de référence

| Fichier | Rôle |
|---------|------|
| `apps/frontend/src/App.vue` | Orchestrateur écrans (Screen state machine) |
| `apps/frontend/src/components/game/BookShelf.vue` | Étagère des livres |
| `apps/frontend/src/components/game/BookCard.vue` | Carte d'un livre (3 boutons hardcodés) |
| `apps/frontend/src/components/game/PotionGame.vue` | Modèle pour PotionGnGame |
| `apps/frontend/src/stores/potion.ts` | Modèle pour les nouveaux stores |
| `apps/frontend/src/assets/main.css` | Design system tokens |
| `apps/frontend/src/components/icons/index.ts` | Barrel export des icônes |

---

### Task 1: Ajouter le color token `forest` (teal/cyan)

**Files:**
- Modify: `apps/frontend/src/assets/main.css`

**Step 1:** Ajouter la palette `forest` dans le bloc `@theme`, après `gentle` et avant `night` :

```css
/* Forêt — grammaire, accords, teal mystique */
--color-forest-50: #f0fdfa;
--color-forest-100: #ccfbf1;
--color-forest-200: #99f6e4;
--color-forest-300: #5eead4;
--color-forest-400: #2dd4bf;
--color-forest-500: #14b8a6;
--color-forest-600: #0d9488;
--color-forest-700: #0f766e;
--color-forest-800: #115e59;
--color-forest-900: #134e4a;
--color-forest-950: #042f2e;
```

**Step 2:** Vérifier visuellement : `make dev`, inspecter que les classes `text-forest-400`, `bg-forest-500/20` fonctionnent.

---

### Task 2: Créer `BridgeIcon.vue`

**Files:**
- Create: `apps/frontend/src/components/icons/BridgeIcon.vue`
- Modify: `apps/frontend/src/components/icons/index.ts`

**Step 1:** Créer le composant icône pont (arche avec chemin) :

```vue
<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 24 });
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <!-- Arche du pont -->
    <path
      d="M3 18C3 18 3 12 12 12C21 12 21 18 21 18"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M3 18C3 18 3 12 12 12C21 12 21 18 21 18"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <!-- Tablier du pont -->
    <path
      d="M2 18H22"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <!-- Piliers -->
    <path d="M5 18V20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <path d="M19 18V20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    <!-- Étoile au sommet -->
    <path
      d="M12 7L12.5 8.5L14 9L12.5 9.5L12 11L11.5 9.5L10 9L11.5 8.5L12 7Z"
      fill="currentColor"
    />
  </svg>
</template>
```

**Step 2:** Ajouter l'export dans `index.ts` :

```ts
export { default as BridgeIcon } from './BridgeIcon.vue';
```

---

### Task 3: Généraliser `BookCard` et `BookShelf`

**Files:**
- Modify: `apps/frontend/src/components/game/BookCard.vue`
- Modify: `apps/frontend/src/components/game/BookShelf.vue`

Ce task est le plus structurant. Actuellement BookCard hardcode 3 boutons (Tri, Grimoire, Potion). On le rend data-driven.

**Step 1:** Réécrire `BookCard.vue` :

Le nouveau `BookInfo` :

```ts
import type { Tense } from '@plumi/shared';

export type MiniGame = 'tri-sorcier' | 'grimoire' | 'potion' | 'pont-accords' | 'potion-gn';

export interface GameButton {
  game: MiniGame;
  label: string;
}

export interface BookInfo {
  id: number;
  title: string;
  subtitle: string;
  tense?: Tense;
  color: 'royal' | 'enchant' | 'mist' | 'gentle' | 'forest';
  isBonus?: boolean;
  games: GameButton[];
}
```

L'emit change :

```ts
defineEmits<{
  play: [tense: Tense | undefined, game: MiniGame];
}>();
```

Ajouter `forest` dans `colorClasses` :

```ts
forest: {
  icon: 'text-forest-400',
  bg: 'bg-forest-500/20',
  border: 'border-forest-400/30',
  hover: 'hover:bg-forest-500/30',
},
```

Mapper le game type → icône :

```ts
import { HatIcon, GrimoireIcon, PotionIcon, BridgeIcon } from '@/components/icons';
import { type Component } from 'vue';

const gameIcons: Record<MiniGame, { component: Component; colorClass: string }> = {
  'tri-sorcier': { component: HatIcon, colorClass: 'text-mist-300' },
  'grimoire': { component: GrimoireIcon, colorClass: 'text-royal-300' },
  'potion': { component: PotionIcon, colorClass: 'text-enchant-300' },
  'pont-accords': { component: BridgeIcon, colorClass: 'text-forest-300' },
  'potion-gn': { component: PotionIcon, colorClass: 'text-forest-300' },
};
```

Remplacer les 3 boutons hardcodés par une boucle :

```vue
<div class="flex gap-3 mt-2">
  <button
    v-for="gameBtn in book.games"
    :key="gameBtn.game"
    class="mini-game-btn flex flex-col items-center gap-1.5 p-4 md:p-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all min-h-20 md:min-h-0"
    :class="colors.hover"
    :aria-label="`Jouer à ${gameBtn.label} - ${book.subtitle}`"
    @click="$emit('play', book.tense, gameBtn.game)"
  >
    <component
      :is="gameIcons[gameBtn.game].component"
      :size="36"
      :class="gameIcons[gameBtn.game].colorClass"
    />
    <span class="text-xs font-bold text-purple-100">{{ gameBtn.label }}</span>
  </button>
</div>
```

**Step 2:** Réécrire `BookShelf.vue` :

Mettre à jour le type emit :

```ts
import type { Tense } from '@plumi/shared';
import BookCard, { type BookInfo, type MiniGame } from './BookCard.vue';

defineEmits<{
  home: [];
  play: [tense: Tense | undefined, game: MiniGame];
}>();
```

Mettre à jour les données des livres — les 4 existants gardent leur `tense` et reçoivent un `games` array. Ajouter le 5e livre :

```ts
const CONJUGATION_GAMES: GameButton[] = [
  { game: 'tri-sorcier', label: 'Tri' },
  { game: 'grimoire', label: 'Grimoire' },
  { game: 'potion', label: 'Potion' },
];

const GRAMMAR_GAMES: GameButton[] = [
  { game: 'pont-accords', label: 'Pont' },
  { game: 'potion-gn', label: 'Potion' },
];

const books: BookInfo[] = [
  { id: 1, title: 'Fondations', subtitle: 'Présent', tense: 'present', color: 'royal', games: CONJUGATION_GAMES },
  { id: 2, title: 'Prophéties', subtitle: 'Futur', tense: 'futur', color: 'enchant', games: CONJUGATION_GAMES },
  { id: 3, title: 'Souvenirs', subtitle: 'Imparfait', tense: 'imparfait', color: 'mist', games: CONJUGATION_GAMES },
  { id: 4, title: 'Le Temps', subtitle: 'Bonus', tense: 'passe_compose', color: 'gentle', isBonus: true, games: CONJUGATION_GAMES },
  { id: 5, title: 'La Forêt', subtitle: 'Accords', color: 'forest', games: GRAMMAR_GAMES },
];
```

Mettre à jour le forward de l'emit :

```vue
@play="(tense, game) => $emit('play', tense, game)"
```

---

### Task 4: Créer `usePontAccordsStore`

**Files:**
- Create: `apps/frontend/src/stores/pont-accords.ts`

Suivre exactement le pattern de `stores/potion.ts`. Le store gère :
- `items: PontAccordsItem[]`
- Phase machine : discovery → challenge → response → resolution
- `startGame()` appelle `generatePontAccordsItems` de `@plumi/shared`
- `submitAnswer(choice)` compare `choice === currentItem.correctAnswer`

```ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { GamePhase, AnswerResult, PontAccordsItem } from '@plumi/shared';
import { generatePontAccordsItems } from '@plumi/shared';

const DISCOVERY_DELAY = 1500;

export const usePontAccordsStore = defineStore('pont-accords', () => {
  const phase = ref<GamePhase>('discovery');
  const items = ref<PontAccordsItem[]>([]);
  const currentIndex = ref(0);
  const score = ref(0);
  const lastResult = ref<AnswerResult | null>(null);
  const selectedChoice = ref<string | null>(null);
  const correctAnswer = ref<string | null>(null);
  const results = ref<(AnswerResult | null)[]>([]);

  let phaseTimer: ReturnType<typeof setTimeout> | null = null;

  const currentItem = computed(() => items.value[currentIndex.value] ?? null);
  const isFinished = computed(() => currentIndex.value >= items.value.length && items.value.length > 0);
  const progress = computed(() => ({
    current: currentIndex.value,
    total: items.value.length,
  }));

  function clearTimer() {
    if (phaseTimer !== null) {
      clearTimeout(phaseTimer);
      phaseTimer = null;
    }
  }

  function transitionTo(newPhase: GamePhase, delay?: number) {
    if (delay) {
      phaseTimer = setTimeout(() => {
        phase.value = newPhase;
        onPhaseEnter(newPhase);
      }, delay);
    } else {
      phase.value = newPhase;
      onPhaseEnter(newPhase);
    }
  }

  function onPhaseEnter(p: GamePhase) {
    if (p === 'discovery') {
      transitionTo('challenge', DISCOVERY_DELAY);
    } else if (p === 'response') {
      transitionTo('resolution', 500);
    }
  }

  function startGame(count: number = 10) {
    clearTimer();
    items.value = generatePontAccordsItems(count);
    currentIndex.value = 0;
    score.value = 0;
    lastResult.value = null;
    selectedChoice.value = null;
    correctAnswer.value = null;
    results.value = new Array(items.value.length).fill(null);
    phase.value = 'discovery';
    onPhaseEnter('discovery');
  }

  function submitAnswer(choice: string) {
    if (phase.value !== 'challenge') return;
    clearTimer();

    const item = currentItem.value;
    if (!item) return;

    const correct = choice === item.correctAnswer;
    lastResult.value = correct ? 'correct' : 'incorrect';
    selectedChoice.value = choice;
    correctAnswer.value = item.correctAnswer;
    results.value[currentIndex.value] = lastResult.value;

    if (correct) {
      score.value++;
    }

    phase.value = 'response';
    onPhaseEnter('response');
  }

  function nextItem() {
    clearTimer();
    currentIndex.value++;
    lastResult.value = null;
    selectedChoice.value = null;
    correctAnswer.value = null;

    if (!isFinished.value) {
      phase.value = 'discovery';
      onPhaseEnter('discovery');
    }
  }

  function resetGame() {
    clearTimer();
    items.value = [];
    currentIndex.value = 0;
    score.value = 0;
    lastResult.value = null;
    selectedChoice.value = null;
    correctAnswer.value = null;
    results.value = [];
    phase.value = 'discovery';
  }

  return {
    phase, items, currentIndex, score, lastResult, selectedChoice, correctAnswer, results,
    currentItem, isFinished, progress,
    startGame, submitAnswer, nextItem, resetGame,
  };
});
```

---

### Task 5: Créer `PontAccordsGame.vue`

**Files:**
- Create: `apps/frontend/src/components/game/PontAccordsGame.vue`

Suivre le pattern de `PotionGame.vue`. Différences clés :
- Au lieu d'une phrase avec un trou (`SentenceGap`), afficher les **slots du GN** côte à côte, un slot étant le trou.
- Utiliser `usePontAccordsStore` au lieu de `usePotionStore`.
- Le hint vient de `currentItem.hint` (ex: "masculin singulier").
- Le header dit "Complète le groupe nominal !".

La zone de challenge affiche les slots :

```vue
<div class="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-4 text-3xl md:text-5xl font-learning text-night-900">
  <template v-for="(slot, i) in currentItem.slots" :key="i">
    <!-- Slot normal -->
    <span v-if="i !== currentItem.targetSlotIndex">{{ slot.label }}</span>
    <!-- Slot trou -->
    <div
      v-else
      class="inline-flex items-center justify-center min-w-[100px] px-3 py-1 border-b-4 rounded-t-lg transition-all duration-500"
      :class="gapClasses"
    >
      <span v-if="filledWord">{{ filledWord }}</span>
      <span v-else class="opacity-0">mot</span>
    </div>
  </template>
</div>
```

Le reste (header, choix, feedback, GameResult, ConfirmModal, keyboard navigation) est identique à PotionGame.

---

### Task 6: Créer `usePotionGnStore`

**Files:**
- Create: `apps/frontend/src/stores/potion-gn.ts`

Quasi-identique à `stores/potion.ts`. Différences :
- `items: GnPotionItem[]` au lieu de `VerbPotionItem[]`
- `startGame()` appelle `generateGnPotionItems(count)` au lieu de `generatePotionItems(tenses, count)`
- Pas de paramètre `tenses`

```ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { GamePhase, AnswerResult, GnPotionItem } from '@plumi/shared';
import { generateGnPotionItems } from '@plumi/shared';

const DISCOVERY_DELAY = 1500;

export const usePotionGnStore = defineStore('potion-gn', () => {
  const phase = ref<GamePhase>('discovery');
  const items = ref<GnPotionItem[]>([]);
  const currentIndex = ref(0);
  const score = ref(0);
  const lastResult = ref<AnswerResult | null>(null);
  const selectedChoice = ref<string | null>(null);
  const correctForm = ref<string | null>(null);
  const results = ref<(AnswerResult | null)[]>([]);

  let phaseTimer: ReturnType<typeof setTimeout> | null = null;

  const currentItem = computed(() => items.value[currentIndex.value] ?? null);
  const isFinished = computed(() => currentIndex.value >= items.value.length && items.value.length > 0);
  const progress = computed(() => ({
    current: currentIndex.value,
    total: items.value.length,
  }));

  function clearTimer() {
    if (phaseTimer !== null) {
      clearTimeout(phaseTimer);
      phaseTimer = null;
    }
  }

  function transitionTo(newPhase: GamePhase, delay?: number) {
    if (delay) {
      phaseTimer = setTimeout(() => {
        phase.value = newPhase;
        onPhaseEnter(newPhase);
      }, delay);
    } else {
      phase.value = newPhase;
      onPhaseEnter(newPhase);
    }
  }

  function onPhaseEnter(p: GamePhase) {
    if (p === 'discovery') {
      transitionTo('challenge', DISCOVERY_DELAY);
    } else if (p === 'response') {
      transitionTo('resolution', 500);
    }
  }

  function startGame(count: number = 10) {
    clearTimer();
    items.value = generateGnPotionItems(count);
    currentIndex.value = 0;
    score.value = 0;
    lastResult.value = null;
    selectedChoice.value = null;
    correctForm.value = null;
    results.value = new Array(items.value.length).fill(null);
    phase.value = 'discovery';
    onPhaseEnter('discovery');
  }

  function submitAnswer(choice: string) {
    if (phase.value !== 'challenge') return;
    clearTimer();

    const item = currentItem.value;
    if (!item) return;

    const correct = choice === item.correctForm;
    lastResult.value = correct ? 'correct' : 'incorrect';
    selectedChoice.value = choice;
    correctForm.value = item.correctForm;
    results.value[currentIndex.value] = lastResult.value;

    if (correct) {
      score.value++;
    }

    phase.value = 'response';
    onPhaseEnter('response');
  }

  function nextItem() {
    clearTimer();
    currentIndex.value++;
    lastResult.value = null;
    selectedChoice.value = null;
    correctForm.value = null;

    if (!isFinished.value) {
      phase.value = 'discovery';
      onPhaseEnter('discovery');
    }
  }

  function resetGame() {
    clearTimer();
    items.value = [];
    currentIndex.value = 0;
    score.value = 0;
    lastResult.value = null;
    selectedChoice.value = null;
    correctForm.value = null;
    results.value = [];
    phase.value = 'discovery';
  }

  return {
    phase, items, currentIndex, score, lastResult, selectedChoice, correctForm, results,
    currentItem, isFinished, progress,
    startGame, submitAnswer, nextItem, resetGame,
  };
});
```

---

### Task 7: Créer `PotionGnGame.vue`

**Files:**
- Create: `apps/frontend/src/components/game/PotionGnGame.vue`

Copier la structure de `PotionGame.vue` avec ces modifications :
- Importer `usePotionGnStore` au lieu de `usePotionStore`
- Pas de prop `tense` — `onMounted` appelle `store.startGame()`
- Le hint affiche `currentItem.hint` ("masculin singulier") au lieu de `currentItem.infinitive`
- Le header dit "Complète la phrase !" (identique)
- Le titre de la section affiche le hint genre/nombre au lieu de "(être)"
- Le replay appelle `store.startGame()` sans paramètre tense
- Le titre du ConfirmModal : "Quitter la Potion GN ?"

---

### Task 8: Câbler dans `App.vue`

**Files:**
- Modify: `apps/frontend/src/App.vue`

**Step 1:** Ajouter les imports :

```ts
import PontAccordsGame from '@/components/game/PontAccordsGame.vue';
import PotionGnGame from '@/components/game/PotionGnGame.vue';
import type { MiniGame } from '@/components/game/BookCard.vue';
```

**Step 2:** Étendre le type `Screen` et `goToGame` :

```ts
type Screen = 'home' | 'bookshelf' | 'tri-sorcier' | 'grimoire' | 'potion' | 'pont-accords' | 'potion-gn';

function goToGame(tense: Tense | undefined, game: MiniGame) {
  if (tense) selectedTense.value = tense;
  screen.value = game;
}
```

**Step 3:** Mettre à jour le forward d'emit sur BookShelf :

```vue
@play="goToGame"
```

**Step 4:** Ajouter les écrans de jeu dans le template :

```vue
<PontAccordsGame
  v-else-if="screen === 'pont-accords'"
  @home="screen = 'bookshelf'"
/>
<PotionGnGame
  v-else-if="screen === 'potion-gn'"
  @home="screen = 'bookshelf'"
/>
```

---

### Task 9: Typecheck + build shared

**Step 1:** Rebuild @plumi/shared :

```bash
pnpm -C packages/shared build
```

**Step 2:** Typecheck :

```bash
make typecheck
```

Expected: 0 erreurs.

**Step 3:** Test visuel :

```bash
make dev
```

Vérifier :
1. L'étagère affiche 5 livres (La Forêt en teal)
2. La Forêt a 2 boutons : Pont + Potion
3. Le Pont des Accords fonctionne (slots GN, 4 choix, feedback)
4. La Potion GN fonctionne (phrase à trou, 4 choix, hint genre/nombre)
5. Retour à l'étagère fonctionne depuis les deux jeux

---

### Task 10: Commit

```bash
git add apps/frontend/src/assets/main.css \
  apps/frontend/src/components/icons/BridgeIcon.vue \
  apps/frontend/src/components/icons/index.ts \
  apps/frontend/src/components/game/BookCard.vue \
  apps/frontend/src/components/game/BookShelf.vue \
  apps/frontend/src/components/game/PontAccordsGame.vue \
  apps/frontend/src/components/game/PotionGnGame.vue \
  apps/frontend/src/stores/pont-accords.ts \
  apps/frontend/src/stores/potion-gn.ts \
  apps/frontend/src/App.vue
git commit -m "feat: add La Forêt book with Pont des Accords and Potion GN mini-games"
```
