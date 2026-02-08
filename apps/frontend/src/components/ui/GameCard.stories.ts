import type { Meta, StoryObj } from '@storybook/vue3';
import GameCard from './GameCard.vue';
import { CategoryIcon, ArdoiseIcon } from '../icons';

const meta: Meta<typeof GameCard> = {
  title: 'UI/GameCard',
  component: GameCard,
};

export default meta;
type Story = StoryObj<typeof GameCard>;

export const TriVerbes: Story = {
  render: () => ({
    components: { GameCard, CategoryIcon },
    template: `
      <GameCard
        title="Le Tri des Verbes"
        description="Trie les formes conjuguées dans la bonne catégorie : être ou avoir ?"
        accent-color="text-gold-300"
      >
        <template #icon>
          <CategoryIcon :size="48" class="text-gold-300" />
        </template>
      </GameCard>
    `,
  }),
};

export const Ardoise: Story = {
  render: () => ({
    components: { GameCard, ArdoiseIcon },
    template: `
      <GameCard
        title="L'Ardoise"
        description="Trouve la bonne forme conjuguée pour chaque pronom et verbe !"
        accent-color="text-sky-300"
      >
        <template #icon>
          <ArdoiseIcon :size="48" class="text-sky-300" />
        </template>
      </GameCard>
    `,
  }),
};
