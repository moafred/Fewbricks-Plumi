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
      class="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      @click="$emit('cancel')"
    />

    <!-- Modal Card -->
    <div class="relative w-full max-w-md bg-white border border-sky-200 rounded-3xl p-8 shadow-2xl animate-bounce-gentle text-center">
      <h2 class="text-2xl font-bold text-stone-800 mb-4 font-learning">
        {{ title }}
      </h2>

      <p v-if="message" class="text-stone-500 mb-8 text-lg">
        {{ message }}
      </p>

      <div class="flex flex-col gap-3">
        <MagicButton
          variant="primary"
          @click="$emit('cancel')"
        >
          {{ cancelLabel || 'Non, continuer' }}
        </MagicButton>

        <MagicButton
          variant="secondary"
          size="md"
          @click="$emit('confirm')"
        >
          {{ confirmLabel || 'Oui, quitter' }}
        </MagicButton>
      </div>
    </div>
  </div>
</template>
