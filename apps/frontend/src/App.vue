<script setup lang="ts">
import { ref } from 'vue';
import TriSorcierGame from '@/components/game/TriSorcierGame.vue';
import GrimoireGame from '@/components/game/GrimoireGame.vue';
import GameCard from '@/components/ui/GameCard.vue';
import { HatIcon, GrimoireIcon } from '@/components/icons';

const screen = ref<'home' | 'tri-sorcier' | 'grimoire'>('home');
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 text-white">
    <!-- Home screen — game selection -->
    <div
      v-if="screen === 'home'"
      class="flex flex-col items-center min-h-screen p-8 gap-8"
    >
      <div class="flex flex-col items-center gap-2 pt-8">
        <h1 class="text-5xl md:text-7xl font-bold text-amber-300 animate-float">
          Plumi
        </h1>
        <p class="text-xl md:text-2xl text-purple-200">
          La Plume Magique
        </p>
      </div>

      <!-- Game cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-8">
        <GameCard
          title="Le Tri du Sorcier"
          description="Trie les formes conjuguées dans le bon chapeau : être ou avoir ?"
          accent-color="text-magic-300"
          @click="screen = 'tri-sorcier'"
        >
          <template #icon>
            <HatIcon
              :size="48"
              class="text-magic-300"
            />
          </template>
        </GameCard>

        <GameCard
          title="Le Grimoire"
          description="Trouve la bonne formule magique pour chaque pronom et verbe !"
          accent-color="text-royal-300"
          @click="screen = 'grimoire'"
        >
          <template #icon>
            <GrimoireIcon
              :size="48"
              class="text-royal-300"
            />
          </template>
        </GameCard>
      </div>
    </div>

    <!-- Game screens -->
    <TriSorcierGame
      v-else-if="screen === 'tri-sorcier'"
      @home="screen = 'home'"
    />
    <GrimoireGame
      v-else-if="screen === 'grimoire'"
      @home="screen = 'home'"
    />
  </div>
</template>
