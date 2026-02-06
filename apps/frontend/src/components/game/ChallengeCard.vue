<script setup lang="ts">
defineProps<{
  hint?: string;
}>();
</script>

<template>
  <div class="w-full bg-night-800/90 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-lg min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
    <div
      v-if="hint"
      class="absolute top-4 left-0 right-0 text-center text-royal-300 text-sm font-bold uppercase tracking-widest"
    >
      {{ hint }}
    </div>

    <div class="mt-8 mb-8 w-full">
      <slot />
    </div>

    <slot name="footer" />
  </div>
</template>
