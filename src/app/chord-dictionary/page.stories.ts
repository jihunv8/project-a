import type { Meta, StoryObj } from '@storybook/react';

import Page from './page';

const meta = {
  title: 'Chord-Dictionary/Page',
  component: Page,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
