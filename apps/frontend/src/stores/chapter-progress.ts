import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Subject } from '@plumi/shared';
import { BOOKS, getBooksForSubject, getChaptersForBook, getChapter } from '@plumi/shared';
import { getItem, setItem, removeItem } from '@/services/storage';

export interface ChapterScore {
  chapterId: number;
  score: number;
  total: number;
  stars: number; // 1, 2 ou 3
}

const STORAGE_KEY = 'plumi-chapter-progress';

function storageKeyForChild(childId: string | null): string {
  return childId ? `${STORAGE_KEY}-${childId}` : STORAGE_KEY;
}

function computeStars(score: number, total: number): number {
  if (total === 0) return 1;
  const ratio = score / total;
  if (ratio >= 0.9) return 3;
  if (ratio >= 0.7) return 2;
  return 1;
}

export const useChapterProgressStore = defineStore('chapter-progress', () => {
  // --- State ---
  const completedChapters = ref<Map<number, ChapterScore>>(new Map());
  const activeChildId = ref<string | null>(null);

  // --- Init from StorageService ---
  function loadProgress(childId?: string | null) {
    const key = storageKeyForChild(childId ?? activeChildId.value);
    const raw = getItem(key);
    completedChapters.value = raw ? new Map(JSON.parse(raw)) : new Map();
  }

  function saveProgress() {
    const key = storageKeyForChild(activeChildId.value);
    const entries = Array.from(completedChapters.value.entries());
    setItem(key, JSON.stringify(entries));
  }

  /**
   * Charge la progression d'un enfant specifique.
   * Gère la migration de l'ancienne clé globale vers le premier enfant.
   */
  function loadProgressForChild(childId: string) {
    // Migration : si une progression globale existe, la copier vers ce profil
    const globalData = getItem(STORAGE_KEY);
    const childKey = storageKeyForChild(childId);
    if (globalData && !getItem(childKey)) {
      setItem(childKey, globalData);
      removeItem(STORAGE_KEY);
    }

    activeChildId.value = childId;
    loadProgress(childId);
  }

  // --- Getters ---

  /** Etoiles pour un chapitre (0 si non complete) */
  function getStars(chapterId: number): number {
    return completedChapters.value.get(chapterId)?.stars ?? 0;
  }

  /** Le chapitre est-il complete ? */
  function isChapterCompleted(chapterId: number): boolean {
    return completedChapters.value.has(chapterId);
  }

  /** Le livre est-il complete ? (3 chapitres termines) */
  function isBookCompleted(bookId: number): boolean {
    const chapters = getChaptersForBook(bookId);
    return chapters.every((ch) => isChapterCompleted(ch.id));
  }

  /** Prochain chapitre recommande pour une matière */
  function getRecommendedChapterIdForSubject(subject: Subject): number | null {
    const books = getBooksForSubject(subject);
    for (const book of books) {
      if (book.isBonus) continue;
      for (const chId of book.chapters) {
        if (!completedChapters.value.has(chId)) return chId;
      }
    }
    const bonus = books.find((b) => b.isBonus);
    if (bonus) {
      for (const chId of bonus.chapters) {
        if (!completedChapters.value.has(chId)) return chId;
      }
    }
    return null;
  }

  /** Livre recommande pour une matière */
  function getRecommendedBookIdForSubject(subject: Subject): number | null {
    const chId = getRecommendedChapterIdForSubject(subject);
    if (!chId) return null;
    const books = getBooksForSubject(subject);
    const book = books.find((b) => b.chapters.includes(chId));
    return book?.id ?? null;
  }

  /** Le bonus est-il débloqué pour une matière ? */
  function isBonusUnlockedForSubject(subject: Subject): boolean {
    const books = getBooksForSubject(subject);
    return books.filter((b) => !b.isBonus).every((b) => isBookCompleted(b.id));
  }

  // Rétrocompatibilité — français par défaut
  const recommendedChapterId = computed<number | null>(() => getRecommendedChapterIdForSubject('francais'));
  const recommendedBookId = computed<number | null>(() => getRecommendedBookIdForSubject('francais'));
  const isBonusUnlocked = computed(() => isBonusUnlockedForSubject('francais'));

  // --- Actions ---

  function completeChapter(chapterId: number, score: number, total: number) {
    const stars = computeStars(score, total);
    const existing = completedChapters.value.get(chapterId);

    // Garder le meilleur score
    if (!existing || stars > existing.stars) {
      completedChapters.value.set(chapterId, { chapterId, score, total, stars });

      // Si on atteint 3 étoiles pour la première fois ET que le chapitre a un sticker
      if ((!existing || existing.stars < 3) && stars === 3) {
        const chapter = getChapter(chapterId);
        if (chapter?.sticker) {
          // Import dynamique pour éviter les dépendances circulaires
          import('./stickers').then(({ useStickerStore }) => {
            const stickerStore = useStickerStore();
            stickerStore.markStickerUnlocked(chapter.sticker!.id);
          });
        }
      }
    }
    saveProgress();
  }

  function resetProgress() {
    completedChapters.value.clear();
    const key = storageKeyForChild(activeChildId.value);
    removeItem(key);
  }

  // Charger au demarrage
  loadProgress();

  return {
    completedChapters,
    getStars,
    isChapterCompleted,
    isBookCompleted,
    recommendedChapterId,
    recommendedBookId,
    isBonusUnlocked,
    getRecommendedChapterIdForSubject,
    getRecommendedBookIdForSubject,
    isBonusUnlockedForSubject,
    completeChapter,
    resetProgress,
    loadProgressForChild,
  };
});
