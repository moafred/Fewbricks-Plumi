<script setup lang="ts">
import { StarFilledIcon, StarEmptyIcon } from '@/components/icons';
import ActionButton from '@/components/ui/ActionButton.vue';

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
  1: "Bien joué, continue comme ça !",
  2: 'Bravo, tu progresses très bien !',
  3: 'Parfait, tu maîtrises parfaitement !',
};
</script>

<template>
  <div class="chapter-result flex flex-col items-center justify-center gap-6 animate-celebrate">
    <h2 class="text-3xl md:text-5xl font-bold text-gold-500">
      {{ messages[stars] }}
    </h2>

    <div class="flex items-center justify-center gap-2">
      <template v-for="i in 3" :key="i">
        <StarFilledIcon
          v-if="i <= stars"
          :size="48"
          class="text-gold-400"
        />
        <StarEmptyIcon
          v-else
          :size="48"
          class="text-stone-300"
        />
      </template>
    </div>

    <p class="text-2xl md:text-3xl text-stone-500">
      {{ score }} / {{ total }}
    </p>

    <div class="flex gap-4 mt-4">
      <ActionButton
        variant="secondary"
        @click="$emit('replay')"
      >
        Rejouer
      </ActionButton>
      <ActionButton
        variant="primary"
        @click="$emit('continue')"
      >
        Continuer
      </ActionButton>
    </div>
  </div>
</template>
