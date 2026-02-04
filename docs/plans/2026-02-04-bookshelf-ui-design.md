# Design : Étagère des Livres de Sorts

**Date** : 2026-02-04
**Statut** : Validé
**Équipe** : [LEAD] [PEDA] [GAME] [UI] [KID] [ARCHI] [DOC]

## Contexte

Plumi supporte maintenant 4 temps de conjugaison (présent, futur, imparfait, passé composé) répartis en 4 Livres de Sorts. L'interface doit permettre à l'enfant de choisir un temps avant de jouer.

## Décisions

| Question | Choix | Justification |
|----------|-------|---------------|
| Cible utilisateur | Enfant seul OU accompagné | Flexibilité maximale |
| Progression | Reportée | Focus sur les jeux d'abord |
| Approche UI | Étagère de Livres | Narratif fort, immersif |
| Niveaux navigation | 2 (Accueil → Étagère → Jeu) | Validé par [PEDA] pour CE1 |
| Layout étagère | Grille 2x2 | Pas de scroll, touch-friendly |

## Flux Utilisateur

```
[Accueil "Plumi"] → [Étagère des Livres] → [Mini-jeu avec temps sélectionné]
        ↑_____________________←_______________________↩️ (bouton retour)
```

- Depuis l'étagère → bouton maison → accueil
- Depuis un jeu → bouton maison → étagère (rejouer facilement)

## Écran Accueil (modifié)

L'accueil actuel (2 mini-jeux) devient un écran épuré avec un unique bouton "Jouer".

```
┌─────────────────────────┐
│         Plumi           │
│    La Plume Magique     │
│                         │
│    ┌───────────────┐    │
│    │   ✨ Jouer    │    │
│    └───────────────┘    │
└─────────────────────────┘
```

## Écran Étagère des Livres

Grille 2x2, chaque carte-livre contient 2 boutons mini-jeux.

```
┌────────────────────────────────────────────┐
│  ← 🏠          Livres de Sorts             │
├────────────────────────────────────────────┤
│                                            │
│   ┌─────────────┐    ┌─────────────┐       │
│   │  📘         │    │  📗         │       │
│   │ Fondations  │    │ Prophéties  │       │
│   │  (Présent)  │    │  (Futur)    │       │
│   │  🎩   📖    │    │  🎩   📖    │       │
│   └─────────────┘    └─────────────┘       │
│                                            │
│   ┌─────────────┐    ┌─────────────┐       │
│   │  📙         │    │  📕 ⭐      │       │
│   │ Souvenirs   │    │ Le Temps    │       │
│   │ (Imparfait) │    │  (Bonus)    │       │
│   │  🎩   📖    │    │  🎩   📖    │       │
│   └─────────────┘    └─────────────┘       │
│                                            │
└────────────────────────────────────────────┘
```

### Carte-Livre

Chaque carte contient :
- Icône livre colorée (SVG)
- Titre du livre
- Sous-titre du temps entre parenthèses
- 2 boutons mini-jeux : 🎩 Tri du Sorcier / 📖 Grimoire
- Badge ⭐ pour le Livre Bonus

### Interactions

- Clic sur 🎩 → lance Tri du Sorcier avec ce temps
- Clic sur 📖 → lance Le Grimoire avec ce temps
- Touch targets : 80px minimum

## Intégration Technique

### Stores

```typescript
// stores/game.ts et stores/grimoire.ts
function startGame(tense: Tense = 'present') {
  items.value = generateItems(10, { tense });
  currentTense.value = tense;
}
```

### Composants Jeux

```typescript
const props = defineProps<{
  tense?: Tense;
}>();
```

Badge temps affiché en haut du jeu : `[Futur]`

## Fichiers

### À créer

| Fichier | Description |
|---------|-------------|
| `components/game/BookShelf.vue` | Écran étagère grille 2x2 |
| `components/game/BookCard.vue` | Carte livre avec boutons mini-jeux |
| `components/icons/BookIcon.vue` | Icône livre paramétrable |

### À modifier

| Fichier | Modification |
|---------|--------------|
| `App.vue` | Écran `bookshelf`, accueil simplifié |
| `stores/game.ts` | `startGame(tense?)`, `currentTense` |
| `stores/grimoire.ts` | `startGame(tense?)`, `currentTense` |
| `TriSorcierGame.vue` | Prop `tense`, badge temps |
| `GrimoireGame.vue` | Prop `tense`, badge temps |
