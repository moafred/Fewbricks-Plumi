# 🎹 Indicateurs de Touches Clavier

Les indicateurs de touches clavier permettent à l'enfant de savoir quelles actions sont disponibles à chaque instant. Ils suivent une esthétique "magique" : discrets mais visibles, avec un effet de lueur douce caractéristique de la Plume.

## Support Multi-Plateforme

Tous les jeux et interfaces doivent être parfaitement fonctionnels sur les 3 supports cibles :
1.  **PC (Desktop)** : Navigation complète au clavier (Flèches + Espace + Entrée + Echap/Backspace) ET souris.
2.  **Tablette** : Interaction tactile fluide, cibles larges (> 48px).
3.  **Smartphone** : Interface responsive adaptée aux petits écrans, sans perte de fonctionnalité.

L'expérience doit être *progressive* :
- Sur PC, les hints clavier (`KeyboardGuide`) sont visibles.
- Sur Tablette/Mobile, les hints sont masqués ou remplacés par des instructions tactiles ("Appuie pour...").

## Principes

1. **Toujours visible** quand l'action est disponible
2. **Discret mais accessible** : opacité 40-60% au repos, plus visible au hover
3. **Cohérent** : utiliser `KeyboardGuide` partout, jamais de HTML custom
4. **Non-intrusif** : pas d'animation sur les hints (réserver aux feedbacks)
5. **Thématique** : utiliser les couleurs du royaume (Enchant/Magic/Royal)
6. **Typographie** :
   - **Labels** : Affichés en **MAJUSCULES**. **Passer le label en minuscules** dans le code : `label="continuer"` → affiche "CONTINUER".
   - **Touches** : Affichées en **minuscules** (ex: "espace", "retour").
   - **Forme** : Label = verbe d'action à l'infinitif (ex: "continuer", "débloquer", "valider").

## Composant `KeyboardGuide`

**Fichier:** `apps/frontend/src/components/ui/KeyboardGuide.vue`

| Prop            | Type                                | Default     | Description                                           |
| --------------- | ----------------------------------- | ----------- | ----------------------------------------------------- |
| `mode`          | `'single' \| 'cluster'`             | `'cluster'` | Une touche ou groupe de flèches (D-pad)               |
| `keyName`       | `string`                            | `'left'`    | Touche à afficher: `left`, `right`, `up`, `down`...   |
| `size`          | `'small' \| 'large'`                | `'small'`   | Taille de l'indicateur                                |
| `label`         | `string`                            | -           | Texte d'action associé (ex: "continuer", "aide")      |
| `labelPosition` | `'right' \| 'bottom'`               | `'right'`   | Position du label par rapport à la touche             |
| `theme`         | `'default' \| 'royal' \| 'magic' \| 'enchant'` | `'default'` | Thème de couleur                                      |
| `glow`          | `boolean`                           | `true`      | Active/désactive l'effet de lueur                     |

## Thèmes de couleur

| Thème     | Couleur    | Usage                                |
| --------- | ---------- | ------------------------------------ |
| `default` | Blanc/Glow | Actions neutres (espace, navigation) |
| `enchant` | Émeraude   | Réponses correctes, validation verte |
| `magic`   | Or         | Actions importantes, validation      |
| `royal`   | Violet     | Actions contextuelles, aide          |

## Pattern Tablette : Alternatives Tactiles

Sur tablette, les KeyboardGuide sont masqués et remplacés par des instructions textuelles simples.

```vue
<!-- Pattern standard : hint clavier + alternative tactile -->
<KeyboardGuide
  key-name="space"
  mode="single"
  size="large"
  label="continuer"
  class="hidden lg:flex"
/>
<p class="lg:hidden text-magic-300 text-lg animate-pulse">
  Appuie pour continuer
</p>
```
