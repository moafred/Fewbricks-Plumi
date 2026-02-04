import type { Preview } from '@storybook/vue3';
import '../src/assets/main.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'night',
      values: [{ name: 'night', value: '#0f172a' }],
    },
  },
};

export default preview;
