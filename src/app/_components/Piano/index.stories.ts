import type { Meta, StoryObj } from '@storybook/react';

import { Piano } from './index';

const meta = {
  title: 'Components/Piano/Piano',
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
    keyInfos: [
      { number: 9, state: 'highlight' },
      { number: 13, state: 'pressed' },
      { number: 16, state: 'pressed' },
      { number: 20, state: 'pressed' },
    ],
  },
};
