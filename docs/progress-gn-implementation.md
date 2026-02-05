# GN (Groupe Nominal) — Progression d'Implémentation

## Statut : 7/7 taches terminées

| # | Tâche | Statut | Fichiers |
|---|-------|--------|----------|
| 1 | Types GN dans `types.ts` | Done | `packages/shared/src/types.ts` |
| 2 | Données vocabulaire + fonctions d'accès | Done | `packages/shared/src/vocabulary.ts` (nouveau) |
| 3 | Mini-jeu Pont des Accords | Done | `packages/shared/src/pont-accords.ts` (nouveau) |
| 4 | Potion étendue (union discriminée VerbPotionItem / GnPotionItem) | Done | `packages/shared/src/potion.ts` (réécrit) |
| 5 | Exports dans index.ts | Done | `packages/shared/src/index.ts` |
| 6 | Tests unitaires | Done | `packages/shared/src/vocabulary.test.ts`, `pont-accords.test.ts`, `potion.test.ts` |
| 7 | Typecheck monorepo | Done (0 erreurs) | — |

## Ce qui a été fait

### 1. Types (`types.ts`)
- `Gender`, `GrammaticalNumber`, `VocabularyTheme`, `Noun`, `Adjective` (avec `preposed: boolean`), `Determiner`, `DeterminerKind`, `GapTarget`
- Ajout de `'pont-accords'` dans `MiniGameType`

### 2. Vocabulaire (`vocabulary.ts`) — NOUVEAU
- **54 noms** répartis sur 7 thèmes CE1 : animaux, école, maison, jeux, nature, corps, nourriture
- **30 adjectifs** : 11 antéposés (petit, grand, joli, beau, bon…), 19 postposés (rouge, bleu, content…)
- **5 déterminants** : le/la/les, un/une/des, mon/ma/mes, ton/ta/tes, son/sa/ses
- Gestion de l'élision : `le/la → l'` devant voyelle, `ma/ta/sa → mon/ton/son` devant voyelle féminin
- `buildNounPhrase(determinerId, adjectiveId, nounId, number)` → construit le GN complet avec bon ordre (antéposé/postposé) et élision
- `formatGenderNumber(gender, number)` → "masculin singulier", etc.

### 3. Pont des Accords (`pont-accords.ts`) — NOUVEAU
- `PontAccordsItem` : GN décomposé en slots, un slot est le trou à compléter
- `generatePontAccordsItems(count, options?)` : génère des exercices avec 4 choix
- Options : filtrage par thèmes, déterminants, types de cible (determiner/adjective/noun)
- Distracteurs intelligents : même genre/mauvais nombre, même déterminant/mauvais genre, etc.

### 4. Potion étendue (`potion.ts`) — REWRITE
- **Union discriminée** via `gapTarget` :
  - `VerbPotionItem` (gapTarget: 'verb') — existant, rétro-compatible
  - `GnPotionItem` (gapTarget: 'determiner' | 'adjective' | 'noun') — nouveau
  - `PotionItem = VerbPotionItem | GnPotionItem`
- `generatePotionItems()` retourne `VerbPotionItem[]` → **zéro breaking change** pour le frontend existant
- `generateGnPotionItems(count, options?)` → nouveau générateur avec 12 templates de phrases CE1
- Le store frontend mis à jour : `PotionItem` → `VerbPotionItem` pour typage strict
- Code nettoyé : suppression des commentaires de réflexion, indentation unifiée

### 5. Frontend — Impact minimal
- Seul changement : `apps/frontend/src/stores/potion.ts` — import `VerbPotionItem` au lieu de `PotionItem`
- Le composant `PotionGame.vue` fonctionne sans modification

### 6. Tests unitaires — Done

**Setup** : `vitest ^4.0.18` ajouté en devDependency, script `test` ajouté au `package.json`, test files exclus du build (`tsconfig.json` `exclude`).

**128 tests, 3 fichiers** :
- `vocabulary.test.ts` (57 tests) : intégrité des données, lookups, formes fléchies, élision, `buildNounPhrase`, `formatGenderNumber`
- `pont-accords.test.ts` (27 tests) : génération, structure des slots, filtrage par options, distracteurs, edge cases
- `potion.test.ts` (44 tests) : `generatePotionItems` (verbes, rétro-compat), `generateGnPotionItems` (GN), union discriminée, filtrage

**Cas d'élision vérifiés** :
- `le + arbre` → `l'arbre` (voyelle)
- `le + étoile` → `l'étoile` (accent)
- `mon + étoile (fém.)` → `mon étoile` (possessif fém. devant voyelle → forme masculine)
- `le + haut + arbre` → `l'haut arbre` (h traité comme voyelle — acceptable en CE1)
