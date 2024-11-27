import type { Meta, StoryObj } from '@storybook/react';

import SearchPiano from './index';

const meta = {
  title: 'Chord-Dictionary/Components/SearchPanel/SearchPiano',
  component: SearchPiano,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SearchPiano>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
