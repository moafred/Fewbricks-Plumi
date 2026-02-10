<script setup lang="ts">
/**
 * ChoicesSection — Wrapper des boutons de choix dans les mini-jeux
 *
 * Gère le gap responsive embedded/standalone de manière centralisée.
 * Intègre le KeyboardHintsBar (desktop uniquement) avec visibilité liée à la phase.
 */
import type { GamePhase } from '@plumi/shared';
import KeyboardHintsBar from '@/components/ui/KeyboardHintsBar.vue';
import KeyboardGuide from '@/components/ui/KeyboardGuide.vue';

withDefaults(defineProps<{
  embedded?: boolean;
  phase?: GamePhase;
}>(), {
  embedded: false,
  phase: undefined,
});
</script>

<template>
  <div
    class="flex flex-col items-center w-full"
    :class="embedded ? 'gap-2' : 'gap-6'"
  >
    <slot />

    <KeyboardHintsBar :visible="phase === 'challenge'">
      <KeyboardGuide mode="cluster" label="Flèches pour choisir" />
      <KeyboardGuide mode="single" key-name="espace" label="Appuie pour valider" />
    </KeyboardHintsBar>
  </div>
</template>
