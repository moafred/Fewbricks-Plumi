# Design : Progression Guidee — Reorganisation Navigation & Pedagogie

**Date** : 2026-02-05
**Statut** : Valide

## Probleme

L'enfant voit 5 livres x 5 mini-jeux = 25 choix sur un seul ecran. Les noms de mini-jeux ("Tri", "Grimoire", "Potion GN") sont cryptiques. Ni l'enfant ni le parent ne savent par ou commencer.

## Decision

**Progression guidee** : l'enfant ouvre un livre, les exercices se deroulent dans un ordre pedagogique. Le systeme mixe les mecaniques automatiquement. L'enfant ne choisit jamais un "type d'exercice".

## Parcours Enfant Simplifie

L'enfant fait 2 choix maximum :

```
BIBLIOTHEQUE (6 livres, tous ouverts sauf Bonus)
  -> Tap sur un livre
CHAPITRES (3 par livre, chemin visuel)
  -> Tap "Jouer" sur le chapitre recommande
AVENTURE AUTO-SEQUENCEE (5-6 etapes x 3-4 questions)
  -> L'enfant joue, le systeme enchaine
RESULTAT + RECOMPENSE
```

## Progression Alignee Programme CE1

| Periode scolaire | Contenu CE1 | Livre Plumi | Focus |
|---|---|---|---|
| P1 (Sept-Oct) | Identifier verbe, notion temporelle | Le Jardin des Mots | Decouverte, tri temporel |
| P2 (Nov-Dec) | Present etre/avoir | Le Livre des Fondations | Present etre -> avoir -> duel |
| P3 (Jan-Fev) | Present -er + GN | La Clairiere Enchantee | Verbes -er + accords GN |
| P4 (Mar-Avr) | Futur etre/avoir + GN | Les Sentiers du Futur | Futur + GN |
| P5 (Mai-Jun) | Imparfait + revisions | Les Brumes du Passe | Imparfait + revision |
| Bonus | Hors programme | Le Flux Temporel | Tous les temps melanges |

## Progression Intra-Livre : Spirale

3 chapitres par livre, toujours le meme schema :

```
Chapitre 1 : ISOLER     -> Un seul verbe (etre OU avoir OU -er)
Chapitre 2 : RENFORCER  -> Le deuxieme verbe (ou famille)
Chapitre 3 : COMBINER   -> Duel / melange (discrimination)
```

## Progression Intra-Chapitre : Bloom Applique

Chaque chapitre = 5-6 etapes x 3-4 questions = ~18-20 questions (~6-7 min).

Les mecaniques sont choisies automatiquement selon le niveau cognitif :

```
Etapes 1-2 : RECONNAITRE  -> Tri Sorcier (classer, identifier)
Etapes 3-4 : APPLIQUER    -> Grimoire (choisir la bonne forme)
Etapes 5-6 : PRODUIRE     -> Potion (completer une phrase)
Etape 7    : INTEGRER      -> Pont / Potion GN (si GN dans le livre)
Etape 8    : BOSS          -> Mix de tout
```

### Mecaniques Disponibles par Type de Chapitre

| Type de chapitre | Mecaniques | Raison |
|---|---|---|
| Verbe seul (etre OU avoir) | Grimoire + Potion | Tri n'a pas de sens avec 1 verbe |
| Duel (etre vs avoir) | Tri Sorcier + Grimoire + Potion | Tri = discrimination |
| Avec GN (P3+) | Grimoire + Potion + Pont + Potion GN | Accords integres |

### Exemple Concret : "Le Sort ETRE" (Present)

| Etape | Pronoms | Mecanique | Ce que l'enfant voit |
|---|---|---|---|
| 1 | je, tu | Grimoire | "je -> etre = ?" parmi 4 choix |
| 2 | il, elle | Grimoire | "elle -> etre = ?" parmi 4 choix |
| 3 | je, tu, il, elle | Potion | "Elle ___ contente." |
| 4 | nous, vous | Grimoire | "nous -> etre = ?" parmi 4 choix |
| 5 | ils, elles + tous | Potion | "Ils ___ dans la cour." |
| 6 BOSS | tous melanges | Potion (accelere) | Mix de phrases, tous pronoms |

### Exemple Contraste : "Le Duel ETRE vs AVOIR"

| Etape | Mecanique | Ce que l'enfant voit |
|---|---|---|
| 1 | Tri Sorcier | "je suis" -> chapeau etre ou avoir ? |
| 2 | Tri Sorcier | "nous avons" -> chapeau etre ou avoir ? |
| 3 | Grimoire | "tu -> avoir = ?" (pieges avec formes de etre) |
| 4 | Potion | "Nous ___ un chien." / "Nous ___ grands." |
| 5 BOSS | Mix Tri + Potion | Alternance rapide |

## Systeme d'Etoiles

| Etoiles | Condition | Message Plumi |
|---|---|---|
| 1/3 | Chapitre termine (quel que soit le score) | "Tu as fini l'aventure !" |
| 2/3 | >= 70% bonnes reponses au 1er essai | "Bravo, tu maitrises le sort !" |
| 3/3 | >= 90% bonnes reponses au 1er essai | "Incroyable, tu es un vrai magicien !" |

On obtient toujours au moins 1 etoile. Aucun verrouillage lie au score.

## Gestion des Erreurs : Remediation Immediate

1. Feedback doux (animation orange, pas rouge)
2. Plumi montre la bonne reponse
3. La question revient 2-3 questions plus tard
4. Si encore faux au retour : on montre et on avance (max 2 retours)
5. L'item reviendra dans un futur chapitre

## Navigation : Ouverts avec Recommandation

- Tous les livres accessibles (sauf Bonus = verrouille jusqu'a completion des 5 livres)
- Le livre recommande a un glow anime
- Les chapitres termines montrent leurs etoiles
- Le chapitre recommande a le gros bouton "Jouer"
- Tous les chapitres restent rejouables

## Recompenses de Livre

| Recompense | Declencheur |
|---|---|
| Element du monde (arbre, animal...) | 1 etoile sur les 3 chapitres |
| Compagnon magique | 3 etoiles sur les 3 chapitres |

## Delta Code

### Garder tel quel

- 5 composants mini-jeux (TriSorcierGame, GrimoireGame, PotionGame, PontAccordsGame, PotionGnGame)
- 5 stores Pinia associes
- Composants UI atoms (MagicButton, WordCard, StarProgress...)

### Supprimer

- `apps/frontend/src/data/adventures.ts` (remplace par donnees shared)
- `BookCard.vue` forme actuelle (plus de boutons de mini-jeux)

### Modifier

- `packages/shared/src/chapters.ts` : 5 livres + 1 bonus, chapitres avec sequences d'etapes
- `packages/shared/src/types.ts` : nouveau type `ChapterSequence`
- `App.vue` : nouveaux screens `book-view` et `chapter-runner`
- `BookShelf.vue` : cartes simples (titre + etoiles + badge "en cours")

### Creer

```
components/game/
  BookView.vue          # Vue d'un livre : chemin de 3 chapitres
  ChapterRunner.vue     # Orchestrateur : sequence les mini-jeux
  ChapterResult.vue     # Ecran de fin (etoiles + score)

stores/
  chapter-progress.ts   # Progression enfant (chapitres, etoiles, erreurs)
```

### Structure de Donnees Cle

```typescript
type StepMechanic = 'tri-sorcier' | 'grimoire' | 'potion' | 'pont-accords' | 'potion-gn';

interface ChapterStep {
  mechanic: StepMechanic;
  pronouns: Pronoun[];
  verbs: VerbId[];
  questionCount: number;    // 3-4
  isBoss?: boolean;
}

interface Chapter {
  id: number;
  title: string;
  narrative: string;        // phrase d'intro vocalisee par Plumi
  tense: Tense;
  steps: ChapterStep[];     // sequence auto-pilotee
}
```

### Navigation Resultante

```
Screen = 'home' | 'bookshelf' | 'book-view' | 'chapter-runner'

HOME -> BOOKSHELF -> BOOK VIEW -> CHAPTER RUNNER -> CHAPTER RESULT
                                       ^                  |
                                       +---- Rejouer -----+
```

Les mini-jeux ne sont plus des screens — ils sont des composants enfants rendus par ChapterRunner.
