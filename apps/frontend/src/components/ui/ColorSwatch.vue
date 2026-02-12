<script setup lang="ts">
/**
 * ColorSwatch — Pastille de couleur sélectionnable
 *
 * Utilisé dans les formulaires (WelcomeScreen) pour la sélection de couleur d'avatar.
 */
defineProps<{
  colorClass: string;
  selected: boolean;
  label: string;
}>();

defineEmits<{
  select: [];
}>();
</script>

<template>
  <button
    class="w-10 h-10 rounded-full transition-all active:scale-90"
    :class="[
      colorClass,
      selected ? 'ring-4 ring-offset-2 ring-sky-500 scale-110' : 'hover:scale-105',
    ]"
    :aria-label="label"
    @click="$emit('select')"
  />
</template>
