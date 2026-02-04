import type { Meta, StoryObj } from '@storybook/vue3';
import GameResult from './GameResult.vue';

const meta: Meta<typeof GameResult> = {
  title: 'Game/GameResult',
  component: GameResult,
};

export default meta;
type Story = StoryObj<typeof GameResult>;

export const Perfect: Story = {
  args: { score: 10, total: 10 },
};

export const Good: Story = {
  args: { score: 8, total: 10 },
};

export const Medium: Story = {
  args: { score: 5, total: 10 },
};

export const Low: Story = {
  args: { score: 2, total: 10 },
};

export const Zero: Story = {
  args: { score: 0, total: 10 },
};
