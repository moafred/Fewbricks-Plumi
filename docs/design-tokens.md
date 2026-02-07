# Design Tokens — Plumi "Livre Enchanté"

## Mapping des Tokens de Couleur

Ce document décrit le mapping entre les anciens tokens (compatibilité) et les nouveaux tokens du design system "Livre Enchanté".

### Correspondance Ancien → Nouveau

| Ancien Token | Nouveau Token | Usage | Description |
|-------------|---------------|-------|-------------|
| `sky-*` | `royal-*` | Marque principale, navigation, titres | Violet royal — couleur principale de la marque |
| `gold-*` | `magic-*` | Récompenses, étoiles, CTA | Or magique — récompenses et actions importantes |
| `meadow-*` | `enchant-*` | Succès, bonne réponse | Émeraude — feedback positif |
| `coral-*` | `gentle-*` | Encouragement, erreur douce | Rose doux — encouragement sans punition |
| `moss-*` | `forest-*` | Grammaire, accords | Sarcelle — thème grammaire |
| `stone-*` | `night-*` | Fond sombre, texte | Nuit — fonds sombres et texte |

### Palette Complète

#### Royal (Violet Royal)
- `royal-50` à `royal-950` : Palette complète du violet royal
- Usage : Navigation, titres, éléments principaux
- Exemple : `bg-royal-800/95`, `text-royal-400`, `border-royal-400/40`

#### Magic (Or Magique)
- `magic-50` à `magic-950` : Palette complète de l'or magique
- Usage : Récompenses, étoiles, boutons CTA
- Exemple : `text-magic-300`, `bg-magic-400`, `ring-magic-400/50`

#### Enchant (Émeraude)
- `enchant-50` à `enchant-950` : Palette complète de l'émeraude
- Usage : Succès, bonne réponse, feedback positif
- Exemple : `bg-enchant-100`, `text-enchant-600`, `border-enchant-400`

#### Gentle (Rose Doux)
- `gentle-50` à `gentle-950` : Palette complète du rose doux
- Usage : Encouragement, erreur douce (jamais de punition)
- Exemple : `bg-gentle-100`, `text-gentle-500`, `ring-gentle-400/30`

#### Forest (Sarcelle)
- `forest-50` à `forest-950` : Palette complète de la sarcelle
- Usage : Grammaire, accords, thème forêt
- Exemple : `bg-forest-100`, `text-forest-600`, `border-forest-400`

#### Night (Nuit)
- `night-50` à `night-950` : Palette complète de la nuit
- Usage : Fonds sombres, texte sur fond sombre
- Exemple : `bg-night-800`, `text-night-200`, `border-night-400`

## Migration Progressive

### Phase 1 : Ajout des Nouveaux Tokens ✅
- Les nouveaux tokens sont ajoutés dans `main.css`
- Les anciens tokens restent disponibles pour compatibilité

### Phase 2 : Migration Progressive (En cours)
- Nouveaux composants utilisent les nouveaux tokens
- Composants existants migrés progressivement

### Phase 3 : Dépréciation (Future)
- Les anciens tokens seront dépréciés après migration complète
- Timeline : À définir selon la progression

## Règles d'Usage

1. **Nouveaux composants** : Utiliser exclusivement les nouveaux tokens
2. **Composants existants** : Migrer progressivement lors des refactorings
3. **Cohérence** : Un composant doit utiliser soit les anciens, soit les nouveaux tokens (pas de mélange)

## Exemples d'Usage

### Carte avec Texture Papier
```vue
<div class="bg-royal-800/95 border-2 border-royal-400/40 texture-parchment">
  <h2 class="text-magic-300">Titre</h2>
  <p class="text-magic-200">Texte</p>
</div>
```

### Bouton de Récompense
```vue
<button class="bg-magic-400 text-night-900 ring-4 ring-magic-300/50">
  Récompense
</button>
```

### Feedback Succès
```vue
<div class="bg-enchant-100 text-enchant-700 border-enchant-400">
  Bravo !
</div>
```

### Feedback Encouragement
```vue
<div class="bg-gentle-100 text-gentle-600 border-gentle-400">
  Presque ! La bonne réponse est...
</div>
```
