<script setup lang="ts">
import ActionButton from '@/components/ui/ActionButton.vue';
import NotebookCard from '@/components/ui/NotebookCard.vue';

defineProps<{
  title: string;
  score: number;
  total: number;
  titleColor?: string;
}>();

defineEmits<{
  home: [];
  replay: [];
}>();
</script>

<template>
  <NotebookCard variant="light" padding="lg" rounded="md" class="text-center animate-fade-in w-full max-w-lg">
    <h2 class="text-4xl font-bold mb-4 drop-shadow-md" :class="titleColor ?? 'text-gold-300'">
      {{ title }}
    </h2>
    <p class="text-2xl text-gold-200 mb-8 drop-shadow-md">Score: {{ score }} / {{ total }}</p>

    <template #footer>
      <div class="flex justify-center gap-4">
        <ActionButton variant="secondary" @click="$emit('home')">Retour</ActionButton>
        <ActionButton variant="primary" @click="$emit('replay')">Rejouer</ActionButton>
      </div>
    </template>
  </NotebookCard>
</template>
