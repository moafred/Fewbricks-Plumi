<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useStickerStore } from '@/stores/stickers';
import NotebookCard from '@/components/ui/NotebookCard.vue';
import { StarFilledIcon } from '@/components/icons';
import StickerVisual from './StickerVisual.vue';
import ScreenLayout from './ScreenLayout.vue';
import ScreenHeader from './ScreenHeader.vue';

const router = useRouter();
const stickerStore = useStickerStore();

function goBack() {
  router.push({ name: 'home' });
}
</script>

<template>
  <ScreenLayout>
    <!-- Header -->
    <ScreenHeader back-label="Retour à l'accueil" @back="goBack">
      <h1 class="text-lg md:text-2xl font-bold text-sky-600 flex-1">
        Mon Album de Stickers
      </h1>

      <div class="flex items-center gap-2 px-3 py-1 bg-gold-50 rounded-full border border-gold-200">
        <StarFilledIcon :size="20" class="text-gold-400" />
        <span class="text-sm font-bold text-gold-600">
          {{ stickerStore.unlockedCount }} / {{ stickerStore.totalCount }}
        </span>
      </div>
    </ScreenHeader>

    <main class="flex-1 max-w-4xl mx-auto w-full">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div 
          v-for="sticker in stickerStore.allStickers" 
          :key="sticker.id"
          class="aspect-square"
        >
          <NotebookCard 
            padding="sm" 
            rounded="lg" 
            class="h-full flex flex-col items-center justify-center gap-2 transition-all"
            :class="stickerStore.isStickerUnlocked(sticker.id) ? 'bg-white shadow-md rotate-2' : 'bg-stone-100 opacity-50 grayscale'"
          >
            <!-- Sticker Placeholder -->
            <div 
              class="w-20 h-20 rounded-full flex items-center justify-center relative"
              :class="stickerStore.isStickerUnlocked(sticker.id) ? 'bg-white shadow-inner border border-gold-100' : 'bg-stone-200'"
            >
              <StickerVisual
                v-if="stickerStore.isStickerUnlocked(sticker.id)"
                :id="sticker.id"
              />
              <span v-else class="text-stone-400 text-2xl font-bold">?</span>
            </div>

            <div class="text-xs font-bold text-center leading-tight h-8 flex items-center justify-center">
              {{ stickerStore.isStickerUnlocked(sticker.id) ? sticker.name : '???' }}
            </div>
          </NotebookCard>
        </div>
      </div>

      <div v-if="stickerStore.totalCount === 0" class="flex flex-col items-center justify-center py-20 text-stone-400">
        <p>Pas encore de stickers à collectionner.</p>
        <p class="text-sm">Continue tes entraînements pour en débloquer !</p>
      </div>
    </main>
  </ScreenLayout>
</template>

<style scoped>
.animate-sparkle {
  animation: sparkle 1.5s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}
</style>
