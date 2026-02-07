import type { Meta, StoryObj } from '@storybook/vue3';
import PlumiMascot from './PlumiMascot.vue';

const meta: Meta<typeof PlumiMascot> = {
  title: 'Game/PlumiMascot',
  component: PlumiMascot,
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'challenge', 'celebration', 'encouragement'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PlumiMascot>;

export const Idle: Story = {
  args: { state: 'idle', size: 'md' },
};

export const Challenge: Story = {
  args: { state: 'challenge', size: 'md' },
};

export const Celebration: Story = {
  args: { state: 'celebration', size: 'md' },
};

export const Encouragement: Story = {
  args: { state: 'encouragement', size: 'md' },
};

export const Small: Story = {
  args: { state: 'idle', size: 'sm' },
};

export const Large: Story = {
  args: { state: 'idle', size: 'lg' },
};
