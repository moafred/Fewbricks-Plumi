<script setup lang="ts">
withDefaults(
  defineProps<{
    variant: 'primary' | 'secondary';
    size?: 'md' | 'lg';
    disabled?: boolean;
  }>(),
  { size: 'lg', disabled: false }
);

defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    class="magic-button rounded-2xl transition-all select-none font-bold border-b-4 active:border-b-0 active:translate-y-1"
    :class="[
      variant === 'primary'
        ? 'bg-gradient-to-b from-magic-300 to-magic-500 text-night-900 shadow-[0_6px_0_0_#92400e] active:shadow-[0_2px_0_0_#92400e] hover:from-magic-200 hover:to-magic-400 border-magic-600'
        : 'bg-gradient-to-b from-white/20 to-white/10 text-white shadow-[0_6px_0_0_rgba(255,255,255,0.1)] active:shadow-[0_2px_0_0_rgba(255,255,255,0.1)] hover:from-white/25 hover:to-white/15 border-white/20',
      size === 'lg' ? 'h-20 px-10 py-4 text-2xl' : 'h-14 px-8 py-3 text-xl',
      { 'opacity-50 pointer-events-none': disabled },
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
