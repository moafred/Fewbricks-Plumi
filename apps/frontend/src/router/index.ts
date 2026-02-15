import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router';
import { usePlayerStore } from '@/stores/player';
import { getItem } from '@/services/storage';

// Eager imports — Critical path (loaded immediately)
import HomeScreen from '@/components/game/HomeScreen.vue';
import BookShelf from '@/components/game/BookShelf.vue';
import ChapterRunner from '@/components/game/ChapterRunner.vue';

// Lazy imports — Non-critical screens (loaded on-demand)
// ParentGuideScreen, WelcomeScreen, ChildSelector, StickerAlbum, BookView, BookLessonScreen
// loaded via () => import() syntax in route definitions below

const routes: RouteRecordRaw[] = [
  // --- Parent Guide ---
  {
    path: '/parent-guide',
    name: 'parent-guide',
    component: () => import('@/components/game/ParentGuideScreen.vue'),
  },

  // --- Onboarding / Welcome ---
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('@/components/game/WelcomeScreen.vue'),
    props: { mode: 'onboarding' },
  },
  {
    path: '/welcome/add-child',
    name: 'welcome-add-child',
    component: () => import('@/components/game/WelcomeScreen.vue'),
    props: { mode: 'onboarding' },
  },
  {
    path: '/welcome/replay',
    name: 'welcome-replay',
    component: () => import('@/components/game/WelcomeScreen.vue'),
    props: { mode: 'replay' },
  },

  // --- Sélection d'enfant ---
  {
    path: '/children',
    name: 'children',
    component: () => import('@/components/game/ChildSelector.vue'),
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
    component: () => import('@/components/game/StickerAlbum.vue'),
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
    component: () => import('@/components/game/BookView.vue'),
    props: (route) => ({
      subject: route.params.subject,
      bookId: Number(route.params.bookId),
    }),
  },

  // --- Leçon livre ---
  {
    path: '/:subject(francais|maths)/book/:bookId(\\d+)/lesson',
    name: 'book-lesson',
    component: () => import('@/components/game/BookLessonScreen.vue'),
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
    const hasSeenGuide = getItem('plumi:hasSeenParentGuide') === 'true';
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
