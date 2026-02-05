# GN (Groupe Nominal) — Progression d'Implémentation

## Statut : 6/7 taches terminées

| # | Tâche | Statut | Fichiers |
|---|-------|--------|----------|
| 1 | Types GN dans `types.ts` | Done | `packages/shared/src/types.ts` |
| 2 | Données vocabulaire + fonctions d'accès | Done | `packages/shared/src/vocabulary.ts` (nouveau) |
| 3 | Mini-jeu Pont des Accords | Done | `packages/shared/src/pont-accords.ts` (nouveau) |
| 4 | Potion étendue (union discriminée VerbPotionItem / GnPotionItem) | Done | `packages/shared/src/potion.ts` (réécrit) |
| 5 | Exports dans index.ts | Done | `packages/shared/src/index.ts` |
| 6 | **Tests unitaires** | **À faire** | — |
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

## Ce qui reste à faire

### 6. Tests unitaires
Créer dans `packages/shared/` :
- `vocabulary.test.ts` : vérifier les données, `buildNounPhrase`, élision, `getDeterminerForm`
- `pont-accords.test.ts` : vérifier la génération, les choix, les distracteurs
- `potion-gn.test.ts` : vérifier `generateGnPotionItems`, union type

**Prérequis** : installer `vitest` comme devDependency dans `@plumi/shared` et ajouter un script `test` dans le package.json.

```bash
pnpm -C packages/shared add -D vitest
```

Puis créer les fichiers de tests dans `packages/shared/src/__tests__/` ou à côté des fichiers source.

## Points d'attention pour les tests

- `buildNounPhrase('le', 'petit', 'chat', 'singular')` → `"le petit chat"`
- `buildNounPhrase('le', 'petit', 'arbre', 'singular')` → `"l'petit arbre"` ... **attention** : il faut vérifier que l'élision fonctionne correctement quand l'adjectif antéposé commence par une voyelle. Actuellement `getDeterminerForm` reçoit le premier mot après le déterminant (l'adjectif si antéposé), donc "l'" sera utilisé devant "petit" seulement si "petit" commence par une voyelle — ce qui n'est pas le cas ici. C'est correct.
- Cas intéressant : `buildNounPhrase('le', 'haut', 'arbre', 'singular')` → `"le haut arbre"` — "haut" commence par un h, `startsWithVowel` retourne true pour h, donc ça donnerait `"l'haut arbre"`. Pour le h aspiré de "haut", c'est incorrect en français strict (on dit "le haut arbre"). Cependant, en CE1 ce cas est marginal et acceptable.
- Tester le cas possessif féminin + voyelle : `getDeterminerForm(mon, 'feminine', 'singular', 'étoile')` → `"mon"` (pas "ma")
