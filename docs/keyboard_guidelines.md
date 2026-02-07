# Indicateurs de Touches Clavier

Les indicateurs de touches clavier permettent a l'enfant de savoir quelles actions sont disponibles a chaque instant. Ils sont discrets mais visibles, avec un effet de lueur douce.

## Support Multi-Plateforme

Tous les jeux et interfaces doivent etre fonctionnels sur les 3 supports cibles :
1. **PC (Desktop)** : Navigation complete au clavier (Fleches + Espace + Entree + Echap/Backspace) ET souris.
2. **Tablette** : Interaction tactile fluide, cibles larges (> 48px).
3. **Smartphone** : Interface responsive adaptee aux petits ecrans.

L'experience est *progressive* :
- Sur PC, les hints clavier (`KeyboardGuide`) sont visibles (`hidden lg:flex`).
- Sur Tablette/Mobile, les hints sont masques ou remplaces par des instructions tactiles.

## Principes

1. **Toujours visible** quand l'action est disponible
2. **Discret mais accessible** : opacite 40-60% au repos, plus visible au hover
3. **Coherent** : utiliser `KeyboardGuide` partout, jamais de HTML custom
4. **Non-intrusif** : pas d'animation sur les hints (reserver aux feedbacks)
5. **Typographie** :
   - **Labels** : Affiches en **MAJUSCULES**. Passer le label en minuscules dans le code : `label="continuer"` → affiche "CONTINUER".
   - **Touches** : Affichees en **minuscules** (ex: "espace", "retour").
   - **Forme** : Label = verbe d'action a l'infinitif (ex: "continuer", "valider").

## Composant `KeyboardGuide`

**Fichier :** `apps/frontend/src/components/ui/KeyboardGuide.vue`

| Prop            | Type                    | Default     | Description                                         |
| --------------- | ----------------------- | ----------- | --------------------------------------------------- |
| `mode`          | `'single' \| 'cluster'` | `'cluster'` | Une touche ou groupe de fleches (D-pad)             |
| `keyName`       | `string`                | `'left'`    | Touche a afficher: `left`, `right`, `up`, `down`... |
| `size`          | `'small' \| 'large'`    | `'small'`   | Taille de l'indicateur                              |
| `label`         | `string`                | -           | Texte d'action associe (ex: "continuer", "aide")    |
| `labelPosition` | `'right' \| 'bottom'`   | `'right'`   | Position du label par rapport a la touche           |

## Pattern Tablette : Alternatives Tactiles

Sur tablette, les KeyboardGuide sont masques et remplaces par des instructions textuelles simples.

```vue
<!-- Pattern standard : hint clavier + alternative tactile -->
<KeyboardGuide
  key-name="space"
  mode="single"
  size="large"
  label="continuer"
  class="hidden lg:flex"
/>
<p class="lg:hidden text-sky-500 text-lg">
  Appuie pour continuer
</p>
```
