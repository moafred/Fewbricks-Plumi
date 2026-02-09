import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ChildProfile, AvatarColor } from '@plumi/shared';
import { MAX_CHILDREN } from '@plumi/shared';
import { useChapterProgressStore } from './chapter-progress';

const STORAGE_KEY = 'plumi-children';
const ACTIVE_KEY = 'plumi-active-child';

export const usePlayerStore = defineStore('player', () => {
  const children = ref<ChildProfile[]>([]);
  const activeChildId = ref<string | null>(null);

  // --- Init from localStorage ---
  function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      children.value = JSON.parse(raw);
    }
    activeChildId.value = localStorage.getItem(ACTIVE_KEY);
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(children.value));
    if (activeChildId.value) {
      localStorage.setItem(ACTIVE_KEY, activeChildId.value);
    } else {
      localStorage.removeItem(ACTIVE_KEY);
    }
  }

  // --- Getters ---
  const activeChild = computed(() =>
    children.value.find((c) => c.id === activeChildId.value) ?? null,
  );

  const canAddChild = computed(() => children.value.length < MAX_CHILDREN);

  const hasChildren = computed(() => children.value.length > 0);

  // --- Actions ---
  function addChild(name: string, avatarColor: AvatarColor): ChildProfile {
    const child: ChildProfile = {
      id: crypto.randomUUID(),
      name: name.slice(0, 12),
      avatarColor,
      createdAt: Date.now(),
    };
    children.value.push(child);
    save();
    return child;
  }

  function removeChild(id: string) {
    children.value = children.value.filter((c) => c.id !== id);
    if (activeChildId.value === id) {
      activeChildId.value = children.value[0]?.id ?? null;
    }
    // Nettoyer la progression de l'enfant supprimé
    localStorage.removeItem(`plumi-chapter-progress-${id}`);
    save();
  }

  function switchChild(id: string) {
    const child = children.value.find((c) => c.id === id);
    if (!child) return;
    activeChildId.value = id;
    save();
    // Charger la progression du nouvel enfant actif
    const chapterProgress = useChapterProgressStore();
    chapterProgress.loadProgressForChild(id);
  }

  // Charger au démarrage
  load();

  return {
    children,
    activeChildId,
    activeChild,
    canAddChild,
    hasChildren,
    addChild,
    removeChild,
    switchChild,
  };
});
