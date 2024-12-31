import type { Preview } from '@storybook/react';
import React from 'react';

import '../src/styles/globals.scss';

import { fontFamilies } from '../src/styles/fontFamilies';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <main className={fontFamilies.global.className}>
        <Story />
      </main>
    ),
  ],
};

export default preview;
