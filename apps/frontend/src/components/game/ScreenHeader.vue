<script setup lang="ts">
/**
 * ScreenHeader — Header d'écran avec bouton retour
 *
 * Pattern partagé entre BookShelf, BookView, StickerAlbum, BookLessonScreen.
 * Remplace le pattern dupliqué : header + NotebookButton icon + HomeIcon + titre.
 */
import NotebookButton from '@/components/ui/NotebookButton.vue';
import { HomeIcon } from '@/components/icons';

defineProps<{
  backLabel: string;
}>();

defineEmits<{
  back: [];
}>();
</script>

<template>
  <header class="flex items-center gap-4">
    <NotebookButton variant="icon" :aria-label="backLabel" @click="$emit('back')">
      <HomeIcon :size="28" class="text-sky-200" />
    </NotebookButton>
    <slot />
  </header>
</template>
