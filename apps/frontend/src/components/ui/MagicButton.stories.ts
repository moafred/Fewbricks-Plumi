import type { Meta, StoryObj } from '@storybook/vue3';
import MagicButton from './MagicButton.vue';

const meta: Meta<typeof MagicButton> = {
  title: 'UI/MagicButton',
  component: MagicButton,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
    size: { control: 'select', options: ['md', 'lg'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof MagicButton>;

export const PrimaryLg: Story = {
  args: { variant: 'primary', size: 'lg' },
  render: () => ({
    components: { MagicButton },
    template: '<MagicButton variant="primary" size="lg">Rejouer</MagicButton>',
  }),
};

export const PrimaryMd: Story = {
  args: { variant: 'primary', size: 'md' },
  render: () => ({
    components: { MagicButton },
    template: '<MagicButton variant="primary" size="md">Rejouer</MagicButton>',
  }),
};

export const SecondaryLg: Story = {
  args: { variant: 'secondary', size: 'lg' },
  render: () => ({
    components: { MagicButton },
    template: '<MagicButton variant="secondary" size="lg">Accueil</MagicButton>',
  }),
};

export const SecondaryMd: Story = {
  args: { variant: 'secondary', size: 'md' },
  render: () => ({
    components: { MagicButton },
    template: '<MagicButton variant="secondary" size="md">Accueil</MagicButton>',
  }),
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'lg', disabled: true },
  render: () => ({
    components: { MagicButton },
    template: '<MagicButton variant="primary" size="lg" disabled>Disabled</MagicButton>',
  }),
};
