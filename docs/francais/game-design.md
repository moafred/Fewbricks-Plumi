# Plumi : Game Design — Le Parcours d'Apprentissage [GAME]

> Vision du jeu, core loop, mini-jeux, progression, recompenses → voir [CLAUDE.md](../CLAUDE.md)
> Ce document complete CLAUDE.md avec les details de narration, themes visuels et esthetique.

## Narration Etendue

L'enfant est un eleve de CE1 dans le **parcours d'apprentissage**. Sa plume d'ecriture (**Plumi**) est son compagnon. Chaque conjugaison correcte fait vivre le monde : arbres, animaux, batiments apparaissent. Les verbes **etre** et **avoir** sont les deux premiers defis fondamentaux.

### Mapping Narratif → Machine a Etats

| Phase technique (CLAUDE.md) | Narration joueur                                    |
| --------------------------- | --------------------------------------------------- |
| **Discovery**               | Plumi presente le contexte (phrase, scene illustree) |
| **Challenge**               | Un defi (exercice pedagogique) apparait             |
| **Response**                | L'enfant manipule les mots, la forme verbale opere  |
| **Resolution**              | Etoiles + transformation visuelle du decor          |

## Les Themes Visuels (Fonds Atmospheriques)

Chaque cahier a un theme visuel propre. Les themes sont des gradients CSS legers, pas des illustrations lourdes. L'ecran d'accueil a un fond blanc uni.

| Cahier | Theme | Classe CSS | Ambiance |
| ------ | ----- | ---------- | -------- |
| 1 | Jardin | `theme-jardin` | Vert doux, nature |
| 2 | Fondations | `theme-fondations` | Bleu ciel, serein |
| 3 | Clairiere | `theme-clairiere` | Vert sauge, calme |
| 4 | Futur | `theme-futur` | Or chaud, lumiere |
| 5 | Brumes | `theme-brumes` | Gris bleu, mystere |
| 6 | Flux | `theme-flux` | Melange des trois couleurs |

## Rythme de Jeu

- **Micro-activite** (1 exercice) : 30-120 secondes
- **Session** (sequence de micro-activites) : 3 a 5 minutes
- **Impact Permanent** : Une fois un element debloque, il reste dans le monde de l'enfant.

## Esthetique : Theme Scolaire [UI]

> Details d'implementation (couleurs, animations, responsive) → Skill `plumi-design-ux`

- Style **Cahier d'Ecole** : Fond clair, texture lignes Seyes (`.texture-notebook`), couleurs douces
- Palette : `sky-*` (navigation), `gold-*` (recompenses), `meadow-*` (succes), `coral-*` (encouragement), `moss-*` (grammaire), `stone-*` (texte)
- **Audio Immersif** : Orchestrations douces, feedback sonore melodique (chaque bonne reponse = encouragement)
