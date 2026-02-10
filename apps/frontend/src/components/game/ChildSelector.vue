<script setup lang="ts">
import { useRouter } from 'vue-router';
import { usePlayerStore } from '@/stores/player';
import ChildAvatar from './ChildAvatar.vue';

const router = useRouter();
const playerStore = usePlayerStore();

function selectChild(childId: string) {
  playerStore.switchChild(childId);
  router.push({ name: 'home' });
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 gap-8">
    <h1 class="text-3xl md:text-4xl font-bold text-sky-600">
      Qui joue aujourd'hui ?
    </h1>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-lg">
      <!-- Enfants existants -->
      <button
        v-for="child in playerStore.children"
        :key="child.id"
        class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-sky-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        @click="selectChild(child.id)"
      >
        <ChildAvatar
          :name="child.name"
          :color="child.avatarColor"
          size="lg"
        />
        <span class="text-lg font-bold text-stone-700 truncate max-w-full">
          {{ child.name }}
        </span>
      </button>

      <!-- Bouton ajouter un enfant (via WelcomeScreen onboarding) -->
      <button
        v-if="playerStore.canAddChild"
        class="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-sky-300 text-sky-500 hover:bg-sky-50 hover:border-sky-400 active:scale-95 transition-all cursor-pointer min-h-[140px]"
        @click="router.push({ name: 'welcome-add-child' })"
      >
        <span class="text-5xl font-light leading-none">+</span>
        <span class="text-sm font-medium">Ajouter</span>
      </button>
    </div>

    <!-- Revoir l'intro -->
    <button
      class="text-sm text-stone-400 hover:text-sky-500 transition-colors mt-4"
      @click="router.push({ name: 'welcome-replay' })"
    >
      Revoir l'intro de Plumi
    </button>
  </div>
</template>
