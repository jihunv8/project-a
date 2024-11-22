import type { Meta, StoryObj } from '@storybook/react';

import { PianoWiteKey } from './index';

const meta = {
  title: 'Components/Piano/PianoWiteKey',
  component: PianoWiteKey,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PianoWiteKey>;

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
