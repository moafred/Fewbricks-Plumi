import type { Meta, StoryObj } from '@storybook/vue3';
import NarrativeCard from './NarrativeCard.vue';

const meta: Meta<typeof NarrativeCard> = {
  title: 'Game/NarrativeCard',
  component: NarrativeCard,
  argTypes: {
    title: { control: 'text' },
    text: { control: 'text' },
    biome: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof NarrativeCard>;

export const Default: Story = {
  args: {
    title: 'Le Jardin des Mots',
    text: 'Bienvenue dans le Jardin des Mots ! Ici, tu vas apprendre à conjuguer les verbes être et avoir au présent.',
    biome: 'jardin',
  },
};

export const LongText: Story = {
  args: {
    title: 'La Clairière Enchantée',
    text: 'Dans cette clairière magique, tu vas découvrir les secrets des accords dans le groupe nominal. Chaque mot doit s\'accorder avec les autres pour créer une phrase harmonieuse.',
    biome: 'clairiere',
  },
};
