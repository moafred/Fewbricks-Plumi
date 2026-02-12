# Checklist : Composants Reutilisables

Cette checklist doit etre suivie **avant chaque commit** contenant du code avec des divs ou des elements HTML stylises.

## Checklist Avant Commit

### Verification de l'Existant

- [ ] J'ai verifie si un composant existe deja dans `@/components/ui`
- [ ] J'ai verifie si un composant existe deja dans `@/components/game`
- [ ] J'ai verifie Storybook pour voir les composants disponibles

### Detection de Patterns Repetitifs

- [ ] Si j'ai cree une div avec >3 classes Tailwind, j'ai verifie si ce pattern existe ailleurs
- [ ] Si le pattern existe dans 2+ endroits, j'ai cree un composant reutilisable

### Creation de Composants (si necessaire)

- [ ] Composant dans le bon dossier (`@/components/ui` pour generique, `@/components/game` pour specifique)
- [ ] Props typees pour la variabilite (pas de classes conditionnelles dupliquees)
- [ ] Slots plutot que props de style quand possible
- [ ] Story Storybook avec tous les etats

### Code Review

- [ ] Mon code respecte la regle #13 "Zero Classe Dupliquee"
- [ ] Mon code respecte la regle #16 "Composants Avant Divs"
- [ ] Je n'ai pas cree de divs avec des patterns qui existent deja comme composants

## Composants UI Disponibles (`@/components/ui`)

| Composant | Usage |
|-----------|-------|
| `NotebookCard` | Carte avec texture lignes Seyes |
| `NotebookButton` | Bouton navigation avec texture cahier |
| `NotebookBadge` | Badge/info avec texture cahier |
| `ActionButton` | Bouton d'action principal (CTA) |
| `StatusBadge` | Badge d'etat (Termine, En cours, Verrouille) |
| `GameCard` | Carte de jeu generique |
| `ConfirmModal` | Modal de confirmation |
| `KeyboardGuide` | Indicateur de touche clavier (desktop only) |
| `KeyboardHintsBar` | Barre de raccourcis clavier |
| `TenseBadge` | Badge de temps verbal |
| `CelebrationParticles` | Particules de celebration |

## Composants Game Disponibles (`@/components/game`)

| Composant | Usage |
|-----------|-------|
| `PlumiMascot` | Mascotte animee (idle/challenge/celebration/encouragement) |
| `ChallengeCard` | Carte de defi (wrapper) |
| `ChoiceButton` | Bouton de choix dans les mini-jeux |
| `NarrativeCard` | Carte narrative pour intros |
| `ProgressPath` | Chemin de progression |
| `GameHeader` | Header de mini-jeu |
| `GameFinished` | Ecran de fin de jeu |
| `SubjectCard` | Carte de matiere (ecran d'accueil) |
| `BookCard` | Carte de cahier (bookshelf) |
| `ScreenLayout` | Conteneur d'ecran (padding/gap responsive) |
| `ScreenHeader` | Header d'ecran avec bouton retour |

## Exemples de Patterns a Detecter

```vue
<!-- Si cette div apparait 2+ fois → Utiliser NotebookCard -->
<div class="bg-white/90 backdrop-blur-md border-2 border-sky-200 texture-notebook">

<!-- Si ce bouton apparait 2+ fois → Utiliser NotebookButton -->
<button class="bg-white/90 hover:bg-white/95 texture-notebook rounded-xl">

<!-- Si ce badge apparait 2+ fois → Utiliser NotebookBadge -->
<div class="bg-white/90 rounded-full border-2 border-sky-200 texture-notebook">
```

## References

- `CLAUDE.md` : Regles #13 et #16
- Storybook : Composants interactifs avec exemples
