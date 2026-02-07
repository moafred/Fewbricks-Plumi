<script setup lang="ts">
import { BookIcon } from '@/components/icons';

defineProps<{
  colorVariant: 'sky' | 'meadow' | 'gold' | 'coral' | 'moss' | 'dawn';
}>();

defineEmits<{
  click: [];
}>();

const colorClasses: Record<string, { border: string; icon: string; title: string }> = {
  sky: { border: 'border-sky-400/40', icon: 'text-sky-600', title: 'text-sky-700' },
  meadow: { border: 'border-meadow-400/40', icon: 'text-meadow-600', title: 'text-meadow-700' },
  gold: { border: 'border-gold-400/40', icon: 'text-gold-500', title: 'text-gold-600' },
  coral: { border: 'border-coral-400/40', icon: 'text-coral-500', title: 'text-coral-700' },
  moss: { border: 'border-moss-400/40', icon: 'text-moss-600', title: 'text-moss-700' },
  dawn: { border: 'border-gold-400/40', icon: 'text-gold-500', title: 'text-gold-600' },
};
</script>

<template>
  <button
    class="lesson-card w-full p-6 rounded-2xl border-2 border-dashed shadow-md transition-all texture-notebook bg-white/95"
    :class="[colorClasses[colorVariant]?.border ?? 'border-sky-400/40']"
    @click="$emit('click')"
  >
    <div class="flex items-center gap-4">
      <BookIcon
        :size="40"
        :class="colorClasses[colorVariant]?.icon ?? 'text-sky-600'"
      />
      <div class="flex-1 text-left">
        <h3
          class="text-lg font-bold"
          :class="colorClasses[colorVariant]?.title ?? 'text-sky-700'"
        >
          La Leçon
        </h3>
        <p class="text-sm text-stone-500 mt-1">
          Consulter la leçon de ce cahier
        </p>
      </div>
    </div>
  </button>
</template>
