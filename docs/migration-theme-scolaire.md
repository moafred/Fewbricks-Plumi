# Migration Thème Scolaire — Guide Complet

**Date** : Février 2026
**Statut** : ✅ Complété

## Contexte

Plumi utilisait un thème **fantasy/magique** qui créait une barrière pour :
- Les parents : difficulté à identifier l'app comme éducative CE1
- Les écoles : perception "jeu fantastique" vs "outil pédagogique"
- Les enfants : vocabulaire parfois confus (sort vs verbe)

**Objectif** : Transformer complètement vers une identité **scolaire claire** tout en préservant l'engagement ludique.

---

## Changements Appliqués

### 1. Design System (CSS)

**Fichier** : `apps/frontend/src/assets/main.css`

#### Palette de couleurs

| Avant (Magique) | Après (Scolaire) | Usage |
|----------------|------------------|--------|
| `royal-*` | `sky-*` | Navigation, titres |
| `magic-*` | `gold-*` | Récompenses, étoiles |
| `enchant-*` | `meadow-*` | Succès, bonnes réponses |
| `gentle-*` | `coral-*` | Encouragements doux |
| `forest-*` | `moss-*` | Grammaire, accords |
| `night-*` | `stone-*` | Texte, structure |

#### Textures

- **Nouveau** : `.texture-notebook` — Lignes Seyes (cahier d'école français)
- **Déprécié** : `.texture-parchment` (conservé pour compatibilité)

#### Animations

| Avant | Après |
|-------|-------|
| `spell-ring` | `celebration-ring` / `success-ring` |
| `spell-particle` | `celebration-particle` |

### 2. Composants UI

#### Nouveaux composants (thème scolaire)

| Composant | Remplace | Fichier |
|-----------|----------|---------|
| `ActionButton` | `MagicButton` | `components/ui/ActionButton.vue` |
| `NotebookCard` | `ParchmentCard` | `components/ui/NotebookCard.vue` |
| `NotebookButton` | `ParchmentButton` | `components/ui/NotebookButton.vue` |
| `NotebookBadge` | `ParchmentBadge` | `components/ui/NotebookBadge.vue` |

#### Nouvelles icônes

| Icône | Usage | Fichier |
|-------|-------|---------|
| `PencilIcon` | Plume d'écriture (thème scolaire) | `components/icons/PencilIcon.vue` |
| `NotebookIcon` | Cahier d'école | `components/icons/NotebookIcon.vue` |

#### Composants dépréciés

Les composants suivants émettent un `console.warn` au montage :
- `MagicButton` → Utiliser `ActionButton`
- `ParchmentCard` → Utiliser `NotebookCard`
- `ParchmentButton` → Utiliser `NotebookButton`
- `ParchmentBadge` → Utiliser `NotebookBadge`

### 3. Contenu & Terminologie

#### Package Shared (`packages/shared/`)

**`types.ts`** :
- Ajout : `MECHANIC_DISPLAY_NAMES` — Noms pédagogiques des mini-jeux

**`chapters.ts`** :
- Livres renommés en "Cahier 1, 2, 3..." avec sous-titres pédagogiques
- Narratives transformées :
  - "sort" → "verbe"
  - "magicien" → "champion"
  - "formule" → "forme verbale"
  - "Royaume des Mots" → "parcours d'apprentissage"

#### Frontend (`apps/frontend/`)

**`App.vue`** :
- Titre : "Plumi — Apprendre le Français CE1"
- Sous-titre : "Conjugaison • Grammaire • Orthographe"

**`BookShelf.vue`** :
- "Livres de Sorts" → "Mes Cahiers de Français"

**`ChapterResult.vue`** :
- Messages de félicitation :
  - "Incroyable, tu es un vrai magicien !" → "Parfait, tu maîtrises parfaitement !"
  - "Bravo, tu maîtrises le sort !" → "Bravo, tu progresses très bien !"

**`PlumiMascot.vue`** :
- Glow color : gold (`rgba(227,193,111,*)`) → sky-blue (`rgba(143,177,233,*)`)
- Particules : `color="magic-400"` → `color="sky-400"`

---

## Guide de Migration pour Développeurs

### Remplacer un composant déprécié

#### Avant (MagicButton)
```vue
<MagicButton variant="primary" size="lg" @click="handlePlay">
  Jouer
</MagicButton>
```

#### Après (ActionButton)
```vue
<ActionButton variant="primary" size="lg" @click="handlePlay">
  Jouer
</ActionButton>
```

**Note** : Les variants sont inversés pour ActionButton :
- `primary` = bleu ciel (actions principales)
- `secondary` = or (récompenses)

### Utiliser les nouveaux tokens

#### Avant
```vue
<div class="bg-royal-800/95 border-2 border-royal-400/40 texture-parchment">
  ...
</div>
```

#### Après
```vue
<NotebookCard variant="light" padding="md">
  ...
</NotebookCard>
```

Ou en CSS direct :
```vue
<div class="bg-white/90 backdrop-blur-md border-2 border-sky-200 texture-notebook">
  ...
</div>
```

### Afficher le nom d'un mini-jeu

#### Avant
```vue
<h2>Tri Sorcier</h2>
```

#### Après
```typescript
import { MECHANIC_DISPLAY_NAMES } from '@plumi/shared';

// Dans template :
<h2>{{ MECHANIC_DISPLAY_NAMES['tri-sorcier'] }}</h2>
// Affiche : "Trier les Verbes"
```

---

## Critères de Validation

### ✅ Visuel (UI)
- Palette claire visible (bg-white/90, sky-*, pas de royal-800)
- Tous les boutons utilisent ActionButton (sky-blue primaire)
- Cartes utilisent NotebookCard (texture lignes Seyes)
- Plumi a glow doux sky-blue (pas gold intense)

### ✅ Contenu (Textes)
- Page d'accueil : "Apprendre le Français — CE1"
- BookShelf : "Mes Cahiers de Français"
- Livres : "Cahier 1, 2, 3..." avec sous-titres pédagogiques
- Chapitres : "verbe" partout (0 occurrence de "sort")
- Résultats : "champion" / "tu progresses" (pas "magicien")

### ✅ Pédagogique
- Vocabulaire CE1 approprié (6-7 ans)
- Objectifs d'apprentissage clairs pour parents
- Progression visible et mesurable

### ✅ Technique
- `make typecheck` : 0 erreurs
- Performance inchangée (< 16ms input, < 200ms feedback)
- Backward compatibility DB (progression existante charge)

---

## Rollback (si nécessaire)

Si problème détecté :

1. **Revert CSS** :
   ```bash
   git checkout HEAD -- apps/frontend/src/assets/main.css
   ```

2. **Revert composants** (par phase) :
   ```bash
   git revert <commit-id-phase-2>
   ```

3. **Revert contenu** :
   ```bash
   git checkout HEAD -- packages/shared/src/chapters.ts
   ```

---

## Support & Questions

Pour toute question sur cette migration :
- Consulter `docs/design-tokens.md` (palette complète)
- Consulter `docs/component-patterns.md` (patterns UI)
- Lire les JSDoc des composants (règles d'usage)
