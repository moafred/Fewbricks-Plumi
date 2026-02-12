import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router';
import { usePlayerStore } from '@/stores/player';

import ParentGuideScreen from '@/components/game/ParentGuideScreen.vue';
import WelcomeScreen from '@/components/game/WelcomeScreen.vue';
import ChildSelector from '@/components/game/ChildSelector.vue';
import HomeScreen from '@/components/game/HomeScreen.vue';
import StickerAlbum from '@/components/game/StickerAlbum.vue';
import BookShelf from '@/components/game/BookShelf.vue';
import BookView from '@/components/game/BookView.vue';
import BookLessonScreen from '@/components/game/BookLessonScreen.vue';
import ChapterRunner from '@/components/game/ChapterRunner.vue';

const routes: RouteRecordRaw[] = [
  // --- Parent Guide ---
  {
    path: '/parent-guide',
    name: 'parent-guide',
    component: ParentGuideScreen,
  },

  // --- Onboarding / Welcome ---
  {
    path: '/welcome',
    name: 'welcome',
    component: WelcomeScreen,
    props: { mode: 'onboarding' },
  },
  {
    path: '/welcome/add-child',
    name: 'welcome-add-child',
    component: WelcomeScreen,
    props: { mode: 'onboarding' },
  },
  {
    path: '/welcome/replay',
    name: 'welcome-replay',
    component: WelcomeScreen,
    props: { mode: 'replay' },
  },

  // --- Sélection d'enfant ---
  {
    path: '/children',
    name: 'children',
    component: ChildSelector,
  },

  // --- Accueil matières ---
  {
    path: '/home',
    name: 'home',
    component: HomeScreen,
  },

  // --- Album de stickers ---
  {
    path: '/album',
    name: 'album',
    component: StickerAlbum,
  },

  // --- Bibliothèque ---
  {
    path: '/:subject(francais|maths)',
    name: 'bookshelf',
    component: BookShelf,
    props: true,
  },

  // --- Vue livre (chapitres) ---
  {
    path: '/:subject(francais|maths)/book/:bookId(\\d+)',
    name: 'book-view',
    component: BookView,
    props: (route) => ({
      subject: route.params.subject,
      bookId: Number(route.params.bookId),
    }),
  },

  // --- Leçon livre ---
  {
    path: '/:subject(francais|maths)/book/:bookId(\\d+)/lesson',
    name: 'book-lesson',
    component: BookLessonScreen,
    props: (route) => ({
      subject: route.params.subject,
      bookId: Number(route.params.bookId),
    }),
  },

  // --- Chapitre (jeu) ---
  {
    path: '/:subject(francais|maths)/book/:bookId(\\d+)/chapter/:chapterId(\\d+)',
    name: 'chapter-runner',
    component: ChapterRunner,
    props: (route) => ({
      subject: route.params.subject,
      bookId: Number(route.params.bookId),
      chapterId: Number(route.params.chapterId),
    }),
  },

  // --- Racine → redirection dynamique via guard ---
  {
    path: '/',
    redirect: '/home',
  },

  // --- Catch-all ---
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

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

export default router;
