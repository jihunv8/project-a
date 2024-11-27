import type { Meta, StoryObj } from '@storybook/react';

import SearchPanel from './index';

const meta = {
  title: 'Chord-Dictionary/Components/SearchPanel',
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
export const NotaionMode: Story = {
  args: {
    defaultMode: 'notation',
  },
};
export const PianoMode: Story = {
  args: {
    defaultMode: 'piano',
  },
};
