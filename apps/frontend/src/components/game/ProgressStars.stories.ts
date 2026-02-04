import type { Meta, StoryObj } from '@storybook/vue3';
import ProgressStars from './ProgressStars.vue';

const meta: Meta<typeof ProgressStars> = {
  title: 'Game/ProgressStars',
  component: ProgressStars,
};

export default meta;
type Story = StoryObj<typeof ProgressStars>;

export const AllPending: Story = {
  args: {
    results: [null, null, null, null, null, null, null, null, null, null],
    current: 0,
  },
};

export const MidGame: Story = {
  args: {
    results: ['correct', 'incorrect', 'correct', 'correct', null, null, null, null, null, null],
    current: 4,
  },
};

export const AllCorrect: Story = {
  args: {
    results: Array(10).fill('correct'),
    current: 9,
  },
};

export const MixedResults: Story = {
  args: {
    results: [
      'correct',
      'incorrect',
      'correct',
      'correct',
      'incorrect',
      'correct',
      'incorrect',
      'correct',
      'correct',
      'correct',
    ],
    current: 9,
  },
};
