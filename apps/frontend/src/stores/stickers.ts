import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useChapterProgressStore } from './chapter-progress';
import { ALL_CHAPTERS } from '@plumi/shared';

export interface Sticker {
  id: string;
  name: string;
  chapterId: number;
}

export const useStickerStore = defineStore('stickers', () => {
  const progressStore = useChapterProgressStore();

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

  return {
    allStickers,
    unlockedStickerIds,
    isStickerUnlocked,
    unlockedCount,
    totalCount
  };
});
