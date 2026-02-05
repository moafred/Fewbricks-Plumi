<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Tense } from '@plumi/shared';
import type { MiniGame } from '@/components/game/BookCard.vue';
import TriSorcierGame from '@/components/game/TriSorcierGame.vue';
import GrimoireGame from '@/components/game/GrimoireGame.vue';
import PotionGame from '@/components/game/PotionGame.vue';
import PontAccordsGame from '@/components/game/PontAccordsGame.vue';
import PotionGnGame from '@/components/game/PotionGnGame.vue';
import BookShelf from '@/components/game/BookShelf.vue';
import MagicButton from '@/components/ui/MagicButton.vue';

type Screen = 'home' | 'bookshelf' | MiniGame;

const screen = ref<Screen>('home');
const selectedTense = ref<Tense>('present');

function goToGame(tense: Tense | undefined, game: MiniGame) {
  if (tense) {
    selectedTense.value = tense;
  }
  screen.value = game;
}

// Global keyboard listener for home screen
function handleGlobalKeydown(e: KeyboardEvent) {
  if (screen.value === 'home' && (e.key === ' ' || e.key === 'Enter')) {
    screen.value = 'bookshelf';
  }
}
onMounted(() => window.addEventListener('keydown', handleGlobalKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleGlobalKeydown));
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 text-white">
    <!-- Home screen -->
    <div
      v-if="screen === 'home'"
      class="flex flex-col items-center justify-center min-h-screen p-8 gap-12 relative overflow-hidden"
    >
      <div class="flex flex-col items-center gap-4">
        <!-- Mascot Plumi -->
        <img 
          src="/plumi-landing.png" 
          alt="Plumi Mascot" 
          class="w-48 md:w-64 h-48 md:h-64 animate-float drop-shadow-[0_0_30px_rgba(251,191,36,0.5)] mb-2 mix-blend-screen"
          style="mask-image: radial-gradient(circle, black 40%, transparent 70%); -webkit-mask-image: radial-gradient(circle, black 40%, transparent 70%);"
        />
        <h1 class="text-6xl md:text-8xl font-bold text-amber-300 drop-shadow-2xl">
          Plumi
        </h1>
        <p class="text-2xl md:text-3xl text-purple-200 font-medium">
          La Plume Magique
        </p>
      </div>

      <div class="flex flex-col items-center gap-6">
        <MagicButton
          variant="primary"
          size="lg"
          class="w-64 md:w-80 h-20 md:h-24 !text-3xl"
          @click="screen = 'bookshelf'"
        >
          ✨ Jouer
        </MagicButton>

        <!-- Keyboard Hint - Only on Desktop -->
        <KeyboardGuide
          key-name="espace"
          mode="single"
          label="commencer"
          class="hidden lg:flex opacity-60 hover:opacity-100 transition-opacity"
        />

        <!-- Mobile Hint -->
        <p class="lg:hidden text-purple-300 animate-pulse font-medium">
          Appuie sur le bouton pour commencer
        </p>
      </div>
    </div>

    <!-- Bookshelf screen -->
    <BookShelf
      v-else-if="screen === 'bookshelf'"
      @home="screen = 'home'"
      @play="goToGame"
    />

    <!-- Game screens -->
    <TriSorcierGame
      v-else-if="screen === 'tri-sorcier'"
      :tense="selectedTense"
      @home="screen = 'bookshelf'"
    />
    <GrimoireGame
      v-else-if="screen === 'grimoire'"
      :tense="selectedTense"
      @home="screen = 'bookshelf'"
    />
    <PotionGame
      v-else-if="screen === 'potion'"
      :tense="selectedTense"
      @home="screen = 'bookshelf'"
    />
    <PontAccordsGame
      v-else-if="screen === 'pont-accords'"
      @home="screen = 'bookshelf'"
    />
    <PotionGnGame
      v-else-if="screen === 'potion-gn'"
      @home="screen = 'bookshelf'"
    />
  </div>
</template>
