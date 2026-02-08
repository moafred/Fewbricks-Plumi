<script setup lang="ts">
import NotebookCard from '@/components/ui/NotebookCard.vue';

defineProps<{
  hint?: string;
  compact?: boolean;
}>();
</script>

<template>
  <NotebookCard :hint="hint" variant="light" :padding="compact ? 'sm' : 'md'">
    <slot />
    <template #footer>
      <slot name="footer" />
    </template>
  </NotebookCard>
</template>
