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
        ? 'bg-gradient-to-b from-gold-300 to-gold-500 text-stone-900 shadow-[0_6px_0_0_#8E5E0E] active:shadow-[0_2px_0_0_#8E5E0E] hover:from-gold-200 hover:to-gold-400 border-gold-600'
        : 'bg-gradient-to-b from-sky-300 to-sky-500 text-white shadow-[0_6px_0_0_#3a5f9a] active:shadow-[0_2px_0_0_#3a5f9a] hover:from-sky-200 hover:to-sky-400 border-sky-600',
      size === 'lg' ? 'h-20 px-10 py-4 text-2xl' : 'h-14 px-8 py-3 text-xl',
      { 'opacity-50 pointer-events-none': disabled },
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
