import { defineStore } from 'pinia';
import { ref, computed, watch, onMounted } from 'vue';
import { useChapterProgressStore } from './chapter-progress';
import { ALL_CHAPTERS } from '@plumi/shared';
import { getItem, setItem } from '@/services/storage';

export interface Sticker {
  id: string;
  name: string;
  chapterId: number;
}

export interface UnlockHistoryEntry {
  stickerId: string;
  unlockedAt: number;
}

const UNLOCK_HISTORY_KEY = 'plumi:sticker-unlock-history';
const ALBUM_VISIT_KEY = 'plumi:sticker-album-last-visit';

export const useStickerStore = defineStore('stickers', () => {
  const progressStore = useChapterProgressStore();

  // --- State local ---
  const unlockHistory = ref<UnlockHistoryEntry[]>([]);
  const lastAlbumVisitTime = ref<number>(0);

  // --- Initialisation depuis localStorage ---
  const stored = getItem(UNLOCK_HISTORY_KEY);
  if (stored) {
    unlockHistory.value = JSON.parse(stored);
  }
  const lastVisit = getItem(ALBUM_VISIT_KEY);
  if (lastVisit) {
    lastAlbumVisitTime.value = Number(lastVisit);
  }

  // --- Watch pour sauvegarder ---
  watch(
    unlockHistory,
    (val) => {
      setItem(UNLOCK_HISTORY_KEY, JSON.stringify(val));
    },
    { deep: true }
  );

  watch(lastAlbumVisitTime, (val) => {
    setItem(ALBUM_VISIT_KEY, val.toString());
  });

  const allStickers = computed<Sticker[]>(() => {
    return ALL_CHAPTERS
      .filter(ch => ch.sticker)
      .map(ch => ({
        id: ch.sticker!.id,
        name: ch.sticker!.name,
        chapterId: ch.id
      }));
  });

  const unlockedStickerIds = computed(() => {
    return allStickers.value
      .filter(s => progressStore.getStars(s.chapterId) === 3)
      .map(s => s.id);
  });

  function isStickerUnlocked(stickerId: string): boolean {
    return unlockedStickerIds.value.includes(stickerId);
  }

  const unlockedCount = computed(() => unlockedStickerIds.value.length);
  const totalCount = computed(() => allStickers.value.length);

  // --- Tri : débloqués en premier (desc par date), puis verrouillés (ordre chapitres) ---
  const sortedStickers = computed(() => {
    const unlocked = allStickers.value
      .filter(s => isStickerUnlocked(s.id))
      .map(s => ({
        ...s,
        unlockedAt: unlockHistory.value.find(u => u.stickerId === s.id)?.unlockedAt ?? 0
      }))
      .sort((a, b) => b.unlockedAt - a.unlockedAt); // Plus récent en premier

    const locked = allStickers.value.filter(s => !isStickerUnlocked(s.id));

    return [...unlocked, ...locked];
  });

  // --- Dernier sticker débloqué ---
  const lastUnlockedStickerId = computed(() => {
    if (unlockHistory.value.length === 0) return null;
    return unlockHistory.value[unlockHistory.value.length - 1].stickerId;
  });

  // --- Nouveaux stickers non vus ---
  const hasNewStickers = computed(() => {
    if (!lastUnlockedStickerId.value) return false;
    const lastUnlock = unlockHistory.value.find(u => u.stickerId === lastUnlockedStickerId.value);
    return !!lastUnlock && lastUnlock.unlockedAt > lastAlbumVisitTime.value;
  });

  // --- Méthodes ---
  function markStickerUnlocked(stickerId: string) {
    if (unlockHistory.value.some(u => u.stickerId === stickerId)) return;
    unlockHistory.value.push({ stickerId, unlockedAt: Date.now() });
  }

  function markAlbumVisited() {
    lastAlbumVisitTime.value = Date.now();
  }

  return {
    allStickers,
    unlockedStickerIds,
    isStickerUnlocked,
    unlockedCount,
    totalCount,
    sortedStickers,
    lastUnlockedStickerId,
    hasNewStickers,
    markStickerUnlocked,
    markAlbumVisited
  };
});
