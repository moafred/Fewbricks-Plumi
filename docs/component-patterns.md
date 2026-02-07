# Patterns de Composants — Guide de Réutilisation

Ce guide liste tous les composants UI disponibles et explique quand les utiliser pour éviter la duplication de code.

## Composants UI de Base (`@/components/ui`)

### ParchmentCard

**Usage** : Cartes avec texture papier, conteneurs principaux

**Props** :
- `variant`: 'light' | 'dark' (default: 'light')
- `hint?`: string (texte d'indication en haut)
- `padding?`: 'sm' | 'md' | 'lg' (default: 'md')
- `rounded?`: 'sm' | 'md' | 'lg' (default: 'lg')
- Slots : `default`, `footer`

**À utiliser quand** :
- Besoin d'une carte avec fond solide et texture papier
- Conteneur principal pour du contenu
- Modal ou popup avec style "livre enchanté"

**À éviter** :
```vue
<!-- ❌ Mauvais -->
<div class="bg-royal-800/95 border-2 border-royal-400/40 rounded-3xl p-8 shadow-[0_8px_16px_rgba(0,0,0,0.3)] texture-parchment">
  <slot />
</div>

<!-- ✅ Bon -->
<ParchmentCard variant="light" padding="md" rounded="lg">
  <slot />
</ParchmentCard>
```

**Exemple** :
```vue
<ParchmentCard variant="light" hint="Défi" padding="lg">
  <h2>Titre</h2>
  <p>Contenu</p>
  <template #footer>
    <MagicButton>Action</MagicButton>
  </template>
</ParchmentCard>
```

---

### ParchmentButton

**Usage** : Boutons avec texture papier (icône ou texte)

**Props** :
- `variant`: 'icon' | 'text' (default: 'icon')
- `size?`: 'sm' | 'md' | 'lg' (default: 'md')
- Emit : `click`

**À utiliser quand** :
- Bouton de navigation avec texture papier
- Bouton avec icône dans un header
- Bouton de retour/fermeture

**À éviter** :
```vue
<!-- ❌ Mauvais -->
<button class="p-3 rounded-xl bg-royal-800/95 hover:bg-royal-700/95 active:scale-95 transition-all shadow-sm border-2 border-royal-400/40 texture-parchment">
  <HomeIcon />
</button>

<!-- ✅ Bon -->
<ParchmentButton variant="icon" @click="handleClick">
  <HomeIcon :size="28" class="text-royal-200" />
</ParchmentButton>
```

**Exemple** :
```vue
<ParchmentButton variant="icon" size="md" @click="goBack">
  <HomeIcon :size="28" class="text-royal-200" />
</ParchmentButton>
```

---

### ParchmentBadge

**Usage** : Badges/info avec texture papier

**Props** :
- `size?`: 'sm' | 'md' | 'lg' (default: 'md')
- Slot : `default`

**À utiliser quand** :
- Affichage d'information dans un badge arrondi
- Compteur ou indicateur de progression
- Header de jeu avec étape actuelle

**À éviter** :
```vue
<!-- ❌ Mauvais -->
<div class="flex items-center gap-2 px-4 py-2 bg-royal-800/95 rounded-full border-2 border-royal-400/40 shadow-sm texture-parchment">
  <span>Étape 1 / 5</span>
</div>

<!-- ✅ Bon -->
<ParchmentBadge>
  <span class="text-magic-300 font-bold">Étape 1 / 5</span>
</ParchmentBadge>
```

**Exemple** :
```vue
<ParchmentBadge size="md">
  <span class="text-magic-300 font-bold drop-shadow-md">
    {{ label }}: {{ current }} / {{ total }}
  </span>
</ParchmentBadge>
```

---

### MagicButton

**Usage** : Boutons d'action principaux

**Props** :
- `variant`: 'primary' | 'secondary'
- `size?`: 'md' | 'lg' (default: 'lg')
- `disabled?`: boolean (default: false)
- Emit : `click`

**À utiliser quand** :
- Action principale (jouer, continuer, valider)
- Bouton CTA (Call To Action)
- Actions secondaires avec style différent

**Exemple** :
```vue
<MagicButton variant="primary" size="lg" @click="handlePlay">
  Jouer
</MagicButton>
```

---

### CelebrationParticles

**Usage** : Particules animées pour célébrations

**Props** :
- `count?`: number (default: 8)
- `color?`: string (default: 'magic-400')
- `duration?`: number (default: 500)

**À utiliser quand** :
- Célébration d'une bonne réponse
- Feedback visuel positif
- Animation de succès

**Exemple** :
```vue
<CelebrationParticles count="12" color="magic-400" />
```

---

## Composants Game (`@/components/game`)

### ChallengeCard

**Usage** : Carte de défi (wrapper autour de ParchmentCard)

**Props** :
- `hint?`: string
- Slots : `default`, `footer`

**Note** : Utilise `ParchmentCard` en interne. Préférer utiliser directement `ParchmentCard` pour plus de flexibilité.

---

### ChoiceButton

**Usage** : Bouton de choix dans les mini-jeux

**Props** :
- `label`: string
- `state`: 'idle' | 'focused' | 'correct' | 'incorrect' | 'dimmed'
- `disabled?`: boolean
- Emit : `select`

**À utiliser quand** :
- QCM ou choix multiples
- Boutons de réponse dans les mini-jeux
- États visuels (correct/incorrect)

---

### PlumiMascot

**Usage** : Mascotte animée Plumi

**Props** :
- `state?`: 'idle' | 'challenge' | 'celebration' | 'encouragement' (default: 'idle')
- `size?`: 'sm' | 'md' | 'lg' (default: 'md')

**À utiliser quand** :
- Affichage de la mascotte Plumi
- Feedback visuel selon l'état du jeu
- Écran d'accueil

---

### NarrativeCard

**Usage** : Carte narrative pour intros de chapitres

**Props** :
- `title`: string
- `text`: string
- `biome?`: string

**À utiliser quand** :
- Introduction narrative d'un chapitre
- Texte de contexte avec style "livre enchanté"
- Animation de déroulement

---

### ProgressPath

**Usage** : Chemin illustré de progression

**Props** :
- `steps`: Array<{ id: number, completed: boolean, current: boolean }>
- `color?`: 'royal-400' | 'enchant-400' | 'magic-400' | 'gentle-400' (default: 'royal-400')

**À utiliser quand** :
- Affichage de progression avec points de contrôle
- Chemin de chapitres/étapes
- Indicateur visuel de progression

---

## Processus de Décision

### 1. Avant d'écrire une div

**Checklist** :
- [ ] Vérifier si un composant existe dans `@/components/ui`
- [ ] Vérifier si un composant existe dans `@/components/game`
- [ ] Consulter `docs/component-patterns.md` pour référence
- [ ] Vérifier Storybook pour voir les composants disponibles

### 2. Si pattern répété 2 fois

**Action immédiate** :
1. Créer un composant réutilisable dans `@/components/ui`
2. Extraire les classes communes
3. Utiliser des props pour la variabilité
4. Utiliser des slots pour le contenu
5. Créer une story Storybook
6. Documenter dans `docs/component-patterns.md`

### 3. Si composant manquant

**Création** :
- Créer dans `@/components/ui` pour composants génériques
- Créer dans `@/components/game` pour composants spécifiques au jeu
- Suivre les conventions de nommage (PascalCase)
- Ajouter JSDoc expliquant usage et patterns remplacés
- Créer Storybook story avec tous les états

## Patterns à Éviter

### Pattern 1 : Cartes avec texture papier
```vue
<!-- ❌ À éviter -->
<div class="bg-royal-800/95 border-2 border-royal-400/40 rounded-3xl p-8 shadow-[0_8px_16px_rgba(0,0,0,0.3)] texture-parchment">
  Contenu
</div>

<!-- ✅ Utiliser -->
<ParchmentCard variant="light" padding="md" rounded="lg">
  Contenu
</ParchmentCard>
```

### Pattern 2 : Boutons de navigation
```vue
<!-- ❌ À éviter -->
<button class="p-3 rounded-xl bg-royal-800/95 hover:bg-royal-700/95 active:scale-95 transition-all shadow-sm border-2 border-royal-400/40 texture-parchment">
  <Icon />
</button>

<!-- ✅ Utiliser -->
<ParchmentButton variant="icon" @click="handleClick">
  <Icon />
</ParchmentButton>
```

### Pattern 3 : Badges d'information
```vue
<!-- ❌ À éviter -->
<div class="flex items-center gap-2 px-4 py-2 bg-royal-800/95 rounded-full border-2 border-royal-400/40 shadow-sm texture-parchment">
  <span>Info</span>
</div>

<!-- ✅ Utiliser -->
<ParchmentBadge>
  <span>Info</span>
</ParchmentBadge>
```

## Règles d'Or

1. **Jamais de div avec >3 classes Tailwind identiques dans 2+ composants**
2. **Toujours vérifier l'existant avant de créer une nouvelle div**
3. **Créer un composant dès qu'un pattern apparaît 2 fois**
4. **Utiliser les slots plutôt que des props de style**
5. **Documenter chaque nouveau composant dans ce guide**

## Références

- `docs/checklist-components.md` : Checklist avant commit
- `docs/migration-ui-refactor.md` : Guide de migration
- Storybook : Voir tous les composants avec exemples interactifs
- `CLAUDE.md` : Règles #13 et #16
