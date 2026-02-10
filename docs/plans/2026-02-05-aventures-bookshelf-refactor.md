# Refactoring Étagère — Aventures Narratives

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remplacer l'organisation "1 livre = 1 concept grammatical" par des aventures narratives qui mélangent conjugaison et grammaire, avec les 5 mini-jeux disponibles dans chaque aventure.

**Architecture:** Introduire un type `Adventure` centralisé qui porte la config pour les 5 jeux. Refactorer la chaîne BookShelf → BookCard → App.vue → Game Components pour propager un `adventureId` au lieu d'un `tense`. Ajouter un badge scolaire sur chaque BookCard.

**Tech Stack:** Vue 3, Pinia, Tailwind CSS 4, @plumi/shared

---

## Décision d'équipe

### Contexte

L'étagère actuelle organise les livres par concept grammatical (Présent, Futur, Imparfait, Bonus, Accords). Chaque livre propose un sous-ensemble de mini-jeux (3 pour la conjugaison, 2 pour la grammaire). Problèmes :
- Nommage scolaire inadapté aux 6-7 ans
- Séparation conjugaison/grammaire contraire aux pratiques de classe (alternance)
- Monotonie mécanique (3x les mêmes jeux d'affilée)
- L'enfant n'a pas accès à tous les jeux dans chaque contexte

### Vision validée

Chaque livre = une **aventure narrative** qui mélange conjugaison ET grammaire, avec les **5 mini-jeux** disponibles. Nommage narratif + badge scolaire discret.

### Aventures

| # | Titre narratif | Sous-titre | Badge scolaire | Couleur | Tenses | GN config |
|---|---------------|------------|----------------|---------|--------|-----------|
| 1 | Les Premiers Sorts | Le Jardin s'éveille | Présent + GN | royal | `['present']` | themes: toutes, singulier focus |
| 2 | La Clairière Enchantée | La Forêt murmure | Accords + Présent | forest | `['present']` | themes: toutes, pluriel focus |
| 3 | Les Sentiers du Futur | L'horizon s'ouvre | Futur + GN | enchant | `['futur']` | themes: toutes |
| 4 | Les Brumes du Passé | Les souvenirs dansent | Imparfait + GN | mist | `['imparfait']` | themes: toutes |
| 5 | Le Flux Temporel | Bonus | Tous les temps | gentle | `['present','futur','imparfait','passe_compose']` | themes: toutes |

### Badge scolaire UI

Sous le sous-titre narratif, un petit tag/chip semi-transparent affiche le(s) terme(s) scolaires :

```
┌─────────────────────────┐
│       📖 (BookIcon)      │
│   Les Premiers Sorts     │  ← titre narratif (gros, couleur)
│   Le Jardin s'éveille    │  ← sous-titre narratif (petit, purple-200)
│   ┌──────────────────┐   │
│   │ Présent · GN     │   │  ← badge scolaire (xs, bg-white/10, rounded-full)
│   └──────────────────┘   │
│   [Tri] [Grim] [Pot]    │
│   [Pont] [Pot GN]       │  ← 5 mini-jeux
└─────────────────────────┘
```

---

## Fichiers de référence

| Fichier | Rôle |
|---------|------|
| `apps/frontend/src/components/game/BookCard.vue` | Types BookInfo, GameButton, MiniGame + rendu carte |
| `apps/frontend/src/components/game/BookShelf.vue` | Données des livres + grille |
| `apps/frontend/src/App.vue` | Routage écrans, goToGame |
| `apps/frontend/src/stores/game.ts` | Store tri-sorcier (startGame prend tense) |
| `apps/frontend/src/stores/grimoire.ts` | Store grimoire (startGame prend tense) |
| `apps/frontend/src/stores/potion.ts` | Store potion verbe (startGame prend tenses[]) |
| `apps/frontend/src/stores/pont-accords.ts` | Store pont GN (startGame prend count) |
| `apps/frontend/src/stores/potion-gn.ts` | Store potion GN (startGame prend count) |
| `apps/frontend/src/components/game/TriSorcierGame.vue` | Prop: tense |
| `apps/frontend/src/components/game/GrimoireGame.vue` | Prop: tense |
| `apps/frontend/src/components/game/PotionGame.vue` | Prop: tense |
| `apps/frontend/src/components/game/PontAccordsGame.vue` | Pas de prop |
| `apps/frontend/src/components/game/PotionGnGame.vue` | Pas de prop |

---

### Task 1: Refactorer les types dans BookCard.vue

**Files:**
- Modify: `apps/frontend/src/components/game/BookCard.vue`

Remplacer `BookInfo` par `Adventure` et ajouter `schoolTerms`:

```ts
import type { Tense, VocabularyTheme, GapTarget } from '@plumi/shared';
import { type Component } from 'vue';
import { BookIcon, HatIcon, GrimoireIcon, PotionIcon, BridgeIcon, StarFilledIcon } from '@/components/icons';

export type MiniGame = 'tri-sorcier' | 'grimoire' | 'potion' | 'pont-accords' | 'potion-gn';

export interface GameButton {
  game: MiniGame;
  label: string;
}

export interface Adventure {
  id: number;
  title: string;
  subtitle: string;
  schoolTerms: string[];
  color: 'royal' | 'enchant' | 'mist' | 'gentle' | 'forest';
  isBonus?: boolean;
  tenses: Tense[];
  gnThemes?: VocabularyTheme[];
  gnTargetKinds?: GapTarget[];
  games: GameButton[];
}
```

Renommer la prop `book` en `adventure` :

```ts
const props = defineProps<{
  adventure: Adventure;
}>();
```

Changer l'emit — on passe l'`adventureId` au lieu du `tense` :

```ts
defineEmits<{
  play: [adventureId: number, game: MiniGame];
}>();
```

Ajouter le badge scolaire dans le template, entre le sous-titre et les boutons :

```vue
<!-- Sous-titre narratif -->
<p class="text-sm text-purple-200 text-center">
  {{ adventure.subtitle }}
</p>

<!-- Badge scolaire — lien avec l'école -->
<div class="flex flex-wrap justify-center gap-1">
  <span
    v-for="term in adventure.schoolTerms"
    :key="term"
    class="text-xs px-2 py-0.5 rounded-full bg-white/10 text-purple-300"
  >
    {{ term }}
  </span>
</div>
```

Mettre à jour le `@click` des boutons de jeu :

```vue
@click="$emit('play', adventure.id, gameBtn.game)"
```

Remplacer toutes les occurrences de `book` par `adventure` dans le template (`:class`, `v-if`, aria-label, etc.).

**Step 1:** Appliquer les changements de types et template.

**Step 2:** Vérifier que le fichier compile (`vue-tsc --noEmit` sur le frontend seul échouera tant que BookShelf et App.vue ne sont pas mis à jour — c'est attendu).

---

### Task 2: Refactorer BookShelf.vue

**Files:**
- Modify: `apps/frontend/src/components/game/BookShelf.vue`

Importer le nouveau type :

```ts
import type { Tense } from '@plumi/shared';
import BookCard, { type Adventure, type GameButton, type MiniGame } from './BookCard.vue';
import { HomeIcon } from '@/components/icons';
```

Changer l'emit :

```ts
defineEmits<{
  home: [];
  play: [adventureId: number, game: MiniGame];
}>();
```

Remplacer les constantes et données des livres :

```ts
const ALL_GAMES: GameButton[] = [
  { game: 'tri-sorcier', label: 'Tri' },
  { game: 'grimoire', label: 'Grimoire' },
  { game: 'potion', label: 'Potion' },
  { game: 'pont-accords', label: 'Pont' },
  { game: 'potion-gn', label: 'Potion GN' },
];

const adventures: Adventure[] = [
  {
    id: 1,
    title: 'Les Premiers Sorts',
    subtitle: 'Le Jardin s\'éveille',
    schoolTerms: ['Présent', 'GN'],
    tenses: ['present'],
    color: 'royal',
    games: ALL_GAMES,
  },
  {
    id: 2,
    title: 'La Clairière Enchantée',
    subtitle: 'La Forêt murmure',
    schoolTerms: ['Accords', 'Présent'],
    tenses: ['present'],
    color: 'forest',
    games: ALL_GAMES,
  },
  {
    id: 3,
    title: 'Les Sentiers du Futur',
    subtitle: 'L\'horizon s\'ouvre',
    schoolTerms: ['Futur', 'GN'],
    tenses: ['futur'],
    color: 'enchant',
    games: ALL_GAMES,
  },
  {
    id: 4,
    title: 'Les Brumes du Passé',
    subtitle: 'Les souvenirs dansent',
    schoolTerms: ['Imparfait', 'GN'],
    tenses: ['imparfait'],
    color: 'mist',
    games: ALL_GAMES,
  },
  {
    id: 5,
    title: 'Le Flux Temporel',
    subtitle: 'Bonus',
    schoolTerms: ['Tous les temps'],
    tenses: ['present', 'futur', 'imparfait', 'passe_compose'],
    color: 'gentle',
    isBonus: true,
    games: ALL_GAMES,
  },
];
```

Mettre à jour le template :

```vue
<BookCard
  v-for="adv in adventures"
  :key="adv.id"
  :adventure="adv"
  @play="(adventureId, game) => $emit('play', adventureId, game)"
/>
```

---

### Task 3: Refactorer App.vue — routing par adventureId

**Files:**
- Modify: `apps/frontend/src/App.vue`

Remplacer `selectedTense` par `selectedAdventure` :

```ts
import type { Tense } from '@plumi/shared';
import type { MiniGame, Adventure } from '@/components/game/BookCard.vue';

const screen = ref<Screen>('home');
const selectedAdventure = ref<Adventure | null>(null);

function goToGame(adventureId: number, game: MiniGame) {
  const adv = adventures.find(a => a.id === adventureId);
  if (!adv) return;
  selectedAdventure.value = adv;
  screen.value = game;
}
```

Pour accéder aux adventures, les importer depuis BookShelf ou les extraire dans un fichier partagé. L'approche la plus simple : importer BookShelf qui les exporte, ou dupliquer le tableau (non, on ne duplique pas). **Solution : extraire les adventures dans un fichier dédié `apps/frontend/src/data/adventures.ts`** importé par BookShelf et App.vue.

Mettre à jour les passages de props aux composants de jeu :

```vue
<TriSorcierGame
  v-else-if="screen === 'tri-sorcier' && selectedAdventure"
  :tense="selectedAdventure.tenses[0]"
  @home="screen = 'bookshelf'"
/>
<GrimoireGame
  v-else-if="screen === 'grimoire' && selectedAdventure"
  :tense="selectedAdventure.tenses[0]"
  @home="screen = 'bookshelf'"
/>
<PotionGame
  v-else-if="screen === 'potion' && selectedAdventure"
  :tense="selectedAdventure.tenses"
  @home="screen = 'bookshelf'"
/>
<PontAccordsGame
  v-else-if="screen === 'pont-accords'"
  @home="screen = 'bookshelf'"
/>
<PotionGnGame
  v-else-if="screen === 'potion-gn'"
  @home="screen = 'bookshelf'"
/>
```

Note : les composants GN n'ont pas de prop car ils utilisent tous les thèmes/targetKinds par défaut. C'est suffisant pour cette itération.

---

### Task 4: Extraire les adventures dans `data/adventures.ts`

**Files:**
- Create: `apps/frontend/src/data/adventures.ts`
- Modify: `apps/frontend/src/components/game/BookShelf.vue`

Créer le fichier :

```ts
import type { Adventure, GameButton } from '@/components/game/BookCard.vue';

const ALL_GAMES: GameButton[] = [
  { game: 'tri-sorcier', label: 'Tri' },
  { game: 'grimoire', label: 'Grimoire' },
  { game: 'potion', label: 'Potion' },
  { game: 'pont-accords', label: 'Pont' },
  { game: 'potion-gn', label: 'Potion GN' },
];

export const ADVENTURES: Adventure[] = [
  {
    id: 1,
    title: 'Les Premiers Sorts',
    subtitle: 'Le Jardin s\'éveille',
    schoolTerms: ['Présent', 'GN'],
    tenses: ['present'],
    color: 'royal',
    games: ALL_GAMES,
  },
  {
    id: 2,
    title: 'La Clairière Enchantée',
    subtitle: 'La Forêt murmure',
    schoolTerms: ['Accords', 'Présent'],
    tenses: ['present'],
    color: 'forest',
    games: ALL_GAMES,
  },
  {
    id: 3,
    title: 'Les Sentiers du Futur',
    subtitle: 'L\'horizon s\'ouvre',
    schoolTerms: ['Futur', 'GN'],
    tenses: ['futur'],
    color: 'enchant',
    games: ALL_GAMES,
  },
  {
    id: 4,
    title: 'Les Brumes du Passé',
    subtitle: 'Les souvenirs dansent',
    schoolTerms: ['Imparfait', 'GN'],
    tenses: ['imparfait'],
    color: 'mist',
    games: ALL_GAMES,
  },
  {
    id: 5,
    title: 'Le Flux Temporel',
    subtitle: 'Bonus',
    schoolTerms: ['Tous les temps'],
    tenses: ['present', 'futur', 'imparfait', 'passe_compose'],
    color: 'gentle',
    isBonus: true,
    games: ALL_GAMES,
  },
];
```

Mettre à jour BookShelf pour importer depuis ce fichier :

```ts
import { ADVENTURES } from '@/data/adventures';
```

Et supprimer la définition locale des données.

---

### Task 5: Typecheck + vérification

**Step 1:**

```bash
make typecheck
```

Expected: 0 erreurs.

**Step 2:** Vérification visuelle `make dev` :

1. L'étagère affiche 5 livres avec titres narratifs
2. Chaque livre a un badge scolaire sous le sous-titre
3. Chaque livre affiche 5 boutons de jeu (Tri, Grimoire, Potion, Pont, Potion GN)
4. Cliquer sur un jeu dans n'importe quelle aventure lance le bon jeu
5. Les jeux de conjugaison utilisent le bon temps selon l'aventure
6. Retour fonctionne depuis tous les jeux

---

### Task 6: Commit

```bash
git add apps/frontend/src/components/game/BookCard.vue \
  apps/frontend/src/components/game/BookShelf.vue \
  apps/frontend/src/App.vue \
  apps/frontend/src/data/adventures.ts
git commit -m "refactor: aventures narratives avec 5 mini-jeux par livre et badge scolaire"
```
