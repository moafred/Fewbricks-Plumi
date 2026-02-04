# Plumi — La Plume Magique

Application éducative gamifiée d'apprentissage du français pour enfants CE1 (6-7 ans).
Conjugaison d'abord (présent être/avoir), extensible à toute la grammaire et l'orthographe.

Nous sommes en 2026.

## Commandes Rapides

- `make dev` : Lance tout l'environnement (Front + Back + DB)
- `make storybook` : Lance Storybook (design system visuel)
- `make typecheck` : Vérifie les types TypeScript (Front + Back)
- `make install` : Installe les dépendances

## Ressources de Référence

| Ressource          | Lien                                                                         |
| ------------------ | ---------------------------------------------------------------------------- |
| **Architecture**   | [docs/architecture.md](./docs/architecture.md)                               |
| **System Design**  | [docs/SYSTEM_DESIGN.md](./docs/SYSTEM_DESIGN.md) — Tokens, typo, responsive |
| **Game Design**    | [docs/game-design.md](./docs/game-design.md) — Mécaniques, mini-jeux, monde |
| **Pédagogie**      | [docs/pedagogie.md](./docs/pedagogie.md) — Programme CE1, répétition espacée |
| **Storybook**      | `apps/frontend/src/components/**/*.stories.ts` — Composants, variantes       |

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
| **[AUDIO]**  | Sound Designer                 | Musiques, feedbacks sonores, voix d'encouragement. Ambiance immersive du Royaume des Mots                                |
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

## Vision du Jeu — Le Royaume des Mots [GAME]

### Concept Narratif

L'enfant est un apprenti magicien dans le **Royaume des Mots**. Sa plume magique (**Plumi**) est son compagnon. Chaque conjugaison correcte = un sort qui fait vivre le monde (arbres, animaux, bâtiments). Les verbes **être** et **avoir** sont les deux premiers sorts fondamentaux.

### Mascotte — Plumi

Plumi est une **plume enchantée lumineuse** (comme Lumi est une luciole dans le projet frère). Plumi a des états visuels :

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

### 5 Types de Mini-Jeux [GAME] [PEDA]

Alignés sur le programme Éducation Nationale CE1 :

| Mini-jeu               | Mécanique            | Compétence visée                              |
| ---------------------- | -------------------- | --------------------------------------------- |
| **Attrape-Mots**       | Reconnaissance       | Taper sur les verbes conjugués                |
| **Le Pont Magique**    | Association          | Drag & drop pronom ↔ forme conjuguée         |
| **La Potion Magique**  | Complétion           | Glisser le bon mot dans la phrase             |
| **Le Tri du Sorcier**  | Distinction          | Trier être vs avoir dans deux chapeaux        |
| **Le Grimoire**        | Production guidée    | Sélectionner la bonne forme conjuguée         |

### Progression — 3 Chapitres Initiaux [PEDA]

| Chapitre | Contenu                      | Structure              |
| -------- | ---------------------------- | ---------------------- |
| 1        | Le Sort ÊTRE                 | 6 leçons + boss        |
| 2        | Le Sort AVOIR                | 6 leçons + boss        |
| 3        | Le Duel ÊTRE vs AVOIR        | 3 leçons + boss final  |

**Extensible** : ALLER, FAIRE, verbes en -ER, puis grammaire, pluriels, accords...

### Système de Récompenses [GAME]

| Récompense              | Déclencheur                        | Granularité      |
| ----------------------- | ---------------------------------- | ---------------- |
| Étoiles magiques        | +1 par bonne réponse, +bonus série | Micro (immédiat) |
| Badges                  | Mini-jeu terminé                   | Leçon            |
| Éléments du monde       | Arbres, animaux, bâtiments         | Chapitre         |
| Compagnons magiques     | Milestone chapitres                | Arc narratif     |
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

### Ce qu'on fait

- Feedback immédiat (< 200ms après interaction)
- Micro-activités (30-120 secondes par exercice)
- Sessions courtes (5-10 minutes)
- Célébration constante (animations, sons, particules)
- Navigation plate (gros boutons, 1-2 taps max pour accéder au jeu)
- Variété de mécaniques (5 mini-jeux pour éviter la monotonie)
- Storytelling (univers narratif cohérent, progression visible dans le monde)

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
  frontend/         # Vue 3 PWA
  backend/          # Fastify API
packages/
  shared/           # Types TS + constantes (SSOT)
docs/
  architecture.md
  game-design.md
  pedagogie.md
  SYSTEM_DESIGN.md
docker-compose.yml  # PostgreSQL
Makefile
pnpm-workspace.yaml
```

### Architecture Frontend [ARCHI]

**L'UI suit une approche Atomic Design stricte :**

| Couche        | Rôle                      | Emplacement                                 |
| ------------- | ------------------------- | ------------------------------------------- |
| **Icons**     | Glyphes SVG atomiques     | `components/icons/`                         |
| **Atoms**     | Éléments UI purs          | `components/ui/MagicButton.vue`, etc.       |
| **Layouts**   | Wrappers de structure     | `components/ui/ParentPageLayout.vue`        |
| **Molecules** | Composants métier simples | `components/game/ExerciseCard.vue`          |
| **Organisms** | Composants complexes      | `components/game/MiniGameArena.vue`         |

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
   - Utiliser `MagicButton` pour toutes les actions interactives.
   - Ne pas bypasser le Design System (tokens, composants UI).

9. **Respect des Règles de Domaine** :
   - La vérité métier (conjugaisons, règles de progression, calcul de points) réside dans le **Backend**.
   - Le Frontend affiche et optimise l'UX. Il ne décide JAMAIS d'une règle métier.

### Règles de Contribution

- **Vérifier l'existant AVANT de coder** : Explorer le codebase pour identifier patterns, composants réutilisables, types partagés. Ne pas réinventer ce qui existe.
- **Partage de code** : Ne JAMAIS dupliquer de constantes ou de types entre frontend et backend. Utiliser `@plumi/shared`.
- **Standards Qualité** : 0 erreurs/warnings, pas de `any`, pas de `console.log` en production.
- **Pas de marqueurs temporels** dans les commentaires (pas de NEW, OLD, TODO avec dates).

---

## Responsive et Performance [ARCHI] [UI]

### Cibles d'Affichage

| Device                     | Breakpoint   | Priorité                   |
| -------------------------- | ------------ | -------------------------- |
| Tablette (768-1024px)      | `md:`        | Optimal (cible principale) |
| Mobile portrait (<768px)   | default      | Supporté                   |
| Laptop (1024-1440px)       | `lg:`        | Supporté                   |

**Détection d'input** : Utiliser `pointer-fine:` / `pointer-coarse:` (Tailwind v4) pour adapter au type d'interaction, pas seulement à la taille du viewport.

### Touch Targets

- Minimum absolu : **48x48px**
- Confort enfant (recommandé) : **80x80px**
- Boutons de jeu principaux : **100px+**

### Performance

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

### Typographie

| Contexte         | Font                  | Classe Tailwind    |
| ---------------- | --------------------- | ------------------ |
| Interface parent | Lexend                | `font-ui`          |
| Contenu enfant   | Belle Allure (écriture cursive scolaire FR) ou OpenDyslexic (accessibilité) | `font-learning` |
| Default          | Inter                 | `font-sans`        |

---

## Tags de l'Équipe

Invoquer systématiquement les personas par leurs tags `[LEAD]`, `[PEDA]`, `[GAME]`, `[ARCHI]`, `[UI]`, `[AUDIO]`, `[KID]`, `[PARENT]`, `[DOC]` pour simuler une expertise ciblée.
