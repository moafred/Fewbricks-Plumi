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
    class="magic-button rounded-2xl active:scale-95 transition-all select-none font-bold"
    :class="[
      variant === 'primary'
        ? 'bg-magic-500 text-night-900 hover:bg-magic-400'
        : 'bg-white/10 text-white hover:bg-white/20',
      size === 'lg' ? 'min-h-16 px-8 py-4 text-xl' : 'min-h-12 px-6 py-3 text-lg',
      { 'opacity-50 pointer-events-none': disabled },
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
