<script setup lang="ts">
import { SparkleIcon } from '@/components/icons';

defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="lesson-tip flex items-start gap-3 px-5 py-4 rounded-2xl bg-gold-100/80 border-2 border-gold-300/50">
    <SparkleIcon :size="24" class="text-gold-500 shrink-0 mt-0.5" />
    <p class="text-base md:text-lg text-stone-700 font-medium leading-relaxed">
      {{ text }}
    </p>
  </div>
</template>
