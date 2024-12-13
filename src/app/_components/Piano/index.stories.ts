import type { Meta, StoryObj } from '@storybook/react';

import { Piano } from './index';

const meta = {
  component: Piano,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Piano>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WhenPressedChord: Story = {
  args: {
    keys: [
      { number: 69, state: 'highlight' },
      { number: 73, state: 'pressed' },
      { number: 76, state: 'pressed' },
      { number: 80, state: 'pressed' },
    ],
  },
};

export const SettedStartOctave: Story = {
  args: {
    keys: [
      { number: 69, state: 'highlight' },
      { number: 73, state: 'pressed' },
      { number: 76, state: 'pressed' },
      { number: 80, state: 'pressed' },
    ],
    options: {
      startOctave: 2,
    },
  },
};

export const SettedTotalOctave: Story = {
  args: {
    keys: [
      { number: 69, state: 'highlight' },
      { number: 73, state: 'pressed' },
      { number: 76, state: 'pressed' },
      { number: 80, state: 'pressed' },
    ],
    options: {
      totalOctave: 4,
    },
  },
};
