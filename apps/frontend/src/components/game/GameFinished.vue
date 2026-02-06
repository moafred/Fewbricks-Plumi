<script setup lang="ts">
import MagicButton from '@/components/ui/MagicButton.vue';

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
  <div class="bg-white/90 backdrop-blur-md border border-sky-200 text-center animate-fade-in p-12 w-full max-w-lg rounded-2xl shadow-sm">
    <h2 class="text-4xl font-bold mb-4" :class="titleColor ?? 'text-gold-500'">
      {{ title }}
    </h2>
    <p class="text-2xl text-stone-600 mb-8">Score: {{ score }} / {{ total }}</p>

    <div class="flex justify-center gap-4">
      <MagicButton variant="secondary" @click="$emit('home')">Retour</MagicButton>
      <MagicButton variant="primary" @click="$emit('replay')">Rejouer</MagicButton>
    </div>
  </div>
</template>
