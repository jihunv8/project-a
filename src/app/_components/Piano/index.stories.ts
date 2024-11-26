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
      { value: 9, state: 'highlight' },
      { value: 13, state: 'pressed' },
      { value: 16, state: 'pressed' },
      { value: 20, state: 'pressed' },
    ],
  },
};
