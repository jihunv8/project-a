import type { Meta, StoryObj } from '@storybook/react';

import PianoUnit from './index';
import PianoDataModule from '@/app/_components/Piano/src/piano-data';

const meta = {
  title: 'Components/Piano/PianoUnit',
  component: PianoUnit,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PianoUnit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    octave: 4,
  },
};

export const PressedCChord: Story = {
  args: {
    octave: 4,
    keys: {
      0: PianoDataModule.key.create(60, { state: 'highlight' }),
      1: PianoDataModule.key.create(61),
      2: PianoDataModule.key.create(62),
      3: PianoDataModule.key.create(63),
      4: PianoDataModule.key.create(64, { state: 'pressed' }),
      5: PianoDataModule.key.create(65),
      6: PianoDataModule.key.create(66),
      7: PianoDataModule.key.create(67, { state: 'pressed' }),
      8: PianoDataModule.key.create(68),
      9: PianoDataModule.key.create(69),
      10: PianoDataModule.key.create(70),
      11: PianoDataModule.key.create(71),
    },
  },
};
