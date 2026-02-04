<script setup lang="ts">
import type { AnswerResult } from '@plumi/shared';
import { StarFilledIcon, StarEmptyIcon, CrossIcon } from '@/components/icons';

defineProps<{
  results: (AnswerResult | null)[];
  current: number;
}>();
</script>

<template>
  <div class="progress-stars flex items-center justify-center gap-1.5 flex-wrap">
    <span
      v-for="(result, i) in results"
      :key="i"
      class="transition-all duration-300 flex items-center justify-center"
      :class="{
        'scale-125': i === current,
        'animate-celebrate': result === 'correct' && i === current,
      }"
    >
      <StarFilledIcon
        v-if="result === 'correct'"
        :size="24"
        class="text-magic-400"
      />
      <CrossIcon
        v-else-if="result === 'incorrect'"
        :size="24"
        class="text-gentle-400"
      />
      <StarEmptyIcon
        v-else
        :size="24"
        :class="i === current ? 'text-white/80' : 'text-white/30'"
      />
    </span>
  </div>
</template>
