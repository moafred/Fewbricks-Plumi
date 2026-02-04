import type { Meta, StoryObj } from '@storybook/vue3';
import { HatIcon, GrimoireIcon, StarFilledIcon, StarEmptyIcon, CrossIcon, SparkleIcon } from '.';

const icons = [
  { name: 'HatIcon', component: HatIcon },
  { name: 'GrimoireIcon', component: GrimoireIcon },
  { name: 'StarFilledIcon', component: StarFilledIcon },
  { name: 'StarEmptyIcon', component: StarEmptyIcon },
  { name: 'CrossIcon', component: CrossIcon },
  { name: 'SparkleIcon', component: SparkleIcon },
];

const meta: Meta = {
  title: 'Icons/All Icons',
};

export default meta;

export const Gallery: StoryObj = {
  render: () => ({
    components: { HatIcon, GrimoireIcon, StarFilledIcon, StarEmptyIcon, CrossIcon, SparkleIcon },
    setup() {
      return { icons, sizes: [24, 32, 48] };
    },
    template: `
      <div style="display: grid; grid-template-columns: auto repeat(3, 1fr); gap: 24px; align-items: center; color: white;">
        <div></div>
        <div v-for="s in sizes" :key="s" style="text-align: center; font-size: 14px; opacity: 0.6;">{{ s }}px</div>
        <template v-for="icon in icons" :key="icon.name">
          <div style="font-size: 14px; opacity: 0.8;">{{ icon.name }}</div>
          <div v-for="s in sizes" :key="s" style="display: flex; justify-content: center;">
            <component :is="icon.component" :size="s" />
          </div>
        </template>
      </div>
    `,
  }),
};
