# Plumi — Apprendre le Français CE1

Application éducative gamifiée d'apprentissage du français pour enfants CE1 (6-7 ans).
Conjugaison (présent, futur, imparfait — être/avoir), extensible à toute la grammaire et l'orthographe.

Nous sommes en 2026.

## Commandes Rapides

- `make dev` : Lance tout l'environnement (Front + Back + DB)
- `make storybook` : Lance Storybook (design system visuel)
- `make typecheck` : Vérifie les types TypeScript (Front + Back)
- `make install` : Installe les dépendances

## Ressources de Référence

| Ressource          | Lien                                                                         |
| ------------------ | ---------------------------------------------------------------------------- |
| **Architecture**   | [docs/architecture.md](./docs/architecture.md) — Stratégie IA, principes    |
| **Game Design**    | [docs/game-design.md](./docs/game-design.md) — Biomes, esthétique, sessions |
| **Pédagogie**      | [docs/pedagogie.md](./docs/pedagogie.md) — Programme CE1, répétition espacée |
| **Storybook**      | `apps/frontend/src/components/**/*.stories.ts` — Composants, variantes       |
| **Design & UX**    | Skill `plumi-design-ux` — Typo, couleurs, animations, responsive, UX        |

**Pour accéder aux specs d'un composant UI**, lire le fichier `.stories.ts` correspondant. Les stories contiennent : JSDoc (règles), argTypes (props), render (exemples).

---

## Méthodologie de Travail — Équipe Plumi-Studio

### Rôles de l'Équipe Virtuelle

Chaque membre possède un profil et des compétences spécifiques pour éviter les réponses génériques :

| Tag          | Rôle                           | Responsabilités                                                                                                          |
| ------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **[LEAD]**   | Facilitateur Stratégique       | Orchestre les échanges, force une décision à chaque fin de tour                                                          |
| **[PEDA]**   | Pédagogue CE1 / Français       | Expert programme Éducation Nationale CE1. Valide exercices, progression, vocabulaire adapté 6-7 ans. Réf. Lumni, Pass-Éducation |
| **[GAME]**   | Game Designer Enfants          | Gamification 6-7 ans. Boucle de jeu, récompenses, micro-activités 30-120s. Garant du fun                                |
| **[ARCHI]**  | Tech Lead Senior               | Vue 3, Pinia, Fastify, Prisma, PWA, machine à états, perf < 16ms                                                        |
| **[UI]**     | Designer UI/UX Enfants         | Couleurs vives, formes rondes, animations engageantes, touch targets 80px+, accessibilité                                |
| **[AUDIO]**  | Sound Designer                 | Musiques, feedbacks sonores, voix d'encouragement. Ambiance immersive du parcours d'apprentissage                                |
| **[KID]**    | Testeur de 6 ans (CE1)         | Évalue simplicité et plaisir. Feedback brutal. Droit de veto sur l'ennui                                                |
| **[PARENT]** | Parent Engagé                  | App sans supervision, sans pub, sécurisée. Gestion du temps d'écran                                                     |
| **[DOC]**    | Gardien de la Continuité       | Knowledge Management, cohérence des versions, journal des décisions (ADR)                                                |

### Workflow de Prise de Décision

1. **Délibération** : Au moins 3 personas pertinents interviennent avant conclusion
2. **Veto [PEDA]** : [PEDA] peut invalider si le contenu ne respecte pas le programme CE1 ou si le vocabulaire est inadapté
3. **Test [KID]** : [KID] évalue le fun — droit de veto sur l'ennui
4. **Test [ARCHI]** : [ARCHI] évalue le coût selon le ratio Temps vs Valeur
5. **Synthèse [DOC]** : [DOC] produit un résumé structuré après chaque décision majeure

### Principes Directeurs

- **Programme Éducation Nationale CE1** comme référence absolue
- **Zéro frustration** : Pas de game over, pas de vies, pas de chrono stressant
- **Apprentissage sans punition** : Montrer la bonne réponse, encourager, réessayer
- **Fun d'abord** : Si [KID] s'ennuie, c'est un bug
- **Audio systématique** : L'enfant de CE1 ne lit pas couramment, tout doit être vocalisé

---

## Vision du Jeu — Le parcours d'apprentissage [GAME]

### Concept Narratif

L'enfant est un élève de CE1 dans le **parcours d'apprentissage**. Sa plume d'écriture (**Plumi**) est son compagnon. Chaque conjugaison correcte = un sort qui fait vivre le monde (arbres, animaux, bâtiments). Les verbes **être** et **avoir** sont les deux premiers sorts fondamentaux.

### Mascotte — Plumi

Plumi est une **plume d'écriture lumineuse** (comme Lumi est une luciole dans le projet frère). Plumi a des états visuels :

```
PlumiState: 'idle' | 'challenge' | 'celebration' | 'encouragement'

┌─────────┐  question  ┌───────────┐   réponse   ┌──────────┐
│  idle   │ ─────────▶ │ challenge │ ──────────▶ │ résultat │
└─────────┘            └───────────┘             └────┬─────┘
     ▲                                                │
     │                  ┌─────────────┐               │ correct
     └──────────────────│ celebration │◀──────────────┤
     │                  └─────────────┘               │
     │                  ┌───────────────┐             │ erreur
     └──────────────────│ encouragement │◀────────────┘
                        └───────────────┘
```

### Core Loop — 4 États [GAME]

| État          | Description                                              | Durée cible |
| ------------- | -------------------------------------------------------- | ----------- |
| **DÉCOUVERTE** | Plumi présente le contexte (phrase, scène illustrée)    | 3-5s        |
| **DÉFI**       | La question apparaît (QCM, drag & drop, tri...)        | —           |
| **RÉPONSE**    | L'enfant interagit — feedback immédiat (< 200ms)       | < 200ms     |
| **RÉSOLUTION** | Célébration ou encouragement doux (jamais de punition)  | 2-4s        |

### Mini-Jeux [GAME] [PEDA]

5 mécaniques implémentées (`StepMechanic` dans `@plumi/shared`) :

| Mécanique          | Composant            | Compétence visée                              |
| ------------------ | -------------------- | --------------------------------------------- |
| **tri-sorcier**    | `TriSorcierGame`     | Distinction être vs avoir (choix binaire)     |
| **grimoire**       | `GrimoireGame`       | Sélection de la bonne forme conjuguée (2×2)  |
| **potion**         | `PotionGame`         | Complétion de phrase à trou (conjugaison)     |
| **pont-accords**   | `PontAccordsGame`    | Accord dans le GN (genre/nombre)              |
| **potion-gn**      | `PotionGnGame`       | Complétion de phrase à trou (vocabulaire GN)  |

### Progression — 6 Cahiers / 18 Chapitres [PEDA]

Définis dans `packages/shared/src/chapters.ts` (`BOOKS`, `CHAPTERS`) :

| Livre | Thème | Temps | Chapitres |
| ----- | ----- | ----- | --------- |
| 1. Cahier 1 : Le Présent | Découverte | Présent | 1-3 |
| 2. Cahier 2 : Les Fondations | Consolidation | Présent | 4-6 |
| 3. Cahier 3 : Les Accords | Accords GN | Présent + GN | 7-9 |
| 4. Cahier 4 : Le Futur | Futur | Futur | 10-12 |
| 5. Cahier 5 : L'Imparfait | Imparfait | Imparfait | 13-15 |
| 6. Cahier 6 : Révision (bonus) | Mélange | Tous temps | 16-18 |

Chaque chapitre contient 4-5 étapes (`ChapterStep`) avec progression en spirale sur les pronoms (je/tu → il/elle/on/nous → tous → boss). Le cahier bonus se déverrouille quand les 5 livres principaux sont complétés.

### Système de Récompenses [GAME]

| Récompense              | Déclencheur                        | Granularité      |
| ----------------------- | ---------------------------------- | ---------------- |
| Étoiles de progression        | +1 par bonne réponse, +bonus série | Micro (immédiat) |
| Badges                  | Mini-jeu terminé                   | Leçon            |
| Éléments du monde       | Arbres, animaux, bâtiments         | Chapitre         |
| Indicateurs progrès     | Milestone chapitres                | Arc narratif     |
| Cosmétiques avatar      | Retour quotidien                   | Rétention        |

**Principe** : Micro-récompenses fréquentes (1 étoile par action correcte). Pas de gros nombres gonflés.

---

## Principes Pédagogiques [PEDA]

1. **Programme Éducation Nationale CE1** comme référence — conjugaison présent être/avoir en priorité
2. **Conjugaisons = source de vérité** dans `packages/shared/` (données structurées, pas de duplication)
3. **Pas d'erreur sans remédiation** — toujours montrer la bonne réponse, permettre de réessayer
4. **Répétition espacée** — Système Leitner simplifié (les items mal maîtrisés reviennent plus souvent)
5. **Vocabulaire adapté 6-7 ans** — phrases courtes (5-8 mots), contextes familiers (école, maison, jeux)
6. **Audio systématique** — chaque consigne, chaque mot, chaque feedback est vocalisé
7. **Progression du simple au complexe** — un pronom à la fois, puis combinaisons progressives

---

## Patterns de Gamification [GAME] [UI]

> **Détails d'implémentation UI** (typo, couleurs, animations, touch targets) → Skill `plumi-design-ux`

### Anti-Patterns Explicites — Ce qu'on ne fait JAMAIS

- Pas de classement entre enfants
- Pas de publicité
- Pas de texte long sans audio
- Pas de game over / vies / chrono stressant
- Pas de contenu payant bloquant la progression
- Pas d'achats in-app
- Pas de notifications push agressives

---

## Conventions Techniques [ARCHI]

### Stack Technique

| Couche           | Technologie                                  |
| ---------------- | -------------------------------------------- |
| **Frontend**     | Vue 3 + TypeScript + Vite                    |
| **State**        | Pinia                                        |
| **Styling**      | Tailwind CSS 4                               |
| **Animations**   | CSS transitions + @vueuse/motion (à évaluer) |
| **Audio**        | Howler.js ou Web Audio API                   |
| **Backend**      | Fastify + TypeScript                         |
| **ORM**          | Prisma                                       |
| **Database**     | PostgreSQL 17                                |
| **PWA**          | vite-plugin-pwa + Workbox                    |
| **Tests**        | Vitest + Vue Test Utils                      |
| **Storybook**    | Storybook                                    |
| **Linting**      | ESLint + Prettier                            |
| **Pkg Manager**  | pnpm (monorepo workspaces)                   |

### Structure Monorepo

```
apps/
  frontend/                    # Vue 3 PWA
    src/
      components/game/         # Mini-jeux + navigation (BookShelf, ChapterRunner...)
      components/ui/           # Atoms : ActionButton, NotebookCard, GameCard, ConfirmModal...
      components/icons/        # Icônes SVG (StarFilledIcon, HatIcon...)
      composables/             # useKeyboardNavigation, useBackNavigation
      stores/                  # Pinia : chapter-progress, game, grimoire, potion...
  backend/                     # Fastify API
packages/
  shared/                      # Types TS + constantes + générateurs (SSOT)
docs/
docker-compose.yml             # PostgreSQL
Makefile
pnpm-workspace.yaml
```

### Architecture Frontend [ARCHI]

| Couche           | Rôle                      | Exemples                                              |
| ---------------- | ------------------------- | ----------------------------------------------------- |
| **Icons**        | Glyphes SVG atomiques     | `components/icons/StarFilledIcon.vue`, `HatIcon.vue`  |
| **Atoms**        | Éléments UI purs          | `components/ui/ActionButton.vue`, `KeyboardGuide.vue`  |
| **Molecules**    | Composants métier simples | `components/game/SpellChoice.vue`, `ChoiceButton.vue`, `ChallengeCard.vue` |
| **Organisms**    | Mini-jeux complets        | `components/game/PotionGame.vue`, `GrimoireGame.vue`  |
| **Orchestrateur**| Gestion d'un chapitre     | `components/game/ChapterRunner.vue`                   |
| **Navigation**   | Écrans de parcours        | `components/game/BookShelf.vue`, `BookView.vue`       |
| **Composables**  | Logique réutilisable      | `composables/useKeyboardNavigation.ts`                |
| **Stores**       | État Pinia                | `stores/chapter-progress.ts`, `stores/game.ts`        |

### Machine à États du Jeu [ARCHI]

```
GamePhase: 'discovery' | 'challenge' | 'response' | 'resolution'

┌───────────┐  présentation  ┌───────────┐  interaction  ┌───────────┐
│ discovery │ ─────────────▶ │ challenge │ ────────────▶ │ response  │
└───────────┘                └───────────┘               └─────┬─────┘
      ▲                                                        │
      │                     ┌────────────┐                     │
      └─────────────────────│ resolution │◀────────────────────┘
                            └────────────┘
```

### Navigation Frontend [ARCHI]

```
Screen: 'home' → 'bookshelf' → 'book-view' → 'chapter-runner'
```

- **Home** : Hub matières avec mascotte Plumi — carte Français (active) + Maths (verrouillé)
- **BookShelf** : Grille de 6 cahiers (`BookCard`), progression étoiles, cahier bonus verrouillé
- **BookView** : Chapitres d'un livre en chemin vertical, chapitre recommandé mis en avant
- **ChapterRunner** : Orchestrateur — intro narrative → étapes séquentielles (mini-jeux) → `ChapterResult`

### Mode Embarqué (Embedded) [ARCHI]

Les 5 mini-jeux supportent un mode `embedded` pour fonctionner comme étape dans `ChapterRunner` :
- Props : `embedded`, `count`, `tense`, `pronouns`, `verbs`
- Emit `step-complete` avec `{ score, total, results }` en fin d'étape
- En mode standalone : affichent leur propre écran de résultat

---

## Règles d'Or — Intransigeance [ARCHI]

**L'équipe est INTRANSIGEANTE sur les points suivants. Aucun compromis n'est accepté.**

1. **Qualité de Code Absolue** :
   - Pas de "quick fix" sale. Si le code est bancal, on le réécrit.
   - Pas de fonctions de 100 lignes.
   - Typage strict obligatoire (pas de `any` implicite ou explicite).
   - **Validation API** : Toute entrée d'API (body, query, params) DOIT être validée avec Zod.
   - **Validation build** : Toujours lancer un `make typecheck` après une série de changements.
   - Nommage explicite et sémantique (code en anglais, commentaires métier en français).

2. **Zéro Dette Technique** :
   - Toute nouvelle feature doit être propre.
   - **Boy Scout Rule** : Si on touche à un fichier, on le laisse plus propre qu'on ne l'a trouvé.
   - Si une tâche nécessite un refactoring préalable, on FAIT le refactoring d'abord.

3. **Source Unique de Vérité — `@plumi/shared`** :
   - Tout ce qui est partagé (types `Verb`, `Conjugation`, `Exercise`, constantes `CONJUGATION_DATA`) DOIT vivre dans `@plumi/shared`.
   - Interdiction formelle de dupliquer des définitions entre Front et Back.
   - Si le build casse à cause d'un changement dans Shared, c'est une bonne chose : cela force la cohérence.

4. **Zéro SVG Inline** :
   - Toujours utiliser le système de composants d'icons (`@/components/icons`).
   - Boy Scout Rule : si on touche un vieux composant avec des SVG inline, on le refactore.

5. **Zéro Pixels Hardcodés** :
   - Layout et sizing via classes Tailwind (`w-12`, `p-4`), jamais de `px` en dur.

6. **Pas d'Emojis dans l'UI** :
   - Utiliser des SVG ou des illustrations. Les emojis sont réservés aux docs internes.

7. **Code en Anglais, Commentaires Métier en Français** :
   - Variables, fonctions, composants : anglais.
   - Commentaires expliquant des règles pédagogiques ou métier : français.

8. **Pas de Boutons Natifs** :
   - Utiliser `ActionButton` pour toutes les actions interactives.
   - Ne pas bypasser le Design System (tokens, composants UI).

9. **Respect des Règles de Domaine** :
   - La vérité métier (conjugaisons, règles de progression, calcul de points) réside dans le **Backend**.
   - Le Frontend affiche et optimise l'UX. Il ne décide JAMAIS d'une règle métier.

10. **Zéro Code Mort** :
    - Pas de code commenté, de fonctions inutilisées, de variables orphelines, d'imports non utilisés.
    - Si du code n'est plus appelé, on le supprime. Git est l'historique.

11. **Zéro Code Historique Fonctionnel** :
    - Pas de code gardé "au cas où" ou "pour référence".
    - Pas de `// ancien comportement`, `// deprecated`, `// TODO: supprimer`.
    - Si c'est remplacé, c'est supprimé.

12. **Zéro Fallback Silencieux** :
    - Pas de `|| valeurParDéfaut` qui masque une erreur de configuration.
    - Les valeurs d'environnement sont obligatoires : si elles manquent, l'app doit crasher au démarrage, pas fonctionner avec des valeurs fantômes.
    - Préférer `!` (non-null assertion) ou une validation explicite au démarrage plutôt qu'un fallback silencieux.

13. **Zéro Classe Dupliquée — Composants Réutilisables** :
   - Si un pattern de classes Tailwind (>3 utilitaires) est copié dans 2+ composants, extraire un composant Vue dédié.
   - Si une div avec des classes spécifiques apparaît dans 2+ endroits, créer un composant réutilisable.
   - Les états visuels (idle/correct/incorrect...) doivent être un prop typé (`state: ChoiceState`), pas des classes conditionnelles dupliquées.
   - Préférer les slots pour les contenus variables plutôt que des props de style.
   - **Composants UI disponibles** : `NotebookCard`, `NotebookButton`, `NotebookBadge`, `ActionButton`, `StatusBadge`, `ChoiceButton`, `ChallengeCard`, `GameHeader`, `GameFinished`, `PlumiMascot`, `CelebrationParticles`, `NarrativeCard`, `ProgressPath`, `SubjectCard`, `BookCard`.
   - **Processus** : Avant d'écrire une div avec >3 classes Tailwind, vérifier si un composant existe déjà dans `@/components/ui` ou `@/components/game`.

14. **Zéro Couleur Générique** :
    - Utiliser exclusivement les tokens Plumi : `sky-*`, `gold-*`, `meadow-*`, `coral-*`, `moss-*`, `stone-*`.
    - Interdit : `purple-*`, `indigo-*`, `amber-*`, `bg-white` (sauf `bg-white/opacity`).
    - Fond des cartes de jeu : `bg-white/90 backdrop-blur-md border border-sky-200 shadow-sm` (thème clair).

15. **Keyboard = Desktop Only** :
   - `KeyboardGuide` et raccourcis clavier sont réservés au desktop (`hidden lg:flex`).
   - En mode embedded (`ChapterRunner`), les mini-jeux masquent leur `GameHeader` (`v-if="!embedded"`).
   - Sur mobile/tablette : interaction tactile uniquement, pas d'indication clavier.

16. **Composants Avant Divs** :
   - Toujours vérifier l'existant AVANT d'écrire une nouvelle div avec des classes Tailwind.
   - Si un pattern de div apparaît dans 2+ endroits, créer immédiatement un composant réutilisable.
   - Les composants UI (`@/components/ui`) sont prioritaires sur les divs inline.
   - Exemples interdits :
     * `<div class="bg-white/90 border-2 border-sky-200 texture-notebook">` → Utiliser `NotebookCard`
     * `<button class="bg-white/90 hover:bg-white/95 texture-notebook">` → Utiliser `NotebookButton`
     * `<div class="bg-white/90 rounded-full border-2 border-sky-200">` → Utiliser `NotebookBadge`
   - Checklist avant commit : "Ai-je créé une div avec >3 classes Tailwind qui pourrait être un composant ?"

### Règles de Contribution

- **Vérifier l'existant AVANT de coder** : Explorer le codebase pour identifier patterns, composants réutilisables, types partagés. Ne pas réinventer ce qui existe.
- **Composants réutilisables** : Avant d'écrire une div avec >3 classes Tailwind, vérifier si un composant existe dans `@/components/ui` ou `@/components/game`. Si un pattern apparaît 2+ fois, créer un composant. Voir `docs/checklist-components.md`.
- **Partage de code** : Ne JAMAIS dupliquer de constantes ou de types entre frontend et backend. Utiliser `@plumi/shared`.
- **Standards Qualité** : 0 erreurs/warnings, pas de `any`, pas de `console.log` en production.
- **Pas de marqueurs temporels** dans les commentaires (pas de NEW, OLD, TODO avec dates).
- **Code Review** : Vérifier l'utilisation de composants réutilisables. Rejeter les PRs avec des divs répétitives non justifiées. Exiger la création de composants si pattern répété.

---

## Performance [ARCHI]

> **Responsive, typographie, touch targets, animations** → Skill `plumi-design-ux`

| Métrique               | Objectif     |
| ---------------------- | ------------ |
| Bundle initial         | < 500KB      |
| Latence feedback       | < 200ms      |
| Latence input          | < 16ms       |
| Offline                | Service Worker (Workbox) |
| Assets critiques       | Preload      |

- **Offline-first** via Service Worker : les exercices déjà chargés fonctionnent sans connexion
- **Pre-fetch audio** : téléchargement à l'init, zéro latence réseau pendant le jeu
- **Preload assets critiques** avant le début de chaque mini-jeu

---

## Tags de l'Équipe

Invoquer systématiquement les personas par leurs tags `[LEAD]`, `[PEDA]`, `[GAME]`, `[ARCHI]`, `[UI]`, `[AUDIO]`, `[KID]`, `[PARENT]`, `[DOC]` pour simuler une expertise ciblée.
