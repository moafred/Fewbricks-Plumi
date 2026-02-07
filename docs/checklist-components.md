# Checklist : Composants Réutilisables

Cette checklist doit être suivie **avant chaque commit** contenant du code avec des divs ou des éléments HTML stylisés.

## Checklist Avant Commit

### Vérification de l'Existant

- [ ] J'ai vérifié si un composant existe déjà dans `@/components/ui`
- [ ] J'ai vérifié si un composant existe déjà dans `@/components/game`
- [ ] J'ai consulté `docs/component-patterns.md` pour référence
- [ ] J'ai vérifié Storybook pour voir les composants disponibles

### Détection de Patterns Répétitifs

- [ ] Si j'ai créé une div avec >3 classes Tailwind, j'ai vérifié si ce pattern existe ailleurs dans le codebase
- [ ] Si le pattern existe dans 2+ endroits, j'ai créé un composant réutilisable
- [ ] J'ai utilisé `grep` ou la recherche dans l'IDE pour trouver les patterns similaires

### Création de Composants (si nécessaire)

- [ ] J'ai créé le composant dans le bon dossier (`@/components/ui` pour générique, `@/components/game` pour spécifique)
- [ ] J'ai utilisé des props typées pour la variabilité (pas de classes conditionnelles dupliquées)
- [ ] J'ai utilisé des slots plutôt que des props de style quand possible
- [ ] J'ai créé une story Storybook pour le nouveau composant avec tous les états
- [ ] J'ai documenté le composant dans `docs/component-patterns.md`

### Migration des Usages

- [ ] J'ai remplacé toutes les divs répétitives par le nouveau composant
- [ ] J'ai testé chaque usage pour vérifier que le comportement est identique
- [ ] J'ai vérifié que les styles sont cohérents

### Code Review

- [ ] Mon code respecte la règle #13 "Zéro Classe Dupliquée"
- [ ] Mon code respecte la règle #16 "Composants Avant Divs"
- [ ] Je n'ai pas créé de divs avec des patterns qui existent déjà comme composants

## Questions à se Poser

1. **"Ai-je créé une div avec >3 classes Tailwind qui pourrait être un composant ?"**
   - Si oui → Vérifier si un composant existe
   - Si non → Continuer

2. **"Ce pattern apparaît-il ailleurs dans le codebase ?"**
   - Si oui → Créer un composant réutilisable
   - Si non → Vérifier quand même s'il existe déjà

3. **"Puis-je utiliser un slot plutôt qu'une prop de style ?"**
   - Si oui → Utiliser un slot pour plus de flexibilité
   - Si non → Props typées

## Exemples de Patterns à Détecter

### Pattern 1 : Cartes avec Texture
```vue
<!-- Si cette div apparaît 2+ fois → Créer ParchmentCard -->
<div class="bg-royal-800/95 border-2 border-royal-400/40 texture-parchment">
```

### Pattern 2 : Boutons de Navigation
```vue
<!-- Si ce bouton apparaît 2+ fois → Créer ParchmentButton -->
<button class="bg-royal-800/95 hover:bg-royal-700/95 texture-parchment">
```

### Pattern 3 : Badges
```vue
<!-- Si cette div apparaît 2+ fois → Créer ParchmentBadge -->
<div class="bg-royal-800/95 rounded-full border-2 texture-parchment">
```

## Processus Rapide

1. **Avant d'écrire** : Vérifier l'existant (30 secondes)
2. **Pendant l'écriture** : Détecter les patterns répétitifs
3. **Avant commit** : Passer cette checklist (2 minutes)
4. **Si doute** : Consulter `docs/component-patterns.md` ou Storybook

## Références

- `CLAUDE.md` : Règles #13 et #16
- `docs/component-patterns.md` : Guide complet des composants
- `docs/migration-ui-refactor.md` : Exemples de migration
- Storybook : Composants interactifs avec exemples

## En Cas de Non-Respect

Si cette checklist n'est pas respectée lors d'un code review :
1. Le code sera rejeté avec demande de refactoring
2. Créer les composants manquants
3. Migrer les divs répétitives
4. Resoumettre avec checklist complétée
