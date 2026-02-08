import type { Meta, StoryObj } from '@storybook/vue3';
import CategoryButton from './CategoryButton.vue';

const meta: Meta<typeof CategoryButton> = {
  title: 'Game/CategoryButton',
  component: CategoryButton,
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'waiting', 'correct', 'incorrect', 'reveal'],
    },
    colorScheme: {
      control: 'select',
      options: ['meadow', 'gold', 'sky', 'coral'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryButton>;

export const MeadowIdle: Story = {
  args: { categoryId: 'etre', label: 'être', state: 'idle', colorScheme: 'meadow' },
};

export const MeadowWaiting: Story = {
  args: { categoryId: 'etre', label: 'être', state: 'waiting', colorScheme: 'meadow' },
};

export const MeadowCorrect: Story = {
  args: { categoryId: 'etre', label: 'être', state: 'correct', colorScheme: 'meadow' },
};

export const GoldWaiting: Story = {
  args: { categoryId: 'avoir', label: 'avoir', state: 'waiting', colorScheme: 'gold' },
};

export const GoldIncorrect: Story = {
  args: { categoryId: 'avoir', label: 'avoir', state: 'incorrect', colorScheme: 'gold' },
};

export const GoldReveal: Story = {
  args: { categoryId: 'avoir', label: 'avoir', state: 'reveal', colorScheme: 'gold' },
};

export const BothWaiting: Story = {
  render: () => ({
    components: { CategoryButton },
    template: `
      <div style="display: flex; gap: 24px;">
        <CategoryButton category-id="phrase" label="Phrase" state="waiting" color-scheme="meadow" />
        <CategoryButton category-id="non-phrase" label="Pas une phrase" state="waiting" color-scheme="gold" />
      </div>
    `,
  }),
};

export const SkyWaiting: Story = {
  args: { categoryId: 'sky-cat', label: 'Catégorie A', state: 'waiting', colorScheme: 'sky' },
};

export const CoralWaiting: Story = {
  args: { categoryId: 'coral-cat', label: 'Catégorie B', state: 'waiting', colorScheme: 'coral' },
};
