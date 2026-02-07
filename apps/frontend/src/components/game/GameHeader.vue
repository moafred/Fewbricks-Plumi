<script setup lang="ts">
import CrossIcon from '@/components/icons/CrossIcon.vue';
import NotebookBadge from '@/components/ui/NotebookBadge.vue';
import NotebookButton from '@/components/ui/NotebookButton.vue';

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
    <NotebookButton variant="icon" size="sm" @click="$emit('back')">
      <CrossIcon :size="32" class="text-stone-400" />
    </NotebookButton>

    <NotebookBadge>
      <span :class="colorClass ?? 'text-sky-600'" class="font-bold">
        {{ label }}: {{ current }} / {{ total }}
      </span>
    </NotebookBadge>

    <div class="w-10" />
  </header>
</template>
