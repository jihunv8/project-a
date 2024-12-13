import type { Meta, StoryObj } from '@storybook/react';

import RootSelector from './index';

const meta = {
  component: RootSelector,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RootSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
