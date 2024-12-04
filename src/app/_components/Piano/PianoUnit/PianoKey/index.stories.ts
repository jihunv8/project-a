import type { Meta, StoryObj } from '@storybook/react';

import PianoKey from './index';

const meta = {
  title: 'Components/Piano/PianoKey',
  component: PianoKey,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PianoKey>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    number: 60,
  },
};

export const White: Story = {
  args: {
    number: 60,
    type: 'white',
  },
};

export const Black: Story = {
  args: {
    number: 60,
    type: 'black',
  },
};

export const Pressed: Story = {
  args: {
    number: 60,
    state: 'pressed',
  },
};

export const Highlight: Story = {
  args: {
    number: 60,
    state: 'highlight',
  },
};
