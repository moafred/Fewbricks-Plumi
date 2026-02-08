import { shuffle } from './utils.js';

// --- Types ---

export type MarcheQuestionType = 'total' | 'change';

export interface MarcheArticle {
  name: string;
  priceInCents: number;
  priceLabel: string;
}

export interface MarcheItem {
  id: string;
  type: MarcheQuestionType;
  /** Articles affichés (2-3 pour 'total', 1 pour 'change') */
  articles: MarcheArticle[];
  /** Pour 'change' : montant donné par l'enfant */
  givenAmountCents?: number;
  givenAmountLabel?: string;
  /** Question affichée */
  question: string;
  choices: string[];
  correctAnswer: string;
}

export interface MarcheOptions {
  /** Prix max en euros (défaut: 10) */
  maxPrice?: number;
  /** Nombre d'articles pour les questions 'total' (défaut: 2) */
  articleCount?: 2 | 3;
}

// --- Pool d'articles CE1 — objets du quotidien familier 6-7 ans ---

interface ArticleTemplate {
  name: string;
  /** Fourchette de prix en centimes [min, max], multiples de 50 */
  priceRange: [number, number];
}

const MARKET_ARTICLES: ArticleTemplate[] = [
  { name: 'Cahier', priceRange: [100, 300] },
  { name: 'Crayon', priceRange: [50, 150] },
  { name: 'Gomme', priceRange: [50, 100] },
  { name: 'Règle', priceRange: [100, 250] },
  { name: 'Pomme', priceRange: [50, 150] },
  { name: 'Gâteau', priceRange: [150, 350] },
  { name: 'Bonbon', priceRange: [50, 100] },
  { name: 'Livre', priceRange: [300, 500] },
  { name: 'Stylo', priceRange: [100, 200] },
  { name: 'Bille', priceRange: [50, 100] },
];

// --- Utilitaires ---

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

/** Choisit un prix aléatoire dans la fourchette d'un article (multiple de 50c) */
function pickPrice(template: ArticleTemplate): number {
  const [min, max] = template.priceRange;
  const steps = Math.floor((max - min) / 50) + 1;
  return min + Math.floor(Math.random() * steps) * 50;
}

/** Tire un article aléatoire avec un prix dans sa fourchette */
function pickArticle(): MarcheArticle {
  const template = MARKET_ARTICLES[Math.floor(Math.random() * MARKET_ARTICLES.length)];
  const price = pickPrice(template);
  return {
    name: template.name,
    priceInCents: price,
    priceLabel: formatPrice(price),
  };
}

/** Tire N articles distincts (noms différents) */
function pickDistinctArticles(count: number): MarcheArticle[] {
  const shuffled = shuffle([...MARKET_ARTICLES]);
  const articles: MarcheArticle[] = [];
  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const price = pickPrice(shuffled[i]);
    articles.push({
      name: shuffled[i].name,
      priceInCents: price,
      priceLabel: formatPrice(price),
    });
  }
  return articles;
}

/**
 * Génère des distracteurs plausibles pour un montant donné.
 * Erreurs fréquentes CE1 : ±50c, ±100c, ±150c
 */
function generateDistractors(correctCents: number): string[] {
  const correctStr = formatPrice(correctCents);
  const offsets = [50, -50, 100, -100, 150, -150, 200, -200];
  const results: string[] = [];

  for (const offset of offsets) {
    const candidate = correctCents + offset;
    if (candidate > 0 && candidate !== correctCents) {
      const str = formatPrice(candidate);
      if (str !== correctStr && !results.includes(str)) {
        results.push(str);
      }
    }
  }

  return shuffle(results);
}

// --- Générateurs de questions ---

function generateTotalQuestion(articleCount: 2 | 3, index: number): MarcheItem {
  const articles = pickDistinctArticles(articleCount);
  const totalCents = articles.reduce((sum, a) => sum + a.priceInCents, 0);
  const correctStr = formatPrice(totalCents);

  const distractors = generateDistractors(totalCents);
  const choices = shuffle([correctStr, ...distractors.slice(0, 3)]);

  return {
    id: `marche-total-${index}`,
    type: 'total',
    articles,
    question: 'Combien ça coûte en tout ?',
    choices,
    correctAnswer: correctStr,
  };
}

function generateChangeQuestion(index: number): MarcheItem {
  const article = pickArticle();

  // Choisir le montant donné : prochain palier rond au-dessus du prix
  // Paliers disponibles : 200, 500, 1000 centimes (2€, 5€, 10€)
  const paymentTiers = [200, 500, 1000];
  const givenAmountCents = paymentTiers.find((t) => t > article.priceInCents) ?? 1000;
  const changeCents = givenAmountCents - article.priceInCents;

  const correctStr = formatPrice(changeCents);
  const distractors = generateDistractors(changeCents);
  const choices = shuffle([correctStr, ...distractors.slice(0, 3)]);

  return {
    id: `marche-change-${index}`,
    type: 'change',
    articles: [article],
    givenAmountCents,
    givenAmountLabel: formatPrice(givenAmountCents),
    question: 'Combien te rend-on ?',
    choices,
    correctAnswer: correctStr,
  };
}

// --- Point d'entrée ---

/**
 * Génère une liste d'items pour le Marché.
 * Alterne questions "total" (addition) et "change" (soustraction).
 * Niveau CE1 : prix en multiples de 50 centimes.
 */
export function generateMarcheItems(
  count: number = 10,
  options?: MarcheOptions,
): MarcheItem[] {
  const articleCount = options?.articleCount ?? 2;
  const items: MarcheItem[] = [];

  for (let i = 0; i < count; i++) {
    // Alterner total / change
    if (i % 2 === 0) {
      items.push(generateTotalQuestion(articleCount, i));
    } else {
      items.push(generateChangeQuestion(i));
    }
  }

  return shuffle(items);
}
