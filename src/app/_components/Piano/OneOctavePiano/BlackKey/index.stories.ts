import type { Meta, StoryObj } from '@storybook/react';

import { PianoBlackKey } from './index';

const meta = {
  title: 'Components/Piano/BlackKey',
  component: PianoBlackKey,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PianoBlackKey>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Pressed: Story = {
  args: {
    state: 'pressed',
  },
};

export const Highlight: Story = {
  args: {
    state: 'highlight',
  },
};
