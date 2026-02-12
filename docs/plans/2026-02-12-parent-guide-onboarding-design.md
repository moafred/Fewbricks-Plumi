# Guide Parent — Design d'Onboarding

**Date** : 2026-02-12
**Statut** : Design validé, prêt pour implémentation

## Contexte

Pour rendre l'application claire au premier lancement, nous ajoutons un **Guide Parent** qui explique :
- La nature des cahiers d'exercices (entraînement, pas leçons)
- L'importance de l'accompagnement si l'enfant connaît peu la notion
- Conseils pratiques pour accompagner l'enfant

## Principes

- **Pas de tutoriel enfant** : l'app est suffisamment intuitive
- **Focus parent** : expliquer l'approche pédagogique et le rôle d'accompagnement
- **Accessible en permanence** : bouton dans le header du HomeScreen
- **Ton détaillé et rassurant** : paragraphes chaleureux avec exemples concrets

## Navigation et Séquence

### Premier Lancement
1. Détection : aucun profil enfant n'existe
2. Affichage de `ParentGuideScreen` (`/parent-guide`)
3. Le parent lit le guide
4. Bouton "Commencer avec mon enfant" → `WelcomeScreen` (`/welcome`)
5. Création du profil enfant (étapes actuelles : meet → identity → celebration)
6. Arrivée sur `HomeScreen` (`/home`)

### Accès Permanent
- Bouton `InfoIcon` (ℹ️) dans le header du `HomeScreen`, à gauche de l'avatar
- Au clic : ouvre un modal/overlay avec le contenu du `ParentGuideScreen`
- Accessible à tout moment

### Logique Technique
- Nouvelle route `/parent-guide` avant `/welcome`
- Modifier le router guard : si pas d'enfant → `/parent-guide` (au lieu de `/welcome`)
- Flag localStorage `hasSeenParentGuide` pour afficher une seule fois (mais toujours accessible via bouton)

```
Navigation :
Premier lancement : / → /parent-guide → /welcome → /home
Accès permanent : HomeScreen header (bouton ℹ️) → modal ParentGuideScreen
```

## Contenu — Textes

### Titre Principal
"Bienvenue sur Plumi !"

### Sous-titre
"Un mot pour vous, parents"

### Section 1 : Introduction (Nature des cahiers)

**Plumi, c'est quoi ?**

Plumi propose des cahiers d'exercices interactifs pour s'entraîner en français et en mathématiques, niveau CE1. Ce ne sont pas des cours : votre enfant découvre des exercices pour **pratiquer** et **consolider** ce qu'il apprend à l'école ou avec vous.

Si votre enfant découvre une notion pour la première fois (par exemple, la conjugaison du verbe "être" au présent), il risque de se sentir perdu. C'est normal ! Plumi n'est pas là pour enseigner de zéro, mais pour s'entraîner sur des notions déjà vues.

### Section 2 : Conseils d'accompagnement

**Comment accompagner votre enfant ?**

• **Restez à côté, surtout au début.** Votre enfant rencontre une notion peu maîtrisée ? Prenez le temps d'expliquer, de donner des exemples, de rassurer. Plumi encourage toujours, jamais de punition ni de chronomètre stressant.

• **Sessions courtes et régulières.** 10 à 15 minutes par jour, c'est plus efficace qu'une heure le week-end. Votre enfant progresse par répétition espacée : les exercices reviennent naturellement.

• **Célébrez les progrès, même petits.** Chaque étoile gagnée, chaque chapitre terminé mérite des encouragements. L'erreur est une étape d'apprentissage, pas un échec.

Votre rôle est essentiel : vous êtes le guide, Plumi est l'outil d'entraînement.

### Bouton d'Action
- Texte : "Commencer avec mon enfant"
- Variante : `primary`, taille `lg`
- Action : `router.push({ name: 'welcome' })`

## Design UI

### Composant : `ParentGuideScreen.vue`

**Layout Général**
- Container flex vertical, centré
- Padding responsive : `p-4 md:p-6`
- Max-width : `max-w-2xl` (lisibilité des paragraphes)
- Espacement vertical : `gap-6 md:gap-8`

**Éléments Visuels**
- **Logo Plumi** : `/plumi-landing.png`, taille `h-24 md:h-32`, centré
- **Titre principal** : `text-3xl md:text-4xl font-bold text-sky-600 font-learning`
- **Sous-titre** : `text-lg md:text-xl text-stone-600`
- **Sections de contenu** : `NotebookCard` avec `variant="light"`, `padding="lg"`, `rounded="lg"`
  - Titre de section : `text-xl md:text-2xl font-bold text-sky-700`
  - Paragraphes : `text-base md:text-lg text-stone-700 leading-relaxed`
  - Bullet points : `•` natifs avec `ml-4`
- **Bouton** : `ActionButton` variant `primary`, size `lg`, largeur `w-full md:w-96`

**Responsive**
- Mobile : scroll vertical, texte 16px minimum
- Desktop : contenu centré, largeur limitée

**Animations (subtiles)**
- Logo : `animate-fade-in`
- Cards : `animate-slide-down` avec délai progressif
- Bouton : `animate-fade-in`

## Accès Permanent — Bouton dans HomeScreen

### Modifications à `HomeScreen.vue`
- Ajouter un bouton `NotebookButton` avec `InfoIcon` dans le header
- Position : à gauche du logo, symétrique avec le badge album (à gauche) et l'avatar (à droite)
- Au clic : ouvre un modal/overlay avec le contenu du `ParentGuideScreen`

### Modal/Overlay
- Composant réutilisable : `ParentGuideModal.vue`
- Props : `isOpen: boolean`
- Emit : `@close`
- Fond overlay : `bg-black/50 backdrop-blur-sm`
- Contenu : même structure que `ParentGuideScreen`, mais dans un container avec bouton "Fermer" au lieu de "Commencer"

## Implémentation — Fichiers à Créer/Modifier

### Nouveaux Fichiers
1. `apps/frontend/src/components/game/ParentGuideScreen.vue` — Écran principal du guide parent
2. `apps/frontend/src/components/game/ParentGuideModal.vue` — Modal pour accès permanent

### Fichiers à Modifier
1. `apps/frontend/src/router/index.ts` — Ajouter route `/parent-guide`, modifier guard
2. `apps/frontend/src/components/game/HomeScreen.vue` — Ajouter bouton ℹ️ dans header
3. `apps/frontend/src/components/icons/` — Vérifier si `InfoIcon` existe, sinon créer

## Notes Techniques

- **localStorage flag** : `plumi:hasSeenParentGuide` (boolean)
- **Router guard logic** :
  ```typescript
  if (!playerStore.hasChildren) {
    const hasSeenGuide = localStorage.getItem('plumi:hasSeenParentGuide') === 'true';
    return hasSeenGuide ? { name: 'welcome' } : { name: 'parent-guide' };
  }
  ```
- **Après lecture du guide** : `localStorage.setItem('plumi:hasSeenParentGuide', 'true')`

## Validation [PEDA]

✅ Contenu validé par [PEDA] :
- Clarification "cahiers d'exercices, pas leçons"
- Insistance sur l'accompagnement pour les notions peu maîtrisées
- Approche bienveillante (pas de punition, encouragement)
- Répétition espacée mentionnée

## Validation [PARENT]

✅ Validé par [PARENT] :
- Accessible au premier lancement (pas caché)
- Ton rassurant et pratique
- Conseils concrets et actionnables
- Toujours accessible via bouton (pas une popup unique)
