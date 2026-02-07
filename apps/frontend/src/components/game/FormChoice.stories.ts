import type { Meta, StoryObj } from '@storybook/vue3';
import FormChoice from './FormChoice.vue';

const meta: Meta<typeof FormChoice> = {
  title: 'Game/FormChoice',
  component: FormChoice,
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
type Story = StoryObj<typeof FormChoice>;

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
    components: { FormChoice },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; max-width: 400px;">
        <FormChoice label="suis" state="correct" />
        <FormChoice label="ai" state="incorrect" />
        <FormChoice label="es" state="idle" />
        <FormChoice label="as" state="idle" />
      </div>
    `,
  }),
};
