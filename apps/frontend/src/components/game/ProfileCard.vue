<script setup lang="ts">
/**
 * ProfileCard — Carte cliquable de profil enfant
 *
 * Deux modes :
 * - 'profile' (défaut) : affiche l'avatar et le nom d'un enfant existant
 * - 'add' : affiche un bouton "+" pour ajouter un enfant
 *
 * Utilisé dans ChildSelector.
 */
import type { AvatarColor } from '@plumi/shared';
import ChildAvatar from './ChildAvatar.vue';

withDefaults(
  defineProps<{
    mode?: 'profile' | 'add';
    name?: string;
    avatarColor?: AvatarColor;
  }>(),
  { mode: 'profile', name: '', avatarColor: 'sky' },
);

defineEmits<{
  select: [];
}>();
</script>

<template>
  <!-- Carte enfant existant -->
  <button
    v-if="mode === 'profile'"
    class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-sky-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
    @click="$emit('select')"
  >
    <ChildAvatar
      :name="name"
      :color="avatarColor"
      size="lg"
    />
    <span class="text-lg font-bold text-stone-700 truncate max-w-full">
      {{ name }}
    </span>
  </button>

  <!-- Carte ajouter un enfant -->
  <button
    v-else
    class="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed border-sky-300 text-sky-500 hover:bg-sky-50 hover:border-sky-400 active:scale-95 transition-all cursor-pointer min-h-35"
    @click="$emit('select')"
  >
    <span class="text-5xl font-light leading-none">+</span>
    <span class="text-sm font-medium">Ajouter</span>
  </button>
</template>
