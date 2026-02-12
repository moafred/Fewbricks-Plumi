# Parent Guide Onboarding Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add parent guide screen at first launch explaining Plumi as practice tool (not lessons) and emphasizing parental guidance for new concepts. Accessible permanently via info button.

**Architecture:** New route `/parent-guide` shown before onboarding if no children exist. Reusable content component used in both dedicated screen and modal overlay. Router guard checks localStorage flag to show guide only once (but always accessible via HomeScreen button).

**Tech Stack:** Vue 3, Vue Router, TypeScript, Tailwind CSS, existing UI components (NotebookCard, NotebookButton, ActionButton)

---

## Task 1: Create InfoIcon Component

**Files:**
- Create: `apps/frontend/src/components/icons/InfoIcon.vue`

**Step 1: Create InfoIcon following existing icon pattern**

Create `apps/frontend/src/components/icons/InfoIcon.vue`:

```vue
<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number;
  }>(),
  { size: 24 }
);
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
</template>
```

**Step 2: Verify icon displays correctly**

- Add temporary usage in HomeScreen to verify
- Check browser console for errors
- Verify SVG renders with correct size and color

**Step 3: Commit**

```bash
git add apps/frontend/src/components/icons/InfoIcon.vue
git commit -m "feat(icons): add InfoIcon component for parent guide"
```

---

## Task 2: Create ParentGuideContent Component

**Files:**
- Create: `apps/frontend/src/components/game/ParentGuideContent.vue`

**Step 1: Create reusable content component**

Create `apps/frontend/src/components/game/ParentGuideContent.vue`:

```vue
<script setup lang="ts">
import NotebookCard from '@/components/ui/NotebookCard.vue';

/**
 * ParentGuideContent — Contenu réutilisable du guide parent
 *
 * Utilisé dans ParentGuideScreen (premier lancement) et ParentGuideModal (accès permanent)
 */
</script>

<template>
  <div class="flex flex-col gap-6 md:gap-8 w-full">
    <!-- Section 1 : Introduction -->
    <NotebookCard variant="light" padding="lg" rounded="lg" class="animate-slide-down">
      <div class="flex flex-col gap-4 text-left">
        <h2 class="text-xl md:text-2xl font-bold text-sky-700">
          Plumi, c'est quoi ?
        </h2>
        <p class="text-base md:text-lg text-stone-700 leading-relaxed">
          Plumi propose des cahiers d'exercices interactifs pour s'entraîner en français et en mathématiques, niveau CE1. Ce ne sont pas des cours : votre enfant découvre des exercices pour <strong>pratiquer</strong> et <strong>consolider</strong> ce qu'il apprend à l'école ou avec vous.
        </p>
        <p class="text-base md:text-lg text-stone-700 leading-relaxed">
          Si votre enfant découvre une notion pour la première fois (par exemple, la conjugaison du verbe "être" au présent), il risque de se sentir perdu. C'est normal ! Plumi n'est pas là pour enseigner de zéro, mais pour s'entraîner sur des notions déjà vues.
        </p>
      </div>
    </NotebookCard>

    <!-- Section 2 : Conseils d'accompagnement -->
    <NotebookCard variant="light" padding="lg" rounded="lg" class="animate-slide-down" style="animation-delay: 150ms">
      <div class="flex flex-col gap-4 text-left">
        <h2 class="text-xl md:text-2xl font-bold text-sky-700">
          Comment accompagner votre enfant ?
        </h2>
        <div class="flex flex-col gap-3 text-base md:text-lg text-stone-700 leading-relaxed">
          <p>
            <strong>• Restez à côté, surtout au début.</strong> Votre enfant rencontre une notion peu maîtrisée ? Prenez le temps d'expliquer, de donner des exemples, de rassurer. Plumi encourage toujours, jamais de punition ni de chronomètre stressant.
          </p>
          <p>
            <strong>• Sessions courtes et régulières.</strong> 10 à 15 minutes par jour, c'est plus efficace qu'une heure le week-end. Votre enfant progresse par répétition espacée : les exercices reviennent naturellement.
          </p>
          <p>
            <strong>• Célébrez les progrès, même petits.</strong> Chaque étoile gagnée, chaque chapitre terminé mérite des encouragements. L'erreur est une étape d'apprentissage, pas un échec.
          </p>
        </div>
        <p class="text-base md:text-lg text-stone-700 leading-relaxed italic">
          Votre rôle est essentiel : vous êtes le guide, Plumi est l'outil d'entraînement.
        </p>
      </div>
    </NotebookCard>
  </div>
</template>
```

**Step 2: Verify component structure**

- Check imports are correct
- Verify NotebookCard props match existing component API
- Check responsive classes (text-base md:text-lg, etc.)

**Step 3: Commit**

```bash
git add apps/frontend/src/components/game/ParentGuideContent.vue
git commit -m "feat(game): add ParentGuideContent reusable component"
```

---

## Task 3: Create ParentGuideScreen Component

**Files:**
- Create: `apps/frontend/src/components/game/ParentGuideScreen.vue`

**Step 1: Create dedicated screen for first launch**

Create `apps/frontend/src/components/game/ParentGuideScreen.vue`:

```vue
<script setup lang="ts">
import { useRouter } from 'vue-router';
import ParentGuideContent from './ParentGuideContent.vue';
import ActionButton from '@/components/ui/ActionButton.vue';

const router = useRouter();

function startWithChild() {
  // Set flag so guide doesn't show again on next launch
  localStorage.setItem('plumi:hasSeenParentGuide', 'true');
  router.push({ name: 'welcome' });
}
</script>

<template>
  <div class="flex flex-col items-center justify-start flex-1 p-4 md:p-6 gap-6 md:gap-8 overflow-y-auto">
    <!-- Logo Plumi -->
    <img
      src="/plumi-landing.png"
      alt="Plumi"
      class="h-24 md:h-32 w-auto animate-fade-in"
    />

    <!-- Titre et sous-titre -->
    <div class="flex flex-col items-center gap-2 animate-fade-in">
      <h1 class="text-3xl md:text-4xl font-bold text-sky-600 font-learning text-center">
        Bienvenue sur Plumi !
      </h1>
      <p class="text-lg md:text-xl text-stone-600 text-center">
        Un mot pour vous, parents
      </p>
    </div>

    <!-- Contenu réutilisable -->
    <div class="w-full max-w-2xl">
      <ParentGuideContent />
    </div>

    <!-- Bouton d'action -->
    <ActionButton
      variant="primary"
      size="lg"
      class="w-full md:w-96 animate-fade-in"
      @click="startWithChild"
    >
      Commencer avec mon enfant
    </ActionButton>
  </div>
</template>
```

**Step 2: Verify screen layout**

- Check responsive behavior (mobile vs desktop)
- Verify scroll works correctly on small screens
- Check animations play correctly
- Verify button click works (console.log if needed)

**Step 3: Commit**

```bash
git add apps/frontend/src/components/game/ParentGuideScreen.vue
git commit -m "feat(game): add ParentGuideScreen for first launch"
```

---

## Task 4: Add /parent-guide Route

**Files:**
- Modify: `apps/frontend/src/router/index.ts`

**Step 1: Import ParentGuideScreen**

Add import at the top of the file (after other imports):

```typescript
import ParentGuideScreen from '@/components/game/ParentGuideScreen.vue';
```

**Step 2: Add route before /welcome**

Add route in the routes array (after the comment `// --- Onboarding / Welcome ---` and BEFORE the /welcome routes):

```typescript
  // --- Parent Guide ---
  {
    path: '/parent-guide',
    name: 'parent-guide',
    component: ParentGuideScreen,
  },
```

**Step 3: Verify route is accessible**

Run dev server:
```bash
make dev
```

Navigate to `http://localhost:5173/#/parent-guide` and verify:
- Screen displays correctly
- No console errors
- Button click redirects to /welcome

**Step 4: Commit**

```bash
git add apps/frontend/src/router/index.ts
git commit -m "feat(router): add /parent-guide route"
```

---

## Task 5: Update Router Guard Logic

**Files:**
- Modify: `apps/frontend/src/router/index.ts:120-128`

**Step 1: Update guard to redirect to parent-guide**

Replace the existing guard logic (lines ~120-128) with:

```typescript
// Guard global — remplace initialScreen() de App.vue
router.beforeEach((to) => {
  const playerStore = usePlayerStore();

  // Pages welcome et parent-guide toujours accessibles
  if (to.name?.toString().startsWith('welcome') || to.name === 'parent-guide') return;

  // Pas d'enfants → parent-guide (si pas encore vu) ou welcome
  if (!playerStore.hasChildren) {
    const hasSeenGuide = localStorage.getItem('plumi:hasSeenParentGuide') === 'true';
    return hasSeenGuide ? { name: 'welcome' } : { name: 'parent-guide' };
  }

  // Pas d'enfant actif → auto-sélection ou sélecteur
  if (!playerStore.activeChild) {
    if (playerStore.children.length === 1) {
      playerStore.switchChild(playerStore.children[0].id);
      return;
    }
    if (to.name === 'children') return;
    return { name: 'children' };
  }
});
```

**Step 2: Test guard logic**

Clear localStorage and reload app:
```javascript
// In browser console
localStorage.removeItem('plumi:hasSeenParentGuide');
location.reload();
```

Verify:
- App redirects to /parent-guide (not /welcome)
- After clicking "Commencer avec mon enfant", redirects to /welcome
- Reload again → should go directly to /welcome (guide already seen)

**Step 3: Commit**

```bash
git add apps/frontend/src/router/index.ts
git commit -m "feat(router): redirect to parent-guide on first launch"
```

---

## Task 6: Create ParentGuideModal Component

**Files:**
- Create: `apps/frontend/src/components/game/ParentGuideModal.vue`

**Step 1: Create modal overlay component**

Create `apps/frontend/src/components/game/ParentGuideModal.vue`:

```vue
<script setup lang="ts">
import ParentGuideContent from './ParentGuideContent.vue';
import ActionButton from '@/components/ui/ActionButton.vue';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    leave-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
      @click.self="emit('close')"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="emit('close')"
      />

      <!-- Modal Content -->
      <div class="relative w-full max-w-2xl my-8 flex flex-col items-center gap-6 md:gap-8">
        <!-- Titre et sous-titre -->
        <div class="flex flex-col items-center gap-2 z-10">
          <h1 class="text-3xl md:text-4xl font-bold text-white font-learning text-center drop-shadow-lg">
            Guide pour les parents
          </h1>
        </div>

        <!-- Contenu réutilisable -->
        <div class="w-full">
          <ParentGuideContent />
        </div>

        <!-- Bouton fermer -->
        <ActionButton
          variant="secondary"
          size="lg"
          class="w-full md:w-96"
          @click="emit('close')"
        >
          Fermer
        </ActionButton>
      </div>
    </div>
  </Transition>
</template>
```

**Step 2: Verify modal behavior**

Test modal (can add temporary button in HomeScreen):
- Modal opens correctly
- Overlay click closes modal
- Button "Fermer" closes modal
- Scroll works correctly
- Transition animation plays

**Step 3: Commit**

```bash
git add apps/frontend/src/components/game/ParentGuideModal.vue
git commit -m "feat(game): add ParentGuideModal for permanent access"
```

---

## Task 7: Add Info Button to HomeScreen

**Files:**
- Modify: `apps/frontend/src/components/game/HomeScreen.vue`

**Step 1: Import dependencies**

Add imports at the top of the script section:

```typescript
import { ref } from 'vue';
import ParentGuideModal from './ParentGuideModal.vue';
import { InfoIcon } from '@/components/icons';
```

**Step 2: Add modal state**

Add reactive state in the script section:

```typescript
const showParentGuide = ref(false);
```

**Step 3: Add Info button in header**

Modify the header section to add the info button. Find the `<header>` tag and update it:

```vue
<header class="relative flex justify-center shrink-0">
  <!-- Parent Guide button (left) -->
  <div class="absolute top-2 left-0 z-10">
    <NotebookButton
      variant="icon"
      aria-label="Guide pour les parents"
      @click="showParentGuide = true"
    >
      <InfoIcon :size="28" class="text-sky-500" />
    </NotebookButton>
  </div>

  <!-- Album badge (moved) -->
  <div class="absolute top-2 left-16 z-10">
    <NotebookButton
      variant="icon"
      aria-label="Mon Album"
      @click="router.push({ name: 'album' })"
    >
      <SparkleIcon :size="28" class="text-gold-400" />
    </NotebookButton>
  </div>

  <!-- Avatar badge — accès à la liste des profils (unchanged) -->
  <button
    v-if="playerStore.activeChild"
    class="absolute top-2 right-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 shadow-sm z-10 hover:bg-white/90 active:scale-95 transition-all cursor-pointer"
    aria-label="Gérer les profils"
    @click="router.push({ name: 'children' })"
  >
    <ChildAvatar
      :name="playerStore.activeChild.name"
      :color="playerStore.activeChild.avatarColor"
      size="sm"
    />
    <span class="text-sm font-bold text-stone-600 hidden md:inline">
      {{ playerStore.activeChild.name }}
    </span>
  </button>

  <!-- Logo Plumi (unchanged) -->
  <img
    src="/plumi-landing.png"
    alt="Plumi"
    class="h-36 md:h-48 w-auto animate-float"
  />
  <h2 class="text-xl md:text-2xl font-bold text-sky-500/80 mt-[-1rem] font-learning">
    Niveau CE1
  </h2>
</header>
```

**Step 4: Add modal component at the end of template**

Add before the closing `</template>` tag:

```vue
    <!-- Parent Guide Modal -->
    <ParentGuideModal
      :is-open="showParentGuide"
      @close="showParentGuide = false"
    />
  </div>
</template>
```

**Step 5: Verify button and modal work**

Run dev server and test:
- Info button displays correctly in header (left side)
- Album button is moved to make room
- Clicking info button opens modal
- Modal displays parent guide content
- Clicking "Fermer" or overlay closes modal

**Step 6: Commit**

```bash
git add apps/frontend/src/components/game/HomeScreen.vue
git commit -m "feat(game): add parent guide button and modal to HomeScreen"
```

---

## Task 8: Export InfoIcon from Icons Index

**Files:**
- Modify: `apps/frontend/src/components/icons/index.ts`

**Step 1: Add InfoIcon export**

If the file exists, add export:

```typescript
export { default as InfoIcon } from './InfoIcon.vue';
```

If the file doesn't exist, create it with:

```typescript
export { default as InfoIcon } from './InfoIcon.vue';
export { default as BookIcon } from './BookIcon.vue';
export { default as StarFilledIcon } from './StarFilledIcon.vue';
export { default as StarEmptyIcon } from './StarEmptyIcon.vue';
export { default as SparkleIcon } from './SparkleIcon.vue';
export { default as CategoryIcon } from './CategoryIcon.vue';
export { default as HomeIcon } from './HomeIcon.vue';
export { default as UserIcon } from './UserIcon.vue';
export { default as PencilIcon } from './PencilIcon.vue';
export { default as NotebookIcon } from './NotebookIcon.vue';
export { default as CrossIcon } from './CrossIcon.vue';
export { default as ArdoiseIcon } from './ArdoiseIcon.vue';
export { default as EncrierIcon } from './EncrierIcon.vue';
export { default as BridgeIcon } from './BridgeIcon.vue';
```

**Step 2: Verify export works**

Check that imports work correctly in HomeScreen and other components.

**Step 3: Commit**

```bash
git add apps/frontend/src/components/icons/index.ts
git commit -m "feat(icons): export InfoIcon from icons index"
```

---

## Task 9: Final Verification & TypeCheck

**Files:**
- All modified files

**Step 1: Run typecheck**

```bash
make typecheck
```

Expected: No TypeScript errors

**Step 2: Test complete user flow**

1. Clear localStorage: `localStorage.clear()`
2. Reload app
3. Verify parent guide screen shows first
4. Click "Commencer avec mon enfant"
5. Complete onboarding (create child profile)
6. Arrive at HomeScreen
7. Click info button (ℹ️) in header
8. Verify modal opens with parent guide content
9. Close modal
10. Reload app → should NOT show parent guide screen again (flag set)

**Step 3: Test responsive behavior**

- Test on mobile viewport (DevTools)
- Test on desktop viewport
- Verify scroll works on small screens
- Verify animations play correctly

**Step 4: Final commit (if any fixes needed)**

```bash
git add .
git commit -m "fix: final adjustments for parent guide onboarding"
```

---

## Validation Checklist

**Navigation Flow:**
- [ ] First launch → parent guide screen shows
- [ ] Parent guide → click button → welcome screen
- [ ] After onboarding → guide doesn't show again
- [ ] Info button in HomeScreen always accessible

**UI/UX:**
- [ ] Logo displays correctly
- [ ] Text is readable (responsive font sizes)
- [ ] NotebookCard components render correctly
- [ ] Animations play smoothly
- [ ] Modal opens/closes correctly
- [ ] Overlay click closes modal

**Technical:**
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] localStorage flag works correctly
- [ ] Router guard logic correct
- [ ] All components use existing UI components (NotebookCard, ActionButton, etc.)

**Content:**
- [ ] Text matches design document exactly
- [ ] Tone is reassuring and practical
- [ ] Emphasizes "practice not lessons"
- [ ] Highlights need for parental guidance

---

## Notes

- All components reuse existing UI components (NotebookCard, NotebookButton, ActionButton) per CLAUDE.md rules
- No duplicate classes or inline divs with >3 Tailwind classes
- InfoIcon follows existing icon component pattern
- ParentGuideContent is reusable in both screen and modal
- localStorage flag prevents re-showing guide but keeps permanent access via button
