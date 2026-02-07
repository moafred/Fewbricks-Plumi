<script setup lang="ts">
import { StarFilledIcon, StarEmptyIcon } from '@/components/icons';
import StatusBadge from '@/components/ui/StatusBadge.vue';

type SubjectColor = 'sky' | 'meadow' | 'gold' | 'coral' | 'moss';

defineProps<{
  title: string;
  color: SubjectColor;
  stars: number;
  maxStars: number;
  locked: boolean;
  lockedLabel?: string;
}>();

defineEmits<{
  select: [];
}>();

const colorClasses: Record<SubjectColor, { text: string; border: string; glow: string }> = {
  sky: { text: 'text-sky-600', border: 'border-sky-400/40', glow: 'shadow-sky-400/40' },
  meadow: { text: 'text-meadow-600', border: 'border-meadow-400/40', glow: 'shadow-meadow-400/40' },
  gold: { text: 'text-gold-500', border: 'border-gold-400/40', glow: 'shadow-gold-400/40' },
  coral: { text: 'text-coral-500', border: 'border-coral-400/40', glow: 'shadow-coral-400/40' },
  moss: { text: 'text-moss-600', border: 'border-moss-400/40', glow: 'shadow-moss-400/40' },
};
</script>

<template>
  <button
    class="subject-card flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl border-2 shadow-md transition-all texture-notebook"
    :class="[
      'bg-white/95',
      colorClasses[color].border,
      locked ? 'opacity-50 grayscale cursor-default' : 'cursor-pointer hover:shadow-lg hover:scale-[1.02]',
      !locked ? colorClasses[color].glow : '',
    ]"
    :disabled="locked"
    @click="!locked && $emit('select')"
  >
    <!-- Zone illustration (slot) -->
    <div class="flex items-center justify-center w-20 h-20 md:w-24 md:h-24">
      <slot />
    </div>

    <!-- Titre matiere -->
    <h3 class="text-xl md:text-2xl font-bold text-center" :class="colorClasses[color].text">
      {{ title }}
    </h3>

    <!-- Etoiles de progression -->
    <div v-if="!locked" class="flex items-center gap-1">
      <template v-for="i in maxStars" :key="i">
        <StarFilledIcon
          v-if="i <= stars"
          :size="20"
          class="text-gold-400"
        />
        <StarEmptyIcon
          v-else
          :size="20"
          class="text-stone-400"
        />
      </template>
    </div>

    <!-- Badge etat -->
    <StatusBadge v-if="locked" status="locked" />
    <span
      v-if="locked && lockedLabel"
      class="text-sm text-stone-500 font-medium"
    >
      {{ lockedLabel }}
    </span>
  </button>
</template>
