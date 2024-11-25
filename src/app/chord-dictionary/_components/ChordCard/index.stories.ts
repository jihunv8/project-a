import type { Meta, StoryObj } from '@storybook/react';

import ChordCard from './index';

const meta = {
  title: 'Chord-Dictionary/Components/ChordCard',
  component: ChordCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ChordCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
