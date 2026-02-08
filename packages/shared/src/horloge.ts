import { shuffle } from './utils.js';

/** Un item pour le mini-jeu Horloge (lecture de l'heure) */
export interface HorlogeItem {
  id: string;
  /** Heures (1-12) */
  hours: number;
  /** Minutes (0, 15, 30, 45 pour le CE1) */
  minutes: number;
  /** Texte de l'heure correcte (ex: "3 h 30") */
  correctAnswer: string;
  /** 4 choix d'heures */
  choices: string[];
}

export interface HorlogeOptions {
  /** Inclure les quarts d'heure (défaut: true) */
  includeQuarters?: boolean;
}

/** Formate une heure en chaîne lisible CE1 : "3 h 00", "3 h 15", "3 h 30" */
function formatTime(hours: number, minutes: number): string {
  const minuteStr = minutes.toString().padStart(2, '0');
  return `${hours} h ${minuteStr}`;
}

/**
 * Génère des distracteurs d'heures plausibles.
 * Erreurs fréquentes CE1 : ±1 heure, confusion des aiguilles,
 * mauvais quart d'heure.
 */
function generateTimeDistractors(
  hours: number,
  minutes: number,
  allMinutes: number[],
): string[] {
  const correctStr = formatTime(hours, minutes);
  const candidates = new Set<string>();

  // Même minutes, heure ±1 (confusion lecture aiguille des heures)
  const hourPlus = hours === 12 ? 1 : hours + 1;
  const hourMinus = hours === 1 ? 12 : hours - 1;
  candidates.add(formatTime(hourPlus, minutes));
  candidates.add(formatTime(hourMinus, minutes));

  // Même heure, minutes différentes
  for (const m of allMinutes) {
    if (m !== minutes) {
      candidates.add(formatTime(hours, m));
    }
  }

  // Heure ±1 avec minutes différentes (double confusion)
  for (const m of allMinutes) {
    if (m !== minutes) {
      candidates.add(formatTime(hourPlus, m));
      candidates.add(formatTime(hourMinus, m));
    }
  }

  // Confusion petite/grande aiguille (ex: 3 h 30 → 6 h 15)
  if (minutes === 30) {
    candidates.add(formatTime(6, 0));
  }

  candidates.delete(correctStr);

  return shuffle([...candidates]);
}

/**
 * Génère une liste d'items pour l'Horloge.
 * L'enfant doit lire l'heure sur une horloge analogique.
 * Niveau CE1 : heures 1-12, minutes par quarts (0, 15, 30, 45).
 */
export function generateHorlogeItems(
  count: number = 10,
  options?: HorlogeOptions,
): HorlogeItem[] {
  const includeQuarters = options?.includeQuarters ?? true;
  const allMinutes = includeQuarters ? [0, 15, 30, 45] : [0, 30];

  // Générer toutes les combinaisons possibles
  interface TimePair {
    hours: number;
    minutes: number;
  }

  const allTimes: TimePair[] = [];
  for (let h = 1; h <= 12; h++) {
    for (const m of allMinutes) {
      allTimes.push({ hours: h, minutes: m });
    }
  }

  const shuffled = shuffle([...allTimes]);
  const items: HorlogeItem[] = [];

  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const { hours, minutes } = shuffled[i];
    const correctStr = formatTime(hours, minutes);

    const distractors = generateTimeDistractors(hours, minutes, allMinutes);
    if (distractors.length < 3) continue;

    const choices = shuffle([correctStr, ...distractors.slice(0, 3)]);

    items.push({
      id: `horloge-${hours}-${minutes}-${i}`,
      hours,
      minutes,
      correctAnswer: correctStr,
      choices,
    });
  }

  // Recycler si pas assez
  if (items.length < count && allTimes.length > 0) {
    let attempts = 0;
    while (items.length < count && attempts < count * 10) {
      attempts++;
      const { hours, minutes } = allTimes[Math.floor(Math.random() * allTimes.length)];
      const correctStr = formatTime(hours, minutes);

      const distractors = generateTimeDistractors(hours, minutes, allMinutes);
      if (distractors.length < 3) continue;

      const choices = shuffle([correctStr, ...distractors.slice(0, 3)]);

      items.push({
        id: `horloge-${hours}-${minutes}-${items.length}`,
        hours,
        minutes,
        correctAnswer: correctStr,
        choices,
      });
    }
  }

  return items;
}
