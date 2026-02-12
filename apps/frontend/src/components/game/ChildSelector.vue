<script setup lang="ts">
import { useRouter } from 'vue-router';
import { usePlayerStore } from '@/stores/player';
import ProfileCard from './ProfileCard.vue';
import NotebookButton from '@/components/ui/NotebookButton.vue';

const router = useRouter();
const playerStore = usePlayerStore();

function selectChild(childId: string) {
  playerStore.switchChild(childId);
  router.push({ name: 'home' });
}
</script>

<template>
  <div class="flex flex-col items-center justify-center flex-1 p-6 gap-8">
    <h1 class="text-3xl md:text-4xl font-bold text-sky-600">
      Qui joue aujourd'hui ?
    </h1>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-lg">
      <!-- Enfants existants -->
      <ProfileCard
        v-for="child in playerStore.children"
        :key="child.id"
        :name="child.name"
        :avatar-color="child.avatarColor"
        @select="selectChild(child.id)"
      />

      <!-- Bouton ajouter un enfant (via WelcomeScreen onboarding) -->
      <ProfileCard
        v-if="playerStore.canAddChild"
        mode="add"
        @select="router.push({ name: 'welcome-add-child' })"
      />
    </div>

    <!-- Revoir l'intro -->
    <NotebookButton
      variant="ghost"
      size="sm"
      class="mt-4 text-stone-400 hover:text-sky-500"
      @click="router.push({ name: 'welcome-replay' })"
    >
      Revoir l'intro de Plumi
    </NotebookButton>
  </div>
</template>
