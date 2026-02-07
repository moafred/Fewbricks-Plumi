import type { Meta, StoryObj } from '@storybook/vue3';
import CelebrationParticles from './CelebrationParticles.vue';

const meta: Meta<typeof CelebrationParticles> = {
  title: 'UI/CelebrationParticles',
  component: CelebrationParticles,
  argTypes: {
    count: { control: 'number', min: 4, max: 16 },
    color: { control: 'text' },
    duration: { control: 'number', min: 200, max: 1000 },
  },
};

export default meta;
type Story = StoryObj<typeof CelebrationParticles>;

export const Default: Story = {
  args: { count: 8, color: 'gold-400', duration: 500 },
  render: (args) => ({
    components: { CelebrationParticles },
    setup() {
      return { args };
    },
    template: `
      <div class="relative w-64 h-64 bg-stone-800 rounded-2xl flex items-center justify-center">
        <CelebrationParticles v-bind="args" />
        <div class="text-gold-200 text-xl font-bold">Célébration !</div>
      </div>
    `,
  }),
};

export const ManyParticles: Story = {
  args: { count: 12, color: 'gold-400', duration: 500 },
  render: (args) => ({
    components: { CelebrationParticles },
    setup() {
      return { args };
    },
    template: `
      <div class="relative w-64 h-64 bg-stone-800 rounded-2xl flex items-center justify-center">
        <CelebrationParticles v-bind="args" />
        <div class="text-gold-200 text-xl font-bold">Célébration !</div>
      </div>
    `,
  }),
};

export const EnchantColor: Story = {
  args: { count: 8, color: 'meadow-400', duration: 500 },
  render: (args) => ({
    components: { CelebrationParticles },
    setup() {
      return { args };
    },
    template: `
      <div class="relative w-64 h-64 bg-stone-800 rounded-2xl flex items-center justify-center">
        <CelebrationParticles v-bind="args" />
        <div class="text-meadow-200 text-xl font-bold">Succès !</div>
      </div>
    `,
  }),
};
