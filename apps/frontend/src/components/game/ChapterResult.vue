<script setup lang="ts">
import { computed } from 'vue';
import { getChapter } from '@plumi/shared';
import { StarFilledIcon, StarEmptyIcon, SparkleIcon } from '@/components/icons';
import ActionButton from '@/components/ui/ActionButton.vue';
import ResultActions from './ResultActions.vue';
import StickerVisual from './StickerVisual.vue';

const props = defineProps<{
  chapterId: number;
  score: number;
  total: number;
  stars: number;
}>();

defineEmits<{
  replay: [];
  continue: [];
  'read-lesson': [];
  'view-album': [];
}>();

const chapter = computed(() => getChapter(props.chapterId));
const hasSticker = computed(() => !!chapter.value?.sticker);
const stickerName = computed(() => chapter.value?.sticker?.name ?? '');

const messages: Record<number, string> = {
  1: "C'est un bon début !",
  2: 'Bravo, tu progresses bien !',
  3: 'Parfait, tu maîtrises parfaitement !',
};
</script>

<template>
  <div class="chapter-result flex flex-col items-center justify-center gap-6 animate-celebrate">
    <div class="flex flex-col items-center gap-2">
      <h2 class="text-2xl md:text-4xl font-bold text-sky-600 text-center">
        {{ messages[stars] }}
      </h2>
      <p v-if="stars < 3" class="text-stone-500 font-medium">
        Encore un petit effort pour débloquer ton sticker !
      </p>
    </div>

    <div class="flex items-center justify-center gap-2">
      <template v-for="i in 3" :key="i">
        <StarFilledIcon
          v-if="i <= stars"
          :size="64"
          class="text-gold-400 drop-shadow-md"
        />
        <StarEmptyIcon
          v-else
          :size="64"
          class="text-stone-200"
        />
      </template>
    </div>

    <!-- Sticker Unlocked Badge -->
    <div 
      v-if="stars === 3 && hasSticker" 
      class="flex flex-col items-center gap-3 p-4 md:p-6 bg-white rounded-3xl border-4 border-gold-300 shadow-xl animate-bounce"
    >
      <div class="flex items-center gap-2">
        <SparkleIcon :size="24" class="text-gold-400 animate-pulse" />
        <span class="text-xs font-bold text-gold-600 uppercase tracking-widest">Sticker débloqué !</span>
        <SparkleIcon :size="24" class="text-gold-400 animate-pulse" />
      </div>

      <div class="w-24 h-24 bg-gold-50 rounded-full flex items-center justify-center border-2 border-gold-100 p-2">
        <StickerVisual :id="chapter?.sticker?.id ?? ''" />
      </div>

      <div class="text-2xl font-bold text-stone-700 font-learning">
        {{ stickerName }}
      </div>
    </div>

    <p class="text-2xl md:text-3xl font-bold text-stone-400">
      {{ score }} / {{ total }}
    </p>

    <ResultActions>
      <ActionButton
        v-if="stars < 3"
        variant="secondary"
        @click="$emit('read-lesson')"
      >
        Lire la leçon
      </ActionButton>
      <ActionButton
        variant="secondary"
        @click="$emit('replay')"
      >
        Rejouer
      </ActionButton>
      <!-- Bouton album si sticker débloqué, sinon bouton continuer -->
      <ActionButton
        v-if="stars === 3 && hasSticker"
        variant="primary"
        @click="$emit('view-album')"
      >
        Voir mes stickers
      </ActionButton>
      <ActionButton
        v-else
        variant="primary"
        @click="$emit('continue')"
      >
        Continuer
      </ActionButton>
    </ResultActions>
  </div>
</template>
