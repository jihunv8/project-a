import type { Meta, StoryObj } from '@storybook/react';

import SearchBar from './index';

const meta = {
  title: 'Chord-Dictionary/Components/SearchPanel/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
