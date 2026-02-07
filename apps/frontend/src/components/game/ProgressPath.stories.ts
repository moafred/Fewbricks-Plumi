import type { Meta, StoryObj } from '@storybook/vue3';
import ProgressPath from './ProgressPath.vue';

const meta: Meta<typeof ProgressPath> = {
  title: 'Game/ProgressPath',
  component: ProgressPath,
  argTypes: {
    color: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressPath>;

export const AllPending: Story = {
  args: {
    steps: [
      { id: 1, completed: false, current: false },
      { id: 2, completed: false, current: false },
      { id: 3, completed: false, current: false },
    ],
    color: 'sky-400',
  },
};

export const InProgress: Story = {
  args: {
    steps: [
      { id: 1, completed: true, current: false },
      { id: 2, completed: true, current: false },
      { id: 3, completed: false, current: true },
      { id: 4, completed: false, current: false },
    ],
    color: 'sky-400',
  },
};

export const AllCompleted: Story = {
  args: {
    steps: [
      { id: 1, completed: true, current: false },
      { id: 2, completed: true, current: false },
      { id: 3, completed: true, current: false },
    ],
    color: 'sky-400',
  },
};

export const EnchantColor: Story = {
  args: {
    steps: [
      { id: 1, completed: true, current: false },
      { id: 2, completed: true, current: false },
      { id: 3, completed: false, current: true },
    ],
    color: 'meadow-400',
  },
};
