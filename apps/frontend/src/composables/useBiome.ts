import { computed, type Ref } from 'vue';
import { BOOKS, type BiomeId } from '@plumi/shared';

export function useBiome(bookId: Ref<number | null>) {
  const biomeId = computed<BiomeId>(() => {
    if (!bookId.value) return 'home';
    const book = BOOKS.find((b) => b.id === bookId.value);
    if (!book) throw new Error(`[useBiome] bookId inconnu : ${bookId.value}`);
    return book.biome;
  });

  const bgClass = computed(() => `biome-${biomeId.value}`);

  return { biomeId, bgClass };
}
