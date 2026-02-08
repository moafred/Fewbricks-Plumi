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
  },
};

export default meta;
type Story = StoryObj<typeof CategoryButton>;

export const EtreIdle: Story = {
  args: { verbId: 'etre', label: 'être', state: 'idle' },
};

export const EtreWaiting: Story = {
  args: { verbId: 'etre', label: 'être', state: 'waiting' },
};

export const EtreCorrect: Story = {
  args: { verbId: 'etre', label: 'être', state: 'correct' },
};

export const AvoirWaiting: Story = {
  args: { verbId: 'avoir', label: 'avoir', state: 'waiting' },
};

export const AvoirIncorrect: Story = {
  args: { verbId: 'avoir', label: 'avoir', state: 'incorrect' },
};

export const AvoirReveal: Story = {
  args: { verbId: 'avoir', label: 'avoir', state: 'reveal' },
};

export const BothWaiting: Story = {
  render: () => ({
    components: { CategoryButton },
    template: `
      <div style="display: flex; gap: 24px;">
        <CategoryButton verb-id="etre" label="être" state="waiting" />
        <CategoryButton verb-id="avoir" label="avoir" state="waiting" />
      </div>
    `,
  }),
};
