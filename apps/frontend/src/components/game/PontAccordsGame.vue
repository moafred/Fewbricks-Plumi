<script setup lang="ts">
import { onMounted, onUnmounted, computed, watch, ref } from 'vue';
import { usePontAccordsStore } from '@/stores/pont-accords';
import { useKeyboardNavigation, useBackNavigation } from '@/composables';
import MagicButton from '@/components/ui/MagicButton.vue';
import KeyboardGuide from '@/components/ui/KeyboardGuide.vue';
import ConfirmModal from '@/components/ui/ConfirmModal.vue';
import CrossIcon from '@/components/icons/CrossIcon.vue';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['home']);

const store = usePontAccordsStore();
const {
  currentItem,
  phase,
  score,
  progress,
  lastResult,
  selectedChoice,
  correctAnswer,
  isFinished,
} = storeToRefs(store);

// Keyboard Navigation
const choices = computed(() => currentItem.value?.choices ?? []);
const isChallenge = computed(() => phase.value === 'challenge');

const { focusedIndex, resetFocus } = useKeyboardNavigation(
  choices,
  (choice) => store.submitAnswer(choice),
  isChallenge,
  2,
);

watch(
  () => store.currentIndex,
  () => resetFocus(),
);

// Back Navigation
const showQuitConfirmation = ref(false);

function handleBack() {
  if (isFinished.value) {
    emit('home');
  } else {
    showQuitConfirmation.value = true;
  }
}

useBackNavigation(handleBack, computed(() => !showQuitConfirmation.value));

onMounted(() => {
  store.startGame();
});

onUnmounted(() => {
  store.resetGame();
});

// Grille 2 colonnes pour les choix
const gridCols = computed(() => {
  return 'grid-cols-2';
});

// Mot affiché dans le trou après réponse
const filledWord = computed(() => {
  if (phase.value === 'response' || phase.value === 'resolution') {
    return correctAnswer.value;
  }
  return undefined;
});

// Classes CSS du trou selon la phase et le résultat
const gapClasses = computed(() => {
  if (phase.value === 'response' || phase.value === 'resolution') {
    if (lastResult.value === 'correct') {
      return 'text-enchant-600 font-bold scale-110 transform border-enchant-400';
    }
    return 'text-gentle-600 border-gentle-400';
  }
  // Phase discovery / challenge : état idle
  return 'border-forest-400 bg-forest-100/50';
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto p-4 gap-8">

    <!-- Header -->
    <header class="flex items-center justify-between w-full">
        <button
          @click="handleBack"
          class="p-2 text-white/60 hover:text-white transition-colors"
        >
          <CrossIcon :size="32" />
        </button>

        <div class="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-full backdrop-blur-sm">
           <span class="text-forest-300 font-bold">Pont: {{ progress.current + 1 }} / {{ progress.total }}</span>
        </div>

        <div class="w-10"></div>
    </header>

    <!-- Finished State -->
    <div v-if="isFinished" class="bg-white/10 backdrop-blur-md border border-white/10 text-center animate-fade-in p-12 w-full max-w-lg rounded-2xl">
      <h2 class="text-4xl font-bold text-forest-400 mb-4">Pont Complet&#233; !</h2>
      <p class="text-2xl text-white mb-8">Score: {{ score }} / {{ progress.total }}</p>

      <div class="flex justify-center gap-4">
        <MagicButton variant="secondary" @click="$emit('home')">Retour</MagicButton>
        <MagicButton variant="primary" @click="store.startGame()">Rejouer</MagicButton>
      </div>
    </div>

    <!-- Game Area -->
    <template v-else-if="currentItem">

      <!-- Challenge Card -->
      <div class="w-full bg-white rounded-3xl p-8 shadow-xl min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">

        <!-- Consigne -->
        <div class="absolute top-4 left-0 right-0 text-center text-royal-300 text-sm font-bold uppercase tracking-widest">
           Compl&#232;te le groupe nominal !
        </div>

        <!-- Slots du groupe nominal -->
        <div class="mt-8 mb-8 w-full">
          <div class="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-4 text-3xl md:text-5xl font-learning text-night-900">
            <template v-for="(slot, i) in currentItem.slots" :key="i">
              <span v-if="i !== currentItem.targetSlotIndex">{{ slot.label }}</span>
              <div
                v-else
                class="inline-flex items-center justify-center min-w-[100px] px-3 py-1 border-b-4 rounded-t-lg transition-all duration-500"
                :class="gapClasses"
              >
                <span v-if="filledWord">{{ filledWord }}</span>
                <span v-else class="opacity-0">mot</span>
              </div>
            </template>
          </div>
        </div>

        <!-- Indice genre/nombre -->
        <div class="text-forest-400 font-sans text-sm">
           ({{ currentItem.hint }})
        </div>

      </div>

      <!-- Choices -->
      <div class="flex flex-col items-center gap-10 pb-12 w-full">
        <div
          class="grid gap-6 w-full max-w-3xl px-6"
          :class="gridCols"
        >
          <button
            v-for="(choice, index) in currentItem.choices"
            :key="choice"
            @click="store.submitAnswer(choice)"
            :disabled="phase !== 'challenge'"
            class="
              relative h-16 md:h-20 rounded-2xl text-2xl md:text-3xl font-learning transition-all duration-200
              border-b-4 active:border-b-0 active:translate-y-1
              flex items-center justify-center
            "
            :class="[
               /* Idle State */
               phase === 'challenge' || phase === 'discovery'
                  ? 'bg-white text-royal-900 border-royal-200 hover:border-royal-300 hover:bg-royal-50 cursor-pointer'
                  : '',

               /* Result State */
               phase === 'response' || phase === 'resolution'
                  ? (choice === store.correctAnswer
                      ? 'bg-enchant-100 text-enchant-700 border-enchant-500'
                      : (choice === selectedChoice
                          ? 'bg-gentle-100 text-gentle-700 border-gentle-500'
                          : 'bg-white/50 text-royal-900/50 border-transparent')
                    )
                  : ((phase === 'challenge' && index === focusedIndex) ? 'ring-4 ring-magic-300 border-magic-400 z-10' : '')
            ]"
          >
            {{ choice }}
          </button>
        </div>

        <!-- Keyboard Hints -->
        <div v-if="phase === 'challenge'" class="hidden lg:flex gap-8 opacity-60">
           <KeyboardGuide mode="cluster" label="choisir" />
           <KeyboardGuide mode="single" key-name="espace" label="traverser" />
        </div>
      </div>

      <!-- Footer Feedback / Next -->
       <div class="h-16 flex items-center justify-center w-full">
          <div v-if="phase === 'resolution'" class="animate-fade-in">
             <MagicButton variant="primary" @click="store.nextItem()">
                Continuer →
             </MagicButton>
          </div>
       </div>

    </template>

    <ConfirmModal
      v-if="showQuitConfirmation"
      title="Quitter le Pont des Accords ?"
      message="Si tu sors maintenant, tu devras recommencer."
      confirm-label="Quitter"
      cancel-label="Continuer"
      @confirm="$emit('home')"
      @cancel="showQuitConfirmation = false"
    />
  </div>
</template>
