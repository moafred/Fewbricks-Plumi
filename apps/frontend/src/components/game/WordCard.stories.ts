import type { Meta, StoryObj } from '@storybook/vue3';
import WordCard from './WordCard.vue';

const meta: Meta<typeof WordCard> = {
  title: 'Game/WordCard',
  component: WordCard,
};

export default meta;
type Story = StoryObj<typeof WordCard>;

export const TriVerbes: Story = {
  args: {
    pronoun: 'je',
    form: 'suis',
    phase: 'challenge',
  },
};

export const GrimoireWithSeparator: Story = {
  args: {
    pronoun: 'je',
    form: 'être',
    phase: 'challenge',
    separator: '\u2192',
  },
};

export const Discovery: Story = {
  args: {
    pronoun: 'nous',
    form: 'sommes',
    phase: 'discovery',
  },
};

export const ElisionExample: Story = {
  args: {
    pronoun: 'je',
    form: 'ai',
    phase: 'challenge',
  },
};
