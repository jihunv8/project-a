import type { Meta, StoryObj } from '@storybook/react';

import Button from './index';

const meta = {
  title: 'Chord-Dictionary/Components/SearchPanel/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: '버튼',
  },
};

export const Active: Story = {
  args: {
    name: '버튼',
    active: true,
  },
};
