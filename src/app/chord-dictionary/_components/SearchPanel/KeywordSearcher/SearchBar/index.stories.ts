import type { Meta, StoryObj } from '@storybook/react';

import SearchBar from './index';

const meta = {
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const WithSuggestedKeywords: Story = {
  args: {
    keyword: 'mi',
    suggestedKeywords: ['mi', 'min', 'minor', 'minor seventh', 'minor seventh flat five'],
  },
};
