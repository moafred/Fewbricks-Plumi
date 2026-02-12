<script setup lang="ts">
/**
 * ResolutionContinueButton — Bouton "Continuer" en phase résolution
 *
 * @description Conteneur avec hauteur fixe et animation fade-in pour le bouton de continuation
 * affiché pendant la phase de résolution des mini-jeux.
 * Remplace le pattern dupliqué : `h-16 flex items-center justify-center w-full` + `animate-fade-in`
 */
import ActionButton from '@/components/ui/ActionButton.vue';

defineProps<{
  visible: boolean;
  compact?: boolean;
}>();

defineEmits<{
  continue: [];
}>();
</script>

<template>
  <div :class="[compact ? 'h-16 pt-4' : 'h-24 pt-6', 'flex items-center justify-center w-full shrink-0']">
    <div v-if="visible" class="animate-fade-in">
      <ActionButton variant="primary" @click="$emit('continue')">
        Continuer →
      </ActionButton>
    </div>
  </div>
</template>
