<script setup lang="ts">
import ActionButton from './ActionButton.vue';
import NotebookCard from './NotebookCard.vue';

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
      class="absolute inset-0 bg-stone-900/80 transition-opacity"
      @click="$emit('cancel')"
    />

    <!-- Modal Card -->
    <NotebookCard variant="light" padding="md" rounded="lg" class="relative w-full max-w-md shadow-2xl animate-bounce-gentle text-center">
      <h2 class="text-2xl font-bold text-gold-200 mb-4 font-learning drop-shadow-md">
        {{ title }}
      </h2>

      <p v-if="message" class="text-gold-100 mb-8 text-lg drop-shadow-md">
        {{ message }}
      </p>

      <template #footer>
        <div class="flex flex-col gap-3">
          <ActionButton
            variant="primary"
            @click="$emit('cancel')"
          >
            {{ cancelLabel || 'Non, continuer' }}
          </ActionButton>

          <ActionButton
            variant="secondary"
            size="md"
            @click="$emit('confirm')"
          >
            {{ confirmLabel || 'Oui, quitter' }}
          </ActionButton>
        </div>
      </template>
    </NotebookCard>
  </div>
</template>
