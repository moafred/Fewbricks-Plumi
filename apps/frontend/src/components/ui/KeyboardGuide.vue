<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  mode?: 'cluster' | 'single';
  keyName?: 'left' | 'right' | 'up' | 'down' | 'space' | string;
  size?: 'small' | 'large';
  label?: string;
  labelPosition?: 'right' | 'bottom';
  theme?: 'default' | 'royal' | 'magic' | 'enchant';
  glow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'cluster',
  keyName: 'left',
  size: 'small',
  label: undefined,
  labelPosition: 'right',
  theme: 'default',
  glow: true,
});

const isWideKey = computed(() => ['space', 'backspace'].includes(props.keyName));

// Tailles selon le contexte
const sizeClasses = computed(() => {
  if (props.size === 'large') {
    return isWideKey.value ? 'px-5 h-11 text-base min-w-[44px]' : 'w-11 h-11 text-xl';
  }
  return isWideKey.value ? 'px-3 h-7 text-xs min-w-[28px]' : 'w-7 h-7 text-sm';
});

// Couleurs thématiques adaptées à Plumi
// moon (Teal) -> enchant (Green/Emerald)
// sun (Gold) -> magic (Gold)
// glow (Purple) -> royal (Purple)
const themeClasses = computed(() => {
  switch (props.theme) {
    case 'enchant':
      return {
        bg: 'bg-enchant-500/25',
        border: 'border-enchant-400/60',
        text: 'text-enchant-200',
        glow: 'shadow-[0_0_12px_rgba(52,211,153,0.4)]', // green-400 equivalent approx
      };
    case 'magic':
      return {
        bg: 'bg-magic-500/25',
        border: 'border-magic-400/60',
        text: 'text-magic-200',
        glow: 'shadow-[0_0_12px_rgba(251,191,36,0.4)]', // amber-400
      };
    case 'royal':
      return {
        bg: 'bg-royal-500/25',
        border: 'border-royal-400/60',
        text: 'text-royal-200',
        glow: 'shadow-[0_0_12px_rgba(167,139,250,0.4)]', // violet-400
      };
    default:
      return {
        bg: 'bg-white/20',
        border: 'border-white/50',
        text: 'text-white/90',
        glow: 'shadow-[0_0_10px_rgba(255,255,255,0.2)]',
      };
  }
});

const keyClasses = computed(() => {
  const base = `flex items-center justify-center rounded-lg font-mono font-medium transition-all duration-300 ${sizeClasses.value}`;
  const theme = `${themeClasses.value.bg} ${themeClasses.value.border} ${themeClasses.value.text} border`;
  const glowEffect = props.glow ? themeClasses.value.glow : '';
  return `${base} ${theme} ${glowEffect}`;
});

const labelClasses = computed(() => {
  const baseSize = props.size === 'large' ? 'text-sm' : 'text-xs';
  return `${baseSize} font-medium uppercase tracking-wider ${themeClasses.value.text}`;
});

const wrapperClasses = computed(() => {
  const base = 'inline-flex items-center';
  if (props.labelPosition === 'bottom') {
    return `${base} flex-col gap-1.5`;
  }
  return `${base} gap-2`;
});

const iconMap: Record<string, string> = {
  left: '←',
  right: '→',
  up: '↑',
  down: '↓',
  space: 'espace',
  backspace: 'retour',
};

const displayIcon = computed(() => {
  return iconMap[props.keyName] || props.keyName.toLowerCase();
});
</script>

<template>
  <!-- Full Arrow Cluster (Up/Down/Left/Right) -->
  <div
    v-if="mode === 'cluster'"
    class="flex gap-0.5"
    :class="{ 'gap-1': size === 'large' }"
  >
    <span :class="keyClasses">←</span>
    <div
      class="flex flex-col gap-0.5"
      :class="{ 'gap-1': size === 'large' }"
    >
      <span :class="keyClasses">↑</span>
      <span :class="keyClasses">↓</span>
    </div>
    <span :class="keyClasses">→</span>
  </div>

  <!-- Single Key with optional label -->
  <div
    v-else
    :class="wrapperClasses"
  >
    <span :class="keyClasses">{{ displayIcon }}</span>
    <span
      v-if="label"
      :class="labelClasses"
      >{{ label }}</span
    >
  </div>
</template>
