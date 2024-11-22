import type { Meta, StoryObj } from '@storybook/react';

import { OneOctavePiano } from './index';

const meta = {
  title: 'Components/Piano/OneOctavePiano',
  component: OneOctavePiano,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof OneOctavePiano>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const PressedCChord: Story = {
  args: {
    pressedKeys: [0, 4, 7],
    highlightKeys: [0],
  },
};
