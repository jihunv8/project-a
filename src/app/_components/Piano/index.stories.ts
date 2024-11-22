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
    pressedKeys: [0, 4, 7],
    highlightKeys: [0],
  },
};
