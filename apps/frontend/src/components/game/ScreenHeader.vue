<script setup lang="ts">
/**
 * ScreenHeader — Header d'écran avec bouton retour et accès album
 *
 * Pattern partagé entre BookShelf, BookView, StickerAlbum, BookLessonScreen.
 * Remplace le pattern dupliqué : header + NotebookButton icon + HomeIcon + titre.
 */
import { useRouter, useRoute } from 'vue-router';
import { useStickerStore } from '@/stores/stickers';
import NotebookButton from '@/components/ui/NotebookButton.vue';
import { HomeIcon, SparkleIcon } from '@/components/icons';

defineProps<{
  backLabel: string;
}>();

defineEmits<{
  back: [];
}>();

const router = useRouter();
const route = useRoute();
const stickerStore = useStickerStore();

const isAlbumRoute = route.name === 'album';

function goToAlbum() {
  if (!isAlbumRoute) {
    router.push({ name: 'album' });
  }
}
</script>

<template>
  <header class="flex items-center gap-4">
    <NotebookButton variant="icon" :aria-label="backLabel" @click="$emit('back')">
      <HomeIcon :size="28" class="text-sky-200" />
    </NotebookButton>

    <!-- Bouton Album (sauf si déjà sur la page album) -->
    <NotebookButton
      v-if="!isAlbumRoute"
      variant="icon"
      aria-label="Mon Album"
      class="relative"
      @click="goToAlbum"
    >
      <SparkleIcon :size="28" class="text-gold-400" />
      <!-- Badge notification si nouveaux stickers -->
      <div
        v-if="stickerStore.hasNewStickers"
        class="absolute -top-1 -right-1 w-3 h-3 bg-coral-400 rounded-full border-2 border-white animate-pulse"
      />
    </NotebookButton>

    <slot />
  </header>
</template>
