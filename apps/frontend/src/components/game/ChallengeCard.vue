<script setup lang="ts">
import NotebookCard from '@/components/ui/NotebookCard.vue';

defineProps<{
  hint?: string;
}>();
</script>

<template>
  <NotebookCard :hint="hint" variant="light">
    <slot />
    <template #footer>
      <slot name="footer" />
    </template>
  </NotebookCard>
</template>
