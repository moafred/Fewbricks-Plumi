<script setup lang="ts">
import MagicButton from './MagicButton.vue';

defineProps<{
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}>();

defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-night-900/80 backdrop-blur-sm transition-opacity"
      @click="$emit('cancel')"
    />

    <!-- Modal Card -->
    <div class="relative w-full max-w-md bg-night-800 border border-royal-700/30 rounded-3xl p-8 shadow-2xl animate-bounce-gentle text-center">
      <h2 class="text-2xl font-bold text-white mb-4 font-learning">
        {{ title }}
      </h2>

      <p v-if="message" class="text-royal-200 mb-8 text-lg">
        {{ message }}
      </p>

      <div class="flex flex-col gap-3">
        <MagicButton
          variant="primary"
          @click="$emit('cancel')"
        >
          {{ cancelLabel || 'Non, continuer' }}
        </MagicButton>

        <button
          class="h-14 px-8 py-3 text-xl rounded-2xl font-bold bg-gentle-900/40 text-gentle-300 hover:bg-gentle-900/60 active:scale-95 transition-all select-none"
          @click="$emit('confirm')"
        >
          {{ confirmLabel || 'Oui, quitter' }}
        </button>
      </div>
    </div>
  </div>
</template>
