<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    description: string;
    accentColor?: string;
  }>(),
  { accentColor: 'text-gold-500' }
);

defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    class="game-card flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/80 backdrop-blur border border-sky-200 hover:bg-white/90 active:scale-95 transition-all text-left shadow-sm"
    @click="$emit('click')"
  >
    <slot name="icon" />
    <h2
      class="text-2xl font-bold"
      :class="accentColor"
    >
      {{ title }}
    </h2>
    <p class="text-base text-stone-500 text-center">
      {{ description }}
    </p>
  </button>
</template>
