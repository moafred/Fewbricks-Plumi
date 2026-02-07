<script setup lang="ts">
import NotebookCard from './NotebookCard.vue';

withDefaults(
  defineProps<{
    title: string;
    description: string;
    accentColor?: string;
  }>(),
  { accentColor: 'text-gold-300' }
);

defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    class="game-card flex flex-col items-center gap-4 hover:bg-sky-700/95 active:scale-95 transition-all text-left"
    @click="$emit('click')"
  >
    <NotebookCard variant="light" padding="md" rounded="md" class="w-full">
      <slot name="icon" />
      <h2
        class="text-2xl font-bold drop-shadow-md"
        :class="accentColor"
      >
        {{ title }}
      </h2>
      <p class="text-base text-gold-200 text-center drop-shadow-md">
        {{ description }}
      </p>
    </NotebookCard>
  </button>
</template>
