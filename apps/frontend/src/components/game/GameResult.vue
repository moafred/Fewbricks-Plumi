<script setup lang="ts">
import { computed } from 'vue';
import { StarFilledIcon, SparkleIcon } from '@/components/icons';
import ActionButton from '@/components/ui/ActionButton.vue';

const props = defineProps<{
  score: number;
  total: number;
}>();

const emit = defineEmits<{
  replay: [];
  home: [];
}>();

const message = computed(() => {
  const ratio = props.score / props.total;
  if (ratio === 1) return 'Extraordinaire !';
  if (ratio >= 0.7) return 'Bravo !';
  if (ratio >= 0.4) return 'Continue !';
  return 'Tu progresses !';
});
</script>

<template>
  <div class="game-result flex flex-col items-center justify-center gap-6 animate-celebrate">
    <h2 class="text-3xl md:text-5xl font-bold text-sky-600">
      {{ message }}
    </h2>

    <div class="flex items-center justify-center gap-1">
      <template v-if="score > 0">
        <StarFilledIcon
          v-for="i in score"
          :key="i"
          :size="40"
          class="text-gold-400"
        />
      </template>
      <SparkleIcon
        v-else
        :size="40"
        class="text-gold-300"
      />
    </div>

    <p class="text-2xl md:text-3xl text-stone-500">
      {{ score }} / {{ total }}
    </p>

    <div class="flex gap-4 mt-4">
      <ActionButton
        variant="primary"
        @click="emit('replay')"
      >
        Rejouer
      </ActionButton>
      <ActionButton
        variant="secondary"
        @click="emit('home')"
      >
        Accueil
      </ActionButton>
    </div>
  </div>
</template>
