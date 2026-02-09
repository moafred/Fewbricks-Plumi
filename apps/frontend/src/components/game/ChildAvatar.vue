<script setup lang="ts">
import type { AvatarColor } from '@plumi/shared';

withDefaults(
  defineProps<{
    name: string;
    color: AvatarColor;
    size?: 'sm' | 'md' | 'lg';
  }>(),
  { size: 'md' },
);

// Mapping couleur → classes Tailwind (tokens Plumi)
const colorClasses: Record<AvatarColor, { bg: string; text: string }> = {
  sky: { bg: 'bg-sky-300', text: 'text-sky-800' },
  meadow: { bg: 'bg-meadow-300', text: 'text-meadow-800' },
  gold: { bg: 'bg-gold-300', text: 'text-gold-800' },
  coral: { bg: 'bg-coral-300', text: 'text-coral-800' },
  moss: { bg: 'bg-moss-300', text: 'text-moss-800' },
  dawn: { bg: 'bg-gold-200', text: 'text-gold-800' },
};

const sizeClasses = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-16 h-16 text-2xl',
  lg: 'w-24 h-24 text-4xl',
};
</script>

<template>
  <div
    class="rounded-full flex items-center justify-center font-bold select-none shrink-0"
    :class="[
      colorClasses[color].bg,
      colorClasses[color].text,
      sizeClasses[size],
    ]"
    :aria-label="name"
  >
    {{ name.charAt(0).toUpperCase() }}
  </div>
</template>
