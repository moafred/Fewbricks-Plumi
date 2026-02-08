# Plumi Maths — Game Design CE1

## Concept Narratif

L'enfant poursuit son aventure avec **Plumi**, sa plume d'écriture lumineuse. Dans le monde des mathématiques, chaque calcul correct **construit le monde** : les nombres font pousser les arbres, les additions construisent les ponts, les soustractions creusent les rivières, les multiplications font apparaître les étoiles.

Les 4 opérations fondamentales sont les **4 piliers** du monde mathématique.

---

## Mécaniques de Jeu — 8 Mini-Jeux

### 3 Mécaniques réutilisées du Français (adaptées)

| Mécanique | Composant | Compétence visée |
| --- | --- | --- |
| **tri-nombres** | `TriNombresGame` | Tri binaire : pair/impair, <50/≥50, etc. |
| **ardoise-calcul** | `ArdoiseCalculGame` | QCM 2×2 : choisir le bon résultat d'un calcul |
| **encrier-calcul** | `EncrierCalculGame` | Phrase à trou : compléter un calcul ou problème |

### 5 Mécaniques spécifiques maths

| Mécanique | Composant | Compétence visée |
| --- | --- | --- |
| **droite-numerique** | `DroiteNumeriqueGame` | Placer un nombre sur une droite graduée |
| **tour-de-blocs** | `TourDeBlocsGame` | Composer un nombre avec cubes/barres/plaques (base 10) |
| **partage** | `PartageGame` | Colorier la bonne fraction d'une forme |
| **horloge** | `HorlogeGame` | Lire l'heure sur une horloge analogique |
| **marche** | `MarcheGame` | Composer une somme avec pièces et billets |

---

## Progression — 8 Cahiers / 24 Chapitres

IDs : Livres 101-108, Chapitres 1001-1024 (pas de collision avec Français 1-30 / 1-10).

| Cahier | Titre | Domaine | Thème visuel | Mécaniques |
| --- | --- | --- | --- | --- |
| 101 | Les Nombres | Nombres 0-99, pair/impair | `nombres` | tri-nombres, ardoise-calcul |
| 102 | Les Additions | Addition, compléments à 10 | `additions` | ardoise-calcul, encrier-calcul |
| 103 | Les Soustractions | Soustraction, calcul mental | `soustractions` | ardoise-calcul, encrier-calcul |
| 104 | Les Multiplications | Tables ×2 à ×5 | `multiplications` | ardoise-calcul, encrier-calcul |
| 105 | Grandeurs et Mesures | Temps, monnaie, longueurs | `mesures` | horloge, marche, ardoise-calcul |
| 106 | Les Fractions | Fractions d'un tout ≤ 1 | `fractions` | partage, ardoise-calcul |
| 107 | Géométrie et Espace | Figures, valeur positionnelle, nombres 0-999 | `geometrie` | droite-numerique, tour-de-blocs |
| 108 | Révision Maths (bonus) | Tous domaines mélangés | `revision-maths` | toutes mécaniques |

---

## Thèmes Visuels — 8 Biomes Maths

| ThemeId | Palette | Ambiance |
| --- | --- | --- |
| `nombres` | dawn | Prairie des Nombres — chiffres flottants, ciel doré |
| `additions` | sky | Pont des Additions — ponts en construction |
| `soustractions` | coral | Rivière des Soustractions — rivières qui se creusent |
| `multiplications` | gold | Forêt des Multiplications — arbres qui se multiplient |
| `mesures` | meadow | Village des Mesures — horloges, balances, marchés |
| `fractions` | moss | Grotte des Fractions — cristaux fractionnés |
| `geometrie` | sky | Tour de Géométrie — formes et constructions |
| `revision-maths` | coral | Arène des Champions — tous les éléments réunis |

---

## Principes de Game Design Maths

### Manipulatifs d'abord
- Les nombres sont toujours représentés visuellement (blocs, droite, parts de gâteau)
- L'enfant manipule AVANT de répondre abstraitement

### Histoire d'abord
- Chaque calcul est contextualisé dans une micro-histoire
- "Tom a 5 billes. Il en gagne 3. Combien en a-t-il ?"

### Zéro chrono stressant
- Pas de timer visible pendant les exercices
- La fluence est mesurée discrètement, pas comme contrainte

### Progression spiralaire
- Chaque chapitre : introduction → pratique → boss
- Nombre range progressif : 0-20 → 0-50 → 0-99 → 0-999

---

## Anti-Patterns — Ce qu'on ne fait JAMAIS en maths

- Pas de calcul mental chronométré visible (stress)
- Pas de "tu as faux, recommence" sans montrer la correction
- Pas de notation chiffrée (pas de "8/10")
- Pas d'exercices abstraits sans contexte visuel
- Pas de problèmes avec vocabulaire complexe (phrases ≤ 8 mots)
