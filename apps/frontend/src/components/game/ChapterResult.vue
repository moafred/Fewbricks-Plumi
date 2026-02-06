<script setup lang="ts">
import { StarFilledIcon, StarEmptyIcon } from '@/components/icons';
import MagicButton from '@/components/ui/MagicButton.vue';

const props = defineProps<{
  score: number;
  total: number;
  stars: number;
}>();

defineEmits<{
  replay: [];
  continue: [];
}>();

const messages: Record<number, string> = {
  1: "Tu as fini l'aventure !",
  2: 'Bravo, tu maîtrises le sort !',
  3: 'Incroyable, tu es un vrai magicien !',
};
</script>

<template>
  <div class="chapter-result flex flex-col items-center justify-center gap-6 animate-celebrate">
    <h2 class="text-3xl md:text-5xl font-bold text-magic-300">
      {{ messages[stars] }}
    </h2>

    <div class="flex items-center justify-center gap-2">
      <template v-for="i in 3" :key="i">
        <StarFilledIcon
          v-if="i <= stars"
          :size="48"
          class="text-magic-400"
        />
        <StarEmptyIcon
          v-else
          :size="48"
          class="text-royal-400/30"
        />
      </template>
    </div>

    <p class="text-2xl md:text-3xl text-royal-200">
      {{ score }} / {{ total }}
    </p>

    <div class="flex gap-4 mt-4">
      <MagicButton
        variant="secondary"
        @click="$emit('replay')"
      >
        Rejouer
      </MagicButton>
      <MagicButton
        variant="primary"
        @click="$emit('continue')"
      >
        Continuer
      </MagicButton>
    </div>
  </div>
</template>
