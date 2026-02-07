import type { Meta, StoryObj } from '@storybook/vue3';
import GameCard from './GameCard.vue';
import { HatIcon, GrimoireIcon } from '../icons';

const meta: Meta<typeof GameCard> = {
  title: 'UI/GameCard',
  component: GameCard,
};

export default meta;
type Story = StoryObj<typeof GameCard>;

export const TriVerbes: Story = {
  render: () => ({
    components: { GameCard, HatIcon },
    template: `
      <GameCard
        title="Le Tri des Verbes"
        description="Trie les formes conjuguées dans le bon chapeau : être ou avoir ?"
        accent-color="text-gold-300"
      >
        <template #icon>
          <HatIcon :size="48" class="text-gold-300" />
        </template>
      </GameCard>
    `,
  }),
};

export const Grimoire: Story = {
  render: () => ({
    components: { GameCard, GrimoireIcon },
    template: `
      <GameCard
        title="Le Grimoire"
        description="Trouve la bonne forme conjuguée pour chaque pronom et verbe !"
        accent-color="text-sky-300"
      >
        <template #icon>
          <GrimoireIcon :size="48" class="text-sky-300" />
        </template>
      </GameCard>
    `,
  }),
};
