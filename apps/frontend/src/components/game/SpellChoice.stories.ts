import type { Meta, StoryObj } from '@storybook/vue3';
import SpellChoice from './SpellChoice.vue';

const meta: Meta<typeof SpellChoice> = {
  title: 'Game/SpellChoice',
  component: SpellChoice,
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'waiting', 'correct', 'incorrect', 'reveal'],
    },
  },
  decorators: [
    () => ({ template: '<div style="max-width: 300px;"><story /></div>' }),
  ],
};

export default meta;
type Story = StoryObj<typeof SpellChoice>;

export const Idle: Story = {
  args: { label: 'suis', state: 'idle' },
};

export const Waiting: Story = {
  args: { label: 'suis', state: 'waiting' },
};

export const Correct: Story = {
  args: { label: 'suis', state: 'correct' },
};

export const Incorrect: Story = {
  args: { label: 'suis', state: 'incorrect' },
};

export const Reveal: Story = {
  args: { label: 'suis', state: 'reveal' },
};

export const Grid: Story = {
  render: () => ({
    components: { SpellChoice },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; max-width: 400px;">
        <SpellChoice label="suis" state="correct" />
        <SpellChoice label="ai" state="incorrect" />
        <SpellChoice label="es" state="idle" />
        <SpellChoice label="as" state="idle" />
      </div>
    `,
  }),
};
