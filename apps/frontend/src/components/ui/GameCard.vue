<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    description: string;
    accentColor?: string;
  }>(),
  { accentColor: 'text-magic-300' }
);

defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    class="game-card flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/10 backdrop-blur border border-white/10 hover:bg-white/15 active:scale-95 transition-all text-left"
    @click="$emit('click')"
  >
    <slot name="icon" />
    <h2
      class="text-2xl font-bold"
      :class="accentColor"
    >
      {{ title }}
    </h2>
    <p class="text-base text-royal-200 text-center">
      {{ description }}
    </p>
  </button>
</template>
