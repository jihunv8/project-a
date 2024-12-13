import type { Meta, StoryObj } from '@storybook/react';

import KeywordSearcher from './index';

const meta = {
  component: KeywordSearcher,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof KeywordSearcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
