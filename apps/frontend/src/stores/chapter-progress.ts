import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { BOOKS, getChaptersForBook } from '@plumi/shared';

export interface ChapterScore {
  chapterId: number;
  score: number;
  total: number;
  stars: number; // 1, 2 ou 3
}

const STORAGE_KEY = 'plumi-chapter-progress';

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

  // --- Init from localStorage ---
  function loadProgress() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const entries: [number, ChapterScore][] = JSON.parse(raw);
      completedChapters.value = new Map(entries);
    }
  }

  function saveProgress() {
    const entries = Array.from(completedChapters.value.entries());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
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

  /** Prochain chapitre recommande (premier non-complete, en ordre) */
  const recommendedChapterId = computed<number | null>(() => {
    for (const book of BOOKS) {
      if (book.isBonus) continue;
      for (const chId of book.chapters) {
        if (!completedChapters.value.has(chId)) return chId;
      }
    }
    // Tous les livres principaux finis ? Recommander le bonus
    const bonus = BOOKS.find((b) => b.isBonus);
    if (bonus) {
      for (const chId of bonus.chapters) {
        if (!completedChapters.value.has(chId)) return chId;
      }
    }
    return null;
  });

  /** Livre recommande (celui qui contient le chapitre recommande) */
  const recommendedBookId = computed<number | null>(() => {
    if (!recommendedChapterId.value) return null;
    const book = BOOKS.find((b) => b.chapters.includes(recommendedChapterId.value!));
    return book?.id ?? null;
  });

  /** Le bonus est-il debloque ? (5 livres principaux completes) */
  const isBonusUnlocked = computed(() => {
    return BOOKS.filter((b) => !b.isBonus).every((b) => isBookCompleted(b.id));
  });

  // --- Actions ---

  function completeChapter(chapterId: number, score: number, total: number) {
    const stars = computeStars(score, total);
    const existing = completedChapters.value.get(chapterId);

    // Garder le meilleur score
    if (!existing || stars > existing.stars) {
      completedChapters.value.set(chapterId, { chapterId, score, total, stars });
    }
    saveProgress();
  }

  function resetProgress() {
    completedChapters.value.clear();
    localStorage.removeItem(STORAGE_KEY);
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
    completeChapter,
    resetProgress,
  };
});
