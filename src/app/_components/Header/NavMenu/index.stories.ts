import type { Meta, StoryObj } from '@storybook/react';

import NavMenu from './index';

const meta = {
  component: NavMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NavMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    href: '',
    text: '메뉴',
  },
};
