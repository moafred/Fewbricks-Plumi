import { shuffle } from './utils.js';

/** Un item pour le mini-jeu Marché (monnaie) */
export interface MarcheItem {
  id: string;
  /** Prix à payer en centimes */
  priceInCents: number;
  /** Prix formaté (ex: "3,50 €") */
  priceLabel: string;
  /** 4 choix de sommes */
  choices: string[];
  correctAnswer: string;
}

export interface MarcheOptions {
  /** Prix max en euros (défaut: 10) */
  maxPrice?: number;
}

/**
 * Formate un montant en centimes vers un label prix lisible CE1.
 * 100 → "1 €", 250 → "2,50 €", 50 → "0,50 €"
 */
function formatPrice(cents: number): string {
  const euros = Math.floor(cents / 100);
  const remainingCents = cents % 100;

  if (remainingCents === 0) {
    return `${euros} €`;
  }

  const centStr = remainingCents.toString().padStart(2, '0');
  return `${euros},${centStr} €`;
}

/**
 * Génère des distracteurs de prix plausibles.
 * Erreurs fréquentes CE1 : ±50 centimes, ±1 euro, confusion des pièces.
 */
function generatePriceDistractors(priceInCents: number, maxCents: number): string[] {
  const correctStr = formatPrice(priceInCents);
  const candidates = new Set<string>();

  // ±50 centimes
  candidates.add(formatPrice(priceInCents + 50));
  candidates.add(formatPrice(priceInCents - 50));

  // ±1 euro
  candidates.add(formatPrice(priceInCents + 100));
  candidates.add(formatPrice(priceInCents - 100));

  // ±1,50 euro
  candidates.add(formatPrice(priceInCents + 150));
  candidates.add(formatPrice(priceInCents - 150));

  // ±2 euros
  candidates.add(formatPrice(priceInCents + 200));
  candidates.add(formatPrice(priceInCents - 200));

  // Filtrer : positif, dans la plage, différent de la bonne réponse
  const validCandidates = [...candidates].filter((str) => {
    if (str === correctStr) return false;
    // Reconvertir pour vérifier la plage (un peu redondant mais sûr)
    // Les prix négatifs donnent des labels étranges, on les filtre
    return !str.startsWith('-') && str !== formatPrice(0) || priceInCents === 0;
  });

  // Filtrer les prix négatifs ou hors plage en recalculant
  const finalCandidates: string[] = [];
  const offsets = [50, -50, 100, -100, 150, -150, 200, -200];
  for (const offset of offsets) {
    const candidate = priceInCents + offset;
    if (candidate > 0 && candidate <= maxCents && candidate !== priceInCents) {
      const str = formatPrice(candidate);
      if (!finalCandidates.includes(str)) {
        finalCandidates.push(str);
      }
    }
  }

  return shuffle(finalCandidates);
}

/**
 * Génère une liste d'items pour le Marché.
 * L'enfant doit identifier le bon prix parmi 4 propositions.
 * Niveau CE1 : prix en multiples de 50 centimes, max 10 €.
 */
export function generateMarcheItems(
  count: number = 10,
  options?: MarcheOptions,
): MarcheItem[] {
  const maxPriceEuros = options?.maxPrice ?? 10;
  const maxCents = maxPriceEuros * 100;

  // Générer tous les prix possibles (multiples de 50 centimes, de 50c à max)
  const allPrices: number[] = [];
  for (let cents = 50; cents <= maxCents; cents += 50) {
    allPrices.push(cents);
  }

  if (allPrices.length === 0) return [];

  const shuffled = shuffle([...allPrices]);
  const items: MarcheItem[] = [];

  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const priceInCents = shuffled[i];
    const correctStr = formatPrice(priceInCents);

    const distractors = generatePriceDistractors(priceInCents, maxCents);
    if (distractors.length < 3) continue;

    const choices = shuffle([correctStr, ...distractors.slice(0, 3)]);

    items.push({
      id: `marche-${priceInCents}-${i}`,
      priceInCents,
      priceLabel: correctStr,
      choices,
      correctAnswer: correctStr,
    });
  }

  // Recycler si pas assez
  if (items.length < count && allPrices.length > 0) {
    let attempts = 0;
    while (items.length < count && attempts < count * 10) {
      attempts++;
      const priceInCents = allPrices[Math.floor(Math.random() * allPrices.length)];
      const correctStr = formatPrice(priceInCents);

      const distractors = generatePriceDistractors(priceInCents, maxCents);
      if (distractors.length < 3) continue;

      const choices = shuffle([correctStr, ...distractors.slice(0, 3)]);

      items.push({
        id: `marche-${priceInCents}-${items.length}`,
        priceInCents,
        priceLabel: correctStr,
        choices,
        correctAnswer: correctStr,
      });
    }
  }

  return items;
}
