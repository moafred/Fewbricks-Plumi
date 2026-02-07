# Guide de Migration — Refonte UI "Livre Enchanté"

Ce guide documente la migration des composants vers le nouveau style "Livre Enchanté" et la suppression du glassmorphism.

## Principes de Migration

1. **Supprimer le glassmorphism** : Remplacer tous les `backdrop-blur` par des fonds solides avec texture papier
2. **Utiliser les nouveaux tokens** : Migrer vers `royal-*`, `magic-*`, `enchant-*`, etc.
3. **Ajouter la texture papier** : Utiliser la classe `.texture-parchment` sur les cartes
4. **Améliorer les ombres** : Utiliser `shadow-[0_8px_16px_rgba(0,0,0,0.3)]` pour la profondeur

## Checklist de Migration

### Composants Migrés ✅

- [x] `ChallengeCard` → Utilise maintenant `ParchmentCard`
- [x] `BookCard` → Texture papier, nouveaux tokens, rotation subtile
- [x] `WordCard` → Fond solide avec texture, nouveaux tokens
- [x] `GameFinished` → Fond solide avec texture, nouveaux tokens
- [x] `GameHeader` → Fond solide avec bordure visible
- [x] `BookView` → Boutons et cartes migrés
- [x] `BookShelf` → Boutons migrés
- [x] `ChapterRunner` → Header migré
- [x] `GameCard` → Fond solide avec texture
- [x] `ConfirmModal` → Backdrop solide, carte avec texture

### Nouveaux Composants Créés ✅

- [x] `ParchmentCard` → Carte de base avec texture papier
- [x] `PlumiMascot` → Mascotte animée avec 4 états
- [x] `CelebrationParticles` → Particules de célébration réutilisables
- [x] `NarrativeCard` → Carte narrative avec animation déroulement
- [x] `ProgressPath` → Chemin illustré de progression

## Patterns de Migration

### Avant (Glassmorphism)
```vue
<div class="bg-white/90 backdrop-blur-md border border-sky-200 rounded-3xl">
  <h2 class="text-gold-500">Titre</h2>
</div>
```

### Après (Livre Enchanté)
```vue
<div class="bg-royal-800/95 border-2 border-royal-400/40 rounded-3xl shadow-[0_8px_16px_rgba(0,0,0,0.3)] texture-parchment">
  <h2 class="text-magic-300 drop-shadow-md">Titre</h2>
</div>
```

## Mapping des Classes

### Fonds
- `bg-white/90 backdrop-blur-md` → `bg-royal-800/95 texture-parchment`
- `bg-white/80 backdrop-blur` → `bg-night-800/95 texture-parchment`
- `bg-white/70 backdrop-blur-sm` → `bg-royal-700/90 texture-parchment`

### Bordures
- `border border-sky-200` → `border-2 border-royal-400/40`
- `border border-gold-300` → `border-2 border-magic-400/40`

### Ombres
- `shadow-sm` → `shadow-[0_8px_16px_rgba(0,0,0,0.3)]`
- `shadow-lg` → `shadow-[0_8px_16px_rgba(0,0,0,0.3)]` (identique, mais avec texture)

### Texte
- `text-gold-500` → `text-magic-300` ou `text-magic-400`
- `text-sky-600` → `text-royal-400` ou `text-royal-600`
- `text-stone-600` → `text-night-500` ou `text-night-600`
- Ajouter `drop-shadow-md` sur texte pour lisibilité

## Système de Texture Papier

### Classe `.texture-parchment`
Appliquée automatiquement via un pseudo-élément `::before` qui crée un pattern de grain papier.

**Usage :**
```vue
<div class="bg-royal-800/95 texture-parchment">
  <!-- Contenu -->
</div>
```

## Exemples Complets

### Carte de Jeu
```vue
<!-- Avant -->
<button class="bg-white/80 backdrop-blur border border-sky-200 rounded-2xl">
  <h2 class="text-gold-500">Titre</h2>
</button>

<!-- Après -->
<button class="bg-royal-800/95 border-2 border-royal-400/40 rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.3)] texture-parchment">
  <h2 class="text-magic-300 drop-shadow-md">Titre</h2>
</button>
```

### Header de Jeu
```vue
<!-- Avant -->
<div class="bg-white/70 backdrop-blur-sm rounded-full">
  <span class="text-gold-500">Étape 1 / 5</span>
</div>

<!-- Après -->
<div class="bg-royal-800/95 border-2 border-royal-400/40 rounded-full texture-parchment">
  <span class="text-magic-300 drop-shadow-md">Étape 1 / 5</span>
</div>
```

### Modal
```vue
<!-- Avant -->
<div class="bg-stone-900/60 backdrop-blur-sm">
  <div class="bg-white border border-sky-200 rounded-3xl">
    <h2 class="text-stone-800">Titre</h2>
  </div>
</div>

<!-- Après -->
<div class="bg-night-900/80">
  <div class="bg-royal-800/95 border-2 border-royal-400/40 rounded-3xl texture-parchment">
    <h2 class="text-magic-200 drop-shadow-md">Titre</h2>
  </div>
</div>
```

## Composants Réutilisables Créés

Lors de la refonte UI, plusieurs composants réutilisables ont été créés pour éviter la duplication :

### ParchmentCard
**Créé pour remplacer** : Toutes les divs avec `bg-royal-800/95 border-2 border-royal-400/40 texture-parchment`

**Utilisé dans** :
- `ChallengeCard` (wrapper)
- `GameFinished`
- `WordCard`
- `ConfirmModal`
- `GameCard`

**Migration** :
```vue
<!-- Avant -->
<div class="bg-royal-800/95 border-2 border-royal-400/40 rounded-3xl p-8 texture-parchment">
  Contenu
</div>

<!-- Après -->
<ParchmentCard variant="light" padding="md" rounded="lg">
  Contenu
</ParchmentCard>
```

### ParchmentButton
**Créé pour remplacer** : Boutons de navigation avec texture papier répétés dans `BookShelf`, `BookView`

**Utilisé dans** :
- `BookShelf` (bouton retour)
- `BookView` (bouton retour)

**Migration** :
```vue
<!-- Avant -->
<button class="p-3 rounded-xl bg-royal-800/95 hover:bg-royal-700/95 texture-parchment">
  <Icon />
</button>

<!-- Après -->
<ParchmentButton variant="icon" @click="handleClick">
  <Icon />
</ParchmentButton>
```

### ParchmentBadge
**Créé pour remplacer** : Badges d'information répétés dans `GameHeader`, `ChapterRunner`

**Utilisé dans** :
- `GameHeader` (compteur étape)
- `ChapterRunner` (compteur étape)

**Migration** :
```vue
<!-- Avant -->
<div class="flex items-center gap-2 px-4 py-2 bg-royal-800/95 rounded-full border-2 texture-parchment">
  <span>Étape 1 / 5</span>
</div>

<!-- Après -->
<ParchmentBadge>
  <span class="text-magic-300 font-bold">Étape 1 / 5</span>
</ParchmentBadge>
```

## Guide de Migration des Divs vers Composants

### Étape 1 : Identifier le Pattern
- Repérer les classes Tailwind répétées (>3 classes identiques)
- Vérifier si le pattern apparaît dans 2+ endroits

### Étape 2 : Vérifier l'Existant
- Consulter `docs/component-patterns.md`
- Vérifier Storybook
- Chercher dans `@/components/ui` et `@/components/game`

### Étape 3 : Créer le Composant (si nécessaire)
- Extraire les classes communes
- Définir les props pour la variabilité
- Utiliser des slots pour le contenu
- Créer Storybook story
- Documenter dans `docs/component-patterns.md`

### Étape 4 : Migrer les Usages
- Remplacer les divs par le nouveau composant
- Tester chaque usage
- Vérifier que le comportement est identique

## Notes Importantes

1. **Accessibilité** : Toujours ajouter `drop-shadow-md` sur le texte pour améliorer la lisibilité sur fonds illustrés
2. **Performance** : La texture papier utilise CSS uniquement (pas d'images), donc performant
3. **Cohérence** : Utiliser les mêmes patterns dans tous les composants similaires
4. **Mobile** : La texture fonctionne bien sur mobile grâce à CSS uniquement
5. **Composants réutilisables** : Toujours vérifier l'existant avant de créer une nouvelle div. Voir `docs/checklist-components.md`

## Prochaines Étapes

1. Migrer les composants restants si nécessaire
2. Tester sur différents navigateurs et appareils
3. Valider l'accessibilité (contraste, touch targets)
4. Documenter les nouveaux patterns dans Storybook
5. Maintenir la documentation des composants à jour
