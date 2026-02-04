# Design : La Potion Magique

**Date** : 2026-02-04
**Statut** : Validé
**Équipe** : [LEAD] [PEDA] [GAME] [UI] [KID] [ARCHI]

## Concept

Mini-jeu de complétion de phrase. L'enfant voit une phrase avec un trou et doit choisir la bonne forme conjuguée parmi 4 propositions.

## Décisions

| Question | Choix | Justification |
|----------|-------|---------------|
| Interaction | Tap simple | Accessible, fonctionne PC + mobile + clavier |
| Navigation clavier | ←→↑↓ + Entrée | Cohérent avec Le Grimoire |
| Affichage du trou | Trait souligné lumineux | Magique mais lisible |
| Nombre de choix | 4 (grille 2x2) | Cohérent avec Le Grimoire |

## Mécanique

```
[Discovery] → [Challenge] → [Response] → [Resolution]
    │              │             │              │
 Phrase       Choix 2x2      Feedback       Correction
 apparaît     actifs         immédiat       + next
```

## Layout

```
┌────────────────────────────────────────┐
│         [Imparfait]        ⭐ 3/10     │
├────────────────────────────────────────┤
│                                        │
│   Complète la potion magique !         │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │                                  │  │
│  │    « Je ~~~~~~~~ content. »     │  │
│  │           ✨✨✨✨                 │  │
│  │           (être)                 │  │
│  │                                  │  │
│  └──────────────────────────────────┘  │
│                                        │
│      ┌────────┐    ┌────────┐          │
│      │  suis  │    │   es   │          │
│      └────────┘    └────────┘          │
│      ┌────────┐    ┌────────┐          │
│      │  est   │    │  sont  │          │
│      └────────┘    └────────┘          │
│                                        │
└────────────────────────────────────────┘
```

## Trait magique (trou)

- Fond : `bg-magic-400/30`
- Bordure : `border-b-2 border-magic-400`
- Animation : `animate-sparkle`
- Après réponse correcte : mot en `text-enchant-400`
- Après réponse incorrecte : mot correct en vert, choix faux en rouge

## Structure de données

```typescript
interface PotionItem {
  id: string;
  sentence: string;      // "Je _____ content."
  gap: string;           // "_____"
  verbId: VerbId;
  infinitive: string;
  pronoun: Pronoun;
  tense: Tense;
  correctForm: string;
  choices: string[];
}
```

## Banque de phrases

### Être
- "Je _____ content." (je)
- "Tu _____ mon ami." (tu)
- "Elle _____ grande." (il/elle/on)
- "Nous _____ en classe." (nous)
- "Vous _____ gentils." (vous)
- "Ils _____ au parc." (ils/elles)

### Avoir
- "J'_____ faim." (je, élision)
- "Tu _____ un chat." (tu)
- "Il _____ froid." (il/elle/on)
- "Nous _____ des livres." (nous)
- "Vous _____ raison." (vous)
- "Elles _____ peur." (ils/elles)

## Fichiers

### À créer
- `packages/shared/src/potion.ts`
- `apps/frontend/src/stores/potion.ts`
- `apps/frontend/src/components/game/PotionGame.vue`
- `apps/frontend/src/components/game/SentenceGap.vue`
- `apps/frontend/src/components/icons/PotionIcon.vue`

### À modifier
- `packages/shared/src/index.ts`
- `apps/frontend/src/components/game/BookCard.vue`
- `apps/frontend/src/components/game/BookShelf.vue`
- `apps/frontend/src/App.vue`
- `apps/frontend/src/components/icons/index.ts`
