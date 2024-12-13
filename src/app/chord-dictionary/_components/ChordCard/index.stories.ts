import type { Meta, StoryObj } from '@storybook/react';

import ChordCard from './index';

const meta = {
  component: ChordCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ChordCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'AM7',
    subtitle: 'maj7, ma7',
    chordNumbers: [9, 13, 16, 18],
  },
};
