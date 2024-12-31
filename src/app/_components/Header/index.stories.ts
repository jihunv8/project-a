import type { Meta, StoryObj } from '@storybook/react';

import Header from './index';

const meta = {
  component: Header,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
