<script setup lang="ts">
import { ref } from 'vue';
import { AVATAR_COLORS } from '@plumi/shared';
import type { AvatarColor } from '@plumi/shared';
import { usePlayerStore } from '@/stores/player';
import NotebookButton from '@/components/ui/NotebookButton.vue';
import ChildAvatar from './ChildAvatar.vue';

const emit = defineEmits<{
  select: [childId: string];
}>();

const playerStore = usePlayerStore();

type Mode = 'list' | 'create';
const mode = ref<Mode>('list');

// --- Formulaire de création ---
const newName = ref('');
const newColor = ref<AvatarColor>('sky');

function startCreate() {
  newName.value = '';
  newColor.value = 'sky';
  mode.value = 'create';
}

function cancelCreate() {
  mode.value = 'list';
}

function confirmCreate() {
  const trimmed = newName.value.trim();
  if (!trimmed) return;
  const child = playerStore.addChild(trimmed, newColor.value);
  mode.value = 'list';
  emit('select', child.id);
}

function selectChild(id: string) {
  emit('select', id);
}

// Mapping couleur → classes pour les pastilles de sélection
const colorSwatches: Record<AvatarColor, string> = {
  sky: 'bg-sky-300',
  meadow: 'bg-meadow-300',
  gold: 'bg-gold-300',
  coral: 'bg-coral-300',
  moss: 'bg-moss-300',
  dawn: 'bg-gold-200',
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 gap-8">
    <!-- Mode liste -->
    <template v-if="mode === 'list'">
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

        <!-- Bouton ajouter -->
        <button
          v-if="playerStore.canAddChild"
          class="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-sky-300 text-sky-500 hover:bg-sky-50 hover:border-sky-400 active:scale-95 transition-all cursor-pointer min-h-[140px]"
          @click="startCreate"
        >
          <span class="text-5xl font-light leading-none">+</span>
          <span class="text-sm font-medium">Ajouter</span>
        </button>
      </div>
    </template>

    <!-- Mode création -->
    <template v-if="mode === 'create'">
      <h1 class="text-3xl md:text-4xl font-bold text-sky-600">
        Nouveau joueur
      </h1>

      <div class="flex flex-col items-center gap-6 w-full max-w-sm">
        <!-- Aperçu avatar -->
        <ChildAvatar
          :name="newName || '?'"
          :color="newColor"
          size="lg"
        />

        <!-- Champ prénom -->
        <input
          v-model="newName"
          type="text"
          maxlength="12"
          placeholder="Prénom"
          class="w-full h-16 px-6 text-2xl font-bold text-center text-stone-700 bg-white/90 border-2 border-sky-200 rounded-2xl focus:border-sky-400 focus:outline-none transition-colors placeholder:text-stone-400"
          @keydown.enter="confirmCreate"
        >

        <!-- Sélection couleur -->
        <div class="flex gap-3 flex-wrap justify-center">
          <button
            v-for="color in AVATAR_COLORS"
            :key="color"
            class="w-12 h-12 rounded-full transition-all active:scale-90"
            :class="[
              colorSwatches[color],
              newColor === color ? 'ring-4 ring-offset-2 ring-sky-500 scale-110' : 'hover:scale-105',
            ]"
            :aria-label="color"
            @click="newColor = color"
          />
        </div>

        <!-- Boutons action -->
        <div class="flex gap-4 w-full">
          <NotebookButton
            variant="text"
            class="flex-1 justify-center text-lg font-bold text-stone-600"
            @click="cancelCreate"
          >
            Annuler
          </NotebookButton>
          <button
            class="flex-1 h-14 rounded-2xl text-lg font-bold transition-all active:scale-95 bg-sky-400 text-white hover:bg-sky-500 disabled:opacity-50 disabled:pointer-events-none"
            :disabled="!newName.trim()"
            @click="confirmCreate"
          >
            Créer
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
