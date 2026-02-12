<script setup lang="ts">
/**
 * AvatarBadge — Badge cliquable avec avatar enfant + nom
 *
 * Utilisé dans les headers (BookShelf, HomeScreen) pour accéder au sélecteur de profils.
 */
import type { AvatarColor } from '@plumi/shared';
import ChildAvatar from './ChildAvatar.vue';

defineProps<{
  name: string;
  avatarColor: AvatarColor;
}>();

defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 shadow-sm hover:bg-white/90 active:scale-95 transition-all cursor-pointer"
    aria-label="Gerer les profils"
    @click="$emit('click')"
  >
    <ChildAvatar
      :name="name"
      :color="avatarColor"
      size="sm"
    />
    <span class="text-sm font-bold text-stone-600 hidden md:inline">
      {{ name }}
    </span>
  </button>
</template>
