<script setup lang="ts">
import ParentGuideContent from './ParentGuideContent.vue';
import ActionButton from '@/components/ui/ActionButton.vue';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    leave-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
      @click.self="emit('close')"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50 backdrop-blur-sm"
        @click="emit('close')"
      />

      <!-- Modal Content -->
      <div class="relative w-full max-w-2xl my-8 flex flex-col items-center gap-6 md:gap-8">
        <!-- Titre et sous-titre -->
        <div class="flex flex-col items-center gap-2 z-10">
          <h1 class="text-3xl md:text-4xl font-bold text-white font-learning text-center drop-shadow-lg">
            Guide pour les parents
          </h1>
        </div>

        <!-- Contenu réutilisable -->
        <div class="w-full">
          <ParentGuideContent />
        </div>

        <!-- Bouton fermer -->
        <ActionButton
          variant="secondary"
          size="lg"
          class="w-full md:w-96"
          @click="emit('close')"
        >
          Fermer
        </ActionButton>
      </div>
    </div>
  </Transition>
</template>
