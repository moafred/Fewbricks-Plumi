import { Preferences } from '@capacitor/preferences';

/**
 * Service de stockage avec cache synchrone.
 *
 * Charge toutes les clés Preferences en mémoire au démarrage,
 * puis expose une API synchrone getItem/setItem/removeItem.
 * Les écritures persistent en arrière-plan via Preferences.set().
 * Sur web, Preferences utilise localStorage comme backend automatiquement.
 */

const cache = new Map<string, string>();
let initialized = false;

/** Clés utilisées par l'application — chargées au démarrage */
const KNOWN_KEYS = [
  'plumi-children',
  'plumi-active-child',
  'plumi-chapter-progress',
  'plumi:hasSeenParentGuide',
] as const;

/**
 * Initialise le cache en chargeant toutes les clés connues + clés dynamiques.
 * DOIT être appelé avant le montage de l'app (dans main.ts).
 */
export async function initStorage(): Promise<void> {
  if (initialized) return;

  // Charger les clés statiques connues
  for (const key of KNOWN_KEYS) {
    const { value } = await Preferences.get({ key });
    if (value !== null) {
      cache.set(key, value);
    }
  }

  // Charger les clés dynamiques (progression par enfant : plumi-chapter-progress-{uuid})
  const { keys } = await Preferences.keys();
  for (const key of keys) {
    if (!cache.has(key)) {
      const { value } = await Preferences.get({ key });
      if (value !== null) {
        cache.set(key, value);
      }
    }
  }

  initialized = true;
}

/** Lecture synchrone depuis le cache */
export function getItem(key: string): string | null {
  return cache.get(key) ?? null;
}

/** Écriture synchrone dans le cache + persistance async */
export function setItem(key: string, value: string): void {
  cache.set(key, value);
  Preferences.set({ key, value });
}

/** Suppression synchrone du cache + persistance async */
export function removeItem(key: string): void {
  cache.delete(key);
  Preferences.remove({ key });
}
