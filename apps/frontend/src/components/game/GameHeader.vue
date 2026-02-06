<script setup lang="ts">
import CrossIcon from '@/components/icons/CrossIcon.vue';

defineProps<{
  label: string;
  current: number;
  total: number;
  colorClass?: string;
}>();

defineEmits<{
  back: [];
}>();
</script>

<template>
  <header class="flex items-center justify-between w-full">
    <button
      class="p-2 text-white/60 hover:text-white transition-colors"
      @click="$emit('back')"
    >
      <CrossIcon :size="32" />
    </button>

    <div class="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-full backdrop-blur-sm">
      <span :class="colorClass ?? 'text-magic-300'" class="font-bold">
        {{ label }}: {{ current }} / {{ total }}
      </span>
    </div>

    <div class="w-10" />
  </header>
</template>
