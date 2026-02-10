<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBookTheme } from '@/composables';

const route = useRoute();

// Thème visuel du livre actif (book-view / book-lesson), blanc sinon
const activeBookId = computed<number | null>(() => {
  if (route.name === 'book-view' || route.name === 'book-lesson') {
    return Number(route.params.bookId) || null;
  }
  return null;
});

const { bgClass } = useBookTheme(activeBookId);
</script>

<template>
  <div class="min-h-screen text-stone-800 transition-[background] duration-700" :class="bgClass">
    <RouterView v-slot="{ Component, route: currentRoute }">
      <component :is="Component" :key="currentRoute.fullPath" />
    </RouterView>
  </div>
</template>
