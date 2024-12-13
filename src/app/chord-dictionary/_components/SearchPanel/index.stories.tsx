import type { Meta, StoryObj } from '@storybook/react';

import SearchPanel from './index';

const meta = {
  component: SearchPanel,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const KeywordMode: Story = {
  args: {
    defaultMode: 'keyword',
  },
};
export const PianoMode: Story = {
  args: {
    defaultMode: 'piano',
  },
};
