import type { Preview } from '@storybook/react';
import React from 'react';

import '../src/styles/globals.scss';

import { fontFamilys } from '../src/styles/fontFamilys';

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
      <main className={fontFamilys.global.className}>
        <Story />
      </main>
    ),
  ],
};

export default preview;
