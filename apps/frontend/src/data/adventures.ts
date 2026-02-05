import type { Adventure, GameButton } from '@/components/game/BookCard.vue';

const ALL_GAMES: GameButton[] = [
  { game: 'tri-sorcier', label: 'Tri' },
  { game: 'grimoire', label: 'Grimoire' },
  { game: 'potion', label: 'Potion' },
  { game: 'pont-accords', label: 'Pont' },
  { game: 'potion-gn', label: 'Potion GN' },
];

export const ADVENTURES: Adventure[] = [
  {
    id: 1,
    title: 'Les Premiers Sorts',
    subtitle: 'Le Jardin s\'éveille',
    schoolTerms: ['Présent', 'GN'],
    tenses: ['present'],
    color: 'royal',
    games: ALL_GAMES,
  },
  {
    id: 2,
    title: 'La Clairière Enchantée',
    subtitle: 'La Forêt murmure',
    schoolTerms: ['Accords', 'Présent'],
    tenses: ['present'],
    color: 'forest',
    games: ALL_GAMES,
  },
  {
    id: 3,
    title: 'Les Sentiers du Futur',
    subtitle: 'L\'horizon s\'ouvre',
    schoolTerms: ['Futur', 'GN'],
    tenses: ['futur'],
    color: 'enchant',
    games: ALL_GAMES,
  },
  {
    id: 4,
    title: 'Les Brumes du Passé',
    subtitle: 'Les souvenirs dansent',
    schoolTerms: ['Imparfait', 'GN'],
    tenses: ['imparfait'],
    color: 'magic',
    games: ALL_GAMES,
  },
  {
    id: 5,
    title: 'Le Flux Temporel',
    subtitle: 'Bonus',
    schoolTerms: ['Tous les temps'],
    tenses: ['present', 'futur', 'imparfait', 'passe_compose'],
    color: 'gentle',
    isBonus: true,
    games: ALL_GAMES,
  },
];
