<script setup lang="ts">
defineProps<{
  hint?: string;
}>();
</script>

<template>
  <div class="w-full bg-white/90 backdrop-blur-md border border-sky-200 rounded-3xl p-8 shadow-sm min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
    <div
      v-if="hint"
      class="absolute top-4 left-0 right-0 text-center text-sky-600 text-base font-bold uppercase tracking-widest"
    >
      {{ hint }}
    </div>

    <div class="mt-8 mb-8 w-full">
      <slot />
    </div>

    <slot name="footer" />
  </div>
</template>
