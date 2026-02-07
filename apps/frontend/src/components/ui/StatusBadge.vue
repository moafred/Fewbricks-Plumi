<script setup lang="ts">
/**
 * StatusBadge — Badge d'état (Terminé, En cours, Verrouillé)
 *
 * @description Pastille arrondie indiquant l'état de progression.
 * Remplace le pattern dupliqué : `text-xs px-2 py-0.5 rounded-full bg-xxx-100 text-xxx-700`
 */

defineProps<{
  status: 'completed' | 'in-progress' | 'locked';
}>();

const statusConfig: Record<string, { classes: string; label: string }> = {
  completed: {
    classes: 'bg-meadow-100 text-meadow-700 font-bold',
    label: 'Terminé',
  },
  'in-progress': {
    classes: 'bg-gold-100 text-gold-600 font-bold',
    label: 'En cours',
  },
  locked: {
    classes: 'bg-stone-100 text-stone-500',
    label: 'Verrouillé',
  },
};
</script>

<template>
  <span
    class="text-xs px-2 py-0.5 rounded-full"
    :class="statusConfig[status].classes"
  >
    {{ statusConfig[status].label }}
  </span>
</template>
