<script setup lang="ts">
import { CrossIcon } from '@/components/icons';
import StickerVisual from './StickerVisual.vue';

defineProps<{
  isOpen: boolean;
  stickerId: string;
  stickerName: string;
}>();

defineEmits<{
  close: [];
}>();
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <div class="relative bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <!-- Close button -->
          <button
            class="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-full transition-colors"
            @click="$emit('close')"
          >
            <CrossIcon :size="24" class="text-stone-600" />
          </button>

          <!-- Sticker grand format -->
          <div class="w-48 h-48 mx-auto mb-6 flex items-center justify-center">
            <StickerVisual :id="stickerId" />
          </div>

          <!-- Nom -->
          <h2 class="text-3xl font-bold text-center text-sky-600 mb-2">
            {{ stickerName }}
          </h2>

          <!-- Infos complémentaires -->
          <p class="text-center text-stone-500 text-sm">
            Sticker débloqué !
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
