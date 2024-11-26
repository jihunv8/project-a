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
    keyInfos: [
      {
        value: 0,
        state: 'highlight',
      },
      {
        value: 4,
        state: 'pressed',
      },
      {
        value: 7,
        state: 'pressed',
      },
    ],
  },
};
