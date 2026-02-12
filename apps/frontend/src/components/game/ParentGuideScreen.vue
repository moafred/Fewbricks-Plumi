<script setup lang="ts">
import { useRouter } from 'vue-router';
import ParentGuideContent from './ParentGuideContent.vue';
import ActionButton from '@/components/ui/ActionButton.vue';
import { setItem } from '@/services/storage';

const router = useRouter();

function startWithChild() {
  setItem('plumi:hasSeenParentGuide', 'true');
  router.push({ name: 'welcome' });
}
</script>

<template>
  <div class="flex flex-col items-center justify-start flex-1 p-4 md:p-6 gap-6 md:gap-8 overflow-y-auto">
    <!-- Logo Plumi -->
    <img
      src="/plumi-landing.png"
      alt="Plumi"
      class="h-24 md:h-32 w-auto animate-fade-in"
    />

    <!-- Titre et sous-titre -->
    <div class="flex flex-col items-center gap-2 animate-fade-in">
      <h1 class="text-3xl md:text-4xl font-bold text-sky-600 font-learning text-center">
        Bienvenue sur Plumi !
      </h1>
      <p class="text-lg md:text-xl text-stone-600 text-center">
        Un mot pour vous, parents
      </p>
    </div>

    <!-- Contenu réutilisable -->
    <div class="w-full max-w-2xl">
      <ParentGuideContent />
    </div>

    <!-- Bouton d'action -->
    <ActionButton
      variant="primary"
      size="lg"
      class="w-full md:w-96 animate-fade-in"
      @click="startWithChild"
    >
      Commencer avec mon enfant
    </ActionButton>
  </div>
</template>
