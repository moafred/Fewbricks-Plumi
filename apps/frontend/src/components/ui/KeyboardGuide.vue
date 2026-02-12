<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  mode?: 'cluster' | 'single';
  keyName?: 'left' | 'right' | 'up' | 'down' | 'space' | string;
  size?: 'small' | 'large';
  label?: string;
  labelPosition?: 'right' | 'bottom';
  theme?: 'default' | 'sky' | 'gold' | 'meadow';
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

const isWideKey = computed(() => ['space', 'backspace', 'espace', 'retour'].includes(props.keyName));

// Tailles selon le contexte
const sizeClasses = computed(() => {
  if (props.size === 'large') {
    return isWideKey.value ? 'px-5 h-11 text-base min-w-11' : 'w-11 h-11 text-xl';
  }
  return isWideKey.value ? 'px-3 h-7 text-xs min-w-7' : 'w-7 h-7 text-sm';
});

// Couleurs thématiques adaptées au thème clair
const themeClasses = computed(() => {
  switch (props.theme) {
    case 'meadow':
      return {
        bg: 'bg-meadow-100',
        border: 'border-meadow-400/60',
        text: 'text-meadow-700',
        glow: 'shadow-[0_0_12px_rgba(79,196,142,0.3)]',
      };
    case 'gold':
      return {
        bg: 'bg-gold-100',
        border: 'border-gold-400/60',
        text: 'text-gold-700',
        glow: 'shadow-[0_0_12px_rgba(212,166,74,0.3)]',
      };
    case 'sky':
      return {
        bg: 'bg-sky-100',
        border: 'border-sky-400/60',
        text: 'text-sky-700',
        glow: 'shadow-[0_0_12px_rgba(143,177,233,0.3)]',
      };
    default:
      return {
        bg: 'bg-stone-100',
        border: 'border-stone-300',
        text: 'text-stone-600',
        glow: 'shadow-[0_0_10px_rgba(99,108,126,0.15)]',
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
