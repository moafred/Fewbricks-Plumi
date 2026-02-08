import { computed, type Ref } from 'vue';
import { ALL_BOOKS, type ThemeId } from '@plumi/shared';

export function useBookTheme(bookId: Ref<number | null>) {
  const themeId = computed<ThemeId | null>(() => {
    if (!bookId.value) return null;
    const book = ALL_BOOKS.find((b) => b.id === bookId.value);
    if (!book) throw new Error(`[useBookTheme] bookId inconnu : ${bookId.value}`);
    return book.theme;
  });

  const bgClass = computed(() => (themeId.value ? `theme-${themeId.value}` : ''));

  return { themeId, bgClass };
}
