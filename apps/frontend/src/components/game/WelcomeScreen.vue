<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { AVATAR_COLORS } from '@plumi/shared';
import type { AvatarColor } from '@plumi/shared';
import { usePlayerStore } from '@/stores/player';
import PlumiMascot from './PlumiMascot.vue';
import ChildAvatar from './ChildAvatar.vue';
import ActionButton from '@/components/ui/ActionButton.vue';
import NotebookCard from '@/components/ui/NotebookCard.vue';

type Step = 'meet' | 'identity' | 'celebration';

const props = withDefaults(
  defineProps<{
    /** 'onboarding' crée un profil enfant, 'replay' montre seulement l'intro */
    mode?: 'onboarding' | 'replay';
  }>(),
  { mode: 'onboarding' },
);

const emit = defineEmits<{
  complete: [childId: string];
  close: [];
}>();

const playerStore = usePlayerStore();

const step = ref<Step>('meet');

// --- Formulaire identité (onboarding uniquement) ---
const childName = ref('');
const childColor = ref<AvatarColor>('sky');
const nameInput = ref<HTMLInputElement | null>(null);
const createdName = ref('');

// Mapping couleur → classes pour pastilles
const colorSwatches: Record<AvatarColor, string> = {
  sky: 'bg-sky-300',
  meadow: 'bg-meadow-300',
  gold: 'bg-gold-300',
  coral: 'bg-coral-300',
  moss: 'bg-moss-300',
  dawn: 'bg-gold-200',
};

// --- Textes narratifs — prêts pour vocalisation audio future ---
const speeches = {
  meet: {
    title: 'Salut !',
    // Texte adapté CE1 (vocabulaire simple, phrases courtes)
    text: 'Je suis Plumi, ta plume magique ! Ensemble, on va apprendre plein de choses en s\'amusant !',
    button: 'Bonjour Plumi !',
  },
  identity: {
    title: 'Et toi, comment tu t\'appelles ?',
    text: 'Choisis ton prénom et ta couleur préférée !',
    button: 'C\'est moi !',
  },
  celebration: {
    // `title` sera dynamique : "Bienvenue [Prénom] !"
    text: 'Ton aventure commence maintenant !',
    button: 'C\'est parti !',
  },
  replayEnd: {
    title: 'On continue !',
    text: 'Plumi est toujours là pour t\'accompagner !',
    button: 'Retour',
  },
};

function goToIdentity() {
  step.value = 'identity';
  nextTick(() => nameInput.value?.focus());
}

function goToCelebration() {
  const trimmed = childName.value.trim();
  if (!trimmed) return;

  // Créer le profil enfant
  const child = playerStore.addChild(trimmed, childColor.value);
  createdName.value = child.name;
  step.value = 'celebration';
}

function finish() {
  if (props.mode === 'replay') {
    emit('close');
    return;
  }
  // En onboarding, le dernier enfant créé est l'actif
  const last = playerStore.children[playerStore.children.length - 1];
  if (last) {
    emit('complete', last.id);
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 gap-6 relative">
    <!-- Sous-titre discret pour le parent -->
    <p class="absolute top-4 left-0 right-0 text-center text-xs text-stone-400">
      Plumi — Apprendre en s'amusant — CE1
    </p>

    <!-- ========== ÉTAPE 1 : RENCONTRE ========== -->
    <template v-if="step === 'meet'">
      <PlumiMascot state="idle" size="lg" class="animate-fade-in" />

      <NotebookCard variant="light" padding="lg" rounded="lg" class="max-w-md animate-slide-down">
        <div class="flex flex-col items-center gap-4">
          <h1 class="text-4xl md:text-5xl font-bold text-sky-600 font-learning">
            {{ speeches.meet.title }}
          </h1>
          <p class="text-lg md:text-xl text-stone-700 leading-relaxed text-center">
            {{ speeches.meet.text }}
          </p>
        </div>
      </NotebookCard>

      <ActionButton
        variant="primary"
        size="lg"
        class="w-64 md:w-80 animate-fade-in"
        @click="mode === 'onboarding' ? goToIdentity() : (step = 'celebration')"
      >
        {{ speeches.meet.button }}
      </ActionButton>
    </template>

    <!-- ========== ÉTAPE 2 : IDENTITÉ (onboarding uniquement) ========== -->
    <template v-if="step === 'identity'">
      <PlumiMascot state="challenge" size="md" class="animate-fade-in" />

      <NotebookCard variant="light" padding="lg" rounded="lg" class="max-w-md animate-slide-down">
        <div class="flex flex-col items-center gap-6">
          <h1 class="text-2xl md:text-3xl font-bold text-sky-600 text-center">
            {{ speeches.identity.title }}
          </h1>

          <!-- Aperçu avatar -->
          <ChildAvatar
            :name="childName || '?'"
            :color="childColor"
            size="lg"
          />

          <!-- Champ prénom -->
          <input
            ref="nameInput"
            v-model="childName"
            type="text"
            maxlength="12"
            placeholder="Ton prénom"
            class="w-full h-16 px-6 text-2xl font-bold text-center text-stone-700 bg-white/90 border-2 border-sky-200 rounded-2xl focus:border-sky-400 focus:outline-none transition-colors placeholder:text-stone-400"
            @keydown.enter="goToCelebration"
          >

          <!-- Sélection couleur -->
          <p class="text-sm text-stone-500">
            {{ speeches.identity.text }}
          </p>
          <div class="flex gap-3 flex-wrap justify-center">
            <button
              v-for="color in AVATAR_COLORS"
              :key="color"
              class="w-12 h-12 rounded-full transition-all active:scale-90"
              :class="[
                colorSwatches[color],
                childColor === color ? 'ring-4 ring-offset-2 ring-sky-500 scale-110' : 'hover:scale-105',
              ]"
              :aria-label="color"
              @click="childColor = color"
            />
          </div>
        </div>
      </NotebookCard>

      <ActionButton
        variant="primary"
        size="lg"
        class="w-64 md:w-80"
        :disabled="!childName.trim()"
        @click="goToCelebration"
      >
        {{ speeches.identity.button }}
      </ActionButton>
    </template>

    <!-- ========== ÉTAPE 3 : CÉLÉBRATION ========== -->
    <template v-if="step === 'celebration'">
      <PlumiMascot state="celebration" size="lg" class="animate-fade-in" />

      <NotebookCard variant="light" padding="lg" rounded="lg" class="max-w-md animate-slide-down">
        <div class="flex flex-col items-center gap-4">
          <h1 class="text-3xl md:text-4xl font-bold text-gold-500 font-learning text-center">
            <template v-if="mode === 'onboarding'">
              Bienvenue {{ createdName }} !
            </template>
            <template v-else>
              {{ speeches.replayEnd.title }}
            </template>
          </h1>
          <p class="text-lg md:text-xl text-stone-700 leading-relaxed text-center">
            {{ mode === 'onboarding' ? speeches.celebration.text : speeches.replayEnd.text }}
          </p>
        </div>
      </NotebookCard>

      <ActionButton
        variant="secondary"
        size="lg"
        class="w-64 md:w-80 animate-fade-in"
        @click="finish"
      >
        {{ mode === 'onboarding' ? speeches.celebration.button : speeches.replayEnd.button }}
      </ActionButton>
    </template>
  </div>
</template>
