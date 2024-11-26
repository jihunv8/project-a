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

export const Primary: Story = {
  args: {
    octave: 4,
  },
};

export const PressedCChord: Story = {
  args: {
    octave: 4,
    keyInfos: [
      {
        number: 60,
        state: 'highlight',
      },
      {
        number: 64,
        state: 'pressed',
      },
      {
        number: 67,
        state: 'pressed',
      },
    ],
  },
};
