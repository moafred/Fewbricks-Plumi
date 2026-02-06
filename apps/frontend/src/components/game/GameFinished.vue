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
  <div class="bg-white/10 backdrop-blur-md border border-white/10 text-center animate-fade-in p-12 w-full max-w-lg rounded-2xl">
    <h2 class="text-4xl font-bold mb-4" :class="titleColor ?? 'text-magic-400'">
      {{ title }}
    </h2>
    <p class="text-2xl text-white mb-8">Score: {{ score }} / {{ total }}</p>

    <div class="flex justify-center gap-4">
      <MagicButton variant="secondary" @click="$emit('home')">Retour</MagicButton>
      <MagicButton variant="primary" @click="$emit('replay')">Rejouer</MagicButton>
    </div>
  </div>
</template>
