import type { Meta, StoryObj } from '@storybook/react';

import CommonButton from './index';

const meta = {
  component: CommonButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CommonButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: '버튼',
  },
};

export const Toggled: Story = {
  args: {
    name: '버튼',
    toggled: true,
  },
};

export const ToggledColorPrimary: Story = {
  args: {
    name: '버튼',
    toggled: true,
    color: 'primary',
  },
};
