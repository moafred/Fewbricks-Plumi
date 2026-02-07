<script setup lang="ts">
import CrossIcon from '@/components/icons/CrossIcon.vue';
import NotebookBadge from '@/components/ui/NotebookBadge.vue';

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
      class="p-2 text-stone-400 hover:text-stone-700 transition-colors"
      @click="$emit('back')"
    >
      <CrossIcon :size="32" />
    </button>

    <NotebookBadge>
      <span :class="colorClass ?? 'text-sky-600'" class="font-bold">
        {{ label }}: {{ current }} / {{ total }}
      </span>
    </NotebookBadge>

    <div class="w-10" />
  </header>
</template>
